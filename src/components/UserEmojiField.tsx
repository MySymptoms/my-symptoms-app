import React, {FC} from 'react';
import styled from 'styled-components/native';

interface Props {
  emoji: string;
}

export const UserEmojiField: FC<Props> = ({emoji}) => {
  return <Container>{emoji}</Container>;
};

const Container = styled.Text`
  font-size: 28px;
`;
