import React, {FC, useState} from 'react';
import {Background} from './components/Background';
import {CircleButton, CircleButtonPlaceHolder} from './components/CircleButton';
import {StackNavigationProp} from '@react-navigation/stack';
import {Icon, Icons} from './lib/icons';
import {CenterTitleText, HeaderRow} from './components/Block';
import {FancyGradientChart} from './FancyGradientChart';
import {View, StyleSheet} from 'react-native';
import {Colors} from './lib/colors';
import {fontName} from './lib/vars';
import {DoneButton} from './components/DoneButton';

type Props = {
  navigation: StackNavigationProp<{}>;
};

export const DryCoughInputScreen: FC<Props> = ({navigation}) => {
  return (
    <Background>
      <HeaderRow>
        <CircleButton onPress={() => navigation.goBack()}>
          <Icon source={Icons.BackArrow} />
        </CircleButton>
        <CenterTitleText>TRACKING DRY COUGH</CenterTitleText>
        <CircleButtonPlaceHolder />
      </HeaderRow>
      <View style={{flexDirection: 'row'}}>
        <Icon style={styles.emojiStyle} source={Icons.Mask} />
        <FancyGradientChart />
      </View>
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
