import React, {FC} from 'react';
import {Background} from '../components/Background';
import {StackNavigationProp} from '@react-navigation/stack';
import {Icon, Icons} from '../lib/icons';
import {NavigationHeader} from '../NavigationHeader';
import {StyleSheet, View} from 'react-native';
import {Colors} from '../lib/colors';
import {fontName} from '../lib/vars';
import {DoneButton} from '../components/DoneButton';
import {SelectionGroup} from '../components/SelectionGroup';
import {Divider} from '../components/Divider';
import {TrackMySymptomHeader} from '../components/TrackMySymtomHeader';
import {useReportState} from '../hooks/useReportState';
import {RootStackParamList} from '../../App';
import {RouteProp} from '@react-navigation/native';
import {PaddedContainer, Row} from '../components/Block';
import {useHistoricalDataForSymptom} from '../hooks/useHistoricalDataForSymptom';
import {SafeGraph} from '../SafeGraph';
import {Option} from '../components/SelectionGroup';
import {useTranslation} from 'react-i18next';

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'DryCough'>;
  route: RouteProp<RootStackParamList, 'DryCough'>;
}

export const DryCoughInputScreen: FC<Props> = ({route}) => {
  const {t} = useTranslation();
  const {currentReportDate} = route.params;
  const {setValues, values, onSave} = useReportState(
    currentReportDate,
    'dry_cough',
  );

  const data = useHistoricalDataForSymptom('dry_cough');

  return (
    <Background
      header={
        <NavigationHeader
          center={<TrackMySymptomHeader symptomName={t("Dry Cough")} />}
          showBackButton
        />
      }>
      <PaddedContainer>
        <Row>
          <Icon style={styles.emojiStyle} source={Icons.Mask} />
          <SafeGraph data={data} />
        </Row>
      </PaddedContainer>
      <SelectionGroup<
        'none' | 'every_minute' | 'few_times_an_hour' | 'few_times_a_day'
      >
        title={t("cough frequency")}
        selectedDataValue={values?.frequency}
        onOptionSelected={option =>
          setValues({
            frequency: option?.dataValue,
          })
        }
        options={[
          {title: t('none'), dataValue: 'none'},
          {title: t('every minute'), dataValue: 'every_minute'},
          {title: t('few times an hour'), dataValue: 'few_times_an_hour'},
          {title: t('few times a day'), dataValue: 'few_times_a_day'},
        ]}
      />
      <Divider />
      <SelectionGroup<'none' | 'bearable' | 'harsh' | 'physical_discomfort'>
        title={t("intensity")}
        selectedDataValue={values?.intensity}
        onOptionSelected={option =>
          setValues({
            intensity: option?.dataValue,
          })
        }
        options={[
          {title: t('none'), color: Colors.stepOneColor, dataValue: 'none'},
          {
            title: t('bearable'),
            color: Colors.stepTwoColor,
            dataValue: 'bearable',
          },
          {title: t('harsh'), color: Colors.stepFourColor, dataValue: 'harsh'},
          {
            title: t('physical discomfort'),
            color: Colors.stepFiveColor,
            dataValue: 'physical_discomfort',
          },
        ]}
      />
      <Divider />
      <SelectionGroup<'daytime' | 'nighttime'>
        title={t("disruption")}
        selectedDataValue={values?.disruption}
        onOptionSelected={option => setValues({disruption: option?.dataValue})}
        options={[
          {title: t('daytime'), dataValue: 'daytime'},
          {title: t('nighttime'), dataValue: 'nighttime'},
        ]}
      />
      <PaddedContainer>
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
