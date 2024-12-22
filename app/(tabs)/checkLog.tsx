import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import styled from "styled-components/native";
import RNPickerSelect from "react-native-picker-select";
import { format, addDays, startOfWeek, setMonth } from "date-fns";
import { getLogs } from "../../localStorage/log";
import Tags from "../../components/common/Tags";
import ImageView from "../../components/checkLog/ImageView";

const emotionMap: { [key: string]: any } = {
  happy: require("../../assets/images/emotions/happy.png"),
  sad: require("../../assets/images/emotions/sad.png"),
  love: require("../../assets/images/emotions/love.png"),
  angry: require("../../assets/images/emotions/angry.png"),
  surprised: require("../../assets/images/emotions/surprised.png"),
  star: require("../../assets/images/emotions/star.png"),
  question: require("../../assets/images/emotions/question.png"),
};

type Log = {
  text: string;
  emotion: string;
  tags: string[];
  image: string | null;
  date: string | null;
  letter: string;
};

export default function CheckLog() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(
    startOfWeek(new Date(), { weekStartsOn: 1 }),
  );

  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth(),
  );

  const leftArrow = "<";
  const rightArrow = ">";

  useEffect(() => {
    const fetchLogs = async () => {
      const storedLogs = await getLogs();
      setLogs(storedLogs);
    };

    fetchLogs();
  }, []);

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleWeekChange = (direction: "prev" | "next") => {
    const newStart =
      direction === "prev"
        ? addDays(currentWeekStart, -7)
        : addDays(currentWeekStart, 7);
    setCurrentWeekStart(newStart);
  };

  const handleMonthChange = (month: number) => {
    const newDate = setMonth(new Date(), month);
    setSelectedMonth(month);
    setSelectedDate(newDate);
    setCurrentWeekStart(startOfWeek(newDate, { weekStartsOn: 1 }));
  };

  const weekDates = Array.from({ length: 7 }, (_, i) =>
    addDays(currentWeekStart, i),
  );

  const selectedLog = logs.find(
    (log) => log.date === format(selectedDate, "yyyy-MM-dd"),
  );

  const monthItems = Array.from({ length: 12 }, (_, i) => ({
    label: `${i + 1}월`,
    value: i,
  }));

  return (
    <ScrollView style={{ flex: 1 }}>
      <Header>
        <PickerWrapper>
          <RNPickerSelect
            value={selectedMonth}
            onValueChange={handleMonthChange}
            items={monthItems}
            style={{
              ...pickerSelectStyles,
              placeholder: { color: "#999", fontSize: 16 },
            }}
            placeholder={{
              label: "월 선택",
              value: null,
            }}
            useNativeAndroidPickerStyle={false} // 안드로이드 네이티브 스타일 비활성화
          />
        </PickerWrapper>
        <WeekToggle>
          <ArrowButton onPress={() => handleWeekChange("prev")}>
            <Text>{leftArrow}</Text>
          </ArrowButton>
          {weekDates.map((date, index) => (
            <DayBox
              key={index}
              selected={selectedDate.toDateString() === date.toDateString()}
              onPress={() => handleDayClick(date)}
            >
              <DayText>{format(date, "E")[0]}</DayText>
              <DateText>{format(date, "dd")}</DateText>
            </DayBox>
          ))}
          <ArrowButton onPress={() => handleWeekChange("next")}>
            <Text>{rightArrow}</Text>
          </ArrowButton>
        </WeekToggle>
      </Header>

      <Container>
        <Title>{format(selectedDate, "MMMM dd")}</Title>

        <Section>
          <SectionTitle>오늘의 감정</SectionTitle>
          {selectedLog?.emotion && emotionMap[selectedLog.emotion] ? (
            <EmotionImage source={emotionMap[selectedLog.emotion]} />
          ) : (
            <EmptyText>데이터가 없어요</EmptyText>
          )}
        </Section>

        <Section>
          <SectionTitle>오늘의 도약기록</SectionTitle>
          {selectedLog?.text ? (
            <LogText>{selectedLog.text}</LogText>
          ) : (
            <EmptyText>데이터가 없어요</EmptyText>
          )}
        </Section>

        <Section>
          <SectionTitle>오늘의 도약태그</SectionTitle>
          {selectedLog?.tags && selectedLog.tags.length > 0 ? (
            <Tags tagslist={selectedLog.tags} />
          ) : (
            <EmptyText>태그가 없어요</EmptyText>
          )}
        </Section>

        <Section>
          <SectionTitle>편지 우체통</SectionTitle>
          {selectedLog?.letter ? (
            <Letter>{selectedLog.letter}</Letter>
          ) : (
            <LetterEmpty>
              <EmptyText>편지가 배달중이에요 ...</EmptyText>
            </LetterEmpty>
          )}
        </Section>
      </Container>
    </ScrollView>
  );
}

// Styled-components
const Header = styled.View`
  background-color: #f2f6f3;
  padding: 10px 20px;
  padding-top: 50px;
  padding-bottom: 18px;
`;

const PickerWrapper = styled.View`
  border: 1px solid #ddd;
  border-radius: 20px;
  padding: 3px 8px;
  background-color: white;
  width: 100px;
  margin-bottom: 10px;
`;

const WeekToggle = styled.View`
  flex-direction: row;
  align-items: center;
  text-align: center;
  justify-content: space-between;
  margin-top: 10px;
  width: 100%;
`;

const ArrowButton = styled.TouchableOpacity`
  padding: 5px;
`;

const DayBox = styled.TouchableOpacity<{ selected: boolean }>`
  align-items: center;
  padding: 8px 12px;
  border-radius: 18px;
  background-color: ${({ selected }) => (selected ? "#A5CBBC" : "transparent")};
`;

const DayText = styled.Text`
  font-size: 12px;
  color: #555;
`;

const DateText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  padding: 3px;
  text-align: center;
`;

const Container = styled.View`
  background-color: #fff;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 27px;
  font-weight: bold;
  color: #3c7960;
  margin-bottom: 20px;
`;

const Section = styled.View`
  margin-bottom: 20px;
`;

const SectionTitle = styled.Text`
  font-size: 23px;
  font-weight: bold;
  color: #3c7960;
  margin-bottom: 10px;
`;

const LogText = styled.Text`
  font-size: 14px;
  color: #333;
  line-height: 20px;
`;

const EmptyText = styled.Text`
  font-size: 14px;
  color: #999;
`;

const EmotionImage = styled.Image`
  width: 50px;
  height: 50px;
`;

const Letter = styled.Text`
  font-size: 14px;
  color: #333;
  line-height: 20px;
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 70px;
`;

const LetterEmpty = styled.View`
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 8px;
`;

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#000",
    backgroundColor: "white", // 배경색 추가
    fontWeight: "bold",
  },
  inputAndroid: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#000",
    backgroundColor: "white", // 배경색 추가
  },
});
