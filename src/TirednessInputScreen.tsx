import React, {FC} from 'react';
import {Background} from './components/Background';
import {StackNavigationProp} from '@react-navigation/stack';
import {Icon, Icons} from './lib/icons';
import {NavigationHeader} from './NavigationHeader';
import {View, StyleSheet} from 'react-native';
import {Colors} from './lib/colors';
import {fontName} from './lib/vars';
import {DoneButton} from './components/DoneButton';
import {SelectionGroup} from './components/SelectionGroup';
import {FancyGradientChart} from './FancyGradientChart';
import {createDataPoint, getGraphDate} from './DetailedReportScreen';
import {TrackMySymptomHeader} from './components/TrackMySymtomHeader';
import {useReportState} from './hooks/useReportState';
import {RootStackParamList} from '../App';
import {RouteProp} from '@react-navigation/native';
import {Row, PaddedContainer} from './components/Block';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Tiredness'>;
  route: RouteProp<RootStackParamList, 'Tiredness'>;
};

export const TirednessInputScreen: FC<Props> = ({route}) => {
  const {currentReportDate} = route.params;
  const {setValues, values, onSave} = useReportState(
    currentReportDate,
    'tiredness',
  );
  return (
    <Background
      header={
        <NavigationHeader
          center={<TrackMySymptomHeader symptomName="tiredness" />}
          showBackButton
        />
      }>
      <PaddedContainer>
        <Row>
          <Icon style={styles.emojiStyle} source={Icons.Bed} />
          <FancyGradientChart
            data={[
              createDataPoint(getGraphDate(24), 1),
              createDataPoint(getGraphDate(25), 1),
              createDataPoint(getGraphDate(26), 2),
              createDataPoint(getGraphDate(27), 2),
              createDataPoint(getGraphDate(28), 3),
            ]}
          />
        </Row>
        <SelectionGroup
          title="are you tired?"
          onOptionSelected={option =>
            setValues({
              description: option?.dataValue as
                | 'as_usual'
                | 'tired_but_not_bedridden'
                | 'mostly_bedridden'
                | 'can_get_to_the_bathroom'
                | 'cannot_get_out_of_bed',
            })
          }
          options={[
            {
              title: 'As usual',
              color: Colors.stepOneColor,
              dataValue: 'as_usual',
            },
            {
              title: 'Tired, but not bedridden',
              color: Colors.stepTwoColor,
              dataValue: 'tired_but_not_bedridden',
            },
            {
              title: 'Mostly bedridden',
              color: Colors.stepThreeColor,
              dataValue: 'mostly_bedridden',
            },
            {
              title: 'Can get to the bathroom',
              color: Colors.stepFourColor,
              dataValue: 'can_get_to_the_bathroom',
            },
            {
              title: 'Cannot get out of bed',
              color: Colors.stepFiveColor,
              dataValue: 'cannot_get_out_of_bed',
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
