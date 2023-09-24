import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/HomePage";
import Register from "../screens/RegisterPage";
import Login from "../screens/LoginPage";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import MyActivty from "../screens/MyActivityPage";
import MyRequest from "../screens/MyRequest";
import AddRequest from "../screens/AddRequest";

export default function MyActivityStack() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen name="MyActivity" component={MyActivty} options={{
        headerShown:true,
        headerStyle:{
            backgroundColor:'#175d8c'
        },
        title:'',
        headerStatusBarHeight:10
      }}/>
      <Stack.Screen name="MyRequest" component={MyRequest} options={{
        headerShown:true,
        headerStyle:{
            backgroundColor:'#175d8c'
        },
        title:'',
        headerStatusBarHeight:10
      }}/>
      <Stack.Screen name="AddRequest" component={AddRequest} options={{
        headerShown:true,
        headerStyle:{
            backgroundColor:'#175d8c'
        },
        title:'',
        headerStatusBarHeight:10
      }}/>
    </Stack.Navigator>
  );
}
