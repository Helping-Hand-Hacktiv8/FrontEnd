import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import MyActivty from "../screens/MyActivityPage";
import MyRequest from "../screens/MyRequest";
import AddRequest from "../screens/AddRequest";
import EditRequest from "../screens/EditRequest";
import Monitor from "../screens/Monitor";
import ChatScreen from "../screens/ChatScreen";
import MyActivityDetails from "../screens/MyActivityDetails";

export default function MyActivityStack() {

  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="MyActivity"
        component={MyActivty}
        options={{
          title: "My Activity",
          headerTitleAlign: "center",
          headerTitleAllowFontScaling: true,
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 30,
          },
        }}
      />
      <Stack.Screen name="MyRequest" component={MyRequest} options={{
        headerShown: true,
        headerTitleStyle: { color: 'white' },
        headerStyle: {
          backgroundColor: '#175d8c'
        },
        title: 'My Request',
        headerStatusBarHeight: 25
      }} />
      <Stack.Screen name="AddRequest" component={AddRequest} options={{
        headerShown: true,
        headerTitleStyle: { color: 'white' },
        headerStyle: {
          backgroundColor: '#175d8c',

        },
        title: '',
        headerStatusBarHeight: 25
      }} />
      <Stack.Screen name="ActivityDetail" component={MyActivityDetails} options={{
        headerShown: true,
        headerTitleStyle: { color: 'white' },
        headerStyle: {
          backgroundColor: '#175d8c',

        },
        title:'',
        headerStatusBarHeight:25
      }} />
       <Stack.Screen name="EditRequest" component={EditRequest} options={{
        headerShown:true,
        headerTitleStyle:{color:'white'},
        headerStyle:{
            backgroundColor:'#175d8c',
            
        },
        title:'',
        headerStatusBarHeight:25
      }} />
       <Stack.Screen name="Monitor" component={Monitor} options={{
        headerShown:true,
        headerTitleStyle:{color:'white'},
        headerStyle:{
            backgroundColor:'#175d8c',
            
        },
        title:'',
        headerStatusBarHeight:25
      }} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} options={{
        headerShown: false,
        headerStatusBarHeight: 25
      }} />
    </Stack.Navigator>
  );
}
