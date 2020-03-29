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
import {RootStackParamList} from '../App';
import {RouteProp} from '@react-navigation/native';
import {useReportState} from './hooks/useReportState';
import {Row, PaddedContainer} from './components/Block';
import { useHistoricalDataForSymptom } from "./hooks/useHistoricalDataForSymptom";
import { SafeGraph } from "./SafeGraph";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'SenseOfSmell'>;
  route: RouteProp<RootStackParamList, 'SenseOfSmell'>;
};

export const SenseOfSmellInputScreen: FC<Props> = ({route}) => {
  const {currentReportDate} = route.params;
  const {setValues, values, onSave} = useReportState(
    currentReportDate,
    'sense_of_smell',
  );

  const data = useHistoricalDataForSymptom('sense_of_smell');

  return (
    <Background
      header={
        <NavigationHeader
          center={<TrackMySymptomHeader symptomName="sense of smell" />}
          showBackButton
        />
      }>
      <PaddedContainer>
        <Row>
          <Icon style={styles.emojiStyle} source={Icons.Nose} />
          <SafeGraph graphDataPoints={data} />
        </Row>
        <SelectionGroup
          title="have you lost your sense of smell?"
          onOptionSelected={option => {
            setValues({
              description: option?.dataValue as
                | 'normal'
                | 'less_than_usual'
                | 'can_not_smell_anything',
            });
          }}
          options={[
            {title: 'normal', color: Colors.stepOneColor, dataValue: 'normal'},
            {
              title: 'Things smell less',
              color: Colors.stepThreeColor,
              dataValue: 'less_than_usual',
            },
            {
              title: "Can't smell anything",
              color: Colors.stepFiveColor,
              dataValue: 'can_not_smell_anything',
            },
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
