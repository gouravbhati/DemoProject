import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// My App screens goes here
import Dashboard from '../screens/Dashboard';
import Spending from '../screens/Spending';

const Stack = createNativeStackNavigator();

// App Navigation and Header Define here
export default function AppNavigation() {
    return (
        <NavigationContainer >
            <Stack.Navigator screenOptions={{
                headerShown: false,
                gestureEnabled: true,
                animationTypeForReplace: 'push',
            }}>
                <Stack.Screen name="Home" component={Dashboard} />
                <Stack.Screen name="Spending" component={Spending} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}