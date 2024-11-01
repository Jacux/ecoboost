import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Image, Platform, ScrollView } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import { ThemedText } from "@/components/ThemedText";

export default function TabTwoScreen() {
  return (
    <ScrollView>
      <ThemedText> trst2</ThemedText>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
