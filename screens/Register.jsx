import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Pressable,
} from "react-native";
import { useState } from "react";
import { useAuth } from "../context/authContext";

export default function Login({ navigation }) {
  const { onLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [passsword, setPassword] = useState("");

  const login = () => {
    if (passsword != "" && email != "") {
      console.log(onLogin(email, passsword));
    }
  };
  return (
    <View style={styles.container}>
      {/*Tu bedzie logo*/}
      <Text>EcoBoost</Text>
      <TextInput
        style={styles.input}
        maxLength={255}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
      ></TextInput>
      <TextInput
        style={styles.input}
        maxLength={255}
        placeholder="Hasło"
        onChangeText={(text) => setPassword(text)}
      ></TextInput>

      <Button onPress={login} title="Zarejestruj się"></Button>
      <Pressable onPress={() => navigation.replace("login")}>
        <Text>Zaloguj się</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "80%",
  },
});
