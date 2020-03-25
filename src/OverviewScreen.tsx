import React from 'react';
import styled from 'styled-components/native';
import {Text, StyleSheet, View, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {CircleButton} from './CircleButton';
import Hedgehog from '../assets/hedgehog.png';

export const OverviewScreen = () => {
  return (
    <LinearGradient
      colors={['#000000', '#rgba(37,37,37,0)', '#2E2E2E']}
      style={styles.linearGradient}>
      <View>
        <CircleButton>
          <Image source={Hedgehog} />
        </CircleButton>
        <Text style={{color: 'white'}}>TRACK MY COVID</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});
