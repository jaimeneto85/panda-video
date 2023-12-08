import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";

function ExploreScreen() {
  return (
    <View style={layout.container}>
      <Text>Explore</Text>
    </View>
  );
}

function ArchiveScreen() {
  return (
    <View style={layout.container}>
      <Text>Archive</Text>
    </View>
  );
}

function VideoViewScreen() {
  return (
    <View style={layout.container}>
      <Text>VideoView</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="compass-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Archive"
        component={ArchiveScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="download-cloud" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

function GeneralStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="VideoView" component={VideoViewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default GeneralStack;

const layout = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
