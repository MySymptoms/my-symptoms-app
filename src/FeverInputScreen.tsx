import React, {FC, useState} from 'react';
import {Background} from './components/Background';
import {CircleButton, CircleButtonPlaceHolder} from './components/CircleButton';
import {StackNavigationProp} from '@react-navigation/stack';
import {Icon, Icons} from './lib/icons';
import {CenterTitleText, HeaderRow} from './components/Block';
import {FancyGradientChart} from './FancyGradientChart';
import {TextInput} from 'react-native-gesture-handler';
import {StyleSheet, View} from 'react-native';
import {Colors} from './lib/colors';
import {fontName} from './lib/vars';
import {DoneButton} from './components/DoneButton';
import {SegmentedControl} from './components/SegmentedControl';
import RadialGradient from 'react-native-radial-gradient';
import {BackIcon} from './components/BackIcon';

type Props = {
  navigation: StackNavigationProp<{}>;
};

export const FeverInputScreen: FC<Props> = ({navigation}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <Background>
      <HeaderRow>
        <CircleButton onPress={() => navigation.goBack()}>
          <BackIcon />
        </CircleButton>
        <CenterTitleText>TRACKING FEVER</CenterTitleText>
        <CircleButtonPlaceHolder />
      </HeaderRow>
      <View style={{flexDirection: 'row'}}>
        <Icon style={styles.emojiStyle} source={Icons.FaceWithThermometer} />
        <FancyGradientChart />
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        <SegmentedControl
          firstOption="C"
          secondOption="F"
          selectedIndex={selectedIndex}
          onTabPress={() => {
            setSelectedIndex((selectedIndex + 1) % 2);
          }}
        />
      </View>
      {/* radial-gradient(50% 50% at 50% 50%, rgba(21, 21, 21, 0) 45.83%, rgba(32, 32, 32, 0.77) 100%); */}
      <View style={styles.center}>
        <RadialGradient
          style={styles.tempInputContainer}
          colors={['rgba(32, 32, 32, 0.77)', 'rgba(21, 21, 21, 0)']}
          stops={[0.01, 1]}
          center={[80, 80]}
          radius={200}>
          <TextInput style={styles.tempInputText} value="37.6" />
        </RadialGradient>
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
