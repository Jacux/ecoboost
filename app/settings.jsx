import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Button,
  ScrollView,
  Pressable,
  Modal,
  SafeAreaView,
} from "react-native";

import Heading from "@/components/heading";

import { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

import { useAuth } from "@/context/authContext";

import {router} from "expo-router";
export default function Settings({ navigation }) {
  const { onLogout } = useAuth();
  const [selectedLanguage, setSelectedLanguage] = useState("dg");
  return (
    <ScrollView
      style={styles.background}
      overScrollMode="never"
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable style={styles.press} onPress={() => router.back()}>
            <AntDesign name="arrowleft" size={22} color="black" />
          </Pressable>
          <Heading>Ustawienia</Heading>
        </View>


        <Pressable style={styles.button} onPress={() => {
          onLogout();
          router.push('/register')}}>
          <Text style={styles.buttonText}>Wyloguj się</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    display: "flex",
    gap: 15,
    flexDirection: "column",
    padding: 15,
  },
  background: {
    height: "100%",
    backgroundColor: "#fff",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  button: {
    width: "100%",
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
  picker: {
    width: "100%",
    backgroundColor: "#EDFCF2",
    borderRadius: 6,
  },
  press: {
    paddingRight: 15,
    paddingBottom: 15,
    paddingTop: 15,
  },
});
