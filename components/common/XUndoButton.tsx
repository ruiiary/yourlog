import React from "react";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { Image, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

interface XUndoButtonProps {
  path?: string;
}

type RootStackParamList = {
  [key: string]: undefined; // string 키를 가지는 모든 네비게이션 경로
};

const XUndoButton: React.FC<XUndoButtonProps> = ({ path }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleClick = () => {
    if (path) {
      navigation.navigate(path);
    } else {
      navigation.goBack();
    }
  };

  return (
    <TouchableOpacity onPress={handleClick}>
      <StyledImage source={require("../../assets/images/icon_x.png")} />
    </TouchableOpacity>
  );
};

export default XUndoButton;

const StyledImage = styled(Image)`
  width: 12px;
  height: 12px;
`;
