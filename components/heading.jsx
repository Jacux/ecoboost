import { StyleSheet, Text } from "react-native";

export default function Heading({ children }) {
  return <Text style={styles.heading}>{children}</Text>;
}

const styles = StyleSheet.create({
  heading: {
    color: "2f2f2f",
    fontSize: 17,
    fontFamily: "Inter_600SemiBold",
  },
});
