import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Image, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const XUndoButton = () => {
  const navigation = useNavigation();

  const handleClick = () => {
    navigation.goBack();
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
