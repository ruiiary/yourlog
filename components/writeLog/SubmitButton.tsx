import React from "react";
import styled from "styled-components/native";
import { Alert } from "react-native";
import { createLetter } from "../../api/openai";
import { saveLog } from "../../localStorage/log";

interface SubmitButtonProps {
  text: string;
  image: string | null;
  emotion: string;
  tags: string[];
  date: string;
  onSuccess: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  date,
  text,
  image,
  emotion,
  tags,
  onSuccess,
}) => {
  const handleSubmit = async () => {
    try {
      // 편지 생성
      const letter = await createLetter(text);

      // 로그 데이터 저장
      const log = { date, text, image, emotion, tags, letter };
      await saveLog(log);

      console.log("Log saved successfully:", log);
      onSuccess();
    } catch (error) {
      console.error("Error submitting log:", error);
      Alert.alert(
        "저장 실패",
        "오늘의 로그를 저장하는 중 문제가 발생했습니다.",
      );
    }
  };

  return (
    <Button onPress={handleSubmit}>
      <ButtonText>로그 남기기</ButtonText>
    </Button>
  );
};

export default SubmitButton;

// styled-components
const Button = styled.TouchableOpacity`
  border-radius: 20px;
  background-color: #3c7960;
  width: 95%;
  padding: 12px 0;
  bottom: 10px;
  margin-top: 70px;
  align-self: center;
`;

const ButtonText = styled.Text`
  color: #ffffff;
  font-size: 18px;
  text-align: center;
  font-weight: bold;
`;
