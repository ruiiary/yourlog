import React from "react";
import styled from "styled-components/native";

interface TagProps {
  children: React.ReactNode;
}

const Tag: React.FC<TagProps> = ({ children }) => {
  return <StyledTag>#{children}</StyledTag>;
};

export default Tag;

const StyledTag = styled.Text`
  background-color: #f8f8f8;
  border-radius: 15px;
  padding: 5px 11px;
  text-align: center;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  elevation: 3; /* Android에서 그림자 */
  color: #3c7960;
  white-space: nowrap;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
`;
