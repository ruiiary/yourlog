import React, { useEffect, useState, useRef } from "react";
import {
  TouchableOpacity,
  Text,
  Alert,
  Linking,
  StyleSheet,
  View,
} from "react-native";
import {
  Camera as ExpoCamera,
  CameraType,
  useCameraPermissions,
} from "expo-camera";

const CameraUploadButton = ({ children, setImageUrl }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const cameraRef = useRef(null);

  const CameraTypeFallback = { back: 1, front: 2 };

  const checkPermissions = async () => {
    if (!permission || permission.status !== "granted") {
      const { status } = await requestPermission();
      if (status !== "granted") {
        Alert.alert(
          "카메라 권한 필요",
          "앱 설정에서 카메라 권한을 활성화해주세요.",
          [
            { text: "취소", style: "cancel" },
            { text: "설정 열기", onPress: () => Linking.openSettings() },
          ],
        );
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    checkPermissions();
  }, []);

  const handleCapture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        setImageUrl(photo.uri);
        setIsCameraVisible(false);
      } catch (error) {
        console.error("사진 촬영 실패:", error);
      }
    }
  };

  if (isCameraVisible) {
    return (
      <View style={styles.cameraContainer}>
        <ExpoCamera
          ref={cameraRef}
          style={styles.camera}
          type={CameraType?.back || CameraTypeFallback.back}
        >
          <View style={styles.cameraActions}>
            <TouchableOpacity
              style={styles.captureButton}
              onPress={handleCapture}
            >
              <Text>촬영</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsCameraVisible(false)}
            >
              <Text style={{ color: "#fff" }}>닫기</Text>
            </TouchableOpacity>
          </View>
        </ExpoCamera>
      </View>
    );
  }

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={async () => {
        const hasPermission = await checkPermissions();
        if (hasPermission) {
          setIsCameraVisible(true);
        }
      }}
    >
      <Text>{children}</Text>
    </TouchableOpacity>
  );
};

export default CameraUploadButton;

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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    marginBottom: 30,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#fff",
    marginHorizontal: 20,
  },
  closeButton: {
    padding: 10,
    backgroundColor: "#000",
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
  },
});
