import { Link, Stack } from "expo-router";
import { useState } from "react";
import { Image, Text, View, StyleSheet, Button } from "react-native";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  return (
    <View style={styles.container}>
      <Text>test</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 50,
    height: 50,
  },
});

export default Login;
