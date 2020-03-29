import {FancyGradientChart, GraphDataPoint} from './FancyGradientChart';
import {View} from 'react-native';
import React from 'react';

interface SafeGraphProps {
  graphDataPoints: GraphDataPoint[];
}

export const SafeGraph: React.FC<SafeGraphProps> = ({graphDataPoints}) => (
  <>
    {graphDataPoints.length > 0 ? (
      <FancyGradientChart data={graphDataPoints} />
    ) : (
      <View style={{height: 150}} />
    )}
  </>
);
