import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {FC, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import RadialGradient from 'react-native-radial-gradient';
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

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Fever'>;
  route: RouteProp<RootStackParamList, 'Fever'>;
};

const temperatureUnits: TemperatureUnit[] = ['celsius', 'fahrenheit'];

export const FeverInputScreen: FC<Props> = ({route}) => {
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

  const [textValue, setTextValue] = useState(String(convertedTemperature));

  const dispatch = useDispatch();

  const data = useHistoricalDataForSymptom('fever');

  return (
    <Background
      header={
        <NavigationHeader
          center={<TrackMySymptomHeader symptomName="fever" />}
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
                  setTextValue(
                    convertToFahrenheit(parseFloat(textValue)).toString(10),
                  );
                } else {
                  setTextValue(
                    convertToCelsius(parseFloat(textValue)).toString(10),
                  );
                }
              } else {
                if (nextUnit === 'fahrenheit') {
                  setTextValue(
                    convertToFahrenheit(temperatureInCelsius).toString(10),
                  );
                } else {
                  setTextValue(String(temperatureInCelsius));
                }
              }
              dispatch(setTemperatureUnit(nextUnit));
            }}
          />
        </View>
        <View style={styles.center}>
          <RadialGradient
            style={styles.tempInputContainer}
            colors={['rgba(32, 32, 32, 0.77)', 'rgba(21, 21, 21, 0)']}
            stops={[0.01, 1]}
            center={[80, 80]}
            radius={200}>
            <TextInput
              style={styles.tempInputText}
              value={textValue}
              onChangeText={v => setTextValue(v)}
              keyboardType={'numeric'}
              maxLength={6}
              onFocus={() => (isEditing.current = true)}
              onEndEditing={() => {
                isEditing.current = false;
              }}
            />
          </RadialGradient>
          <Space />
          <DoneButton
            onPress={() => {
              onSave({
                degrees:
                  temperatureUnit === 'fahrenheit'
                    ? convertToCelsius(parseFloat(textValue))
                    : parseFloat(textValue),
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
