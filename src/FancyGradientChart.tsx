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
import {format, isToday, parseISO} from 'date-fns';
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
  x: string;
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

export interface FancyGradientChartProps {
  getColor?: (value: number) => string;
  data: GraphDataPoint[];
  minY?: number;
  maxY?: number;
}

export const FancyGradientChart: React.FC<FancyGradientChartProps> = ({
  data,
  getColor = getColorForScaledValue,
  maxY = 5,
  minY = 0,
}) => {
  return (
    <VictoryChart
      scale={{x: 'time'}}
      minDomain={{y: minY}}
      maxDomain={{y: maxY}}
      width={350}
      height={150}
      theme={theme}>
      <Defs>{calculateLinearGradient(data, getColor)}</Defs>
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
            fill: ({datum}) => getColor(datum.y),
          },
        }}
        data={data}
      />
      <VictoryLabel x={50} y={167} text={'MAR'} style={labelStyle} />
      <VictoryAxis tickFormat={t => formatTick(parseISO(t))} />
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

function getColorForScaledValue(datum: number): string {
  return colors[datum - 1];
}

const calculateLinearGradient = (
  data: GraphDataPoint[],
  getColor: (d: number) => string,
) => {
  if (data.length <= 1) {
    return (
      <LinearGradient id="gradientStroke" x1="0%" x2="0%" y1="100%" y2="0%">
        <Stop offset="0%" stopColor={getColor(data[0].y)} />
      </LinearGradient>
    );
  }

  const maxValue = _.maxBy(data, 'y')!;
  const minValue = _.minBy(data, 'y')!;

  if (maxValue.y === minValue.y) {
    return (
      <LinearGradient id="gradientStroke" x1="0%" x2="0%" y1="100%" y2="0%">
        <Stop stopColor={getColor(maxValue.y)} />
      </LinearGradient>
    );
  }
  const uniqVals = _.uniq(data.map(d => d.y));
  const stepDistance = 100 / (uniqVals.length - 1);

  return (
    <LinearGradient id="gradientStroke" x1="0%" x2="0%" y1="100%" y2="0%">
      {_.range(minValue.y, maxValue.y + 1).map((v, i) => {
        return (
          <Stop
            key={i}
            offset={`${i * stepDistance}%`}
            stopColor={getColor(v)}
          />
        );
      })}
    </LinearGradient>
  );
};
