import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    Text,
    View,
    Alert,
    ScrollView,
    Pressable,
    Modal,

} from "react-native";


import Header from "@/components/header";
import Forecast from "@/components/forecast";

import { useState, useEffect } from "react";
import Daily from "@/components/dailyQuest";
import BikeMap from "@/components/bikeMap";
import JWT from "expo-jwt";
import * as SecureStore from "expo-secure-store";
import { Dimensions } from "react-native";
import {useAuth} from "../context/authContext";
import {router} from "expo-router";
const windowWidth = Dimensions.get("window").width;

export default function Home() {
    const [modalVisible, setModalVisible] = useState(false);
    const [pollutionComponents, setPollutionComponents] = useState({});
    const {authState} = useAuth()




    const openModal = (PollutionData) => {
        setPollutionComponents(PollutionData);
        setModalVisible(true);
    };

    const [name, setName] = useState(null);
    useEffect(() => {
        const getTokenData = async () => {
            try {
                const token = await SecureStore.getItemAsync("my-jwt");
                if (token) {
                    let namee = JWT.decode(token, "filiptomegaczlowiek");
                    setName(namee.name);
                }
            } catch (error) {
                console.error("Error decoding token:", error);
                setTimeout(getTokenData, 1000)

            }
        };

        getTokenData();
    }, []);

    return (
        <ScrollView
            style={styles.background}
            overScrollMode="never"
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.container}>
                <Header name={name}/>
                <Forecast openModal={openModal} />
                <Daily/>
                <BikeMap />
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <View style={styles.pollution}>
                                    <Text style={styles.pollutionHeading}>
                                        Składniki Powietrza
                                    </Text>
                                    <Text style={styles.pollutionText}>
                                        CO: {pollutionComponents.co} μg/m³
                                    </Text>
                                    <Text style={styles.pollutionText}>
                                        NO: {pollutionComponents.no} μg/m³
                                    </Text>
                                    <Text style={styles.pollutionText}>
                                        NO<Text style={{ fontSize: 17, paddingTop: 2 }}>2</Text>:
                                        {pollutionComponents.no2} μg/m³
                                    </Text>
                                    <Text style={styles.pollutionText}>
                                        O<Text style={{ fontSize: 17, paddingTop: 2 }}>3</Text>:
                                        {pollutionComponents.o3} μg/m³
                                    </Text>
                                    <Text style={styles.pollutionText}>
                                        SO<Text style={{ fontSize: 17, paddingTop: 2 }}>2</Text>:
                                        {pollutionComponents.so2} μg/m3
                                    </Text>
                                    <Text style={styles.pollutionText}>
                                        PM<Text style={{ fontSize: 17, paddingTop: 2 }}>2.5</Text>:{" "}
                                        {pollutionComponents.pm2_5} μg/m³
                                    </Text>
                                    <Text style={styles.pollutionText}>
                                        PM
                                        <Text style={{ fontSize: 17, paddingTop: 2 }}>
                                            10
                                        </Text>: {pollutionComponents.pm10} μg/m³
                                    </Text>
                                    <Text style={styles.pollutionText}>
                                        NH<Text style={{ fontSize: 17, paddingTop: 2 }}>3</Text>:{" "}
                                        {pollutionComponents.nh3} μg/m³
                                    </Text>
                                </View>
                                <Pressable
                                    style={styles.button}
                                    onPress={() => setModalVisible(!modalVisible)}
                                >
                                    <Text style={styles.textStyle}>Zamknij</Text>
                                </Pressable>
                            </ScrollView>
                        </View>
                    </View>
                </Modal>

                <StatusBar style="auto"></StatusBar>
            </View>
        </ScrollView>
    );

}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        gap: 15,
        paddingLeft: 15,
    },
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    modalView: {
        width: "100%",
        backgroundColor: "white",

        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: "80%",
        display: "flex",
        justifyContent: "space-between",
    },
    button: {
        padding: 15,
        backgroundColor: "#888",
        borderRadius: 6,
        color: "#fff",
        textAlign: "center",
        marginVertical: 10,
    },

    textStyle: {
        fontSize: 16,
        fontFamily: "Inter_600SemiBold",
        textAlign: "center",
        color: "#fff",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
    largeText: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    smallText: {
        fontSize: 12,
        color: "#555",
        marginBottom: 5,
    },
    pollution: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
    },
    pollutionText: {
        width: '100%',
        fontFamily: "Inter_500Medium",
        fontSize: 16,
        marginBottom: 5,

        padding: 15,
        backgroundColor: "#16b364",
        borderRadius: 6,
        color: "#fff",
        textAlign: "center",
    },
    pollutionHeading: {
        fontSize: 24,
        fontFamily: "Inter_600SemiBold",
        textAlign: "center",
        marginBottom: 10,
    },
    modalContainer: {
        height: 10000,
    },
    background: {
        backgroundColor: "#fff",
    },
});
