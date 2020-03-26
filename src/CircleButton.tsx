import React, {FC} from 'react';
import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native';

interface Props {
  onPress: () => void;
}

export const CircleButton: FC<Props> = ({onPress, children}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Container style={{alignSelf: 'baseline'}}>{children}</Container>
    </TouchableOpacity>
  );
};

const Container = styled.View`
  border-radius: 200px;
  border-width: 2px;
  width: 50px;
  height: 50px;
  background-color: #333333;
  justify-content: center;
  align-items: center;
`;
