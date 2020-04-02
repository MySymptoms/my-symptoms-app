import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../App';
import {CenterTitleText, HeaderRow} from './components/Block';
import {View} from 'react-native';
import {CircleButton, CircleButtonPlaceHolder} from './components/CircleButton';
import {BackIcon} from './components/BackIcon';
import React, {ReactNode} from 'react';

interface Props {
  showBackButton?: boolean;
  onPressLeft?: () => any;
  title?: string | React.ReactNode;
  left?: ReactNode;
  center?: ReactNode;
  right?: ReactNode;
  onPressRight?: () => void;
}

const noop = () => {};

export const NavigationHeader: React.FC<Props> = ({
  onPressLeft = noop,
  onPressRight = noop,
  showBackButton = false,
  title,
  left,
  center,
  right,
}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  let leftComponent = <CircleButtonPlaceHolder />;

  if (showBackButton) {
    leftComponent = (
      <CircleButton onPress={() => navigation.goBack()}>
        <BackIcon />
      </CircleButton>
    );
  } else if (left) {
    leftComponent = <CircleButton onPress={onPressLeft}>{left}</CircleButton>;
  }

  return (
    <HeaderRow>
      <View>{leftComponent}</View>
      {center ? <>{center}</> : <CenterTitleText>{title}</CenterTitleText>}

      <View>
        {right ? (
          <CircleButton onPress={onPressRight}>{right}</CircleButton>
        ) : (
          <CircleButtonPlaceHolder />
        )}
      </View>
    </HeaderRow>
  );
};
