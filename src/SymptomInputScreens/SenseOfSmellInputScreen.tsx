import React, {FC} from 'react';
import {Background} from '../components/Background';
import {StackNavigationProp} from '@react-navigation/stack';
import {Icon, Icons} from '../lib/icons';
import {NavigationHeader} from '../NavigationHeader';
import {StyleSheet, View} from 'react-native';
import {Colors} from '../lib/colors';
import {fontName} from '../lib/vars';
import {DoneButton} from '../components/DoneButton';
import {SelectionGroup, Option} from '../components/SelectionGroup';
import {TrackMySymptomHeader} from '../components/TrackMySymtomHeader';
import {RootStackParamList} from '../../App';
import {RouteProp} from '@react-navigation/native';
import {useReportState} from '../hooks/useReportState';
import {PaddedContainer, Row} from '../components/Block';
import {useHistoricalDataForSymptom} from '../hooks/useHistoricalDataForSymptom';
import {SafeGraph} from '../SafeGraph';
import { useTranslation } from 'react-i18next';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'SenseOfSmell'>;
  route: RouteProp<RootStackParamList, 'SenseOfSmell'>;
};

export const SenseOfSmellInputScreen: FC<Props> = ({route}) => {
  const {currentReportDate} = route.params;
  const {setValues, values, onSave} = useReportState(
    currentReportDate,
    'sense_of_smell',
  );

  const data = useHistoricalDataForSymptom('sense_of_smell');

  const {t} = useTranslation()

  return (
    <Background
      header={
        <NavigationHeader
          center={<TrackMySymptomHeader symptomName={t("Sense of smell")} />}
          showBackButton
        />
      }>
      <PaddedContainer>
        <Row>
          <Icon style={styles.emojiStyle} source={Icons.Nose} />
          <SafeGraph data={data} />
        </Row>
        <SelectionGroup<'normal' | 'less_than_usual' | 'can_not_smell_anything'>
          title={t("have you lost your sense of smell?")}
          selectedDataValue={values?.description}
          onOptionSelected={option => {
            setValues({
              description: option?.dataValue,
            });
          }}
          options={[
            {title: 'normal', color: Colors.stepOneColor, dataValue: 'normal'},
            {
              title: t('Things smell less'),
              color: Colors.stepThreeColor,
              dataValue: 'less_than_usual',
            },
            {
              title: t("Can't smell anything"),
              color: Colors.stepFiveColor,
              dataValue: 'can_not_smell_anything',
            },
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
