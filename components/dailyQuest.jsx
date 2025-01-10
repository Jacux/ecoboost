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
import {useAuth} from "../context/authContext";
import {router} from "expo-router";

export default function Daily() {
  const {authState} = useAuth()
  const [time, setTime] = useState("");
  const [finished, setFinished] = useState(null);
  // Pobieranie danych z API
  const fetchData = async () => {
    try {
      if (!axios.defaults.headers.common["Authorization"]) {
        console.warn("Brak nagłówka Authorization. Sprawdź logikę autoryzacji.");

        return;
      }
      const response = await axios.get(
          "https://projekt-server-jacuxs-projects.vercel.app/checkQuest"
      );
      console.log("Dane z fetchData:", response.data);
      setFinished(response.data.status ?? false);
    } catch (error) {
      console.error("Błąd w fetchData:", error);
      Alert.alert("Błąd", "Nie udało się pobrać danych z serwera.");
    }
  };


  const onClick = () => {
    if (!finished) {
      Alert.alert("Codzienne Zadanie", "Czy wykonałeś codzienne zadanie?", [
        {
          text: "Nie",
          style: "cancel",
        },
        {
          text: "Tak",
          onPress: async () => {
            try {
              const response = await axios.post(
                  "https://projekt-server-jacuxs-projects.vercel.app/addDoneQuest"
              );
              console.log("Odpowiedź z addDoneQuest:", response.data);
              fetchData(); // Pobierz aktualne dane
            } catch (error) {
              console.error("Błąd w onClick:", error);
            }
          },
        },
      ]);
    }
  };

  // Obliczanie czasu do północy
  const calculateTime = () => {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);

    const remainingTime = Math.max(midnight - now, 0); // Zabezpieczenie przed wartością ujemną

    const hours = Math.floor(remainingTime / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  // Aktualizacja czasu co sekundę
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(calculateTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Pobieranie danych po zamontowaniu komponentu
  useEffect(() => {
    const fetchDataAsync = async () => {
      await fetchData();
    };
    setTime(fetchDataAsync, [1000]);
  }, [authState]);

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
            <ActivityIndicator style={styles.indicator} size="large" color="#000" />
        ) : (
            <View style={styles.questContainer}>
              <Text style={styles.heading}>
                {finished ? "Dziękujemy!" : "Codzienne Zadanie"}
              </Text>

              {finished ? (
                  <Text style={styles.quest}>Jutro pojawi się nowe zadanie</Text>
              ) : (
                  <Text style={styles.quest}>
                    Ogranicz spaliny. Do końca dnia nie używaj samochodu osobistego.
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
    backgroundColor: "#EDFCF2",
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
    color: "#444545",
    fontSize: 13,
    fontFamily: "Inter_500Medium",
  },
  button: {
    width: "auto",
    backgroundColor: "#16b364",
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
    backgroundColor: "#16b364",
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
