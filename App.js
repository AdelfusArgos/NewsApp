import { StyleSheet, Text, View, RefreshControl } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import TabNavigator from "./app/navigation/TabNavigator";
import NoInternet from "./app/components/NoInternet";
import { useNetInfo } from "@react-native-community/netinfo";


const App = () => {
  const [noInternet, setNoInternet] = useState(false);
  const netInfo = useNetInfo();
  const fetchNetInfo = () => {
    const { isConnected, isInternetReachable } = netInfo;
    if (isConnected === false && isInternetReachable === false)
      setNoInternet(true);
    else setNoInternet(false);
  };

  
  useEffect(() => {
    fetchNetInfo();
  }, [netInfo]);

  if (noInternet) return <NoInternet onRefreshPress={fetchNetInfo} />;

  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
  
};

const styles = StyleSheet.create({});

export default App;
