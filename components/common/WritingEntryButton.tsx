import React from "react";
import styled from "styled-components/native";
import { useRouter } from "expo-router";
import { useLogContext } from "@/context/LogContext";

const WritingEntryButton = () => {
  const router = useRouter();
  const { setDate } = useLogContext();

  const handleClick = () => {
    const currentDate = new Date(); 
    const formattedDate = currentDate.toISOString().split("T")[0]; // yyyy-MM-dd 형식으로 변환
    setDate(formattedDate); 
    router.push("/(tabs)/writeLog");
  };

  return (
    <ButtonLayout>
      <ContentWrapper onPress={handleClick}>
        <ImageStyle source={require("../../assets/images/iconPencil.png")} />
      </ContentWrapper>
    </ButtonLayout>
  );
};

export default WritingEntryButton;

const ButtonLayout = styled.View`
  z-index: 1;
  position: absolute;
  bottom: 98px;
  right: 20px;
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.3;
  shadow-radius: 3px;
  elevation: 5;
  border: none;
`;

const ContentWrapper = styled.TouchableOpacity`
  display: flex;
  background-color: #3c7960;
  padding: 18px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  border: 0.05px solid #fff;
`;

const ImageStyle = styled.Image`
  width: 24px;
  height: 24px;
  tint-color: #fff;
`;
