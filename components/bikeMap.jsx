import { StyleSheet, Text, View, Button, Pressable } from "react-native";
import { useState, useEffect } from "react";
import Heading from "./heading";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { UrlTile } from "react-native-maps";
export default function BikeMap({}) {
  const [time, setTime] = useState("");
  const calculateTime = () => {};

  useEffect(() => {
    setTimeout(() => {
      setTime("test");
    }, 1000);
  }, [time]);

  return (
    <View style={styles.container}>
      <Heading>A może rower?</Heading>
      <Text style={styles.text}>Ponad 210 rowerów w twojej okolicy</Text>

      <MapView
        style={({ flex: 1 }, styles.map)}
        initialRegion={{
          latitude: 50.1124,
          longitude: 18.9972,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        mapType="none"
      >
        <UrlTile
          urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maximumZ={19}
          tileSize={256}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    paddingRight: 15,
    marginBottom: 100,
  },
  text: {
    color: "#888888",
    fontSize: 14,
    fontFamily: "Inter_500Medium",
  },
  map: {
    width: "100%",
    height: 200,
  },
});
