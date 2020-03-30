import React from 'react';
import {Switch, Text, View} from 'react-native';

interface Props {
  title: string;
  onValueUpdated: (value: boolean) => void;
  value: boolean;
}

export const SwitchInput = ({title, onValueUpdated, value}: Props) => {
  return (
    <View>
      <Text>{title}</Text>
      <Switch onValueChange={onValueUpdated} value={value} />
    </View>
  );
};
