import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import {router, Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
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
import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthProvider, useAuth } from "@/context/authContext";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const { authState, onLogout } = useAuth();
  const [loaded, error] = useFonts({
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
    if (loaded || error && authState) {
      SplashScreen.hideAsync();

    }
  }, [loaded, error, authState]);

  if (!loaded && !error) {
    return null;
  }


  return (
      <AuthProvider>
      <Stack    screenOptions={{
        headerShown: false,
      }}>
        {authState?.authenticated ? (
            <>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="settings" options={{ headerShown: false }} />
            </>
        ) : (
            <>
              <Stack.Screen name="login" options={{ headerShown: false }} />
              <Stack.Screen name="register" options={{ headerShown: false }} />
            </>
        )}




        <Stack.Screen name="+not-found" />
      </Stack>

    </AuthProvider>
  );
}
