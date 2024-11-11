import { StyleSheet, Text, View } from "react-native";

export default function Header({ name }) {
  return (
    <View style={styles.container}>
      <Text style={styles.helloMessage}>Witaj {name}👋</Text>
      <Text style={styles.description}>Gotowy odmienić świat?</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  helloMessage: {
    color: "#2f2f2f",
    fontSize: 25,
    fontFamily: "Inter_600SemiBold",
  },
  description: {
    color: "#888888",
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
  },
});
