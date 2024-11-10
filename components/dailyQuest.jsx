import { StyleSheet, Text, View, Button, Pressable } from "react-native";
import { useState, useEffect } from "react";
import Heading from "./heading";

export default function Daily({}) {
  const [time, setTime] = useState("");
  const calculateTime = () => {};

  useEffect(() => {
    setTimeout(() => {
      setTime("test");
    }, 1000);
  }, [time]);

  return (
    <View style={styles.container}>
      <Heading>Codzienne zadanie</Heading>
      <View style={styles.questContainer}>
        <Text style={styles.heading}>Codzienne Zadanie</Text>
        <Text style={styles.quest}>
          Nie wiem co tu dac oszczedzaj wode dzizecko drogie pls
        </Text>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Wykonałeś zadanie?</Text>
          </Pressable>
          <View style={styles.timeContainer}>
            {/* Ikona zegara*/}
            <Text style={styles.time}>{time}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingRight: 15,
  },
  questContainer: {
    marginTop: 10,
    backgroundColor: "#EDEDED",
    width: "100%",
    height: 180,
    borderRadius: 8,
    padding: 15,
    display: "flex",
    gap: 10,
  },
  heading: {
    color: "#2f2f2f",
    fontSize: 17,
    fontFamily: "Inter_600SemiBold",
  },
  quest: {
    color: "#888888",
    fontSize: 13,
    fontFamily: "Inter_500Medium",
  },
  button: {
    width: "50%",
    backgroundColor: "#1B1B1B",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
    padding: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "Inter_500Medium",
  },
  buttonContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
});
