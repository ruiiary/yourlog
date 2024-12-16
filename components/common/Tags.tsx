import React from "react";
import styled from "styled-components/native";
import Tag from "./Tag";

interface TagsProps {
  tagslist: string[];
}

const Tags: React.FC<TagsProps> = ({ tagslist }) => {
  return (
    <Wrapper>
      {tagslist.map((tag, index) => (
        <Tag key={index}>{tag}</Tag>
      ))}
    </Wrapper>
  );
};

export default Tags;

const Wrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 10px;
`;
