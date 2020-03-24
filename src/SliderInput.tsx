import React from 'react';
import {View, Text} from 'react-native';
import Slider from '@react-native-community/slider';

interface Props {
  title: string;
  max: number;
  min: number;
  onValueUpdated: (value: number) => void;
}

export const SliderInput = ({title, max, min, onValueUpdated}: Props) => {
  return (
    <View>
      <Text>{title}</Text>
      <Slider
        minimumValue={min}
        maximumValue={max}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
      />
    </View>
  );
};
