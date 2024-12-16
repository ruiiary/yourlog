import React from "react";
import styled from "styled-components/native";
import { View, Image, TouchableOpacity, Text } from "react-native";

interface PreviewProps {
  imageUrl: string;
  onDelete: () => void;
}

const Preview: React.FC<PreviewProps> = ({ imageUrl, onDelete }) => {
  return (
    <PreviewContainer>
      <PreviewImage source={{ uri: imageUrl }} />
      <DeleteButton onPress={onDelete}>
        <DeleteText>X</DeleteText>
      </DeleteButton>
    </PreviewContainer>
  );
};

export default Preview;

const PreviewContainer = styled.View`
  position: relative;
  width: 200px;
  height: 200px;
  margin-top: 10px;
  margin-bottom: 10px;
  align-self: center;
`;

const PreviewImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

const DeleteButton = styled.TouchableOpacity`
  position: absolute;
  top: 0px;
  right: 0px;
  background: #a6a6a6;
  color: #ffffff;
  border-radius: 10px;
  width: 20px;
  height: 20px;
  align-items: center;
  justify-content: center;
`;

const DeleteText = styled.Text`
  font-size: 12px;
  color: #ffffff;
`;
