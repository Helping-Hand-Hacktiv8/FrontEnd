import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/HomePage";
import Register from "../screens/RegisterPage";



const Stack = createStackNavigator()
export default function HomeStack(){
    return(

    <Stack.Navigator screenOptions={{
        headerShown:true
    }} >
        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name="Register" component={Register}/>
    </Stack.Navigator>
    )

 
}