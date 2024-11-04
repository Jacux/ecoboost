import { Text, View } from "react-native";
import { Stack } from "expo-router";
import { AuthProvider, useAuth } from "@/context/authContext";
import { NavigationContainer } from "@react-navigation/native";

export default function Index() {
  const { authState } = useAuth();
  return (
    <AuthProvider>
      <Stack>
        {authState?.authenticated ? (
          <Stack.Screen name="home" component={HomeScreen} />
        ) : (
          <Stack.Screen name="auth/login" component={LoginScreen} />
        )}
      </Stack>
    </AuthProvider>
  );
}

// Example screen components
function HomeScreen() {
  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  );
}

function LoginScreen() {
  return (
    <View>
      <Text>Login Screen</Text>
    </View>
  );
}
