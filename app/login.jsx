import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Pressable,
} from "react-native";
import { useState, useRef } from "react";
import { useAuth } from "@/context/authContext";
import {router} from "expo-router";

export default function Login({ navigation }) {
  const { onLogin, authState } = useAuth();
  const [email, setEmail] = useState("");
  const [passsword, setPassword] = useState("");
  const [errorMessage, setError] = useState(null);
  const canClick = useRef(true);
  const login = async () => {

    if (!canClick.current) return;
    console.log("click");
    canClick.current = false;
    if (passsword != "" && email != "") {
      let response = await onLogin(email, passsword);
      console.log(response);
      if (response.status == false) {
        setError(response.message);
        canClick.current = true;
      } else {
        canClick.current = true
        router.push("/");
      }
    } else {
      setError("Pola muszą być wypełnione");
    }
  };
  return (
    <View style={styles.container}>
      {/*Tu bedzie logo*/}
      <Text>EcoBoost</Text>
      <TextInput
        style={styles.input}
        maxLength={255}
        value={email}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
      ></TextInput>
      <TextInput
        style={styles.input}
        maxLength={255}
        value={passsword}
        placeholder="Hasło"
        onChangeText={(text) => setPassword(text)}
      ></TextInput>
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <Pressable style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Zaloguj się</Text>
      </Pressable>
      <Pressable onPress={() => router.push('/register')}>
        <Text>Zarejestruj się</Text>
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
    margin: 6,
    borderWidth: 2,
    padding: 10,
    width: "80%",
    borderRadius: 6,
  },
  button: {
    width: "80%",
    backgroundColor: "#16b364",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
    padding: 12,

    marginVertical: 10,
  },
  buttonText: {
    fontSize: 14,
    color: "#fff",
    fontFamily: "Inter_500Medium",
  },
  error: {
    color: "#f00",
  },
});
