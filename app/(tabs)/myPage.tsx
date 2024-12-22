import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import styled from "styled-components/native";

export default function MyPage() {
  const [name, setName] = useState("윤서");
  const [profileImage, setProfileImage] = useState<string | null>(null); // 사용자 프로필 이미지 상태
  const [firstLogDate, setFirstLogDate] = useState<string | null>(null);
  const [totalLogs, setTotalLogs] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [selectedInterest, setSelectedInterest] = useState("#IT/개발");
  const [showPicker, setShowPicker] = useState(false);

  const interestOptions = [
    "#IT/개발",
    "#디자인",
    "#마케팅",
    "#교육",
    "#예술",
    "#기타",
  ];

  // 프로필 이미지 불러오기
  useEffect(() => {
    const loadProfileImage = async () => {
      try {
        const savedImage = await AsyncStorage.getItem("profileImage");
        if (savedImage) setProfileImage(savedImage);
      } catch (error) {
        console.error("Error loading profile image:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProfileImage();
  }, []);

  // 프로필 이미지 선택 및 저장
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("권한이 필요합니다. 설정에서 접근 권한을 확인해주세요.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImage = result.assets[0].uri;
      setProfileImage(selectedImage);

      // 선택된 이미지 저장
      try {
        await AsyncStorage.setItem("profileImage", selectedImage);
      } catch (error) {
        console.error("Error saving profile image:", error);
      }
    }
  };
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLoading(true);
        const storedLogs = await AsyncStorage.getItem("logs");
        const logKeys = storedLogs ? JSON.parse(storedLogs) : [];

        const allLogs = [];
        for (const key of logKeys) {
          const logData = await AsyncStorage.getItem(key);
          if (logData) {
            allLogs.push({ ...JSON.parse(logData), date: key });
          }
        }

        if (allLogs.length > 0) {
          const sortedLogs = allLogs.sort((a, b) =>
            a.date.localeCompare(b.date),
          );
          setFirstLogDate(
            sortedLogs[0]?.date.replace(/(\d{4})(\d{2})(\d{2})/, "$1.$2.$3"),
          );
        }

        setTotalLogs(allLogs.length);
      } catch (error) {
        console.error("Error fetching logs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  const handleInterestChange = (itemValue: string) => {
    setSelectedInterest(itemValue);
    setShowPicker(false);
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#3c7960" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#FFF", "#F2F6F3"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.gradientContainer}
      />
      {/* 프로필 */}
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={
              profileImage
                ? { uri: profileImage }
                : require("../../assets/images/icon_my2.png")
            }
            style={styles.profileImage}
          />
          <ButtonLayout>
            <ContentWrapper>
              <ImageStyle
                source={require("../../assets/images/iconPencil.png")}
              />
            </ContentWrapper>
          </ButtonLayout>
        </TouchableOpacity>

        <Text style={styles.userName}>{name}</Text>

        {/* 관심 분야 */}
        {!showPicker ? (
          <TouchableOpacity
            style={styles.selectedInterestContainer}
            onPress={() => setShowPicker(true)}
          >
            <Text style={styles.selectedInterestText}>{selectedInterest}</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedInterest}
              onValueChange={handleInterestChange}
              style={styles.picker}
            >
              {interestOptions.map((option) => (
                <Picker.Item key={option} label={option} value={option} />
              ))}
            </Picker>
          </View>
        )}
      </View>

      {/* EXP 및 로그 */}
      <View style={styles.expContainer}>
        <Text style={styles.expTitle}>EXP</Text>
        <Text style={styles.expValue}>{totalLogs * 100}</Text>
      </View>

      <View style={styles.archiveContainer}>
        <View style={{ height: 20 }}></View>
        <Text style={styles.archiveTitle}>yourlog. 아카이브</Text>
        <View style={styles.archiveItem}>
          <Text style={styles.archiveLabel}>나의 첫번째 로그</Text>
          <Text style={styles.archiveValue}>{firstLogDate || "-"}</Text>
        </View>
        <View style={styles.archiveItem}>
          <Text style={styles.archiveLabel}>전체 유어로그</Text>
          <Text style={styles.archiveValue}>{totalLogs} 개</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F6F3",
    paddingHorizontal: 20,
  },
  gradientContainer: {
    height: 150,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileContainer: {
    alignItems: "center",
    marginTop: -50,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#ddd",
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#3c7960",
  },
  selectedInterestContainer: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  selectedInterestText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3c7960",
  },
  pickerContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    width: "100%",
  },
  picker: {
    height: Platform.OS === "ios" ? 180 : 50,
  },
  expContainer: {
    marginTop: 20,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  expTitle: {
    fontWeight: "bold",
    color: "#4a4a4a",
  },
  expValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3c7960",
  },
  archiveContainer: {
    marginTop: 20,
  },
  archiveTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4a4a4a",
    marginBottom: 10,
  },
  archiveItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
  },
  archiveLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4a4a4a",
  },
  archiveValue: {
    fontSize: 14,
    color: "#3c7960",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const ButtonLayout = styled.View`
  z-index: 1;
  position: absolute;
  bottom: 0px;
  left: 50px;
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
  background-color: #ccc;
  padding: 10px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  width: 12px;
  height: 12px;
`;

const ImageStyle = styled.Image`
  width: 10px;
  height: 10px;
  tint-color: #fff;
`;
