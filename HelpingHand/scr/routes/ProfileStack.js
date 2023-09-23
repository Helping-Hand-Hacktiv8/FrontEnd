import { createStackNavigator } from '@react-navigation/stack';
import ProfilePage from '../screens/ProfilePage';

const Stack = createStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfilePage"
        component={ProfilePage}
        options={{ title: 'Profile' }}
      />
    </Stack.Navigator>
  );
}
