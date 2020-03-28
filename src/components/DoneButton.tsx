import React, {FC} from 'react';
import styled from 'styled-components/native';
import RadialGradient from 'react-native-radial-gradient';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ViewProps, StyleSheet} from 'react-native';
import {fontName} from '../lib/vars';

interface Props {
  style: ViewProps;
  onPress: () => void;
}

export const DoneButton: FC<Props> = ({style, onPress}) => {
  return (
    <TouchableOpacity
      style={[styles.touchableOpacity, style]}
      onPress={onPress}>
      <Container
        colors={['#00DCC2', 'rgba(0, 220, 180, 0)']}
        stops={[0, 1]}
        center={[100, 100]}
        radius={200}>
        <TitleText>done</TitleText>
        <Line />
      </Container>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchableOpacity: {
    borderWidth: 3,
    borderColor: 'rgba(0,220,194, 0.4)',
    borderRadius: 100,
  },
});

const TitleText = styled.Text`
  font-family: ${fontName};
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  letter-spacing: 2px;
  color: #104812;
  text-transform: uppercase;
`;

const Line = styled.View`
  background: #8cf081;
  border-radius: 2px;
  width: 20px;
  height: 1px;
  padding-top: 4px;
`;

const Container = styled(RadialGradient)`
  width: 175px;
  height: 54px;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 100px;
`;
