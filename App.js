import { StatusBar } from 'expo-status-bar';

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ScanScreen from './src/screens/Scan';
import ViewScreen from './src/screens/View';
import HomeScreen from './src/screens/Home';
import RegisterScreen from './src/screens/Register';
import InputScreen from './src/screens/InputScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="InputScreen" component={InputScreen} />
        <Stack.Screen name="Scan" component={ScanScreen} />
        <Stack.Screen name="View" component={ViewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



