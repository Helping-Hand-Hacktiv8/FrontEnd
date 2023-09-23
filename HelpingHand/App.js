import { NavigationContainer } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import HomeStack from "./scr/routes/HomeStack";
import ProfileStack from "./scr/routes/ProfileStack";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { StyleSheet, Text } from "react-native";
import { useTheme } from 'react-native-paper';



export default function App() {
  const theme = useTheme();
theme.colors.secondaryContainer = "transperent"
  const Tab = createMaterialBottomTabNavigator();
  return (
    <NavigationContainer>
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
          component={HomeStack}
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <Feather name="home" size={24} color={color} />
            ),
            
          }}
        />
        <Tab.Screen
          name="MyActivity"
          component={HomeStack}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons
                name="pending-actions"
                size={24}
                color={color}
              />
            ),
            tabBarLabel: <Text style={styles.tabBarLabel}>Home</Text>
          }}
        />
        <Tab.Screen
          name="MyRewards"
          component={HomeStack}
          options={{
            tabBarIcon: ({ color }) => (
              <Feather name="gift" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="ProfilePage"
          component={ProfileStack}
          options={{
            title: "My Profile",
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="user" size={24} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBarLabel: {
    fontSize: 12,
    textAlign: "center",
  },
});
