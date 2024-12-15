import React, { createContext, useState, useContext } from "react";

// Context 타입 정의
interface LogContextType {
  text: string;
  setText: (text: string) => void;
  emotion: string;
  setEmotion: (emotion: string) => void;
  image: string;
  setImage: (image: string) => void;
  tags: string[];
  setTags: (tags: string[]) => void;
  handler: boolean;
  setHandler: (handler: boolean) => void;
}

// 초기값 정의
const LogContext = createContext<LogContextType | undefined>(undefined);

// Provider 컴포넌트
export const LogProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [text, setText] = useState("");
  const [emotion, setEmotion] = useState("");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [handler, setHandler] = useState(false);

  return (
    <LogContext.Provider
      value={{
        text,
        setText,
        emotion,
        setEmotion,
        image,
        setImage,
        tags,
        setTags,
        handler,
        setHandler
      }}
    >
      {children}
    </LogContext.Provider>
  );
};

// Context를 쉽게 사용할 수 있는 커스텀 훅
export const useLogContext = (): LogContextType => {
  const context = useContext(LogContext);
  if (!context) {
    throw new Error("useTextContext must be used within a LogProvider");
  }
  return context;
};