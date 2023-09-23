import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./scr/screens/HomePage";
import MyActivty from "./scr/screens/MyActivityPage";
import { Entypo } from "@expo/vector-icons";
import CustomHeader from "./scr/components/CustomHeader";
import HomeStack from "./scr/routes/HomeStack";
import ProfileStack from "./scr/routes/ProfileStack";

export default function App() {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            tabBarIcon: () => <Entypo name="home" color={"black"} size={26} />,
          }}
        />
        <Tab.Screen name="MyActivity" component={HomeStack} options={{}} />
        <Tab.Screen name="MyRewards" component={HomeStack} options={{}} />
        <Tab.Screen
          name="ProfilePage"
          component={ProfileStack}
          options={{
            title: "My Profile",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
