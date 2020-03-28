import styled from 'styled-components/native';
import {fontName} from '../lib/vars';

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
  elevation: 100;
`;

export const Space = styled.View`
  width: 20px;
  height: 20px;
`;


export const HalfSpace = styled.View`
  width: 10px;
  height: 10px;
`;

export const CenterTitleText = styled.Text`
  font-family: ${fontName};
  color: #c1c1c1;
`;

export const HeaderRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
`;
