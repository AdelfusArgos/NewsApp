import { StyleSheet, Text, View, Image, Dimensions,ScrollView } from "react-native";
import React from "react";
import dateFormat from "dateformat";
import Markdown from "react-native-markdown-display";
import RelatedPosts from "./RelatedPosts";
import Separator from "./Separator";
import { getSinglePost } from "../api/post";
const { width } = Dimensions.get("window");

const PostDetail = ({ route,navigation }) => {
  const post = route.params?.post;

  if (!post) return null;

  const getImage = (uri) => {
    if (uri) return { uri };
    return require("../../assets/kajetan-sumila-PJYoGy7JtPk-unsplash.jpg");
  };
  const { title, thumbnail, tags, createdAt, author, content } = post;
  console.log(route.params);




  

  const handleSinglePostFetch = async (slug) =>{


    const {error,post} = await getSinglePost(slug);

    if(error) return console.log(error);
    navigation.push("PostDetail",{post})
  }


  return (
    <ScrollView>
      <Image
        source={getImage(thumbnail)}
        style={{ width, height: width / 1.7 }}
      ></Image>
      <View style={{ padding: 10 }}>
        <Text
          style={{
            fontWeight: "700",
            color: "#323232",
            fontSize: 22,
            marginVertical: 15,

          }}
        >
          {title}
        </Text>

      
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
            <Text>{dateFormat(createdAt,"mediumDate")}</Text>
          <View style={{ flexDirection: "row" }}>
            {tags.map((tag, index) => (
              <Text style={{ marginLeft: 5, color: "blue" }} key={tag + index}>
                #{tag}
              </Text>
            ))}
          </View>
        </View>
      </View>

      <Markdown  style={{
            paragraph:{
              lineHeight:22,
            },
            body:{
              fontSize:16,
              paddingHorizontal:10,
            },
            link:{
              color:"blue",
            },
          }}  >
        {content}
      </Markdown>
    
      <View style={{padding:15}}>
        <Text style={{
            fontWeight: "700",
            color: "#323232",
            fontSize: 22,
            marginBottom: 15,

          }} > Похожие новости:</Text> 
           <Separator width="100%"/>
          <RelatedPosts OnPostPress={handleSinglePostFetch}   postId={post.id} />

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default PostDetail;
