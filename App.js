import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { AuthProvider, useAuth } from "./context/authContext";
import Home from "./screens/Home";
import Login from "./screens/Login";

export default function App() {
  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  );
}

const Layout = () => {
  const { authState, onLogout } = useAuth();
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f4511e",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      {authState?.authenticated ? (
        <Stack.Screen
          name="home"
          component={Home}
          options={{
            headerRight: () => (
              <Button title="Wyloguj się" onPress={onLogout}></Button>
            ),
          }}
        />
      ) : (
        <Stack.Screen name="home" component={Login} />
      )}
    </Stack>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
