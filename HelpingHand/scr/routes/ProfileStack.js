import { createStackNavigator } from "@react-navigation/stack";
import ProfilePage from "../screens/ProfilePage";
import TopUpScreen from "../screens/TopUpScreen";

const Stack = createStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileStack"
        component={ProfilePage}
        options={{
          title: "Profile",
          headerTitleAlign: "center",
          headerTitleAllowFontScaling: true,
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 30,
          },
        }}
      />
      <Stack.Screen
        name="TopUpScreen"
        component={TopUpScreen}
        options={{
          title: "Top Up",
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
