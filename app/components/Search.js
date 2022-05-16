import { StyleSheet, Text, View, TextInput, ScrollView } from "react-native";
import React, { useState } from "react";
import Constants from "expo-constants";
import PostlistsItem from "../components/PostListItem";
import { getSinglePost, searchPosts } from "../api/post";
import Separator from "./Separator";

const Search = ({ navigation }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [notFound, setNotFound] = useState(false);

  const handlePostPress = async (slug) => {
    const { error, post } = await getSinglePost(slug);

    if (error) return console.log(error);
    navigation.navigate("PostDetail", { post });
  };

  const handleOnSubmit = async () => {
    if (!query.trim()) return;

    const { error, posts } = await searchPosts(query);
    if (error) return console.log(error);
    if (!posts.length) return setNotFound(true);
    setResults([...posts]);
  };

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={(text) => setQuery(text)}
        value={query}
        placeholder="Поиск..."
        style={styles.searchInput}
        onSubmitEditing={handleOnSubmit}
      />

      <ScrollView>
        {notFound ? (
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 22,
              color: "#323232",
              textAlign: "center",
              padding: 30,
            }}
          >
            Ничего не найдено
          </Text>
        ) : (
          results.map((post) => {
            return (
              <View
                key={post.id}
                style={{ marginTop: 10, marginHorizontal: 25 }}
              >
                <PostlistsItem
                  post={post}
                  key={post.id}
                  onPress={() => handlePostPress(post.slug)}
                ></PostlistsItem>
                <Separator />
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    padding: 0,
  },

  searchInput: {
    borderWidth: 3,
    borderColor: "#323232",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    margin: 20,
  },
});

export default Search;
