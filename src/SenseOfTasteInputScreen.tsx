import React, {FC, useState} from 'react';
import {Background} from './components/Background';
import {StackNavigationProp} from '@react-navigation/stack';
import {Icon, Icons} from './lib/icons';
import {NavigationHeader} from './NavigationHeader';
import {View, StyleSheet} from 'react-native';
import {Colors} from './lib/colors';
import {fontName} from './lib/vars';
import {DoneButton} from './components/DoneButton';
import {SelectionGroup} from './components/SelectionGroup';
import styled from 'styled-components/native';
import {FancyGradientChart} from './FancyGradientChart';
import {createDataPoint} from './DetailedReportScreen';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from './reducers/rootReducer';
import {RootStackParamList} from 'App';
import {RouteProp} from '@react-navigation/native';
import {requestUpdateSymptomInReport, Symptom} from './reducers/reportsReducer';
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
    Object.values(state.reports).map(report => ({
      date: report.date,
      symptom: report.symptoms['senseOfTaste'],
    })),
  );

  const [values, setValues] = useState<Symptom>({
    symptom: 'senseOfTaste',
    values: {},
  });

  return (
    <Background>
      <NavigationHeader title={'TRACKING NAUSEA'} showBackButton />
      <View style={{flexDirection: 'row'}}>
        <Icon style={styles.emojiStyle} source={Icons.Food} />
        <FancyGradientChart
          data={data.map(({date}) =>
            createDataPoint(parseISO(date), Math.floor(Math.random() * 3) + 1),
          )}
        />
      </View>
      <SelectionGroup
        title="Have you lost your sense of taste?"
        onOptionSelected={() => {
          setValues({...values});
        }}
        options={[
          {title: 'yes', color: Colors.buttonLineBad},
          {title: 'no', color: Colors.buttonLineGood},
        ]}
      />

      <View style={styles.center}>
        <DoneButton style={{paddingTop: 50}} onPress={() => onSave(values)} />
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

const Divider = styled.View`
  border-top-width: 1px;
  margin-top: 30px;
  margin-bottom: 30px;
`;
