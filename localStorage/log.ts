import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveLog = async (log: {
  text: string;
  emotion: string;
  tags: string[];
  image: string | null;
  date: string;
  letter: string;
}) => {
  try {
    const dateKey = log.date.replace(/-/g, ""); // YYYYMMDD 형식
    const logData = JSON.stringify(log);

    console.log("저장할 로그 키:", dateKey);
    console.log("저장할 로그 데이터:", log);

    // 개별 로그 저장 (날짜별)
    await AsyncStorage.setItem(dateKey, logData);

    // 전체 로그 키 관리
    const existingLogs = await AsyncStorage.getItem("logs");
    const logs = existingLogs ? JSON.parse(existingLogs) : [];

    if (!logs.includes(dateKey)) {
      logs.push(dateKey); // 새로운 날짜 키 추가
      await AsyncStorage.setItem("logs", JSON.stringify(logs)); // 업데이트
    }

    console.log("Log saved successfully:", log);
  } catch (error) {
    console.error("Error saving log:", error);
  }
};


export const getLogs = async () => {
  try {
    const logs = await AsyncStorage.getItem("logs");
    const logKeys = logs ? JSON.parse(logs) : [];

    const allLogs = [];
    for (const key of logKeys) {
      const logData = await AsyncStorage.getItem(key);
      if (logData) {
        allLogs.push(JSON.parse(logData));
      }
    }

    return allLogs; // 전체 로그 데이터 반환
  } catch (error) {
    console.error("Error fetching logs:", error);
    return [];
  }
};

export const getLogByDate = async (date: string) => {
  try {
    const dateKey = date.replace(/-/g, ""); // YYYYMMDD 형식으로 변환
    console.log("조회할 날짜 키:", dateKey);

    const logData = await AsyncStorage.getItem(dateKey);
    console.log("조회된 로그 데이터:", logData);

    return logData ? JSON.parse(logData) : null;
  } catch (error) {
    console.error("Error fetching log by date:", error);
    return null;
  }
};

