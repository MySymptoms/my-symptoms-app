import {Defs, LinearGradient, Stop} from 'react-native-svg';
import {
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryScatter,
  VictoryTheme,
} from 'victory-native';
import {VictoryThemeDefinition} from 'victory';
import React from 'react';
import {Colors} from './lib/colors';
import {format, isToday} from 'date-fns';
import {fontName} from './lib/vars';

const labelStyle = {
  fill: '#9D9D9D',
  fontFamily: fontName,
  fontSize: 12,
  fontWeight: 600,
};

const theme: VictoryThemeDefinition = {
  ...VictoryTheme.grayscale,
  axis: {
    ...VictoryTheme.grayscale.axis,
    style: {
      ...VictoryTheme.grayscale.axis.style,
      axis: {
        ...VictoryTheme.grayscale.axis.style.axis,
        stroke: '#000',
      },
      tickLabels: {
        ...VictoryTheme.grayscale.axis.style.tickLabels,
        ...labelStyle,
      },
    },
  },
};

export interface GraphDataPoint {
  x: number;
  y: number;
  date: Date;
}

const formatTick = (t: Date) => {
  if (isToday(t)) {
    return 'TODAY';
  } else {
    return format(t, 'd');
  }
};

export const FancyGradientChart: React.FC<{
  data: GraphDataPoint[];
}> = ({data}) => {
  return (
    <VictoryChart
      standalone={true}
      minDomain={{y: 0}}
      maxDomain={{y: 3}}
      width={350}
      height={150}
      theme={theme}>
      <Defs>
        <LinearGradient id="gradientStroke" x1="0%" x2="0%" y1="100%" y2="0%">
          <Stop offset="0%" stopColor={Colors.lowStopColor} />
          <Stop
            offset={
              data.every(d => d.y !== 1)
                ? '0%'
                : data.every(d => d.y !== 3)
                ? '100%'
                : '50%'
            }
            stopColor={Colors.mediumStopColor}
          />
          <Stop offset="100%" stopColor={Colors.highStopColor} />
        </LinearGradient>
      </Defs>
      <VictoryLine
        animate
        style={{
          data: {
            stroke: data.every(d => d.y === 1)
              ? Colors.lowStopColor
              : data.every(d => d.y === 3)
              ? Colors.highStopColor
              : 'url(#gradientStroke)',
          },
        }}
        data={data}
      />
      <VictoryScatter
        animate
        size={5}
        style={{
          data: {
            fill: ({datum}) =>
              datum.y > 2
                ? Colors.highStopColor
                : datum.y > 1
                ? Colors.mediumStopColor
                : Colors.lowStopColor,
          },
        }}
        data={data}
      />
      <VictoryLabel x={50} y={167} text={'MAR'} style={labelStyle} />
      <VictoryAxis
        tickCount={data.length}
        tickFormat={(t, index) => {
          if (index >= data.length) {
            return '';
          }
          return formatTick(data[index].date);
        }}
      />
    </VictoryChart>
  );
};
