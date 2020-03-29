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
import _ from 'lodash';

const labelStyle = {
  fill: '#9D9D9D',
  fontFamily: fontName,
  fontSize: 12,
  fontWeight: 600,
};

const theme: VictoryThemeDefinition = {
  ...VictoryTheme.grayscale,
  // @ts-ignore
  axis: {
    ...VictoryTheme.grayscale.axis,
    style: {
      // @ts-ignore
      ...VictoryTheme.grayscale.axis.style,
      axis: {
        // @ts-ignore
        ...VictoryTheme.grayscale.axis.style.axis,
        stroke: '#000',
      },
      tickLabels: {
        // @ts-ignore
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
      maxDomain={{y: 6}}
      width={350}
      height={150}
      theme={theme}>
      <Defs>{calculateLinearGradient(data)}</Defs>
      <VictoryLine
        animate
        style={{
          data: {
            stroke: 'url(#gradientStroke)',
          },
        }}
        data={data}
      />
      <VictoryScatter
        animate
        size={5}
        style={{
          data: {
            fill: ({datum}) => colors[datum.y - 1],
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

const colors = [
  Colors.stepOneColor,
  Colors.stepTwoColor,
  Colors.stepThreeColor,
  Colors.stepFourColor,
  Colors.stepFiveColor,
];

const offsets = ['0%', '25%', '50%', '75%', '100%'];

const calculateLinearGradient = (data: GraphDataPoint[]) => {
  console.log(data);

  if (data.length <= 1) {
    return (
      <LinearGradient id="gradientStroke" x1="0%" x2="0%" y1="100%" y2="0%">
        <Stop offset="0%" stopColor={colors[data[0].y]} />
      </LinearGradient>
    );
  }

  const maxValue = _.maxBy(data, 'y')!;
  const minValue = _.minBy(data, 'y')!;

  if (maxValue.y === minValue.y) {
    console.log('Not this');

    return (
      <LinearGradient id="gradientStroke" x1="0%" x2="0%" y1="100%" y2="0%">
        <Stop stopColor={colors[maxValue.y - 1]} />
      </LinearGradient>
    );
  }
  console.log('This');

  const uniqVals = _.uniq(data.map(d => d.y));
  const stepDistance = 100 / (uniqVals.length - 1);

  return (
    <LinearGradient id="gradientStroke" x1="0%" x2="0%" y1="100%" y2="0%">
      {_.range(minValue.y, maxValue.y + 1).map((v, i) => {
        console.log(v, colors[v - 1], `${i * stepDistance}%`);

        return (
          <Stop
            key={i}
            offset={`${i * stepDistance}%`}
            stopColor={colors[v - 1]}
          />
        );
      })}
    </LinearGradient>
  );
};
