import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, StatusBar as RNStatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

import ScanScreen from "./src/screens/Scan";
import HomeScreen from "./src/screens/Home";
import RegisterScreen from "./src/screens/Register";
import InputScreen from "./src/screens/InputScreen";
import BookListScreen from "./src/screens/Shelf";
import BookDetailScreen from "./src/screens/BookDetail";
import EditScreen from "./src/screens/Edit";

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <NavigationContainer>
        <RNStatusBar backgroundColor="#0ea5e9" barStyle="dark-content" />
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerStyle: {
                backgroundColor: "#7dd3fc",
              },
            }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={({ navigation }) => ({
              headerStyle: {
                backgroundColor: "#7dd3fc",
              },
              headerRight: () => (
                <Ionicons
                  name="home-outline"
                  size={24}
                  color="black"
                  style={{ marginRight: 16 }}
                  onPress={() => navigation.navigate("Home")}
                />
              ),
            })}
          />
          <Stack.Screen
            name="Shelf"
            component={BookListScreen}
            options={({ navigation }) => ({
              headerStyle: {
                backgroundColor: "#7dd3fc",
              },
              headerRight: () => (
                <Ionicons
                  name="home-outline"
                  size={24}
                  color="black"
                  style={{ marginRight: 16 }}
                  onPress={() => navigation.navigate("Home")}
                />
              ),
            })}
          />
          <Stack.Screen
            name="InputScreen"
            component={InputScreen}
            options={({ navigation }) => ({
              headerStyle: {
                backgroundColor: "#7dd3fc",
              },
              headerRight: () => (
                <Ionicons
                  name="home-outline"
                  size={24}
                  color="black"
                  style={{ marginRight: 16 }}
                  onPress={() => navigation.navigate("Home")}
                />
              ),
            })}
          />
          <Stack.Screen
            name="Scan"
            component={ScanScreen}
            options={({ navigation }) => ({
              headerStyle: {
                backgroundColor: "#7dd3fc",
              },
              headerRight: () => (
                <Ionicons
                  name="home-outline"
                  size={24}
                  color="black"
                  style={{ marginRight: 16 }}
                  onPress={() => navigation.navigate("Home")}
                />
              ),
            })}
          />
          <Stack.Screen
            name="BookDetail"
            component={BookDetailScreen}
            options={({ navigation }) => ({
              headerStyle: {
                backgroundColor: "#7dd3fc",
              },
              headerRight: () => (
                <Ionicons
                  name="home-outline"
                  size={24}
                  color="black"
                  style={{ marginRight: 16 }}
                  onPress={() => navigation.navigate("Home")}
                />
              ),
            })}
          />
          <Stack.Screen
            name="Edit"
            component={EditScreen}
            options={({ navigation }) => ({
              headerStyle: {
                backgroundColor: "#7dd3fc",
              },
              headerRight: () => (
                <Ionicons
                  name="home-outline"
                  size={24}
                  color="black"
                  style={{ marginRight: 16 }}
                  onPress={() => navigation.navigate("Home")}
                />
              ),
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
