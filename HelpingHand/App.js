import { MaterialIcons } from '@expo/vector-icons'; 
import { NavigationContainer } from "@react-navigation/native";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Home from './scr/screens/HomePage';
import MyActivty from './scr/screens/MyActivityPage';
import { Entypo } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 

export default function App(){
    const Tab = createBottomTabNavigator();
  return (
      <NavigationContainer>
        <Tab.Navigator screenOptions={{
          headerShown:false
        }}>
          <Tab.Screen name="Home" component={Home}   options={{
          tabBarIcon: () => (
            <Entypo name="home" color={'black'} size={26} />
          ),
        }}  />
          <Tab.Screen name="Menu" component={MyActivty}  options={{
          tabBarIcon: () => (
           <MaterialIcons name="restaurant-menu" size={26} color="black" />
          ),
        }} />
        </Tab.Navigator>
      </NavigationContainer>
  )
}