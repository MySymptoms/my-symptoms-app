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
import {RootStackParamList} from '../../App';
import {RouteProp} from '@react-navigation/native';
import {useReportState} from '../hooks/useReportState';
import {TrackMySymptomHeader} from '../components/TrackMySymtomHeader';
import {PaddedContainer, Row} from '../components/Block';
import {useHistoricalDataForSymptom} from '../hooks/useHistoricalDataForSymptom';
import {SafeGraph} from '../SafeGraph';
import { useTranslation } from 'react-i18next';


interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'SenseOfTaste'>;
  route: RouteProp<RootStackParamList, 'SenseOfTaste'>;
}

export const SenseOfTasteInputScreen: FC<Props> = ({route}) => {
  const {t} = useTranslation();
  const {currentReportDate} = route.params;

  const {onSave, values, setValues} = useReportState(
    currentReportDate,
    'sense_of_taste',
  );

  const data = useHistoricalDataForSymptom('sense_of_taste');

  return (
    <Background
      header={
        <NavigationHeader
          center={<TrackMySymptomHeader symptomName={t("Sense of taste")} />}
          showBackButton
        />
      }>
      <PaddedContainer>
        <Row>
          <Icon style={styles.emojiStyle} source={Icons.Food} />
          <SafeGraph data={data} />
        </Row>
        <SelectionGroup<'normal' | 'less_than_usual' | 'can_not_taste_anything'>
          title={t("How's your sense of taste?")}
          selectedDataValue={values?.description}
          onOptionSelected={option =>
            setValues({
              description: option?.dataValue,
            })
          }
          options={[
            {title: t('normal'), color: Colors.stepOneColor, dataValue: 'normal'},
            {
              title: t('Food tastes less than usual'),
              color: Colors.stepThreeColor,
              dataValue: 'less_than_usual',
            },
            {
              title: t("Can't taste anything"),
              color: Colors.stepFiveColor,
              dataValue: 'can_not_taste_anything',
            },
          ]}
        />
        <View style={styles.center}>
          <DoneButton style={{marginTop: 50}} onPress={() => onSave(values)} />
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
