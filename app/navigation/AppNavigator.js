import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../components/Home";
import PostDetail from "../components/PostDetail";
import { useNavigation } from "@react-navigation/native";
import Separator from "../components/Separator";
import Header from "../components/Header";
import { AntDesign } from '@expo/vector-icons'; 
import { TouchableWithoutFeedback } from "react-native-web";
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerTitle: () => <Header />,
          headerStyle: {
            backgroundColor: "#5CB1FF",
          },
        }}
        component={Home}
        name="home"
      />
      <Stack.Screen
        options={{
          title: "",
          headerTransparent: true,
          headerShadowVisible: false,
          headerLeft:(props) =>(
            <TouchableWithoutFeedback {...props}>
              <View style={{width:40,height:40 , justifyContent:"center",alignItems:"center",borderRadius:20, backgroundColor:"rgba(0,0,0,0.5)"}} >
              <AntDesign name="arrowleft" size={24} color="white" />
              </View>
            </TouchableWithoutFeedback>
          )
        }}
        component={PostDetail}
        name="PostDetail"
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
const styles = StyleSheet.create({});
