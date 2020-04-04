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
import {RootStackParamList} from '../../App';
import {RouteProp} from '@react-navigation/native';
import {PaddedContainer, Row} from '../components/Block';
import {useReportState} from '../hooks/useReportState';
import {useHistoricalDataForSymptom} from '../hooks/useHistoricalDataForSymptom';
import {SafeGraph} from '../SafeGraph';
import { useTranslation } from 'react-i18next';

type Props = {
  route: RouteProp<RootStackParamList, 'RunnyNose'>;
};

export const RunnyNoseInputScreen: FC<Props> = ({route}) => {
  const {t} = useTranslation();
  const {currentReportDate} = route.params;
  const {setValues, values, onSave} = useReportState(
    currentReportDate,
    'runny_nose',
  );

  const data = useHistoricalDataForSymptom('runny_nose');

  return (
    <Background
      header={
        <NavigationHeader
          center={<TrackMySymptomHeader symptomName={t("Runny nose")} />}
          showBackButton
        />
      }>
      <PaddedContainer>
        <Row>
          <Icon style={styles.emojiStyle} source={Icons.Sneezing} />
          <SafeGraph data={data} />
        </Row>
        <SelectionGroup
          title={t("do you have a runny nose?")}
          selectedDataValue={values?.presense}
          onOptionSelected={option => {
            setValues({
              presense: option?.dataValue,
              frequency: option?.dataValue ? values?.frequency : undefined,
            });
          }}
          options={[
            {title: t('yes'), color: Colors.stepFiveColor, dataValue: true},
            {title: t('no'), color: Colors.stepOneColor, dataValue: false},
          ]}
        />
        <Divider />
        <SelectionGroup<'not_often' | 'often' | 'very_often'>
          title={t("frequency")}
          selectedDataValue={values?.frequency}
          onOptionSelected={option => {
            setValues({
              presense: option ? true : undefined,
              frequency: option?.dataValue,
            });
          }}
          options={[
            {title: t('not often'), dataValue: 'not_often'},
            {title: t('often'), dataValue: 'often'},
            {title: t('very often'), dataValue: 'very_often'},
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
