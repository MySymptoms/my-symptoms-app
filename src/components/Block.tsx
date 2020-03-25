import styled from 'styled-components/native';
import {View} from 'react-native';

export const Button = styled.TouchableOpacity`
  padding-top: 12px;
  padding-bottom: 21px;
  justify-content: space-between;
  align-items: center;
  background: #333;
  border-radius: 10px;
  width: 100px;
  height: 100px;
  border: 3px rgba(0, 0, 0, 0.6);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
`;

export const Space = styled.View`
  width: 20px;
  height: 20px;
`;
