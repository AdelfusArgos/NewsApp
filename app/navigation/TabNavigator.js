import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Home from "../components/Home";
import Search from "../components/Search";
import Options from "../components/Options";
import AppNavigator from "./AppNavigator";
import Header from "../components/Header";
import Other from "../components/Other";
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
       
        
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <AntDesign name="home" size={size} color="#323232" />;
          },
        }}
        name="Новости"
        component={AppNavigator}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <AntDesign name="search1" size={size} color="#323232" />;
          },
        }}
        name="Поиск"
        component={Search}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <MaterialCommunityIcons
                name="weather-cloudy"
                size={24}
                color="black"
              />
            );
          },
        }}
        name="Погода"
        component={Search}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
