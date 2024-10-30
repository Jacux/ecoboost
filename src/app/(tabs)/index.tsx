import { Image, StyleSheet, Platform, ScrollView, Text } from "react-native";

import { ThemedText } from "@/components/ThemedText";

import Button from "@/components/button";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";

interface LocationData {
  coords: {
    latitude: number;
    longitude: number;
  };
}

export default function HomeScreen() {
  const [quote, setQuote] = useState<object | null>(null);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const options = {
    method: "GET",
  };

  const fetchData = (lon: number, lat: number) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=4f5c338f198ca7bbd85c59a1069f3c23`,
      options
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setQuote(data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location as LocationData);

      fetchData(location.coords.longitude, location.coords.latitude);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <ScrollView style={{ backgroundColor: "F5F6FC" }}>
      <Text style={[styles.text, styles.text2]}>{JSON.stringify(quote)}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  text: {
    color: "red",
  },
  text2: {
    fontSize: 15,
  },
});
