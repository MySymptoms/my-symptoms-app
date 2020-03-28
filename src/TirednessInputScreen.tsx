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

type Props = {
  navigation: StackNavigationProp<{}>;
};

export const TirednessInputScreen: FC<Props> = ({navigation}) => {
  return (
    <Background>
      <NavigationHeader title={'TRACKING TIREDNESS'} showBackButton />
      <View style={{flexDirection: 'row'}}>
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
      </View>
      <SelectionGroup
        title="are you tired?"
        onOptionSelected={() => {}}
        options={[
          {title: 'yes', color: '#FF7A7A'},
          {title: 'no', color: '#8cf081'},
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
