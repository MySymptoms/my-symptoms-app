import React, {FC} from 'react';
import {Background} from './components/Background';
import {StackNavigationProp} from '@react-navigation/stack';
import {Icon, Icons} from './lib/icons';
import {FancyGradientChart} from './FancyGradientChart';
import {StyleSheet, View} from 'react-native';
import {Colors} from './lib/colors';
import {fontName} from './lib/vars';
import {DoneButton} from './components/DoneButton';
import {SelectionGroup} from './components/SelectionGroup';
import {NavigationHeader} from './NavigationHeader';
import {createDataPoint, getGraphDate} from './DetailedReportScreen';
import {Divider} from './components/Divider';
import {TrackMySymptomHeader} from './components/TrackMySymtomHeader';
import {useReportState} from './hooks/useReportState';
import {RootStackParamList} from 'App';
import {RouteProp} from '@react-navigation/native';

type Props = {
  route: RouteProp<RootStackParamList, 'AchesAndPain'>;
};

export const AchesAndPainInputScreen: FC<Props> = ({route}) => {
  const {currentReportDate} = route.params;
  const {setValues, values, onSave} = useReportState(
    currentReportDate,
    'aches_and_pain',
  );

  return (
    <Background>
      <NavigationHeader
        center={<TrackMySymptomHeader symptomName="aches & pain" />}
        showBackButton
      />
      <View style={{flexDirection: 'row'}}>
        <Icon style={styles.emojiStyle} source={Icons.Sweat} />
        <FancyGradientChart
          data={[
            createDataPoint(getGraphDate(24), 1),
            createDataPoint(getGraphDate(25), 1),
            createDataPoint(getGraphDate(26), 2),
            createDataPoint(getGraphDate(27), 2),
            createDataPoint(getGraphDate(28), 3),
          ]}
        />
      </View>
      <SelectionGroup
        title="Do you have body ache?"
        onOptionSelected={option => {
          setValues({have_ache: option?.dataValue === 'yes'});
        }}
        options={[
          {title: 'yes', color: '#FF7A7A', dataValue: 'yes'},
          {title: 'no', color: '#8cf081', dataValue: 'no'},
        ]}
      />
      <Divider />
      <SelectionGroup
        title="frequency"
        onOptionSelected={option => {
          setValues({
            frequency: option?.dataValue as
              | 'not_often'
              | 'on-going'
              | 'persistent',
          });
        }}
        options={[
          {title: 'not often', dataValue: 'not_often'},
          {title: 'on-going', dataValue: 'on-going'},
          {title: 'persistent', dataValue: 'persistent'},
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
