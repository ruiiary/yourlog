import React, { useState, useRef, useEffect } from "react";
import {
  TextInput,
  View,
  ScrollView,
  Text,
  StyleSheet,
  Platform,
  Button,
  TouchableOpacity,
} from "react-native";
import { styles } from "./Styles";
import Markdown from "react-native-markdown-display";
import XUndoButton from "@/components/common/XUndoButton";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useLogContext } from "@/context/LogContext";
import { OPENAI_API_KEY } from '@env'; 

const infoMarkdown = `회고에는 다음과 같은 것들을 적어보세요. \n
- **성취**: '오늘의 나는 무엇을 잘했는지'  
- **개선**: '오늘의 나는 어떤 문제를 겪었는지, 앞으로 어떻게 해결할 것인지'  
- **학습**: '오늘의 일에서 나는 어떤 것을 배웠는지'   \n
위 세 가지가 오늘도 한 발짝 더 성장할 수 있도록 이끌어 줄 거예요 :)
`;

const WritingPage: React.FC = () => {
  const router = useRouter();
  const { text, setText } = useLogContext();
  const textRef = useRef<TextInput>(null);

  const [showModal, setShowModal] = useState(false);

  const changeHandler = (newText: string) => {
    setText(newText);

    if (textRef.current && Platform.OS === "android") {
      textRef.current.setNativeProps({ text: newText });
    }
  };

  // TODO: Xbutton 누르면 변경사항이 저장되지 않는 기능 추가

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={["#FFF", "#F1F6F2"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.gradientContainer}
      ></LinearGradient>
      <View style={[styles.container, { backgroundColor: "#F2F6F3", flex: 1 }]}>
        <View style={localStyles.headerContainer}>
          <XUndoButton path="writeLog" />
          <Text style={styles.bigText}>회고 작성</Text>
          <TouchableOpacity
            style={localStyles.TouchableStyle}
            onPress={() => router.push("/writeLog")}
          >
            <Text style={localStyles.TouchableText}>완료</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={localStyles.textarea}
          value={text}
          placeholder="오늘의 회고를 작성해 주세요."
          multiline={true}
          onChangeText={changeHandler}
          ref={textRef}
        />
        <View style={localStyles.info}>
          <Markdown>{infoMarkdown}</Markdown>
        </View>
      </View>
    </View>
  );
};

export default WritingPage;

const localStyles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 23,
  },
  textarea: {
    textAlignVertical: "top",
    backgroundColor: "#F2F6F3",
    color: "#7d7d7d",
    borderRadius: 5,
    padding: 10,
    paddingLeft: 0,
    paddingRight: 0,
    minHeight: 100, // TextInput 높이
    fontSize: 16,
    lineHeight: 24,
    flex: 1,
  },
  info: {
    marginTop: 20,
    paddingVertical: 10,
    color: "#a6a6a6",
    fontSize: 12,
    lineHeight: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "center",
    marginBottom: 10,
  },
  TouchableStyle: {
    backgroundColor: "#7DB49D",
    borderRadius: 20,
    width: 56,
    height: 33,
    justifyContent: "center", //
    alignItems: "center",
  },
  TouchableText: {
    fontWeight: "bold",
    color: "#ffffff",
    fontSize: 15,
  },
});
