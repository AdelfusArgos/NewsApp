
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Image } from 'react-native';
import dateFormat from 'dateformat';

const IMAGE_WIDTH = 100;

const PostListItem = ({post,onPress}) => {

    const {thumbnail,title,createdAt, author} = post
    
    const getThumbnail = (uri) =>{
        if(uri) return {uri} 



        return require('../../assets/kajetan-sumila-PJYoGy7JtPk-unsplash.jpg')
    }


  return (
    <TouchableOpacity onPress={onPress} style={{flexDirection:'row'}} >

        <Image source={getThumbnail(thumbnail)} style={{width:IMAGE_WIDTH,height: IMAGE_WIDTH / 1.3}} />

        <View style={{flex:1,marginLeft:5}}>
            <Text style={{fontSize:16,fontWeight:'700',color:'#323232',marginBottom:15}}>{title}</Text>
            <Text style={{fontSize:16,fontWeight:'700',color:'#d3d3d3'}}>{dateFormat(createdAt,'mediumDate')} - {author}</Text>
        </View>

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({

    container:{},
})


export default PostListItem