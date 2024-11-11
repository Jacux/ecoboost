import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { AuthProvider, useAuth } from "./context/authContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import * as SplashScreen from "expo-splash-screen";
import Settings from "./screens/Settings";
import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import { useEffect } from "react";

export default function App() {
  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  );
}

const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();
const Layout = () => {
  const { authState, onLogout } = useAuth();

  let [loaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        //initialRouteName="register"
        screenOptions={{
          headerShown: false,
        }}
      >
        {!authState?.authenticated ? (
          <>
            <Stack.Screen name="home" component={Home} />
            <Stack.Screen name="settings" component={Settings} />
          </>
        ) : (
          <>
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="register" component={Register} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
