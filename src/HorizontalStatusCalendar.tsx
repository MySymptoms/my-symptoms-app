import React, { FC, useCallback } from 'react';
import styled from 'styled-components/native';
import { fontName } from './lib/vars';
import { Colors } from './lib/colors';
import { addDays, eachDayOfInterval, endOfDay, isAfter, isToday, parseISO, subDays, } from 'date-fns';
import { enGB, sv } from 'date-fns/locale';
import { ViewStyle } from 'react-native';
import { format } from 'date-fns/esm';
import { formatDate } from './lib/util';
import HorizontalPicker from './HorizontalPicker';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectDateToReportIdByDate } from './reducers/dateToReportIdReducer';
import { RootState } from './reducers/rootReducer';

interface DayEntry {
  date: Date;
  hasData: boolean;
}

interface Props {
  style?: ViewStyle;
  onChange: (date: string) => void;
  value: string;
}

const getDateFnsLocale = (i18nLocale: string) => {
  if (i18nLocale === 'sv') {
    return sv;
  } else {
    return enGB;
  }
};

const CalendarItem = React.memo(function CalendarItem({item}: {item: string}) {
  const hasReport = !!useSelector(
    useCallback((state: RootState) => selectDateToReportIdByDate(state, item), [
      item,
    ]),
  );
  const date = parseISO(item);
  const dayOfMonth = date.getDate();

  return (
    <VerticalCenterAlignedView>
      {isAfter(date, endOfDay(new Date())) ? (
        <FutureDateText>{dayOfMonth}</FutureDateText>
      ) : (
        <SelectedDateText>{dayOfMonth}</SelectedDateText>
      )}
      {isToday(date) ? (
        <UnderScore />
      ) : (
        <StatusDot color={hasReport ? Colors.statusOn : Colors.statusOff} />
      )}
    </VerticalCenterAlignedView>
  );
});

const dateSpan = eachDayOfInterval({
  start: subDays(new Date(), 30),
  end: addDays(new Date(), 10),
}).map(formatDate);

const renderItem = (item: string | undefined) => (
  <>{item && <CalendarItem item={item} />}</>
);

export const HorizontalStatusCalendar: FC<Props> = React.memo(
  ({style, value, onChange}) => {
    const dateValue = parseISO(value);

    const {i18n} = useTranslation();

    const onItemSelected = useCallback(
      item => {
        if (item && !isAfter(parseISO(item), endOfDay(new Date()))) {
          onChange(formatDate(parseISO(item)));
        }
      },
      [onChange],
    );

    return (
      <HorizontalView>
        <MonthText>
          {format(dateValue, 'MMMM', {locale: getDateFnsLocale(i18n.language)})}
        </MonthText>
        <HorizontalPicker
          items={dateSpan}
          itemWidth={50}
          visibleItemCount={10}
          firstIndex={0}
          lastIndex={dateSpan.findIndex(item =>
            isAfter(parseISO(item), endOfDay(new Date())),
          )}
          initialItem={value}
          onItemSelected={onItemSelected}
          renderItem={renderItem}
        />
      </HorizontalView>
    );
  },
);

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
  margin-bottom: 30px;
`;

const VerticalCenterAlignedView = styled.View`
  align-items: center;
  padding-right: 5px;
  padding-left: 5px;
  height: 45px;
  width: 50px;
`;

const MonthText = styled.Text`
  font-family: ${fontName};
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  color: ${Colors.title};
`;
