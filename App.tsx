import "react-native-gesture-handler";
import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Routes from "./src/routes";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "styled-components";
import NetInfo from "@react-native-community/netinfo";
import { theme } from "./src/theme";

const queryClient = new QueryClient();

const WarningComponent = () => {
  return (
    <View
      style={{
        backgroundColor: "#333333",
        flex: 1,
        height: 50,
        left: 0,
        right: 0,
        position: "absolute",
        top: 0,
      }}
    >
      <Text style={{ color: "white", textAlign: "center", marginTop: 20 }}>
        Você está sem internet
      </Text>
    </View>
  );
};

export default function App() {
  const [isConnected, setIsConnected] = React.useState(true);

  React.useEffect(() => {
    NetInfo.fetch().then((state) => {
      setIsConnected(state.isConnected);
    });

    NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Routes />
        {!isConnected && <WarningComponent />}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
