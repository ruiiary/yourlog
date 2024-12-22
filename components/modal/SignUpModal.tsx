import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

interface SignUpModalProps {
  onClose: () => Promise<void>;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ onClose }) => {
  const router = useRouter();
  const [temp, setTemp] = useState(""); // temp 상태 정의

  const handleSaveName = async () => {
    try {
      // 로컬 스토리지에 닉네임 저장
      await AsyncStorage.setItem("userName", temp);
      await onClose(); // 부모 컴포넌트의 onClose 호출
      router.push("/"); // 홈 화면으로 이동
    } catch (error) {
      console.error("Failed to save name:", error);
    }
  };

  return (
    <Modal animationType="fade" transparent>
      <View style={styles.modalShadow}>
        <View style={styles.modalComponent}>
          <Text style={styles.title}>회원가입을 위해</Text>
          <Text style={styles.title}>정보를 알려주세요!</Text>
          <TextInput
            style={styles.textarea}
            value={temp} // temp 값을 사용
            placeholder="닉네임을 입력해 주세요"
            onChangeText={(text) => setTemp(text)} // 입력값을 temp에 저장
          />

          <View style={styles.margin} />
          <Text style={styles.paragraph}>
            오늘의 작은 기록이 큰 도약이 될 수 있도록
          </Text>
          <Text style={styles.paragraph}>유어로그가 응원할게요.</Text>
          <TouchableOpacity style={styles.closeButton} onPress={handleSaveName}>
            <Text style={styles.closeButtonText}>저장</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SignUpModal;

const styles = StyleSheet.create({
  modalShadow: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalComponent: {
    backgroundColor: "#f2f6f3",
    borderRadius: 10,
    width: "85%",
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3c7960",
    marginVertical: 5,
  },
  margin: {
    height: 10,
  },
  paragraph: {
    fontSize: 13,
    color: "#7d7d7d", // gray 색상
    marginVertical: 2,
    textAlign: "center",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#3c7960",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  textarea: {
    textAlignVertical: "top",
    backgroundColor: "#fff",
    color: "#7d7d7d",
    borderRadius: 5,
    padding: 10,
    minHeight: 25,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 10,
    width: 200,
  },
});
