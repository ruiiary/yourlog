import React from "react";
import { View, Text } from "react-native";
import { styles } from "../Styles";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function myPage() {
  return (
    <SafeAreaProvider>
      <SafeAreaView edges={["bottom"]}>
        <Text>myPage Screen</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
