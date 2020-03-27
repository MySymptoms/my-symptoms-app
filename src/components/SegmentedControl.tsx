import React, {FC} from 'react';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import {StyleSheet} from 'react-native';

interface Props {
  firstOption: string;
  secondOption: string;
  selectedIndex: number;
  onTabPress: (value: number) => void;
}

export const SegmentedControl: FC<Props> = ({
  onTabPress,
  selectedIndex,
  firstOption,
  secondOption,
}) => (
  <SegmentedControlTab
    tabsContainerStyle={styles.tabContainerStyle}
    tabTextStyle={styles.tabTextStyle}
    tabStyle={styles.tabStyle}
    activeTabStyle={styles.activeTabStyle}
    activeTabTextStyle={styles.activeTabStyle}
    borderRadius={100}
    values={[firstOption.toUpperCase(), secondOption.toUpperCase()]}
    selectedIndex={selectedIndex}
    onTabPress={onTabPress}
  />
);

const styles = StyleSheet.create({
  tabContainerStyle: {
    width: 90,
    shadowColor: 'rgb(108,108,108)',
    shadowRadius: 25,
    shadowOpacity: 0.5,
    shadowOffset: {width: -10, height: -6},
  },
  tabTextStyle: {
    fontFamily: 'Dosis',
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    lineHeight: 20,
  },
  tabStyle: {backgroundColor: '#333', borderColor: '#000'},
  activeTabStyle: {backgroundColor: '#333'},
  activeTabTextStyle: {
    color: '#fff',
    textShadowRadius: 4,
    textShadowColor: '#8CEF80',
  },
});
