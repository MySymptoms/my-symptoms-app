import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from './reducers/rootReducer';
import {View, Text, TouchableOpacity} from 'react-native';
import {format, parseISO} from 'date-fns';

export const ReportList = () => {
  const reports = useSelector((state: RootState) =>
    Object.values(state.reports),
  );

  return (
    <View>
      {reports.map(r => {
        return (
          <TouchableOpacity onPress={() => {}}>
            <View key={r.report_id}>
              <Text>{format(parseISO(r.updated_at), 'yyyy-MM-dd HH:mm')}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
