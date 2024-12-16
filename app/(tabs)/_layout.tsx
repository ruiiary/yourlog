import { Tabs } from "expo-router";
import React from "react";
import { Image } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";

export default function TabLayout() {
  const currentTheme = "light"; // 다크모드를 사용하지 않으므로 "light"로 고정
  const themeColors = Colors[currentTheme];
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: themeColors.tabIconSelected,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          height: 70,
          borderTopLeftRadius: 20, // 왼쪽 상단 모서리 둥글게
          borderTopRightRadius: 20, // 오른쪽 상단 모서리 둥글게
          position: "absolute", // 탭바를 떠있는 형태로 만듦
          borderTopWidth: 0, // 상단 경계선 없애기
          shadowColor: "#fff", // 그림자 색상
          shadowOpacity: 0.1, // 그림자 투명도
          shadowRadius: 6, // 그림자 반경
          elevation: 5, // 안드로이드에서 그림자 효과
          gap: 1,
          paddingTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "홈",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="writeLog"
        options={{
          title: "로그 작성",
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("../../assets/images/icon_write.png")}
              style={{ width: size-2, height: size-2, tintColor: color }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="checkLog"
        options={{
          title: "로그 확인",
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("../../assets/images/icon_check.png")}
              style={{ width: size-2, height: size-2, tintColor: color }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="myPage"
        options={{
          title: "마이",
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("../../assets/images/icon_my.png")}
              style={{ width: size, height: size, tintColor: color }}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tabs>
  );
}
