import { StyleSheet, Text, View, Dimensions} from 'react-native'
import React from 'react';



const Separator = ({width="100%",height=3, backgroundColor="#88BEFD"}) => {
  return (
    <View style={{width,height,backgroundColor,alignSelf:'center'} }/>
  )
}

const styles = StyleSheet.create({})


export default Separator
