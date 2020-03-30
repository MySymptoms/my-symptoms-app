import {
  FancyGradientChart,
  FancyGradientChartProps,
} from './FancyGradientChart';
import {View} from 'react-native';
import React from 'react';

export const SafeGraph: React.FC<FancyGradientChartProps> = props =>
  props.data.length > 0 ? (
    <FancyGradientChart {...props} />
  ) : (
    <View style={{height: 150}} />
  );
