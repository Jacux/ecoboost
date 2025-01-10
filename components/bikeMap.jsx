import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
import { PROVIDER_GOOGLE } from "react-native-maps";
import Heading from "./heading";

const BikeMap = () => {
  const [coords, setCoords] = useState(null);
  const [bikeCoordinates, setBikeCoordinates] = useState([]); // Store bike coordinates
  const [bikeCount, setCount] = useState(0);

  const fetchLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setCoords(location.coords);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
          "https://api-gateway.nextbike.pl/api/maps/service/zz/locations"
      );

      const cities = response.data[0]?.cities || [];
      let count = 0;

      const myLocation = cities.find(
          (city) => city.name === "Dąbrowa Górnicza (GZM)"
      );

      if (myLocation) {
        const places = myLocation.places;

        const newBikeCoordinates = [];
        places.forEach((place) => {
          place.bikes.forEach((bike) => {
            newBikeCoordinates.push({
              bikeNumber: bike.number,
              bikeType: bike.bikeType,
              lat: place.geoCoords.lat,
              lng: place.geoCoords.lng,
            });
          });

          count += place.bikes.length;
        });

        setBikeCoordinates(newBikeCoordinates);
        setCount(count);
      }
    } catch (error) {
      console.log("Error fetching bike data:", error);
    }
  };

  useEffect(() => {
    const fetchDataAsync = async () => {
      await fetchLocation();
      await fetchData();
    };

    fetchDataAsync();
  }, []);

  if (coords === null || bikeCoordinates.length === 0) {
    return <ActivityIndicator size="large" color="#1b1b1b" />;
  }

  return (
      <View style={styles.container}>
        <Heading>A może rower?</Heading>
        <Text style={styles.text}>
          Ponad {bikeCount} rowerów w twojej okolicy
        </Text>
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
        >
          {bikeCoordinates.map((bike) => (
              <Marker
                  key={bike.bikeNumber}
                  coordinate={{
                    latitude: bike.lat,
                    longitude: bike.lng,
                  }}
                  icon={require('@/assets/images/bicycle.png')}
                  title="Strefa Rowerowa"
                  tracksViewChanges={false}
              />


          ))}
        </MapView>
      </View>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingRight: 15,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  map: {
    width: "100%",
    height: 300,
    marginBottom: 50,
  },
};

export default BikeMap;
