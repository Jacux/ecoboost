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

export default function Register({ navigation }) {
  const { onRegister } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setError] = useState(null);

  const login = async () => {
    if (password != "" && email != "") {
      await onRegister(name, email, password);
      setError(null);
    } else {
      setError("Pola muszą być wypełnione");
    }
  };
  return (
    <View style={styles.container}>
      <Text>EcoBoost</Text>
      <TextInput
        style={styles.input}
        maxLength={255}
        value={name}
        placeholder="Imię"
        onChangeText={(text) => setName(text)}
      ></TextInput>
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
        value={password}
        placeholder="Hasło"
        onChangeText={(text) => setPassword(text)}
      ></TextInput>
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <Pressable style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Zarejestruj się</Text>
      </Pressable>
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
