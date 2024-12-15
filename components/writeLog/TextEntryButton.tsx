import React from "react";
import styled from "styled-components/native";

interface TextEntryButtonProps {
  children: React.ReactNode;
  onPress: () => void;
}

const TextEntryButton: React.FC<TextEntryButtonProps> = ({ children, onPress }) => {
  return (
    <Root>
      <EntryButton onPress={onPress}>
        <ButtonText>{children}</ButtonText>
      </EntryButton>
    </Root>
  );
};

export default TextEntryButton;

const Root = styled.View`
  width: 100%;
`;

const EntryButton = styled.TouchableOpacity`
  background: #ffffff;
  width: 100%;
  min-height: 100px;
  border-radius: 10px;
  border-width: 0.5px;
  border-color: #b5d6bf;
  padding: 12px;
  justify-content: flex-start;
  margin-right: 23px;
  margin-bottom: 5px;
`;

const ButtonText = styled.Text`
  color: #7d7d7d; /* var(--gray-from-grayscale) 대체 */
  font-size: 15px; /* 0.94rem에 해당 */
`;
