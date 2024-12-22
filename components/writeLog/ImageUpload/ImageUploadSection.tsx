import React from "react";
import styled from "styled-components/native";
import CameraUploadButton from "./CameraUploadButton";
import ImageUploadButton from "./ImageUploadButton";
import Preview from "./Preview";

interface UploadSectionProps {
  image: string | null;
  updateImage: (image: string) => void;
}

const UploadSection: React.FC<UploadSectionProps> = ({
  image,
  updateImage,
}) => {
  const handleDelete = () => {
    updateImage("");
  };

  return (
    <Wrapper>
      <Text>이미지 업로드(선택)</Text>
      <FlexWrapper>
        <ImageUploadButton setImageUrl={updateImage}>
          이미지 파일 추가
        </ImageUploadButton>
      </FlexWrapper>
      {image && <Preview imageUrl={image} onDelete={handleDelete} />}
    </Wrapper>
  );
};

export default UploadSection;

const Wrapper = styled.View`
  margin-top: 16px;
  width: 100%;
  padding: 0 10px;
  margin-bottom: 25px;
`;

const Text = styled.Text`
  text-align: center;
  font-size: 12px;
  color: #5c5c5c;
  margin-top: 20px;
  margin-bottom: 0px;
`;

const FlexWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  justify-content: center;
  padding: 20px;
`;
