import React from "react";
import styled from "styled-components/native";

interface ImageViewProps {
  imageUrl: string;
}

const ImageView: React.FC<ImageViewProps> = ({ imageUrl }) => {
  return (
    <PreviewContainer>
      <PreviewImage source={{ uri: imageUrl }} />
    </PreviewContainer>
  );
};

export default ImageView;

const PreviewContainer = styled.View`
  position: relative;
  width: 300px;
  height: 300px;
  margin-top: 10px;
  margin-bottom: 10px;
  align-self: center;
`;

const PreviewImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;
