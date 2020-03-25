import React, {FC} from 'react';
import styled from 'styled-components/native';

interface Props {}

export const CircleButton: FC<Props> = ({children}) => {
  return <Container>{children}</Container>;
};

const Container = styled.View`
  border-radius: 100px;
  width: 30px;
  height: 30px;
  border-width: 2px;
  background-color: #333333;
  justify-content: center;
  align-items: center;
`;
