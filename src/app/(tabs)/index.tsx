import { Image, StyleSheet, Platform } from "react-native";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Button from "@/components/button";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";

interface Quote {
  fact: string;
}

interface LocationData {
  coords: {
    latitude: number;
    longitude: number;
  };
}

export default function HomeScreen() {
  const [quote, setQuote] = useState<Quote>({ fact: "" });
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
        setQuote({ fact: JSON.stringify(data) });
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
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView>
        <ThemedText>{text}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
        <Button
          onPress={() => {
            if (location) {
              fetchData(location.coords.longitude, location.coords.latitude);
            }
          }}
          title="Request"
        />
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText>{quote.fact}</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
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
});
