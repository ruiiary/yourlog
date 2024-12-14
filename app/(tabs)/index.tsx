import { View, Text, StyleSheet } from "react-native";
import { styles } from "./Styles";
import { useState } from "react";
import CalendarPicker from "react-native-calendar-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WritingEntryButton from "@/components/common/WritingEntryButton";

export default function HomeScreen() {
  const [name, setName] = useState("초기");
  const [date, setDate] = useState("");
  const [date1, setDate1] = useState("");

  async function onDateChange(d: Date) {
    console.log(d.getFullYear(), d.getMonth(), d.getDate());

    var key =
      d.getFullYear().toString() +
      (d.getMonth() + 1).toString().padStart(2, "0") +
      d.getDate().toString().padStart(2, "0");

    setDate(key);
    setDate1(d.toDateString());

    var value = await AsyncStorage.getItem(key);
    console.log(value || "No data for selected date");
  }

  return (
    <View style={styles.container}>
      <View style={styles.margin} />
      <Text style={styles.logo}>yourlog</Text>
      <Text style={styles.bigText}>{name}님의 성장을 응원합니다.</Text>
      <View style={styles.margin} />
      <View style={styles.margin} />
      <CalendarPicker onDateChange={onDateChange} />
      {date && (
        <Text style={localStyles.dateText}>Selected Date Key: {date}</Text>
      )}
      {date1 && (
        <Text style={localStyles.dateText}>Formatted Date: {date1}</Text>
      )}
      <WritingEntryButton />
    </View>
  );
}

const localStyles = StyleSheet.create({
  dateText: { fontSize: 20, marginVertical: 10 },
});
