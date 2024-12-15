import { View, Text, StyleSheet } from "react-native";
import { styles } from "../Styles";
import React, { useState } from "react";
import CalendarPicker from "react-native-calendar-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WritingEntryButton from "@/components/common/WritingEntryButton";
import { LinearGradient } from "expo-linear-gradient";
import { OPENAI_API_KEY } from "@env";

export default function HomeScreen() {
  const [name, setName] = useState("초기");
  const [date, setDate] = useState("");
  const [date1, setDate1] = useState("");
  
  if (!OPENAI_API_KEY) {
    console.error("API key is undefined. Check your .env configuration.");
  } else {
    console.log("Loaded API Key:", OPENAI_API_KEY);
  }

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
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={["#FFF", "#F1F6F2"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.gradientContainer}
      ></LinearGradient>
      <View style={[styles.container, { backgroundColor: "#F2F6F3", flex: 1 }]}>
        <View style={styles.margin} />
        <Text style={styles.logo}>yourlog</Text>
        <Text style={styles.bigText}>{name}님의 성장을 응원합니다.</Text>
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
    </View>
  );
}

const localStyles = StyleSheet.create({
  dateText: { fontSize: 20, marginVertical: 10 },
});
