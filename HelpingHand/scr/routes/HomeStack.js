import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/HomePage";
import Register from "../screens/RegisterPage";
import Login from "../screens/LoginPage";
import { setStatusBarBackgroundColor } from "expo-status-bar";
import React from "react";
import { useNavigation } from "@react-navigation/native";
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
        headerShown:true,
        headerStyle:{
            backgroundColor:'#dc6c3c'
        },
        title:'',
        headerStatusBarHeight:10
      }}/>
      <Stack.Screen name="HomeActivityDetail" component={HomeActivityDetails} options={{
        headerShown:true,
        headerTitleStyle:{color:'white'},
        headerStyle:{
            backgroundColor:'#175d8c',
            
        },
        title:'',
        headerStatusBarHeight:25
      }}/>
    </Stack.Navigator>
  );
}
