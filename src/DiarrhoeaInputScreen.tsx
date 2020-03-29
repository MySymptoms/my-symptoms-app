import React, {FC} from 'react';
import {Background} from './components/Background';
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
  route: RouteProp<RootStackParamList, 'Diarrhoea'>;
};

export const DiarrhoeaInputScreen: FC<Props> = ({route}) => {
  const {currentReportDate} = route.params;
  const {setValues, values, onSave} = useReportState(
    currentReportDate,
    'diarrhoea',
  );

  return (
    <Background
      header={
        <NavigationHeader
          center={<TrackMySymptomHeader symptomName="diarrhoea" />}
          showBackButton
        />
      }>
      <PaddedContainer>
        <Row>
          <Icon style={styles.emojiStyle} source={Icons.Toilet} />
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
          title="do you have diarrhoea?"
          onOptionSelected={option => {
            switch (option?.dataValue) {
              case 'yes':
                setValues({presense: true});
                break;
              case 'no':
                setValues({presense: false});
                break;
              default:
                setValues({presense: undefined});
                break;
            }
            setValues({presense: option?.dataValue === 'yes'});
          }}
          options={[
            {title: 'yes', color: Colors.stepFiveColor, dataValue: 'yes'},
            {title: 'no', color: Colors.stepOneColor, dataValue: 'no'},
          ]}
        />
        <Divider />
        <SelectionGroup
          title="frequency"
          onOptionSelected={option => {
            setValues({
              frequency: option?.dataValue as
                | 'not_often'
                | 'often'
                | 'very_often',
            });
          }}
          options={[
            {title: 'not often', dataValue: 'not_often'},
            {title: 'often', dataValue: 'often'},
            {title: 'very often', dataValue: 'very_often'},
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
