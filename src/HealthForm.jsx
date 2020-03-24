import React from 'react';
import {View, Text} from 'react-native';
import {SliderInput} from './SliderInput';

export const HealthForm = () => {
  return (
    <View>
      <Text>Health Form</Text>
      <SliderInput
        title="Temperature"
        min={35}
        max={43}
        onValueUpdated={() => {}}
      />
    </View>
  );
};
