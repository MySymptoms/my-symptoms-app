import React, {FC, useState} from 'react';
import {Background} from './components/Background';
import {StackNavigationProp} from '@react-navigation/stack';
import {Icon, Icons} from './lib/icons';
import {NavigationHeader} from './NavigationHeader';
import {StyleSheet, View} from 'react-native';
import {Colors} from './lib/colors';
import {fontName} from './lib/vars';
import {DoneButton} from './components/DoneButton';
import {SelectionGroup} from './components/SelectionGroup';
import styled from 'styled-components/native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from './reducers/rootReducer';
import {RootStackParamList} from 'App';
import {RouteProp} from '@react-navigation/native';
import {requestUpdateSymptomInReport, Symptom} from './reducers/reportsReducer';
import {isDefined} from './lib/util';
import {FancyGradientChart} from './FancyGradientChart';
import {createDataPoint} from './DetailedReportScreen';
import {parseISO} from 'date-fns';

const useReportState = (currentReportDate: string) => {
  const dispatch = useDispatch();
  const onSave = (symptom: Symptom) => {
    dispatch(
      requestUpdateSymptomInReport({
        date: currentReportDate,
        now: new Date(),
        symptom,
      }),
    );
  };

  return {onSave};
};

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'SenseOfTaste'>;
  route: RouteProp<RootStackParamList, 'SenseOfTaste'>;
}

export const SenseOfTasteInputScreen: FC<Props> = ({route}) => {
  const {currentReportDate} = route.params;

  const {onSave} = useReportState(currentReportDate);

  const data = useSelector((state: RootState) =>
    Object.values(state.reports)
      .map(report => {
        const symptom = report.symptoms['senseOfTaste'];
        if (symptom) {
          return {
            date: report.date,
            score: symptom.values.have_you_lost_your_sense_of_taste ? 3 : 1,
          };
        } else {
          return null;
        }
      })
      .filter(isDefined),
  );

  const [values, setValues] = useState<Symptom>({
    symptom: 'senseOfTaste',
    values: {},
  });

  return (
    <Background>
      <NavigationHeader title={'TRACKING SENSE OF TASTE'} showBackButton />
      <View style={{flexDirection: 'row'}}>
        <Icon style={styles.emojiStyle} source={Icons.Food} />
        {data.length > 0 ? (
          <FancyGradientChart
            data={data.map(({date, score}) =>
              createDataPoint(parseISO(date), score),
            )}
          />
        ) : (
          <View style={{height: 150}} />
        )}
      </View>
      <SelectionGroup
        title="Have you lost your sense of taste?"
        onOptionSelected={option => {
          setValues(s => ({
            ...s,
            values: {
              ...s.values,
              have_you_lost_your_sense_of_taste: option.title === 'yes',
            },
          }));
        }}
        options={[
          {title: 'yes', color: Colors.buttonLineBad},
          {title: 'no', color: Colors.buttonLineGood},
        ]}
      />

      <View style={styles.center}>
        <DoneButton style={{marginTop: 50}} onPress={() => onSave(values)} />
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  tempInputContainer: {
    width: 170,
    height: 170,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: Colors.buttonBorder,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  tempInputText: {
    color: 'white',
    fontFamily: fontName,
    fontWeight: '500',
    fontSize: 48,
    lineHeight: 61,
  },
  center: {
    width: '100%',
    alignItems: 'center',
  },
  emojiStyle: {
    position: 'absolute',
    bottom: '30%',
  },
});
