import React, { useState, useEffect } from "react";
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
import TextEntryButton from "@/components/writeLog/TextEntryButton";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useLogContext } from "../../context/LogContext";
import { createTags, createLetter } from "../../api/openai";
import Tags from "../../components/common/Tags";
import ImageUploadSection from "../../components/writeLog/ImageUpload/ImageUploadSection";
import SubmitButton from "@/components/writeLog/SubmitButton";
import DoneModal from "../../components/writeLog/DoneModal";

export default function TabThreeScreen() {
  const router = useRouter();
  const {
    date,
    setDate,
    text,
    setText,
    emotion,
    setEmotion,
    image,
    setImage,
    tags,
    setTags,
    handler,
    setHandler,
  } = useLogContext();

  const [selectedEmotion, setSelectedEmotion] = useState("");
  const [showDoneModal, setShowDoneModal] = useState(false);

  const isReadyToSubmit = text && emotion && tags && tags.length > 0;

  const handleEmotionClick = (emotion: string) => {
    console.log(emotion);
    setEmotion(emotion);
    setSelectedEmotion(emotion);
  };

  const fetchTags = async (text: string) => {
    const keywords = await createTags(text);
    setTags(keywords || []);
  };

  const initializeForm = () => {
    setText("");
    setEmotion("");
    setImage("");
    setTags([]);
    setDate("");
  };

  useEffect(() => {
    if (text) {
      fetchTags(text);
    }
  }, [handler]);

  return (
    <ScrollView>
      <View style={{ flex: 1, backgroundColor: "#F2F6F3" }}>
        <LinearGradient
          colors={["#FFF", "#F1F6F2"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.gradientContainer}
        ></LinearGradient>
        <View
          style={[styles.container, { backgroundColor: "#F2F6F3", flex: 1 }]}
        >
          <View style={styles.bigMargin} />
          <View style={styles.margin} />
          <Text style={styles.bigText}>오늘의 성장을 기록해 주세요.</Text>
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
                  selectedEmotion === item.key &&
                    localStyles.selectedEmotionBtn,
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
          <ImageUploadSection image={image} updateImage={setImage} />
          <Text style={styles.subTitle}>회고 태그</Text>
          {/* TODO 태그 출력 관련 tooltip 추가하기 */}
          <Text>
            {tags && tags.length > 0 ? (
              <Tags tagslist={tags} />
            ) : (
              <Text style={{ color: "#5c5c5c" }}>
                아직 출력된 태그가 없습니다.
              </Text>
            )}
          </Text>
          <View style={styles.margin} />
          {isReadyToSubmit && (
            <SubmitButton
              text={text}
              image={image}
              emotion={emotion}
              tags={tags}
              date={date}
              onSuccess={() => setShowDoneModal(true)}
            />
          )}
          <View style={styles.bigMargin} />
          {showDoneModal && (
            <DoneModal
              onClose={async () => {
                const letter = await createLetter(text); // 편지 생성
                console.log("생성된 편지:", letter); // 편지 로그 확인
                setShowDoneModal(false);
                initializeForm();
                router.push("/checkLog");
              }}
            />
          )}
        </View>
      </View>
    </ScrollView>
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
