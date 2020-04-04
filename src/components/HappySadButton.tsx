import React, {FC} from 'react';
import {ViewStyle} from 'react-native';
import styled from 'styled-components/native';
import {fontName} from '../lib/vars';

export const HappySadButton: FC<{
  style?: ViewStyle;
  isHappy: boolean;
  onPress: () => void;
}> = ({isHappy, onPress, style, children}) => {
  const ButtonToRender = isHappy ? HappyButton : SadButton;
  const TextToRender = isHappy ? HappyButtonText : SadButtonText;

  return (
    <ButtonToRender style={style} onPress={onPress}>
      <TextToRender>{children}</TextToRender>
    </ButtonToRender>
  );
};

export const HappyButton = styled.TouchableOpacity`
  padding: 0 36px;
  height: 54px;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 100px;
  background-color: #00dcc2;
  border: 3px solid #3f817b;
`;

export const SadButton = styled(HappyButton)`
  background-color: #ff7a7a;
  border-color: #b24b4b;
`;

export const HappyButtonText = styled.Text`
  font-family: ${fontName};
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  letter-spacing: 1px;
  color: #003d02;
  text-transform: uppercase;
`;

export const SadButtonText = styled(HappyButtonText)`
  color: #500909;
`;
