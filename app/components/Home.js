import { FlatList, Text, View ,RefreshControl,ScrollView} from "react-native";
import { useEffect, useState, useCallback } from "react";
import { getFeaturedPosts, getLatestPosts, getSinglePost } from "../api/post";
import PostListItem from "./PostListItem";
import Separator from "./Separator";
import Slider from "./Slider";
import Constants from "expo-constants";

let pageNo = 0;
const limit = 10;


const Home = ({ navigation }) => {
  const [featuredPosts, setFeaturedPost] = useState([]);
  const [latestPosts, setlatestPosts] = useState([]);

  const [reachedToEnd, setreachedToEnd] = useState(false);


  const [refreshing, setRefreshing] = useState(false);

  const [busy, setBusy] = useState(false);
  const fetchFeaturedPosts = async () => {
    const { error, posts } = await getFeaturedPosts();
    if (error) return console.log(error);

    setFeaturedPost(posts);
  };

  const fetchLatestPosts = async () => {
    const { error, posts } = await getLatestPosts(limit, pageNo);
    if (error) return console.log(error);

    setlatestPosts(posts);
  };

  const fetchMorePosts = async () => {
    if (reachedToEnd || busy) return;
    pageNo += 1;

    setBusy(true);
    const { error, posts, postCount } = await getLatestPosts(limit, pageNo);
    setBusy(false);
    if (error) return console.log(error);

    if (postCount === latestPosts.length) return setreachedToEnd(true);

    setlatestPosts([...latestPosts, ...posts]);
  };

  useEffect(() => {
    fetchFeaturedPosts();
    fetchLatestPosts();
    return () => {
      pageNo = 0;
      setreachedToEnd(false);
    };
  }, []);

  const onRefresh = useCallback(() => {
    
    setRefreshing(true);
    pageNo = 0;
    fetchFeaturedPosts();
    fetchLatestPosts();
    setreachedToEnd(false)
    setRefreshing(false)


  }, []);

  const fetchSinglePost = async (postInfo) => {
    const slug = postInfo.slug || postInfo;

    const { error, post } = await getSinglePost(slug);

    if (error) console.log(error);
    navigation.navigate("PostDetail", { post });
  };

  const renderItem = ({ item }) => {
    return (
      <View style={{ marginTop: 10, marginBottom:10 }}>
        <PostListItem onPress={() => fetchSinglePost(item.slug)} post={item} />
      </View>
    );
  };

  const ItemSeparatorComponent = () => (
    <Separator width="80%" />
  );






  const ListHeaderComponent = useCallback(() => {
    return ( 
  
   
    <ScrollView   style={{ paddingTop: Constants.statusBarHeight }}>
        {featuredPosts.length ? ( 
        
          <Slider
            onSlidePress={fetchSinglePost}
            data={featuredPosts}
            title="Актуальные новости"
          ></Slider>
        ) : null}
        <View>
       
     
          <Separator width="100%" />
          <Text
            style={{
              fontWeight: "700",
              color: "#323232",
              fontSize: 22,
              marginTop:30,
              marginBottom:5
            }}
          >
            Последние новости
          </Text>
        </View>
      </ScrollView>
  

  
    
    );
  }, [featuredPosts]);

  
  return (
   
    <FlatList 
      refreshControl={<RefreshControl  refreshing={refreshing} onRefresh={onRefresh} />}
      data={latestPosts}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 0 ,  }}
      ListHeaderComponent={ListHeaderComponent}
      ItemSeparatorComponent={ItemSeparatorComponent}
      renderItem={renderItem}
      onEndReached={fetchMorePosts}
      onEndReachedThreshold={0}
      ListFooterComponent={() => {
        return reachedToEnd ? (
          <Text
            style={{
              fontWeight: "bold",
              color: "#323232",
              textAlign: "center",
              paddingVertical: 20,
            }}
          >
            Вы дошли до конца ленты новостей!
          </Text>
        ) : null;
      }}
    />
  );
};

export default Home;
