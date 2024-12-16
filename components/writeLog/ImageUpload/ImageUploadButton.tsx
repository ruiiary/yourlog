import React, { useEffect } from "react";
import { TouchableOpacity, Text, Image, Alert, Platform } from "react-native";
import styled from "styled-components/native";
import * as ImagePicker from "expo-image-picker";

interface ImageUploadButtonProps {
  children: React.ReactNode;
  setImageUrl: (url: string) => void;
}

const ImageUploadButton: React.FC<ImageUploadButtonProps> = ({
  children,
  setImageUrl,
}) => {
  // 사진 접근 권한을 요청하는 코드
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Photo Permission",
            "Please turn on the camera permission.",
          );
        }
      }
    })();
  }, []);

  //카메라 버튼 클릭시 사진 가져와서 수정하는 함수
  const _handlePhotoBtnPress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    // 선택된 이미지 URL을 setImageUrl로 전달
    if (!result.canceled) {
      setImageUrl(result?.assets[0]?.uri);
    }
  };

  // const handleFileSelect = async () => {
  //   const result = await launchImageLibrary({
  //     mediaType: "photo",
  //   });

  //   if (result.assets && result.assets[0].uri) {
  //     try {
  //       const fileUri = result.assets[0].uri;

  //       setImageUrl(fileUri);
  //     } catch (error) {
  //       console.error("이미지 파일 업로드 중 에러 발생:", error);
  //       alert("이미지 파일 업로드에 실패했습니다. 서버 상태를 확인해 주세요.");
  //     }
  //   }
  // };

  return (
    <Button onPress={_handlePhotoBtnPress}>
      <Icon source={require("../../../assets/images/icon_image.png")} />
      <ButtonContents>{children}</ButtonContents>
    </Button>
  );
};

export default ImageUploadButton;

const Button = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border-radius: 15px;
  padding: 10px;
  flex-direction: row;
  width: 148px;
`;

const Icon = styled.Image`
  width: 24px;
  height: 24px;
  margin-bottom: 5px;
`;

const ButtonContents = styled.Text`
  font-size: 14px;
  color: #555;
  margin-left: 10;
`;
