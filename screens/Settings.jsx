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

import Heading from "../components/heading";

import { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useAuth } from "../context/authContext";
import { Picker } from "@react-native-picker/picker";
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
          <Pressable style={styles.press} onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={22} color="black" />
          </Pressable>
          <Heading>Ustawienia</Heading>
        </View>
        <Heading>Twój Region</Heading>
        <Picker
          style={styles.picker}
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedLanguage("dg");
            Alert.alert(
              "Opcja Testowa",
              "Jest to jedynie prototyp tej opcji. Niestety obecnie jedynym regionem jest Dąbrowa Górnicza",
              [
                {
                  text: "Rozumiem",
                },
              ]
            );
          }}
        >
          <Picker.Item label="Dąbrowa Górnicza" value="dg" />
          <Picker.Item label="Sosnowiec" value="sos" />
        </Picker>
        <Pressable style={styles.button} onPress={onLogout}>
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
    backgroundColor: "#1B1B1B",
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
    backgroundColor: "#EDEDED",
    borderRadius: 6,
  },
  press: {
    paddingRight: 15,
    paddingBottom: 15,
    paddingTop: 15,
  },
});
