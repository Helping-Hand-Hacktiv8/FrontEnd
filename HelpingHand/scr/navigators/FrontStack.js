import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/LoginPage";
import Register from "../screens/RegisterPage";

const Stack = createStackNavigator()

export default function MainStack(){
    return(
    <Stack.Navigator
        screenOptions={{
            headerShown: true,
        }}
    >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        
        
        
    </Stack.Navigator>
    )
}




