import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { LoginScreen } from './src/components/auth/loginScreen';
import { SignInScreen } from './src/components/auth/SignInScreen';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          name="SignUp"
          component={SignInScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
