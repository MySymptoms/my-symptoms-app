import React, {FC} from 'react';
import {Background} from '../components/Background';
import {Icon, Icons} from '../lib/icons';
import {StyleSheet, View} from 'react-native';
import {Colors} from '../lib/colors';
import {fontName} from '../lib/vars';
import {DoneButton} from '../components/DoneButton';
import {SelectionGroup, Option} from '../components/SelectionGroup';
import {NavigationHeader} from '../NavigationHeader';
import {Divider} from '../components/Divider';
import {TrackMySymptomHeader} from '../components/TrackMySymtomHeader';
import {PaddedContainer, Row} from '../components/Block';
import {useReportState} from '../hooks/useReportState';
import {RootStackParamList} from '../../App';
import {RouteProp} from '@react-navigation/native';
import {useHistoricalDataForSymptom} from '../hooks/useHistoricalDataForSymptom';
import {SafeGraph} from '../SafeGraph';
import {useTranslation} from 'react-i18next';


type Props = {
  route: RouteProp<RootStackParamList, 'AchesAndPain'>;
};

export const AchesAndPainInputScreen: FC<Props> = ({route}) => {
  const {t} = useTranslation();
  const {currentReportDate} = route.params;
  const {setValues, values, onSave} = useReportState(
    currentReportDate,
    'aches_and_pain',
  );

  const data = useHistoricalDataForSymptom('aches_and_pain');

  return (
    <Background
      header={
        <NavigationHeader
          center={<TrackMySymptomHeader symptomName={t("Aches & Pains")} />}
          showBackButton
        />
      }>
      <PaddedContainer>
        <Row>
          <Icon style={styles.emojiStyle} source={Icons.Sweat} />
          <SafeGraph data={data} />
        </Row>
        <SelectionGroup
          title={t("Do you have body ache?")}
          selectedDataValue={values?.have_ache}
          onOptionSelected={option => {
            setValues({
              have_ache: option?.dataValue,
              frequency: option?.dataValue ? values?.frequency : undefined,
            });
          }}
          options={[
            {title: t('yes'), color: '#FF7A7A', dataValue: true},
            {title: t('no'), color: '#8cf081', dataValue: false},
          ]}
        />
        <Divider />
        <SelectionGroup<'not_often' | 'on-going' | 'persistent'>
          title={t("frequency")}
          selectedDataValue={values?.frequency}
          onOptionSelected={option => {
            setValues({
              have_ache: option ? true : undefined,
              frequency: option?.dataValue,
            });
          }}
          options={[
            {title: t('not often'), dataValue: 'not_often'},
            {title: t('on-going'), dataValue: 'on-going'},
            {title: t('persistent'), dataValue: 'persistent'},
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
