import React, {FC, useState} from 'react';
import styled from 'styled-components/native';
import {fontName} from './lib/vars';
import SmoothPicker from 'react-native-smooth-picker';
import {Colors} from './lib/colors';
import {
  addDays,
  eachDayOfInterval,
  isFuture,
  isPast,
  isToday,
  parseISO,
  add,
} from 'date-fns';
import {ViewStyle} from 'react-native';
import {format} from 'date-fns/esm';
import {formatDate} from './lib/util';
import {useSelector} from 'react-redux';
import {selectDateToReportId} from './reducers/dateToReportIdReducer';
import _ from 'lodash';

interface DayEntry {
  date: Date;
  hasData: boolean;
}

interface Props {
  style?: ViewStyle;
  onChange: (date: string) => void;
  value: string;
}

const padDays = 10;

export const HorizontalStatusCalendar: FC<Props> = ({
  style,
  value,
  onChange,
}) => {
  const daysWithReports = useSelector(selectDateToReportId).sort();
  const firstDateStr =
    _.first(daysWithReports) || formatDate(addDays(new Date(), -padDays));
  const dateSpan = eachDayOfInterval({
    start: addDays(parseISO(firstDateStr), -padDays),
    end: addDays(new Date(), padDays),
  });

  const data: DayEntry[] = dateSpan.map(date => {
    return {
      date,
      hasData: daysWithReports.includes(formatDate(date)),
    };
  });

  return (
    <HorizontalView {...style}>
      <MonthText>{format(parseISO(value), 'MMMM')}</MonthText>
      <SmoothPicker
        magnet
        horizontal
        scrollAnimation
        keyExtractor={(dayEntry: DayEntry) => String(dayEntry.date)}
        initialScrollToIndex={dateSpan.length - padDays - 1}
        data={data}
        onSelected={({item}: {item: DayEntry}) =>
          onChange(formatDate(item.date))
        }
        renderItem={({item, index}: {item: DayEntry; index: number}) => {
          let DateTextComp = DateText;
          if (formatDate(parseISO(value)) === formatDate(item.date)) {
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
