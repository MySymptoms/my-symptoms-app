import React, {FC} from 'react';
import {Background} from '../components/Background';
import {StackNavigationProp} from '@react-navigation/stack';
import {Icon, Icons} from '../lib/icons';
import {PaddedContainer, Row, Space} from '../components/Block';
import {StyleSheet, View} from 'react-native';
import {Colors} from '../lib/colors';
import {fontName} from '../lib/vars';
import {DoneButton} from '../components/DoneButton';
import {SelectionGroup, Option} from '../components/SelectionGroup';
import {NavigationHeader} from '../NavigationHeader';
import {Divider} from '../components/Divider';
import {useReportState} from '../hooks/useReportState';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../App';
import {TrackMySymptomHeader} from '../components/TrackMySymtomHeader';
import {useHistoricalDataForSymptom} from '../hooks/useHistoricalDataForSymptom';
import {SafeGraph} from '../SafeGraph';
import {useTranslation} from 'react-i18next';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'ShortnessOfBreath'>;
  route: RouteProp<RootStackParamList, 'ShortnessOfBreath'>;
};

export const ShortnessOfBreathInputScreen: FC<Props> = ({route}) => {
  const {t} = useTranslation();
  const {currentReportDate} = route.params;
  const {setValues, values, onSave} = useReportState(
    currentReportDate,
    'shortness_of_breath',
  );

  const data = useHistoricalDataForSymptom('shortness_of_breath');

  return (
    <Background
      header={
        <NavigationHeader
          center={<TrackMySymptomHeader symptomName={t("Shortness of breath")} />}
          showBackButton
        />
      }>
      <PaddedContainer>
        <Row>
          <Icon style={styles.emojiStyle} source={Icons.Yawn} />
          <SafeGraph data={data} />
        </Row>
        <SelectionGroup<
          | 'breathe_normally'
          | 'shortness_of_breath'
          | 'tightness_in_my_chest'
          | 'cannot_get_enough_air'
        >
          title={t("Describe the feeling")}
          selectedDataValue={values?.feeling}
          onOptionSelected={option =>
            setValues({
              feeling: option?.dataValue,
            })
          }
          options={[
            {
              title: t('breathe normally'),
              color: '#8cf081',
              dataValue: 'breathe_normally',
            },
            {
              title: t('Short of breath'),
              color: '#FFBC5C',
              dataValue: 'shortness_of_breath',
            },
            {
              title: t('tightness in my chest'),
              color: '#FF7A7A',
              dataValue: 'tightness_in_my_chest',
            },
            {
              title: t('cannot get enough air'),
              color: '#FF7A7A',
              dataValue: 'cannot_get_enough_air',
            },
          ]}
        />
        <Divider />
        <SelectionGroup<'fainting'>
          title={t("do you also feel")}
          selectedDataValue={values?.do_you_also_feel}
          onOptionSelected={option =>
            setValues({do_you_also_feel: option?.dataValue})
          }
          options={[{title: t('fainting'), dataValue: 'fainting'}]}
        />
        <Divider />
        <SelectionGroup<
          'comes_suddenly' | 'is_persistent' | 'interferes_with_daily_activity'
        >
          title={t("frequency")}
          selectedDataValue={values?.frequency}
          onOptionSelected={option => {
            setValues({
              frequency: option?.dataValue,
            });
          }}
          options={[
            {title: t('comes suddenly'), dataValue: 'comes_suddenly'},
            {title: t('is persistent'), dataValue: 'is_persistent'},
            {
              title: t('interferes with daily activity'),
              dataValue: 'interferes_with_daily_activity',
            },
          ]}
        />
        <Space />
        <View style={styles.center}>
          <DoneButton onPress={() => onSave(values)} />
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
