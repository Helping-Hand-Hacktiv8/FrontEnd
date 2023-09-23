import { NavigationContainer } from "@react-navigation/native";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Home from "./scr/screens/HomePage";
import MyActivty from "./scr/screens/MyActivityPage";
import { Entypo } from '@expo/vector-icons'; 
import CustomHeader from "./scr/components/CustomHeader";
import HomeStack from "./scr/routes/HomeStack";




export default function App(){
    const Tab = createBottomTabNavigator();
  return (
      <NavigationContainer>
        <Tab.Navigator screenOptions={{
          headerShown:false
        }}>
          <Tab.Screen name="HomeStack" component={HomeStack}  
          options={{
            title:"Home",
          tabBarIcon: () => (
            <Entypo name="home" color={'black'} size={26} />
          ),
          
        }} 
        />
          <Tab.Screen name="MyActivity" component={HomeStack}  options={{
        }} />
          <Tab.Screen name="RewardStack" component={HomeStack}  options={{
        }} />
          <Tab.Screen name="ProfileStack" component={HomeStack}  options={{
        }} />
        </Tab.Navigator>
      </NavigationContainer>
  )
}