import { StatusBar } from 'expo-status-bar';

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ScanScreen from './src/screens/Scan';
import HomeScreen from './src/screens/Home';
import RegisterScreen from './src/screens/Register';
import InputScreen from './src/screens/InputScreen';
import BookListScreen from './src/screens/Shelf';
import BookDetailScreen from './src/screens/BookDetail';
import EditScreen from './src/screens/Edit';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Shelf" component={BookListScreen} />
        <Stack.Screen name="InputScreen" component={InputScreen} />
        <Stack.Screen name="Scan" component={ScanScreen} />
        <Stack.Screen name="BookDetail" component={BookDetailScreen} />
        <Stack.Screen name="Edit" component={EditScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



