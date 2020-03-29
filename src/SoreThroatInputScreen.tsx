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

type Props = {};

export const SoreThroatInputScreen: FC<Props> = () => {
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
          onOptionSelected={() => {}}
          options={[
            {title: 'easy to gulp', color: '#8cf081'},
            {title: 'scratchy', color: '#FFBC5C'},
            {title: 'difficult to swallow', color: '#FF7A7A'},
          ]}
        />
        <Divider />
        <SelectionGroup
          title="how does the back throat look?"
          onOptionSelected={() => {}}
          options={[{title: 'not inflamed'}, {title: 'inflamed & red'}]}
        />
        <View style={styles.center}>
          <DoneButton style={{marginTop: 50}} onPress={() => {}} />
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
