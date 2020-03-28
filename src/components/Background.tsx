import React, {FC} from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export const Background: FC<{style?: ViewStyle}> = ({children, style}) => (
  <LinearGradient
    start={{x: 0.5, y: 1}}
    end={{x: 0.5, y: 0}}
    colors={['#000', 'rgba(37,37,37,0)']}
    locations={[0, 0.1502]}
    style={[styles.linearGradient, style]}>
    {children}
  </LinearGradient>
);

const styles = StyleSheet.create({
  linearGradient: {
    backgroundColor: '#2E2E2E',
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
});
