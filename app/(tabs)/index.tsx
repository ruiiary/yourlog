import {
  Image,
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { styles } from "../Styles";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WritingEntryButton from "@/components/common/WritingEntryButton";
import { LinearGradient } from "expo-linear-gradient";
import { Calendar, DateData } from "react-native-calendars";
import { useRouter } from "expo-router";
import { useLogContext } from "../../context/LogContext";

export default function HomeScreen() {
  const [name, setName] = useState("윤서");
  const { setDate } = useLogContext();

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [markedDates, setMarkedDates] = useState<{ [date: string]: any }>({});

  const fetchLogDates = async () => {
    try {
      const storedLogs = await AsyncStorage.getItem("logs");
      const logDates = storedLogs ? JSON.parse(storedLogs) : [];
      const marked: { [date: string]: any } = {};

      logDates.forEach((dateKey: string) => {
        const formattedDate = `${dateKey.slice(0, 4)}-${dateKey.slice(
          4,
          6,
        )}-${dateKey.slice(6, 8)}`;
        marked[formattedDate] = true;
      });

      setMarkedDates(marked);
    } catch (error) {
      console.error("Error fetching log dates:", error);
    }
  };

  useEffect(() => {
    fetchLogDates();
  }, []);

  const handleDayPress = async (day: DateData) => {
    setLoading(true);
    const selectedDateKey = day.dateString.replace(/-/g, "");
    setDate(day.dateString);

    try {
      const selectedLog = await AsyncStorage.getItem(selectedDateKey);
      if (selectedLog) {
        router.push("/checkLog");
      } else {
        router.push("/writeLog");
      }
    } catch (error) {
      Alert.alert("오류", "선택한 날짜의 데이터를 확인할 수 없습니다.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={localStyles.loaderContainer}>
        <ActivityIndicator size="large" color="#3c7960" />
        <Text style={localStyles.loaderText}>확인 중...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#F2F6F3" }}>
      <LinearGradient
        colors={["#FFF", "#F1F6F2"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.gradientContainer}
      />
      <View style={styles.bigMargin}></View>
      <View style={[styles.container, { backgroundColor: "#F2F6F3", flex: 1 }]}>
        <View style={styles.margin} />
        <Text style={styles.logo}>yourlog</Text>
        <Text style={styles.bigText}>{name}님의 성장을 응원합니다.</Text>
        <View style={styles.bigMargin} />

        <View style={localStyles.calendarWrapper}>
          <Calendar
            firstDay={1}
            monthFormat={"yyyy년 MM월"}
            current={new Date().toISOString().split("T")[0]}
            maxDate={new Date().toISOString().split("T")[0]}
            onDayPress={handleDayPress}
            markingType={"custom"}
            theme={{
              todayTextColor: "#3c7960",
              arrowColor: "#3c7960",
              textMonthFontWeight: "bold",
              textMonthFontSize: 18,
              monthTextColor: "#3c7960",
            }}
            dayComponent={({ date, state }) => {
              const isMarked = !!markedDates[date.dateString];

              return (
                <View style={{ alignItems: "center" }}>
                  <Text
                    style={{
                      color: state === "disabled" ? "#d9e1e8" : "#2d4150",
                      fontWeight: "normal",
                    }}
                  >
                    {date.day}
                  </Text>
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      marginTop: 6,
                      marginBottom: 3,
                      borderRadius: 6,
                      backgroundColor: isMarked ? "#A5CBBC" : "#e0e0e0",
                    }}
                  />
                </View>
              );
            }}
          />
        </View>

        {loading && (
          <ActivityIndicator
            size="large"
            color="#3c7960"
            style={localStyles.loader}
          />
        )}
        <Image
          source={require("../../assets/images/letter_picture.png")}
          style={localStyles.SubImage}
        />
        <WritingEntryButton />
      </View>
    </View>
  );
}

const localStyles = StyleSheet.create({
  SubImage: { width: 80, height: 100, left: 10, top: 45 },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2F6F3",
  },
  loaderText: {
    marginTop: 16,
    fontSize: 16,
    color: "#3c7960",
  },
  loader: {
    marginTop: 20,
  },
  calendarWrapper: {
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "white",
    paddingBottom: 12,
    paddingTop: 5,
  },
});
