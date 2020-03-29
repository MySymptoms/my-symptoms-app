import * as React from 'react';
import {FancyGradientChart, GraphDataPoint} from './FancyGradientChart';
import {Background} from './components/Background';
import {ScrollView} from 'react-native-gesture-handler';
import {differenceInCalendarDays} from 'date-fns';
import {PaddedContainer} from './components/Block';

export interface DetailedReportScreenProps {}

export const getGraphDate = (number: number): Date => {
  return new Date(2020, 2, number, 0, 0, 0, 0);
};

const getDayNumber = (graphDate: Date): number =>
  differenceInCalendarDays(graphDate, new Date(2020, 0, 1));

export const createDataPoint = (date: Date, point: number): GraphDataPoint => ({
  x: getDayNumber(date),
  date: date,
  y: point,
});

export const DetailedReportScreen: React.FC<DetailedReportScreenProps> = ({}) => {
  return (
    <Background style={{flex: 1}}>
      <PaddedContainer>
        <FancyGradientChart
          data={[
            createDataPoint(getGraphDate(24), 1),
            createDataPoint(getGraphDate(25), 2),
            createDataPoint(getGraphDate(26), 3),
            createDataPoint(getGraphDate(27), 4),
            createDataPoint(getGraphDate(28), 5),
          ]}
        />
        <FancyGradientChart
          data={[
            createDataPoint(getGraphDate(24), 3),
            createDataPoint(getGraphDate(25), 4),
            createDataPoint(getGraphDate(26), 5),
          ]}
        />
        <FancyGradientChart
          data={[
            createDataPoint(getGraphDate(24), 1),
            createDataPoint(getGraphDate(25), 2),
            createDataPoint(getGraphDate(26), 3),
            createDataPoint(getGraphDate(27), 1),
            createDataPoint(getGraphDate(28), 5),
            createDataPoint(getGraphDate(29), 4),
            createDataPoint(getGraphDate(30), 3),
            createDataPoint(getGraphDate(31), 1),
          ]}
        />
        <FancyGradientChart
          data={[
            createDataPoint(getGraphDate(24), 1),
            createDataPoint(getGraphDate(25), 1),
            createDataPoint(getGraphDate(26), 2),
            createDataPoint(getGraphDate(27), 2),
            createDataPoint(getGraphDate(28), 3),
          ]}
        />
        <FancyGradientChart
          data={[
            createDataPoint(getGraphDate(26), 2),
            createDataPoint(getGraphDate(27), 2),
            createDataPoint(getGraphDate(28), 3),
          ]}
        />
        <FancyGradientChart
          data={[
            createDataPoint(getGraphDate(26), 1),
            createDataPoint(getGraphDate(27), 2),
            createDataPoint(getGraphDate(28), 2),
          ]}
        />
        <FancyGradientChart
          data={[
            createDataPoint(getGraphDate(26), 2),
            createDataPoint(getGraphDate(27), 2),
            createDataPoint(getGraphDate(28), 2),
          ]}
        />
        <FancyGradientChart
          data={[
            createDataPoint(getGraphDate(26), 3),
            createDataPoint(getGraphDate(27), 3),
            createDataPoint(getGraphDate(28), 3),
          ]}
        />
        <FancyGradientChart
          data={[
            createDataPoint(getGraphDate(24), 1),
            createDataPoint(getGraphDate(25), 1),
            createDataPoint(getGraphDate(26), 1),
            createDataPoint(getGraphDate(27), 1),
          ]}
        />
        <FancyGradientChart
          data={[
            createDataPoint(getGraphDate(24), 1),
            createDataPoint(getGraphDate(25), 1),
            createDataPoint(getGraphDate(26), 3),
            createDataPoint(getGraphDate(27), 1),
            createDataPoint(getGraphDate(28), 1),
          ]}
        />
      </PaddedContainer>
    </Background>
  );
};
