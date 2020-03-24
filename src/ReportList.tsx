import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from './reducers/rootReducer';
import {View, Text, TouchableOpacity} from 'react-native';
import {format} from 'date-fns';

export const ReportList = () => {
  const reports = useSelector((state: RootState) => state.healthData.reports);
  console.log('reports', reports);

  return (
    <View>
      {reports.map(r => {
        return (
          <TouchableOpacity onPress={() => {}}>
            <View key={r.report.id}>
              <Text>{format(r.timestamp, 'yyyy-MM-dd HH:mm')}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
