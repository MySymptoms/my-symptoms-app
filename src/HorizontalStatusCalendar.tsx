import React, {useState, FC} from 'react';
import styled from 'styled-components/native';
import {fontName} from './lib/vars';
import SmoothPicker from 'react-native-smooth-picker';
import {Colors} from './lib/colors';
import {eachDayOfInterval, addDays, isPast, isToday, isFuture} from 'date-fns';

const padEndDays = 10;

const dates = eachDayOfInterval({
  start: new Date(2020, 1, 25),
  end: addDays(new Date(), padEndDays),
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

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

interface Props {
  style?: CssProps;
}

export const HorizontalStatusCalendar: FC<Props> = ({style}) => {
  const [selectedDateIndex, setSelectedDateIndex] = useState<number>(
    data.findIndex(d => isToday(d.date)),
  );

  return (
    <HorizontalView {...style}>
      <MonthText>
        {monthNames[data[selectedDateIndex].date.getMonth()]}
      </MonthText>
      <SmoothPicker
        magnet
        horizontal
        scrollAnimation
        initialScrollToIndex={dates.length - padEndDays}
        data={data}
        onSelected={({_item, index}: any) => setSelectedDateIndex(index)}
        renderItem={({item, index}: {item: DayEntry; index: number}) => {
          let DateTextComp = DateText;
          if (selectedDateIndex === index) {
            DateTextComp = SelectedDateText;
          } else if (isFuture(item.date) && !isToday(item.date)) {
            DateTextComp = FutureDateText;
          }
          return (
            <VeritalCenterAlignedView key={index}>
              <DateTextComp>{item.date.getDate()}</DateTextComp>
              {isPast(item.date) && !isToday(item.date) && (
                <StatusDot
                  color={item.hasData ? Colors.statusOn : Colors.statusOff}
                />
              )}
              {isToday(item.date) && <UnderScore />}
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

const UnderScore = styled.View`
  border: 2px solid white;
  width: 42px;
`;

const DateText = styled.Text`
  color: white;
  font-size: 18px;
  line-height: 26px;
  padding-bottom: 5px;
  font-family: ${fontName};
`;

const FutureDateText = styled(DateText)`
  font-style: normal;
  font-weight: normal;
  color: ${Colors.deactivatedText};
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
