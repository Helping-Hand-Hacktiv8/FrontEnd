import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ChatListScreen from "../screens/ChatListScreen";
import ChatScreen from "../screens/ChatScreen";

export default function ChatStack() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name="ChatList" component={ChatListScreen} options={{
                headerShown: true,
                headerStyle: {
                    backgroundColor: '#3AAACF'
                },
                title: 'Chat List',
            }} />
            <Stack.Screen name="ChatScreen" component={ChatScreen} options={{
                headerShown: false,
                headerStatusBarHeight: 25
            }} />
        </Stack.Navigator>
    );
}
