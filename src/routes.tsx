import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import NetInfo from "@react-native-community/netinfo";
import analytics from "@react-native-firebase/analytics";

import ExploreScreen from "./modules/explore/Explore.screen";
import ArchiveScreen from "./modules/offline/archive.screen";
import { VideoScreen } from "./modules/video/video.screen";

const Tab = createBottomTabNavigator();

function Tabs() {
  const [connectionType, setConnectionType] = React.useState("");
  const [isConnected, setIsConnected] = React.useState(true);
  const [internetSpeed, setInternetSpeed] = React.useState(0);
  NetInfo.fetch().then((state) => {
    setConnectionType(state.type);
    setIsConnected(state.isConnected);
    setInternetSpeed(state.details?.downlink);
  });
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={isConnected ? "Explore" : "Archive"}
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
  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.current.getCurrentRoute().name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;

        if (previousRouteName !== currentRouteName) {
          await analytics().logScreenView({
            screen_name: currentRouteName,
            screen_class: currentRouteName,
          });
        }
        routeNameRef.current = currentRouteName;
      }}
    >
      <Stack.Navigator>
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="VideoView" component={VideoScreen} />
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
