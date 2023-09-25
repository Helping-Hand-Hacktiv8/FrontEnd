import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Home from "../screens/HomePage";
import { Entypo } from '@expo/vector-icons'; 
import MyActivityStack from "../routes/MyActivityStack";
import HomeStack from "../routes/HomeStack";
import ProfileStack from "../routes/ProfileStack";
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome5 } from "@expo/vector-icons";

export default function FrontStack(){
    const Tab = createMaterialBottomTabNavigator();
    return(
        <Tab.Navigator
        activeColor="#dc6c3c"
        barStyle={{
          backgroundColor: "white",
          height: 70,
          
        }}
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#175d8c",
          
        }}
      >
        <Tab.Screen
          name="HomeStack"
          component={Home}
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <Entypo name="home" size={24} color={color} />

            ),
            
          }}
        />
        <Tab.Screen
          name="MyActivity"
          component={MyActivityStack}
          options={{
            title:"My Activity",
            tabBarIcon: ({ color }) => (
              <Entypo name="clipboard" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="My Rewards"
          component={Home}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="ios-gift-sharp" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="ProfilePage"
          component={ProfileStack}
          options={{
            title: "My Profile",
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="user-alt" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Chat"
          component={HomeStack}
          options={{
            title: "Chat",
            tabBarIcon: ({ color }) => (
              <Entypo name="chat" size={24} color={color} />

            ),
          }}
        />
      </Tab.Navigator>
    )
}