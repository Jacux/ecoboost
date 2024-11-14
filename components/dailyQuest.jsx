import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import Heading from "./heading";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import axios from "axios";

export default function Daily({}) {
  const [time, setTime] = useState("");
  const [finished, setFinished] = useState(null);

  const fetchData = async () => {
    if (axios.defaults.headers.common["Authorization"] == null) {
      return fetchData();
    }
    const response = await axios.get(
      "https://projekt-server.vercel.app/checkQuest"
    );

    setFinished(response.data.status);
  };

  const onClick = () => {
    if (!finished) {
      Alert.alert("Codzinnie Zadanie", "Czy wykonałeś codzienne zadanie?", [
        {
          text: "Nie",
          style: "cancel",
        },
        {
          text: "Tak",
          onPress: async () => {
            try {
              let response = await axios.post(
                "https://projekt-server.vercel.app/addDoneQuest"
              );
              console.log(response.data);
              fetchData();
            } catch (e) {
              console.error(e);
            }
          },
        },
      ]);
    }
  };

  const calculateTime = () => {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);

    const remainingTime = midnight - now;

    const hours = Math.floor(remainingTime / (1000 * 60 * 60));
    const minutes = Math.floor(
      (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(calculateTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Heading>Codzienne zadanie</Heading>
        <View style={styles.streak}>
          <Text style={styles.streakNumber}>2</Text>
          <FontAwesome5 name="fire-alt" size={12} color="#fff" />
        </View>
      </View>
      {finished === null ? (
        <ActivityIndicator style={styles.indicator} size="big" color="#000" />
      ) : (
        <View style={styles.questContainer}>
          <Text style={styles.heading}>
            {finished ? "Dziękujemy!" : " Codzienne Zadanie"}
          </Text>

          {finished ? (
            <Text style={styles.quest}>Jutro pojawi się nowe zadanie</Text>
          ) : (
            <Text style={styles.quest}>
              Nie wiem co tu dac oszczedzaj wode dzizecko drogie pls
            </Text>
          )}

          <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={onClick}>
              <Text style={styles.buttonText}>
                {finished ? "Zadanie Wykonane!" : "Wykonałeś zadanie?"}
              </Text>
            </Pressable>
            <View style={styles.timeContainer}>
              <AntDesign name="clockcircleo" size={24} color="black" />
              <Text style={styles.time}>{time}</Text>
            </View>
          </View>
        </View>
      )}
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
    borderRadius: 8,
    padding: 15,
    display: "flex",
    gap: 10,
    paddingVertical: 25,
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
    width: "auto",
    backgroundColor: "#1B1B1B",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
    padding: 15,
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
  timeContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  time: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  streak: {
    display: "flex",
    flexDirection: "row",
    gap: 3,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#1B1B1B",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  streakNumber: {
    color: "#fff",
    fontFamily: "Inter_700Bold",
    fontSize: 13,
  },
  indicator: {
    marginTop: 25,
  },
});
