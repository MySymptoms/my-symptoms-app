import React, { FC } from 'react';
import { Background } from './components/Background';
import { StackNavigationProp } from '@react-navigation/stack';
import { Icon, Icons } from './lib/icons';
import { FancyGradientChart } from './FancyGradientChart';
import { NavigationHeader } from './NavigationHeader';
import { StyleSheet, View } from 'react-native';
import { Colors } from './lib/colors';
import { fontName } from './lib/vars';
import { DoneButton } from './components/DoneButton';
import { SelectionGroup } from './components/SelectionGroup';
import { createDataPoint, getGraphDate } from './DetailedReportScreen';
import { Divider } from './components/Divider';
import { TrackMySymptomHeader } from './components/TrackMySymtomHeader';
import { useReportState } from './hooks/useReportState';
import { RootStackParamList } from '../App';
import { RouteProp } from '@react-navigation/native';
import { PaddedContainer, Row } from './components/Block';

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'DryCough'>;
  route: RouteProp<RootStackParamList, 'DryCough'>;
}

export const DryCoughInputScreen: FC<Props> = ({route}) => {
  const {currentReportDate} = route.params;
  const {setValues, values, onSave} = useReportState(
    currentReportDate,
    'dry_cough',
  );



  return (
    <Background
      header={
        <NavigationHeader
          center={<TrackMySymptomHeader symptomName="dry cough" />}
          showBackButton
        />
      }>
      <PaddedContainer>
        <Row>
          <Icon style={styles.emojiStyle} source={Icons.Mask} />
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
      </PaddedContainer>
        <SelectionGroup
          title="cough frequency"
          onOptionSelected={option =>
            setValues({
              frequency: option?.dataValue as
              | "none"
                | 'every_minute'
                | 'few_times_an_hour'
                | 'few_times_a_day',
            })
          }
          options={[
            {title: 'none', dataValue: "none"},
            {title: 'every minute', dataValue: 'every_minute'},
            {title: 'few times an hour', dataValue: 'few_times_an_hour'},
            {title: 'few times a day', dataValue: 'few_times_a_day'},
          ]}
        />
        <Divider />
        <SelectionGroup
          title="intensity"
          onOptionSelected={option => setValues({intensity: option?.dataValue as "none" | "bearable" | "harsh" | "physical_discomfort"})}
          options={[
            {title: 'none', color: Colors.stepOneColor, dataValue: 'none'},
            {
              title: 'bearable',
              color: Colors.stepTwoColor,
              dataValue: 'bearable',
            },
            {title: 'harsh', color: Colors.stepFourColor, dataValue: 'harsh'},
            {
              title: 'physical discomfort',
              color: Colors.stepFiveColor,
              dataValue: 'physical_discomfort',
            },
          ]}
        />
        <Divider />
        <SelectionGroup
          title="disruption"
          onOptionSelected={option => setValues({disruption: option?.dataValue as "daytime" | "nighttime"})}
          options={[
            {title: 'daytime', dataValue: 'daytime'},
            {title: 'nighttime', dataValue: 'nighttime'},
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
