import React from 'react';
import {ViewStyle} from 'react-native';
import {useTranslation} from 'react-i18next';
import {HappySadButton} from './HappySadButton';

interface Props {
  onPress: () => void;
  text?: string;
  style?: ViewStyle;
  showLine?: boolean;
}

export const DoneButton: React.FC<Props> = ({
  style,
  onPress,
  text = 'done',
}) => {
  const {t} = useTranslation();

  return (
    <HappySadButton isHappy style={style} onPress={onPress}>
      {t(text)}
    </HappySadButton>
  );
};
