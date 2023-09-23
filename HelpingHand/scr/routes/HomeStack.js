import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/HomePage";
import Register from "../screens/RegisterPage";
import Login from "../screens/LoginPage";




const Stack = createStackNavigator()
export default function HomeStack(){
    return(

    <Stack.Navigator screenOptions={{
        headerShown:true
    }} >
        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name="Register" component={Register}/>
        <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
    )

 
}