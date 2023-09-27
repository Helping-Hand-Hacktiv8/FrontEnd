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
      <Stack.Screen
        name="Reward"
        component={Reward}
        options={{
          title: "Reward Page",
          headerTitleAlign: "center",
          headerTitleAllowFontScaling: true,
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 30,
          },
        }}
      />

      <Stack.Screen
        name="RewardDetails"
        component={RewardDetails}
        options={{
          title: "Reward Details",
          headerTitleAlign: "center",
          headerTitleAllowFontScaling: true,
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 30,
          },
        }}
      />
    </Stack.Navigator>
  );
}
