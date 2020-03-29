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
import {Divider} from './components/Divider';
import {TrackMySymptomHeader} from './components/TrackMySymtomHeader';
import {Row, PaddedContainer} from './components/Block';
import {RootStackParamList} from 'App';
import {RouteProp} from '@react-navigation/native';
import {useReportState} from './hooks/useReportState';

type Props = {
  route: RouteProp<RootStackParamList, 'SoreThroat'>;
};

export const SoreThroatInputScreen: FC<Props> = ({route}) => {
  const {currentReportDate} = route.params;
  const {setValues, values, onSave} = useReportState(
    currentReportDate,
    'sore_throat',
  );

  return (
    <Background
      header={
        <NavigationHeader
          center={<TrackMySymptomHeader symptomName="sore throat" />}
          showBackButton
        />
      }>
      <PaddedContainer>
        <Row>
          <Icon style={styles.emojiStyle} source={Icons.Weary} />
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
          title="describe the feeling"
          onOptionSelected={option => {
            setValues({
              feeling: option?.dataValue as
                | 'normal'
                | 'easy_to_gulp'
                | 'scratchy'
                | 'difficult_to_swallow',
            });
          }}
          options={[
            {
              title: 'normal',
              color: Colors.stepOneColor,
              dataValue: 'easy_to_gulp',
            },
            {
              title: 'easy to gulp',
              color: Colors.stepTwoColor,
              dataValue: 'easy_to_gulp',
            },
            {
              title: 'scratchy',
              color: Colors.stepFourColor,
              dataValue: 'scratchy',
            },
            {
              title: 'difficult to swallow',
              color: Colors.stepFiveColor,
              dataValue: 'difficult_to_swallow',
            },
          ]}
        />
        <Divider />
        <SelectionGroup
          title="how does the back throat look?"
          onOptionSelected={option => {
            setValues({});
          }}
          options={[
            {title: 'not inflamed', dataValue: 'not_inflamed'},
            {title: 'inflamed & red', dataValue: 'inflamed'},
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
