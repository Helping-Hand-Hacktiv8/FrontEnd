import { NavigationContainer } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import HomeStack from "./scr/routes/HomeStack";
import ProfileStack from "./scr/routes/ProfileStack";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { StyleSheet, Text } from "react-native";
import { useTheme } from "react-native-paper";
import MyActivityStack from "./scr/routes/MyActivityStack";
import { Entypo } from "@expo/vector-icons";

import { Provider, useSelector } from "react-redux";
import store from "./scr/store/index.js";
import FrontStack from "./scr/navigators/MainStack";
import MainStack from "./scr/navigators/FrontStack";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import ControlNav from "./scr/navigators/ControlNav";

export default function App() {
  const theme = useTheme();
  theme.colors.secondaryContainer = "transperent";
  const Tab = createMaterialBottomTabNavigator();

  return (
    <Provider store={store}>
      <ControlNav />
    </Provider>
  );
}

const styles = StyleSheet.create({
  tabBarLabel: {
    fontSize: 12,
    textAlign: "center",
  },
});
