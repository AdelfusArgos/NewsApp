import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { getSinglePost } from "../api/post";
import PostListItem from "./PostListItem";
import { getSimilerPosts } from "../api/post";

const RelatedPosts = ({ postId,OnPostPress}) => {
  const [posts, setPosts] = useState([]);

  const fetchSimillerPosts = async () => {
    const { error, posts } = await getSimilerPosts(postId);
    if (error) console.log(error);

    setPosts([ ...posts ]);
  };

  useEffect(() => {
    fetchSimillerPosts();
  }, [postId]);

  return posts.map((post) => {
        return (
            <View style={styles.container}  key={post.id}>
          <PostListItem
            
            onPress={() => OnPostPress(post.slug)}
           
            post={post}
            />
            </View>
        );
      })
    
  
};

const styles = StyleSheet.create({
    container:{marginTop:   20}
});

export default RelatedPosts;
