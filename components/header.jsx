import { StyleSheet, Text, View, Pressable } from "react-native";

import Feather from "@expo/vector-icons/Feather";
import { useEffect, useState } from "react";
export default function Header({ name, navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.flex}>
        <Text style={styles.helloMessage}>Witaj {name}👋</Text>
        <Pressable
          style={styles.press}
          onPress={() => navigation.navigate("settings")}
        >
          <Feather name="settings" size={24} color="black" />
        </Pressable>
      </View>
      <Text style={styles.description}>Gotowy odmienić świat?</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  helloMessage: {
    color: "#2f2f2f",
    fontSize: 25,
    fontFamily: "Inter_600SemiBold",
  },
  description: {
    color: "#888888",
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
  },
  press: {
    padding: 20,
  },
});
