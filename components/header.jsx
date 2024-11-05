import { StyleSheet, Text, View } from "react-native";

export default function Header({ name }) {
  return (
    <View>
      <Text style={styles.helloMessage}>Witaj {name}👋</Text>
      <Text style={styles.description}>Gotowy odmienić świat?</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  helloMessage: {
    color: "#2f2f2f",
    fontSize: 25,
  },
  description: {
    color: "#888888",
    fontSize: 15,
  },
});
