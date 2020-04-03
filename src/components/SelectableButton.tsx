import React, {FC} from 'react';
import styled from 'styled-components/native';
import RadialGradient from 'react-native-radial-gradient';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import {ViewProps, ViewStyle, TextStyle} from 'react-native';
import {fontName} from '../lib/vars';
import {Colors} from '../lib/colors';

interface Props {
  style?: ViewProps;
  onPress: () => void;
  selected?: boolean;
  title: string;
  lineColor?: string;
  textStyle?: TextStyle;
}

export const SelectableButton: FC<Props> = ({
  style,
  onPress,
  selected = false,
  title,
  lineColor,
  textStyle,
}) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <View
        style={[
          selectableButtonStyles.buttonContainer,
          {
            backgroundColor: selected
              ? Colors.buttonBackgroundActive
              : Colors.buttonBackground,
          },
        ]}>
        <TitleText style={textStyle} selected={selected}>
          {title}
        </TitleText>
        {lineColor && <Line color={lineColor} selected={selected} />}
      </View>
    </TouchableOpacity>
  );
};

interface TitleTextProps {
  selected: boolean;
}

const TitleText = styled.Text<TitleTextProps>`
  font-family: ${fontName};
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  letter-spacing: 2px;
  color: ${props => (props.selected ? 'white' : 'grey')};
  text-transform: uppercase;
`;

interface LineProps {
  selected: boolean;
  color: string;
}

const Line = styled.View<LineProps>`
  background: ${props => props.color};
  border-radius: 2px;
  width: ${props => (props.selected ? '50px' : '20px')};
  height: 1px;
  margin-top: 5px;
  padding-top: 4px;
`;

interface GradientContainerProps {
  style: ViewStyle;
}

const GradientContainer: FC<GradientContainerProps> = ({children, style}) => {
  return (
    <RadialGradient
      {...style}
      colors={['black', 'black', 'black', 'grey']}
      stops={[0, 0.7, 0.9, 1]}
      center={[50, 70]}
      radius={200}>
      {children}
    </RadialGradient>
  );
};

interface ContainerProps {
  selected: boolean;
}

const Container = styled.View<ContainerProps>`
  min-width: 100px;
  height: 54px;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-width: 3px;
  border-radius: 100px;
  border-color: black;
  padding-left: 10px;
  padding-right: 10px;
  background: ${props =>
    props.selected ? Colors.buttonBackgroundActive : Colors.buttonBackground};
`;

export const selectableButtonStyles = StyleSheet.create({
  buttonContainer: {
    minWidth: 100,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 3,
    borderRadius: 100,
    borderColor: 'black',
    paddingLeft: 10,
    paddingRight: 10,
  },
});
