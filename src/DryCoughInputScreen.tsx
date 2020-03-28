import React, {FC} from 'react';
import {Background} from './components/Background';
import {StackNavigationProp} from '@react-navigation/stack';
import {Icon, Icons} from './lib/icons';
import {FancyGradientChart} from './FancyGradientChart';
import {StyleSheet, View} from 'react-native';
import {Colors} from './lib/colors';
import {fontName} from './lib/vars';
import {DoneButton} from './components/DoneButton';
import {NavigationHeader} from './NavigationHeader';

type Props = {
  navigation: StackNavigationProp<{}>;
};

export const DryCoughInputScreen: FC<Props> = ({navigation}) => {
  return (
    <Background>
      <NavigationHeader title={'TRACKING DRY COUGH'} showBackButton />
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
