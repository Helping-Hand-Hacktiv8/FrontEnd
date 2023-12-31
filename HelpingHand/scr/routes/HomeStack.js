import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/HomePage";
import React from "react";
import HomeActivityDetails from "../screens/HomeActivityDetails";

export default function HomeStack() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen name="Home" component={Home} options={{
        headerShown: false,
      }}/>
      <Stack.Screen name="HomeActivityDetail" component={HomeActivityDetails} options={{
        headerShown:true,
        title:'Activity Detail',
      }}/>
    </Stack.Navigator>
  );
}
