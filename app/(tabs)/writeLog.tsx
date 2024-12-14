import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  Platform,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { styles } from "./Styles";
import XUndoButton from "../../components/common/XUndoButton";
import {
  love,
  happy,
  sad,
  angry,
  surprised,
  star,
  question,
} from "../../assets/images/emotions";

export default function TabThreeScreen() {
  const [emotion, setEmotion] = useState("");
  const [selectedEmotion, setSelectedEmotion] = useState("");

  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState([]);

  const isReadyToSubmit = text && emotion && tags && tags.length > 0;
  const handleClick = (emotion: string) => {
    console.log(emotion);
    setEmotion(emotion);
    setSelectedEmotion(emotion);
  };

  return (
    <View style={styles.container}>
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
              selectedEmotion === item.key && localStyles.selectedEmotionBtn, // 선택된 감정일 때 스타일 추가
            ]}
            onPress={() => handleClick(item.key)}
          >
            <Image style={localStyles.EmotionImage} source={item.source} />
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.subTitle}>오늘의 회고</Text>

      <Text style={styles.subTitle}>회고 태그</Text>
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
    backgroundColor: "transparent", // 초기 배경색을 투명하게
    borderRadius: 12,
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedEmotionBtn: {
    backgroundColor: "#ebebeb", // 클릭 시 배경색
  },
});
