import React from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {selectLatestReport} from './reducers/rootReducer';
import _ from 'lodash';
import {interpolateRdYlGn} from 'd3-scale-chromatic';
import {HealthReport} from './reducers/healthDataReducer';

export const HealthReportComponent = () => {
  const reportEntry = useSelector(selectLatestReport);
  if (!reportEntry) {
    return (
      <View>
        <Text>No report with that id</Text>
      </View>
    );
  }

  return (
    <View style={{backgroundColor: colorFromReport(reportEntry.report)}}>
      {_.keys(reportEntry.report).map(key => (
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View style={{flex: 1}}>
            <Text>{key}</Text>
          </View>
          <Text style={{flex: 1}}>
            {reportEntry.report[key as keyof HealthReport]}
          </Text>
        </View>
      ))}
    </View>
  );
};

const colorFromReport = (report: HealthReport): string => {
  let normalizedVal = 0;
  // TODO you can't measure feaver like this? Need to know the persons normal temp.
  // according to this calculation 35 is optimal temperature.
  const normalizedValues = [
    (report.fever - 35) / 8,
    report.achesAndPains / 10,
    report.diarrhoea / 10,
    report.dryCough / 10,
    report.isFeaver ? 1 : 0,
    report.nausea / 10,
    report.runnyNose / 10,
    report.shortnessOfBreath / 10,
    report.soreThroat / 10,
    report.tiredness / 10,
  ];
  //interpolateRdYlGn(Math.random())
  return interpolateRdYlGn(
    1 - _.sum(normalizedValues) / normalizedValues.length,
  );
};
