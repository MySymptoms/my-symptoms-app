import React, {FC} from 'react';
import {Background} from './components/Background';
import {StackNavigationProp} from '@react-navigation/stack';
import {Icon, Icons} from './lib/icons';
import {Space} from './components/Block';
import {FancyGradientChart} from './FancyGradientChart';
import {StyleSheet, View} from 'react-native';
import {Colors} from './lib/colors';
import {fontName} from './lib/vars';
import {DoneButton} from './components/DoneButton';
import {SelectionGroup} from './components/SelectionGroup';
import {NavigationHeader} from './NavigationHeader';
import {createDataPoint, getGraphDate} from './DetailedReportScreen';
import {Divider} from './components/Divider';
import {useReportState} from './hooks/useReportState';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../App';
import {TrackMySymptomHeader} from './components/TrackMySymtomHeader';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'ShortnessOfBreath'>;
  route: RouteProp<RootStackParamList, 'ShortnessOfBreath'>;
};

export const ShortnessOfBreathInputScreen: FC<Props> = ({route}) => {
  const {currentReportDate} = route.params;
  const {setValues, values, onSave} = useReportState(
    currentReportDate,
    'shortness_of_breath',
  );
  return (
    <Background>
      <NavigationHeader
        center={<TrackMySymptomHeader symptomName="shortness of breath" />}
        showBackButton
      />
      <View style={{flexDirection: 'row'}}>
        <Icon style={styles.emojiStyle} source={Icons.Yawn} />
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
        title="Describe the feeling"
        onOptionSelected={option =>
          setValues({
            feeling: option.title as
              | 'breathe_normally'
              | 'shortness of breath'
              | 'tightness in my chest'
              | 'cannot get enough air',
          })
        }
        options={[
          {title: 'breathe normally', color: '#8cf081'},
          {title: 'Short of breath', color: '#FFBC5C'},
          {title: 'tightness in my chest', color: '#FF7A7A'},
          {title: 'cannot get enough air', color: '#FF7A7A'},
        ]}
      />
      <Divider />
      <SelectionGroup
        title="do you also feel"
        onOptionSelected={option => setValues({do_you_also_feel: option.title})}
        options={[{title: 'fainting'}]}
      />
      <Divider />
      <SelectionGroup
        title="frequency"
        onOptionSelected={option => setValues({frequency: option.title})}
        options={[
          {title: 'comes suddenly'},
          {title: 'is persistent'},
          {title: 'interferes with daily activity'},
        ]}
      />
      <Space />
      <View style={styles.center}>
        <DoneButton onPress={() => onSave(values)} />
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
