import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { FontAwesome } from '@expo/vector-icons'; 
const NoInternet = ({onRefreshPress}) => {
  return (
    <View style={styles.container}>
      <MaterialIcons name="wifi-off" size={100} color="#323232" />

      <Text style={{ fontSize: 18, color: "#323232", paddingVertical: 15 }}>
        Нет интернет соединения
      </Text>

      <Pressable onPress={onRefreshPress} style={{flexDirection:"row",alignItems:"center"}}>
      <FontAwesome name="refresh" size={24} color="black" />
        <Text style={{ fontSize: 18, color: "#323232", paddingVertical: 15 , marginLeft:5 }}>
          Попробуйте еще раз
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NoInternet;
