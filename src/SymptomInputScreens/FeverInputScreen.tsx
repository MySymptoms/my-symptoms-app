import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {FC, useCallback, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {RootStackParamList} from '../../App';
import {Background} from '../components/Background';
import {DoneButton} from '../components/DoneButton';
import {SegmentedControl} from '../components/SegmentedControl';
import {TrackMySymptomHeader} from '../components/TrackMySymtomHeader';
import {Colors} from '../lib/colors';
import {Icon, Icons} from '../lib/icons';
import {fontName} from '../lib/vars';
import {NavigationHeader} from '../NavigationHeader';
import {PaddedContainer, Space} from '../components/Block';
import {useHistoricalDataForSymptom} from '../hooks/useHistoricalDataForSymptom';
import {useReportState} from '../hooks/useReportState';
import {
  convertToCelsius,
  convertToFahrenheit,
  useTemperatureConvertedToUserPreference,
} from '../hooks/useTemperatureConvertedToUserPreference';
import {getColorForTemperature} from '../lib/symptomToColor';
import {setTemperatureUnit, TemperatureUnit} from '../reducers/userReducer';
import {SafeGraph} from '../SafeGraph';
import {useTranslation} from 'react-i18next';
import {DialInput} from '../components/DialInput';
import {TextInput} from 'react-native-gesture-handler';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Fever'>;
  route: RouteProp<RootStackParamList, 'Fever'>;
};

const temperatureUnits: TemperatureUnit[] = ['celsius', 'fahrenheit'];

const range = {start: 34, end: 45};

export const FeverInputScreen: FC<Props> = ({route}) => {
  const {t} = useTranslation();
  const isEditing = useRef(false);
  const {currentReportDate} = route.params;
  const {setValues, values, onSave} = useReportState(
    currentReportDate,
    'fever',
  );

  const temperatureInCelsius = values && values.degrees ? values.degrees : 36.7;

  const {
    temperatureUnit,
    convertedTemperature,
  } = useTemperatureConvertedToUserPreference(temperatureInCelsius);

  const dispatch = useDispatch();

  const data = useHistoricalDataForSymptom('fever');

  return (
    <Background
      header={
        <NavigationHeader
          center={<TrackMySymptomHeader symptomName={t('Fever')} />}
          showBackButton
        />
      }>
      <PaddedContainer>
        <View style={{flexDirection: 'row'}}>
          <Icon style={styles.emojiStyle} source={Icons.FaceWithThermometer} />
          <SafeGraph
            data={data}
            getColor={getColorForTemperature}
            minY={35}
            maxY={42}
          />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <SegmentedControl
            firstOption="C"
            secondOption="F"
            selectedIndex={temperatureUnits.indexOf(temperatureUnit)}
            onTabPress={() => {
              const nextUnit =
                temperatureUnits[
                  (temperatureUnits.indexOf(temperatureUnit) + 1) % 2
                ];
              if (isEditing.current) {
                if (nextUnit === 'fahrenheit') {
                  setValues({
                    degrees: convertToFahrenheit(convertedTemperature),
                  });
                } else {
                  setValues({degrees: convertToCelsius(convertedTemperature)});
                }
              } else {
                if (nextUnit === 'fahrenheit') {
                  setValues({
                    degrees: convertToFahrenheit(temperatureInCelsius),
                  });
                } else {
                  setValues({degrees: temperatureInCelsius});
                }
              }
              dispatch(setTemperatureUnit(nextUnit));
            }}
          />
        </View>
        <View style={styles.center}>
          <DialInput
            initialValue={convertedTemperature}
            onRelease={useCallback(v => setValues({degrees: v}), [setValues])}
            range={range}
            size={200}
            dialStrokeWidth={20}
          />
          <Space />
          <DoneButton
            onPress={() => {
              onSave({
                degrees:
                  temperatureUnit === 'fahrenheit'
                    ? convertToCelsius(convertedTemperature)
                    : convertedTemperature,
              });
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
