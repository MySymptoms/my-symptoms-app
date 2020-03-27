import {Defs, LinearGradient, Stop} from 'react-native-svg';
import {
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryTheme,
} from 'victory-native';
import React from 'react';

export const FancyGradientChart = () => (
  <VictoryChart width={350} theme={VictoryTheme.grayscale}>
    <Defs>
      <LinearGradient id="gradientStroke" x1="0%" x2="0%" y1="0%" y2="100%">
        <Stop offset="0%" stopColor={'#c43a31'} />
        <Stop offset="50%" stopColor={'#FFBC5C'} />
        <Stop offset="100%" stopColor={'#8CF081'} />
      </LinearGradient>
    </Defs>
    <VictoryLine
      animate
      style={{
        data: {
          stroke: 'url(#gradientStroke)',
        },
      }}
      data={[
        {x: 1, y: 2},
        {x: 2, y: 3},
        {x: 3, y: 5},
        {x: 4, y: 4},
        {x: 5, y: 7},
      ]}
    />
    <VictoryScatter
      animate
      style={{
        data: {
          fill: ({datum}) =>
            datum.y > 5 ? '#c43a31' : datum.y > 3 ? '#FFBC5C' : '#84ff89',
        },
      }}
      data={[
        {x: 1, y: 2},
        {x: 2, y: 3},
        {x: 3, y: 5},
        {x: 4, y: 4},
        {x: 5, y: 7},
      ]}
    />
  </VictoryChart>
);
