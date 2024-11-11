import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Heading from "./heading";
import { Dimensions } from "react-native";
import axios from "axios";

import * as Location from "expo-location";
import { useState, useEffect } from "react";
const windowWidth = Dimensions.get("window").width;
import aqiLevels from "../constant/aqiLevels";
import AntDesign from "@expo/vector-icons/AntDesign";
export default function Forecast() {
  const [location, setLocation] = useState(null);
  const [ready, setIsReady] = useState(false);
  const [errorMessage, setError] = useState(null);
  const [forecastData, setForecastData] = useState([]);

  const fetchData = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setError("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});

    let coords = location.coords;
    const pollutionUrl = `http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${coords.latitude}&lon=${coords.longitude}&appid=c90f2c2db18c785adf50d710a3441904`;
    const forecastApi = `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&hourly=temperature_2m&timezone=Europe%2FBerlin&forecast_days=1`;
    console.log(forecastApi);
    try {
      const pollution = await axios.get(pollutionUrl);
      const forecast = await axios.get(forecastApi);
      setIsReady(true);
      const date = new Date();
      date.setHours(date.getHours() + 1);
      const today = date.toDateString();

      const todayPollution = pollution.data.list.filter((item) => {
        const itemDate = new Date(item.dt * 1000);
        let hour = itemDate.getHours();

        return itemDate.toDateString() === today && hour >= date.getHours();
      });

      const newData = todayPollution.map((item) => {
        const tempDate = new Date(item.dt * 1000).toISOString().slice(0, 16);

        for (let i = 0; i < forecast.data.hourly.time.length; i++) {
          if (tempDate == forecast.data.hourly.time[i]) {
            return {
              ...item,
              temp: Math.round(forecast.data.hourly.temperature_2m[i]),
            };
          }
        }
      });

      setForecastData(newData);
    } catch (error) {
      console.error("Error fetching solar data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  if (errorMessage) {
    return (
      <View style={styles.container}>
        <Heading>Sprawdź czym oddychasz</Heading>
        <Text>{errorMessage}</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Heading>Sprawdź czym oddychasz</Heading>
        {ready ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.forecast}>
              {forecastData.map((item, index) => {
                const date = new Date(item.dt * 1000);
                const formattedDate = date.toLocaleDateString("pl-PL", {
                  day: "numeric",
                  month: "long",
                  hour: "2-digit",
                  minute: "2-digit",
                });

                const aqi = aqiLevels[item.main.aqi - 1];

                return (
                  <View key={index} style={styles.forecastContainer}>
                    <View style={styles.forecastHeader}>
                      <AntDesign name="calendar" size={24} color="black" />
                      <Text style={styles.date}>{formattedDate}</Text>
                    </View>
                    <View style={styles.forecastData}>
                      <Text style={styles.temperature}>
                        {item.temp + "°C" || "błąd"}
                      </Text>
                      <Text style={styles.forecastText}>Stan powietrza:</Text>
                      <Text style={styles.forecastCondition}>{aqi}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        ) : (
          <ActivityIndicator size="small" color="#0000ff" />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },

  forecastContainer: {
    width: windowWidth * 0.5,
    backgroundColor: "#EDEDED",
    height: 170,
    borderRadius: 6,
    padding: 10,
    display: "flex",
    justifyContent: "space-between",
  },
  forecastHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  forecast: {
    display: "flex",
    flexDirection: "row",
    gap: 15,
    paddingRight: 15,
  },
  temperature: {
    fontFamily: "Inter_700Bold",
    fontSize: 20,
  },
  forecastText: {
    fontSize: 14,
    color: "#888888",
    fontFamily: "Inter_500Medium",
  },
  forecastCondition: {
    padding: 10,
    display: "flex",
    width: "100%",
    backgroundColor: "#1B1B1B",
    textAlign: "center",
    borderRadius: 7,
    color: "#fff",
    fontSize: 14,
    fontFamily: "Inter_500Medium",
  },
  forecastData: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  date: {
    fontFamily: "Inter_600SemiBold",
  },
});
