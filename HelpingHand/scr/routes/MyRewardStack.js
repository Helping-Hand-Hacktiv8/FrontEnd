import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Reward from "../screens/Reward";
import RewardDetails from "../screens/RewardDetails";

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
        headerTitleStyle:{color:'white'},
        headerStyle:{
            backgroundColor:'#175d8c'
        },
        title:'Reward',
        headerStatusBarHeight:25
      }}/>
      <Stack.Screen name="RewardDetails" component={RewardDetails} options={{
        headerShown:true,
        headerTitleStyle:{color:'white'},
        headerStyle:{
            backgroundColor:'#175d8c'
        },
        title:'Reward Details',
        headerStatusBarHeight:25
      }}/> 
      
    </Stack.Navigator>
  );
}
