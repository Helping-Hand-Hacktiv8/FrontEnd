import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { StyleSheet, Text } from "react-native";
import { useTheme } from "react-native-paper";
import { Provider } from "react-redux";
import store from "./scr/store/index.js";
import ControlNav from "./scr/navigators/ControlNav";
import React, { useEffect, useState } from "react";
import * as Font from "expo-font";

export default function App() {
  const theme = useTheme();
  theme.colors.secondaryContainer = "transperent";
  const Tab = createMaterialBottomTabNavigator();
  const [isFontLoaded, setIsFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        GlacialIndifference: require("./assets/fonts/GlacialIndifference-Regular.ttf"),
      });
      setIsFontLoaded(true);
    }

    loadFont();
  }, []);

  return (
    <Provider store={store}>
      {isFontLoaded ? (
        <ControlNav />
      ) : (
        <Text>Something went wrong</Text>
      )}
    </Provider>
  );
}

const styles = StyleSheet.create({
  tabBarLabel: {
    fontSize: 12,
    textAlign: "center",
  },
});
