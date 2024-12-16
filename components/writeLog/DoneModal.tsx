import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRouter } from "expo-router";

interface DoneModalProps {
  onClose: () => Promise<void>;
}

const DoneModal: React.FC<DoneModalProps> = ({ onClose }) => {
  const router = useRouter(); // useRouter 사용

  const handleClose = async () => {
    await onClose(); // 비동기 onClose 호출
    router.push("/checkLog"); // /checkLog로 이동
  };

  return (
    <Modal animationType="fade">
      <View style={styles.modalShadow}>
        <View style={styles.modalComponent}>
          <Text style={styles.title}>오늘의</Text>
          <Text style={styles.title}>로그를 작성했어요!</Text>
          <View style={styles.imageWrapper}>
            <Image
              source={require("../../assets/images/DoneModalSticker.png")}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.subtitle}>기록 확인 탭에서</Text>
          <Text style={styles.subtitle}>
            youelog의 응원 메세지를 확인해 보세요.
          </Text>
          <View style={styles.margin} />
          <Text style={styles.paragraph}>
            오늘의 작은 기록이 큰 도약이 될 수 있도록
          </Text>
          <Text style={styles.paragraph}>유어로그가 응원할게요.</Text>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Text style={styles.closeButtonText}>닫기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default DoneModal;

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
  imageWrapper: {
    marginVertical: 20,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#4a4a4a",
    marginVertical: 2,
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
});
