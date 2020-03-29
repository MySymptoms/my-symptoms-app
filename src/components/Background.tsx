import React, {FC} from 'react';
import {StyleSheet, ViewStyle, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ScrollView} from 'react-native-gesture-handler';

export const Background: FC<{style?: ViewStyle; header?: React.ReactNode}> = ({
  children,
  style,
  header,
}) => (
  <LinearGradient
    start={{x: 0.5, y: 1}}
    end={{x: 0.5, y: 0}}
    colors={['#000', 'rgba(37,37,37,0)']}
    locations={[0, 0.1502]}
    style={[styles.linearGradient, style]}>
    {header && <View style={styles.header}>{header}</View>}
    <ScrollView contentInset={styles.scrollView}>{children}</ScrollView>
  </LinearGradient>
);

const styles = StyleSheet.create({
  linearGradient: {
    backgroundColor: '#2E2E2E',
    flex: 1,
  },
  scrollView: {
    top: 15,
    bottom: 20,
  },
  header: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 5,
  },
});
