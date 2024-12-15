import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { styles } from "../Styles";
import {
  love,
  happy,
  sad,
  angry,
  surprised,
  star,
  question,
} from "../../assets/images/emotions";
import XUndoButton from "../../components/common/XUndoButton";
import TextEntryButton from "@/components/writeLog/TextEntryButton";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useLogContext } from "../../context/LogContext";

export default function TabThreeScreen() {
  const router = useRouter();
  const { text, setText } = useLogContext();
  const { emotion, setEmotion } = useLogContext();
  const { image, setImage } = useLogContext();
  const { tags, setTags } = useLogContext();

  const [selectedEmotion, setSelectedEmotion] = useState("");

  //const isReadyToSubmit = text && emotion && tags && tags.length > 0;
  const handleEmotionClick = (emotion: string) => {
    console.log(emotion);
    setEmotion(emotion);
    setSelectedEmotion(emotion);
  };

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
        <XUndoButton />
        <View style={styles.margin} />

        <Text style={styles.bigText}>오늘의 도약을 기록해 주세요.</Text>
        <Text style={styles.subTitle}>오늘의 감정</Text>
        <View style={localStyles.EmotionBox}>
          {[
            { source: love, key: "love" },
            { source: happy, key: "happy" },
            { source: sad, key: "sad" },
            { source: angry, key: "angry" },
            { source: surprised, key: "surprised" },
            { source: star, key: "star" },
            { source: question, key: "question" },
          ].map((item) => (
            <TouchableOpacity
              key={item.key}
              style={[
                localStyles.EmotionBtn,
                selectedEmotion === item.key && localStyles.selectedEmotionBtn,
              ]}
              onPress={() => handleEmotionClick(item.key)}
            >
              <Image style={localStyles.EmotionImage} source={item.source} />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.subTitle}>오늘의 회고</Text>
        <TextEntryButton onPress={() => router.push("/writing-page")}>
          <Text>{text ? text : "오늘의 성장을 기록해 주세요."}</Text>
        </TextEntryButton>
        <Text style={styles.subTitle}>회고 태그</Text>
      </View>
    </View>
  );
}

const localStyles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  EmotionImage: {
    width: 32,
    height: 32,
  },
  EmotionBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 3,
    marginRight: 8,
    marginBottom: 20,
  },
  EmotionBtn: {
    backgroundColor: "transparent",
    borderRadius: 12,
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedEmotionBtn: {
    backgroundColor: "#ebebeb",
  },
});
