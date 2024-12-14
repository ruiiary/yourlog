import { StyleSheet, Image, Platform, View, Text } from "react-native";
import { styles } from "./Styles";

export default function TabThreeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.margin} />
      <Text style={styles.bigText}>yourlog</Text>
    </View>
  );
}

const localStyles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
