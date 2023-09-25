import { NavigationContainer } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import HomeStack from "./scr/routes/HomeStack";
import ProfileStack from "./scr/routes/ProfileStack";
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome5 } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { StyleSheet, Text } from "react-native";
import { useTheme } from 'react-native-paper';
import MyActivityStack from "./scr/routes/MyActivityStack";
import { Entypo } from '@expo/vector-icons'; 
import { Provider, useSelector } from 'react-redux'
import store from './scr/store/index.js'
import FrontStack from "./scr/navigators/MainStack";
import MainStack from "./scr/navigators/FrontStack";
import { useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import ControlNav from "./scr/navigators/ControlNav";


export default function App() {
  const theme = useTheme();
  theme.colors.secondaryContainer = "transperent"
  const Tab = createMaterialBottomTabNavigator();
  // const [authData,setAuthData] = useState({
  //   access_token:''
  // })

  // const authData = useSelector((state)=>{
  //   return state.user.access_token
  // })

  // useEffect(()=>{
  //   const getTokenAsync = async ()=>{
  //     try {
  //       let useToken = await SecureStore.getItemAsync('access_token')
  //       setAuthData({access_token:useToken})
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   getTokenAsync();
  // },[])

  return (
    <Provider store={store}>
      <ControlNav />
      {/* <NavigationContainer>
        {authData ? <MainStack/> : <FrontStack />} */}
        {/* <Tab.Navigator
          activeColor="#dc6c3c"d
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
            component={HomeStack}
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
        </Tab.Navigator> */}
      {/* </NavigationContainer> */}
    </Provider>
  );
}

const styles = StyleSheet.create({
  tabBarLabel: {
    fontSize: 12,
    textAlign: "center",
  },
});
