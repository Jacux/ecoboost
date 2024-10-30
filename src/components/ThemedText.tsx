import { Text, type TextProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function ThemedText({
  style,
  type = "default",
  ...rest
}: ThemedTextProps) {
  return (
    <Text
      style={[
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
  },
  poppinsThin: {
    fontFamily: "Poppins_100Thin",
  },
  poppinsExtraLight: {
    fontFamily: "Poppins_200ExtraLight",
  },
  poppinsLight: {
    fontFamily: "Poppins_300Light",
  },
  poppinsRegular: {
    fontFamily: "Poppins_400Regular",
  },
  poppinsMedium: {
    fontFamily: "Poppins_500Medium",
  },
  poppinsSemiBold: {
    fontFamily: "Poppins_600SemiBold",
  },
  poppinsBold: {
    fontFamily: "Poppins_700Bold",
  },
  poppinsExtraBold: {
    fontFamily: "Poppins_800ExtraBold",
  },
  poppinsBlack: {
    fontFamily: "Poppins_900Black",
  },
});
