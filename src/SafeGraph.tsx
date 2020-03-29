import {FancyGradientChart, GraphDataPoint} from './FancyGradientChart';
import {View} from 'react-native';
import React from 'react';

interface SafeGraphProps {
  isTemperature?: boolean;
  graphDataPoints: GraphDataPoint[];
}

export const SafeGraph: React.FC<SafeGraphProps> = ({
  graphDataPoints,
  isTemperature,
}) => (
  <>
    {graphDataPoints.length > 0 ? (
      <FancyGradientChart data={graphDataPoints} isTemperature={isTemperature} />
    ) : (
      <View style={{height: 150}} />
    )}
  </>
);
