import React from 'react';
import {Text, View} from 'react-native';
import Slider from '@react-native-community/slider';

interface Props {
  title: string;
  max?: number;
  min?: number;
  step?: number;
  onValueUpdated: (value: number) => void;
  value: number;
  valueFormatter?: undefined | ((value: number) => string);
}

export const SliderInput = ({
  title,
  max = 10,
  min = 0,
  step = 1,
  onValueUpdated,
  value,
  valueFormatter,
}: Props) => {
  return (
    <View>
      <Text>{title}</Text>
      <View style={{flexDirection: 'row', paddingLeft: 20, paddingRight: 20}}>
        <Text>{min}</Text>
        <Slider
          style={{flex: 1}}
          minimumValue={min}
          maximumValue={max}
          step={step}
          onValueChange={value => {
            onValueUpdated(value);
          }}
          value={value}
        />
        <Text>{max}</Text>
        <Text style={{paddingLeft: 10}}>
          {valueFormatter ? valueFormatter(value) : value}
        </Text>
      </View>
    </View>
  );
};
