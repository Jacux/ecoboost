import { StyleSheet, Text, View, Button } from "react-native";
import Heading from "./heading";

export default function Daily({ name }) {
  return (
    <View style={styles.container}>
      <Heading>Codzienne zadanie</Heading>
      <View style={styles.questContainer}>
        <Text style={styles.heading}>Codzienne Zadanie</Text>
        <Text style={styles.quest}>
          Nie wiem co tu dac oszczedzaj wode dzizecko drogie pls
        </Text>
        <View style={styles.buttonContainer}>
          <Button style={styles.button} title="Wykonałeś zadanie?"></Button>
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
    width: 40,
  },
});
