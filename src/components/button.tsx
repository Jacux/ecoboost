import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";

interface Props {
  onPress: () => void;
  title?: string; // making title optional for the default value to work
}

const Button: React.FC<Props> = ({ onPress, title = "Save" }) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: "#20232a",
    backgroundColor: "none",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
  },
});

export default Button;
