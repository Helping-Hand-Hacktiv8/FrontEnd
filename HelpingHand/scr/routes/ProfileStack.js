import { createStackNavigator } from "@react-navigation/stack";
import ProfilePage from "../screens/ProfilePage";

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
    </Stack.Navigator>
  );
}
