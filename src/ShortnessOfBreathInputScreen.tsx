import React, {FC} from 'react';
import {Background} from './components/Background';
import {CircleButton, CircleButtonPlaceHolder} from './components/CircleButton';
import {StackNavigationProp} from '@react-navigation/stack';
import {Icon, Icons} from './lib/icons';
import {CenterTitleText, HeaderRow} from './components/Block';
import {FancyGradientChart} from './FancyGradientChart';
import {StyleSheet, View} from 'react-native';
import {Colors} from './lib/colors';
import {fontName} from './lib/vars';
import {DoneButton} from './components/DoneButton';
import {BackIcon} from './components/BackIcon';
import {SelectionGroup} from './components/SelectionGroup';
import styled from 'styled-components/native';
import { NavigationHeader } from "./NavigationHeader";
import { createDataPoint, getGraphDate } from "./DetailedReportScreen";

type Props = {
  navigation: StackNavigationProp<{}>;
};

export const ShortnessOfBreathInputScreen: FC<Props> = ({navigation}) => {
  return (
    <Background>
      <NavigationHeader title={'TRACKING SHORTNESS OF BREATH'} showBackButton />
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
        onOptionSelected={() => {}}
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
        onOptionSelected={() => {}}
        options={[{title: 'fainting'}]}
      />
      <Divider />
      <SelectionGroup
        title="frequency"
        onOptionSelected={() => {}}
        options={[
          {title: 'comes suddenly'},
          {title: 'is persistent'},
          {title: 'interferes with daily activity'},
        ]}
      />
      <View style={styles.center}>
        <DoneButton style={{paddingTop: 50}} />
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

const Divider = styled.View`
  border-top-width: 1px;
  margin-top: 30px;
  margin-bottom: 30px;
`;
