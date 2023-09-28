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
        }}
      />
      <Stack.Screen name="MyRequest" component={MyRequest} options={{
        title: 'My Request',
      }} />
      <Stack.Screen name="AddRequest" component={AddRequest} options={{
        headerShown: true,
      }} />
      <Stack.Screen name="ActivityDetail" component={MyActivityDetails} options={{
        title: "Activity Detail"
      }} />
       <Stack.Screen name="EditRequest" component={EditRequest} options={{
        title: "Edit Request"
      }} />
       <Stack.Screen name="Monitor" component={Monitor} options={{
      }} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} options={{
        headerShown: false,
        headerStatusBarHeight: 25
      }} />
    </Stack.Navigator>
  );
}
