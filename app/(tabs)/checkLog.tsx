import React, { useState, useEffect } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { styles } from "../Styles";
import { getLogs } from "../../localStorage/log";
import Tags from "../../components/common/Tags";

// 이미지 맵핑
const emotionMap: { [key: string]: any } = {
  happy: require("../../assets/images/emotions/happy.png"),
  sad: require("../../assets/images/emotions/sad.png"),
  love: require("../../assets/images/emotions/love.png"),
  angry: require("../../assets/images/emotions/angry.png"),
  surprised: require("../../assets/images/emotions/surprised.png"),
  star: require("../../assets/images/emotions/star.png"),
  question: require("../../assets/images/emotions/question.png"),
};

type Log = {
  text: string;
  emotion: string;
  tags: string[];
  image: string | null;
  date: string | null;
  letter: string;
};

export default function checkLog() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [expandedLogIndex, setExpandedLogIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchLogs = async () => {
      const storedLogs = await getLogs();

      const sortedLogs = storedLogs.sort((a, b) => {
        if (a.date && b.date) {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        return 0;
      });

      setLogs(storedLogs);
      console.log("저장된 로그(최신순):", storedLogs);
    };

    fetchLogs();
  }, []);

  const toggleLetterVisibility = (index: number) => {
    setExpandedLogIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F2F6F3" }}>
      <LinearGradient
        colors={["#FFF", "#F1F6F2"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.gradientContainer}
      />
      <View style={[styles.container, { backgroundColor: "#F2F6F3", flex: 1 }]}>
        <View style={styles.bigMargin} />
        <Text style={localStyles.title}>yourlog</Text>
        <FlatList
          data={logs}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={localStyles.logItem}>
              {item.emotion && emotionMap[item.emotion] && (
                <Image
                  source={emotionMap[item.emotion]}
                  style={localStyles.emotionImage}
                />
              )}
              <Text>{item.text}</Text>
              <View style={styles.margin} />
              {item.tags && item.tags.length > 0 ? (
                <Tags tagslist={item.tags} />
              ) : (
                <Text style={{ color: "#5c5c5c" }}>태그가 없습니다.</Text>
              )}

              <View style={localStyles.margin} />
              <Text style={localStyles.dateText}>{item.date}</Text>
              <TouchableOpacity
                onPress={() => toggleLetterVisibility(index)}
                style={localStyles.toggleButton}
              >
                <Text style={localStyles.toggleButtonText}>
                  {expandedLogIndex === index ? "편지 닫기" : "편지 보기"}
                </Text>
              </TouchableOpacity>
              {expandedLogIndex === index && (
                <View style={localStyles.letterContainer}>
                  <Text style={localStyles.letterText}>{item.letter}</Text>
                </View>
              )}
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 20 }} // Additional padding
        />
        <View style={styles.bigMargin} />
      </View>
    </View>
  );
}

const localStyles = StyleSheet.create({
  margin: {
    height: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#3c7960",
  },
  logItem: {
    padding: 18,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  toggleButton: {
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#3c7960",
    borderRadius: 5,
  },
  toggleButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  letterContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  letterText: {
    fontSize: 14,
    color: "#4a4a4a",
  },
  emotionImage: {
    width: 40, // 적절한 크기 지정
    height: 40,
    marginBottom: 10,
  },
  dateText: {
    color: "#5c5c5c",
    fontSize: 12,
    textAlign: "right",
  },
});
