import React, { useEffect, useState, useRef } from "react";
import {
  TouchableOpacity,
  Text,
  Image,
  Alert,
  Linking,
  StyleSheet,
  View,
} from "react-native";
import styled from "styled-components/native";
import { Camera, CameraType, useCameraPermissions } from "expo-camera";

interface CameraUploadButtonProps {
  children: React.ReactNode;
  setImageUrl: (url: string) => void;
}

const CameraUploadButton: React.FC<CameraUploadButtonProps> = ({
  children,
  setImageUrl,
}) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const cameraRef = useRef<Camera | null>(null);

  // 권한 상태 확인 및 요청 함수
  const checkPermissions = async () => {
    if (!permission) return;

    if (permission.status !== "granted") {
      if (!permission.canAskAgain) {
        Alert.alert("권한 필요", "앱 설정에서 카메라 권한을 활성화해주세요.", [
          { text: "취소", style: "cancel" },
          {
            text: "설정 열기",
            onPress: () => Linking.openSettings(),
          },
        ]);
      } else {
        await requestPermission();
      }
    }
  };

  useEffect(() => {
    checkPermissions();
  }, [permission]);

  // 사진 촬영 함수
  const handleCapture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        setImageUrl(photo.uri); // 촬영된 사진의 URI를 전달
        setIsCameraVisible(false); // 카메라 화면 닫기
      } catch (error) {
        console.error("사진 촬영 실패:", error);
      }
    }
  };

  // 카메라 화면 렌더링
  if (isCameraVisible) {
    return (
      <View style={styles.cameraContainer}>
        <Camera
          ref={cameraRef}
          style={styles.camera}
          type={CameraType.back} // 후면 카메라
        >
          <View style={styles.cameraActions}>
            <TouchableOpacity
              style={styles.captureButton}
              onPress={handleCapture}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsCameraVisible(false)}
            >
              <Image
                source={require("../../../assets/images/icon_close.png")}
                style={styles.closeIcon}
              />
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
  }

  return (
    <Button onPress={() => setIsCameraVisible(true)}>
      <Icon source={require("../../../assets/images/icon_camera.png")} />
      <ButtonText>{children}</ButtonText>
    </Button>
  );
};

export default CameraUploadButton;

const Button = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 10px;
  flex-direction: row;
  border-radius: 15px;
  width: 140px;
`;

const Icon = styled.Image`
  width: 24px;
  height: 24px;
  margin-bottom: 5px;
`;

const ButtonText = styled.Text`
  font-size: 14px;
  color: #555;
  margin-left: 10px;
`;

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  cameraActions: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    marginBottom: 30,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#fff",
    alignSelf: "center",
    marginHorizontal: 20,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 25,
    padding: 10,
  },
  closeIcon: {
    width: 24,
    height: 24,
  },
});
