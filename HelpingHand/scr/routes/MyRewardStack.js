import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Reward from "../screens/Reward";

export default function MyRewardsStack() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen name="Reward" component={Reward} options={{
        headerShown:true,
        headerStyle:{
            backgroundColor:'#175d8c'
        },
        title:'',
        headerStatusBarHeight:25
      }}/>
      
    </Stack.Navigator>
  );
}
