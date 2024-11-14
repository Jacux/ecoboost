import {
  StyleSheet,
  Text,
  View,
  Button,
  Pressable,
  ActivityIndicator,
} from "react-native";

import { useState, useEffect } from "react";
import Heading from "./heading";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { UrlTile } from "react-native-maps";
export default function BikeMap({}) {
  const [coords, setCoords] = useState(null);

  const fetchLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setError("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    let coords = location.coords;
    console.log(coords);
    setCoords(coords);
  };

  const fetchData = async () => {
    const locations = await axios.get(
      "https://api-gateway.nextbike.pl/api/maps/service/zz/locations"
    )[0];
    const myLocations = locations.cities.find((element) => {
      element.name == "Dąbrowa Górnicza (GZM)";
    });
    console.log(myLocations);
  };

  useEffect(() => {
    fetchLocation();
    fetchData();
  }, []);
  return (
    <View style={styles.container}>
      <Heading>A może rower?</Heading>
      <Text style={styles.text}>Ponad 210 rowerów w twojej okolicy</Text>
      {coords !== null ? (
        <MapView
          showsUserLocation={true}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        ></MapView>
      ) : (
        <ActivityIndicator size="big" color="#1b1b1b"></ActivityIndicator>
      )}
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
    marginTop: 20,
  },
});
