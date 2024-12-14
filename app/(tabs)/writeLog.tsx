import { StyleSheet, Image, Platform, View, Text } from "react-native";
import { styles } from "./Styles";

export default function TabThreeScreen() {
  return (
    <View style={styles.container}>
      <Text>writingPage </Text>
    </View>
  );
}

const localStyles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
