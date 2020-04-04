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
import {PaddedContainer} from '../components/Block';
import {RootStackParamList} from '../../App';
import {RouteProp} from '@react-navigation/native';
import {useReportState} from '../hooks/useReportState';
import {useHistoricalDataForSymptom} from '../hooks/useHistoricalDataForSymptom';
import {SafeGraph} from '../SafeGraph';
import { useTranslation } from 'react-i18next';

type Props = {
  route: RouteProp<RootStackParamList, 'Nausea'>;
};

export const NauseaInputScreen: FC<Props> = ({route}) => {
  const {t} = useTranslation();
  const {currentReportDate} = route.params;
  const {setValues, values, onSave} = useReportState(
    currentReportDate,
    'nausea',
  );

  const data = useHistoricalDataForSymptom('nausea');

  return (
    <Background
      header={
        <NavigationHeader
          center={<TrackMySymptomHeader symptomName={t("Nausea")} />}
          showBackButton
        />
      }>
      <PaddedContainer>
        <View style={{flexDirection: 'row'}}>
          <Icon style={styles.emojiStyle} source={Icons.Nauseated} />
          <SafeGraph data={data} />
        </View>
        <SelectionGroup
          title={t("do you have nausea?")}
          selectedDataValue={values?.presense}
          onOptionSelected={option => {
            setValues({
              presense:
                option?.dataValue !== null ? option?.dataValue : undefined,
              frequency: option?.dataValue ? values?.frequency : undefined,
            });
          }}
          options={[
            {title: 'yes', color: Colors.stepFiveColor, dataValue: true},
            {title: 'no', color: Colors.stepOneColor, dataValue: false},
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
