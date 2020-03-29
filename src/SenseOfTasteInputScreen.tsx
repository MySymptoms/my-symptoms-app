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
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from './reducers/rootReducer';
import {RootStackParamList} from 'App';
import {RouteProp} from '@react-navigation/native';
import {requestUpdateSymptomInReport} from './reducers/reportsReducer';
import {isDefined} from './lib/util';
import {FancyGradientChart} from './FancyGradientChart';
import {createDataPoint} from './DetailedReportScreen';
import {parseISO} from 'date-fns';
import {sortBy} from 'lodash';
import {SenseOfTasteSymptom, SymptomsRecord} from './reducers/symptoms';
import {TrackMySymptomHeader} from './components/TrackMySymtomHeader';

const useReportState = <TKey extends keyof SymptomsRecord>(
  currentReportDate: string,
  key: TKey,
) => {
  const dispatch = useDispatch();
  const onSave = (values: SymptomsRecord[TKey]['values']) => {
    dispatch(
      requestUpdateSymptomInReport<TKey>({
        date: currentReportDate,
        now: new Date(),
        symptomKey: key,
        symptom: values,
      }),
    );
  };

  return {onSave};
};

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'SenseOfTaste'>;
  route: RouteProp<RootStackParamList, 'SenseOfTaste'>;
}

export const SenseOfTasteInputScreen: FC<Props> = ({route, navigation}) => {
  const {currentReportDate} = route.params;

  const {onSave} = useReportState(currentReportDate, 'sense_of_taste');

  const data = useSelector((state: RootState) =>
    sortBy(
      Object.values(state.reports)
        .map(report => {
          console.log(report);
          const symptom = report.symptoms.sense_of_taste;
          if (symptom) {
            return {
              date: report.date,
              score: symptom.values.lost_sense_of_taste === 'yes' ? 3 : 1,
            };
          } else {
            return null;
          }
        })
        .filter(isDefined),
      r => r.date,
    ),
  );

  console.log(data)

  const [values, setValues] = useState<SenseOfTasteSymptom['values'] | null>(
    null,
  );

  return (
    <Background>
      <NavigationHeader
        center={<TrackMySymptomHeader symptomName="sense of taste" />}
        showBackButton
      />
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
          setValues(v =>
            v
              ? {
                  ...v,
                  lost_sense_of_taste: option.title as 'yes' | 'no',
                }
              : {
                  lost_sense_of_taste: option.title as 'yes' | 'no',
                },
          );
        }}
        options={[
          {title: 'yes', color: Colors.buttonLineBad},
          {title: 'no', color: Colors.buttonLineGood},
        ]}
      />

      <View style={styles.center}>
        <DoneButton
          style={{marginTop: 50}}
          onPress={() => {
            if (values) {
              onSave(values);
            }
            navigation.goBack();
          }}
        />
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
