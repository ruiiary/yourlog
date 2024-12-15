import React, { createContext, useState, useContext } from "react";

// Context 타입 정의
interface TextContextType {
  text: string;
  setText: (text: string) => void;
}

// 초기값 정의
const TextContext = createContext<TextContextType | undefined>(undefined);

// Provider 컴포넌트
export const TextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [text, setText] = useState("");

  return (
    <TextContext.Provider value={{ text, setText }}>
      {children}
    </TextContext.Provider>
  );
};

// Context를 쉽게 사용할 수 있는 커스텀 훅
export const useTextContext = (): TextContextType => {
  const context = useContext(TextContext);
  if (!context) {
    throw new Error("useTextContext must be used within a TextProvider");
  }
  return context;
};
