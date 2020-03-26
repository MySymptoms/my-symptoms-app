import React, {useState} from 'react';
import styled from 'styled-components/native';
import {fontName} from './lib/vars';
import SmoothPicker from 'react-native-smooth-picker';
import {Colors} from './lib/colors';
import {eachDayOfInterval, addDays, isFuture, getDaysInMonth} from 'date-fns';

const dates = eachDayOfInterval({
  start: new Date(2020, 2, 25),
  end: addDays(new Date(), 10),
});

const data: DayEntry[] = dates.map(date => {
  return {
    date,
    hasData: Math.random() < 0.5,
  };
});

interface DayEntry {
  date: Date;
  hasData: boolean;
}

export const HorizontalStatusCalendar = () => {
  const [selectedDateIndex, setSelectedDateIndex] = useState<number>(5);

  return (
    <HorizontalView>
      <MonthText>Mars</MonthText>
      <SmoothPicker
        magnet
        horizontal
        scrollAnimation
        data={data}
        onSelected={({_item, index}: any) => setSelectedDateIndex(index)}
        renderItem={({item, index}: {item: DayEntry; index: number}) => {
          const DateTextComp =
            selectedDateIndex === index ? SelectedDateText : DateText;
          return (
            <VeritalCenterAlignedView key={index}>
              <DateTextComp>{getDaysInMonth(item.date)}</DateTextComp>
              {isFuture(item.date) && (
                <StatusDot
                  color={item.hasData ? Colors.statusOn : Colors.statusOff}
                />
              )}
            </VeritalCenterAlignedView>
          );
        }}
      />
    </HorizontalView>
  );
};

interface StatusDotProps {
  color: string;
}

const DateText = styled.Text`
  color: white;
  font-size: 18px;
  line-height: 26px;
  padding-bottom: 5px;
  font-family: ${fontName};
`;

const SelectedDateText = styled(DateText)`
  font-weight: bold;
  font-size: 26px;
`;

const StatusDot = styled.View<StatusDotProps>`
  background-color: ${p => p.color};
  width: 5px;
  height: 5px;
  border-radius: 5px;
`;

const HorizontalView = styled.View`
  align-items: center;
`;

const VeritalCenterAlignedView = styled.View`
  align-items: center;
  padding-right: 5px;
  padding-left: 5px;
`;

const MonthText = styled.Text`
  font-family: ${fontName};
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  color: ${Colors.title};
`;
