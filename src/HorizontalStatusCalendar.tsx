import React, {FC} from 'react';
import styled from 'styled-components/native';
import {fontName} from './lib/vars';
import {Colors} from './lib/colors';
import {
  addDays,
  eachDayOfInterval,
  endOfDay,
  isAfter,
  isToday,
  parseISO,
} from 'date-fns';
import {ViewStyle} from 'react-native';
import {format} from 'date-fns/esm';
import {formatDate} from './lib/util';
import {useSelector} from 'react-redux';
import {selectDateToReportId} from './reducers/dateToReportIdReducer';
import _ from 'lodash';
import HorizontalPicker from './HorizontalPicker';

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
  const dateValue = parseISO(value);

  return (
    <HorizontalView {...style}>
      <MonthText>{format(dateValue, 'MMMM')}</MonthText>
      <HorizontalPicker
        items={data}
        itemWidth={40}
        visibleItemCount={20}
        firstIndex={0}
        lastIndex={data.findIndex(item =>
          isAfter(item.date, endOfDay(new Date())),
        )}
        initialItem={data.find(item => value === formatDate(item.date))}
        onItemSelected={item => {
          if (item && !isAfter(item.date, endOfDay(new Date()))) {
            onChange(formatDate(item.date));
          }
        }}
        renderItem={item => {
          const date = item.date.getDate();

          return (
            <VerticalCenterAlignedView>
              {isAfter(item.date, endOfDay(new Date())) ? (
                <FutureDateText>{date}</FutureDateText>
              ) : (
                <SelectedDateText>{date}</SelectedDateText>
              )}
              {isToday(item.date) ? (
                <UnderScore />
              ) : (
                <StatusDot
                  color={item.hasData ? Colors.statusOn : Colors.statusOff}
                />
              )}
            </VerticalCenterAlignedView>
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

const VerticalCenterAlignedView = styled.View`
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
