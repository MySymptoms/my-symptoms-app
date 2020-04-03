import React, {FC} from 'react';
import {Background} from '../components/Background';
import {Icon, Icons} from '../lib/icons';
import {NavigationHeader} from '../NavigationHeader';
import {StyleSheet, View} from 'react-native';
import {Colors} from '../lib/colors';
import {fontName} from '../lib/vars';
import {DoneButton} from '../components/DoneButton';
import {SelectionGroup, Option} from '../components/SelectionGroup';
import {Divider} from '../components/Divider';
import {TrackMySymptomHeader} from '../components/TrackMySymtomHeader';
import {PaddedContainer, Row} from '../components/Block';
import {RootStackParamList} from '../../App';
import {RouteProp} from '@react-navigation/native';
import {useReportState} from '../hooks/useReportState';
import {useHistoricalDataForSymptom} from '../hooks/useHistoricalDataForSymptom';
import {SafeGraph} from '../SafeGraph';

type Props = {
  route: RouteProp<RootStackParamList, 'SoreThroat'>;
};

export const SoreThroatInputScreen: FC<Props> = ({route}) => {
  const {currentReportDate} = route.params;
  const {setValues, values, onSave} = useReportState(
    currentReportDate,
    'sore_throat',
  );

  const data = useHistoricalDataForSymptom('sore_throat');

  return (
    <Background
      header={
        <NavigationHeader
          center={<TrackMySymptomHeader symptomName="sore throat" />}
          showBackButton
        />
      }>
      <PaddedContainer>
        <Row>
          <Icon style={styles.emojiStyle} source={Icons.Weary} />
          <SafeGraph data={data} />
        </Row>
        <SelectionGroup<
          'normal' | 'easy_to_gulp' | 'scratchy' | 'difficult_to_swallow'
        >
          title="describe the feeling"
          selectedDataValue={values?.feeling}
          onOptionSelected={option => {
            setValues({
              feeling: option?.dataValue,
            });
          }}
          options={[
            {
              title: 'normal',
              color: Colors.stepOneColor,
              dataValue: 'normal',
            },
            {
              title: 'easy to gulp',
              color: Colors.stepTwoColor,
              dataValue: 'easy_to_gulp',
            },
            {
              title: 'scratchy',
              color: Colors.stepFourColor,
              dataValue: 'scratchy',
            },
            {
              title: 'difficult to swallow',
              color: Colors.stepFiveColor,
              dataValue: 'difficult_to_swallow',
            },
          ]}
        />
        <Divider />
        <SelectionGroup<'not_inflamed' | 'inflamed'>
          title="how does the back throat look?"
          selectedDataValue={values?.throat_color}
          onOptionSelected={option => {
            setValues({throat_color: option?.dataValue});
          }}
          options={[
            {title: 'not inflamed', dataValue: 'not_inflamed'},
            {title: 'inflamed & red', dataValue: 'inflamed'},
          ]}
        />
        <View style={styles.center}>
          <DoneButton
            style={{marginTop: 50}}
            onPress={() => {
              onSave(values);
            }}
          />
        </View>
      </PaddedContainer>
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
