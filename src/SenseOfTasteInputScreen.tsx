import React, {FC} from 'react';
import {Background} from './components/Background';
import {StackNavigationProp} from '@react-navigation/stack';
import {Icon, Icons} from './lib/icons';
import {NavigationHeader} from './NavigationHeader';
import {StyleSheet, View} from 'react-native';
import {Colors} from './lib/colors';
import {fontName} from './lib/vars';
import {DoneButton} from './components/DoneButton';
import {SelectionGroup} from './components/SelectionGroup';
import {useSelector} from 'react-redux';
import {RootState} from './reducers/rootReducer';
import {RootStackParamList} from 'App';
import {RouteProp} from '@react-navigation/native';
import {isDefined} from './lib/util';
import {FancyGradientChart} from './FancyGradientChart';
import {createDataPoint} from './DetailedReportScreen';
import {parseISO} from 'date-fns';
import {sortBy} from 'lodash';
import {useReportState} from './hooks/useReportState';
import {TrackMySymptomHeader} from './components/TrackMySymtomHeader';

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'SenseOfTaste'>;
  route: RouteProp<RootStackParamList, 'SenseOfTaste'>;
}

export const SenseOfTasteInputScreen: FC<Props> = ({route}) => {
  const {currentReportDate} = route.params;

  const {onSave, values, setValues} = useReportState(
    currentReportDate,
    'sense_of_taste',
  );

  const data = useSelector((state: RootState) =>
    sortBy(
      Object.values(state.reports)
        .map(report => {
          const symptom = report.symptoms.sense_of_taste;
          if (symptom) {
            return {
              date: report.date,
              score: symptom.values.description === 'normal' ? 1 : 3,
            };
          } else {
            return null;
          }
        })
        .filter(isDefined),
      r => r.date,
    ),
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
        title="How's your sense of taste?"
        onOptionSelected={option =>
          setValues({
            description: option?.dataValue as
              | 'normal'
              | 'less_than_usual'
              | 'can_not_taste_anything',
          })
        }
        options={[
          {title: 'normal', color: Colors.stepOneColor, dataValue: 'normal'},
          {
            title: 'Food tastes less than usual',
            color: Colors.stepThreeColor,
            dataValue: 'less_than_usual',
          },
          {
            title: "Can't taste anything",
            color: Colors.stepFiveColor,
            dataValue: 'can_not_taste_anything',
          },
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
