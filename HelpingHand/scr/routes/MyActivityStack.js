import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import MyActivty from "../screens/MyActivityPage";
import MyRequest from "../screens/MyRequest";
import AddRequest from "../screens/AddRequest";
import ActivityDetails from "../screens/ActivityDetails";

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
        headerTitleStyle:{color:'white'},
        headerStyle:{
            backgroundColor:'#175d8c'
        },
        title:'My Activity',
        headerStatusBarHeight:25
      }}/>
      <Stack.Screen name="MyRequest" component={AddRequest} options={{
        headerShown:true,
        headerTitleStyle:{color:'white'},
        headerStyle:{
            backgroundColor:'#175d8c'
        },
        title:'My Request',
        headerStatusBarHeight:25
      }}/>
      <Stack.Screen name="AddRequest" component={AddRequest} options={{
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
