import React, {ReactNode, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Space} from './components/Block';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import SmoothPicker from 'react-native-smooth-picker';
import LinearGradient from 'react-native-linear-gradient';
import _ from 'lodash';
import {fontName} from './lib/vars';

interface RowProps {
  left: string;
  center: string;
  right: ReactNode;
}

const InputFieldRow = ({left, center, right}: RowProps) => (
  <View
    style={{
      flexDirection: 'row',
      backgroundColor: '#1F1F1F',
      height: 82,
      borderRadius: 10,
      alignItems: 'center',
      borderWidth: 1,
      borderStyle: 'solid',
    }}>
    <Text style={{fontSize: 30, paddingLeft: 23, paddingRight: 10}}>
      {left}
    </Text>
    <View style={{flex: 1}}>
      <Text
        style={{
          color: '#fff',
          fontFamily: 'Dosis',
          fontWeight: '600',
          fontSize: 16,
        }}>
        {center}
      </Text>
    </View>
    <View
      style={{
        width: 130,
        marginLeft: 'auto',
        paddingHorizontal: 20,
        alignItems: 'center',
      }}>
      {right}
    </View>
  </View>
);

const YesNoSegmentedControl = ({
  onTabPress,
  selectedIndex,
}: {
  selectedIndex: number;
  onTabPress: (value: number) => void;
}) => (
  <SegmentedControlTab
    tabsContainerStyle={{
      width: 90,
      shadowColor: 'rgb(108,108,108)',
      shadowRadius: 25,
      shadowOpacity: 0.5,
      shadowOffset: {width: -10, height: -6},
    }}
    tabTextStyle={{
      fontFamily: 'Dosis',
      fontSize: 16,
      fontWeight: '500',
      color: '#000',
      lineHeight: 20,
    }}
    tabStyle={{backgroundColor: '#333', borderColor: '#000'}}
    activeTabStyle={{backgroundColor: '#333'}}
    activeTabTextStyle={{
      color: '#fff',
      textShadowRadius: 4,
      textShadowColor: '#8CEF80',
    }}
    borderRadius={100}
    values={['YES', 'NO']}
    selectedIndex={selectedIndex}
    onTabPress={onTabPress}
  />
);

const yearOptions = _.range(1980, 2020);
export const StartScreen = () => {
  const [state1, setState1] = useState(0);
  const [state2, setState2] = useState(1);
  const [year, setYear] = useState(1984);
  return (
    <View style={{flex: 1, backgroundColor: '#2e2e2e', paddingHorizontal: 7}}>
      <InputFieldRow
        left="👶"
        center="What year were you born?"
        right={
          <SmoothPicker
            magnet
            scrollAnimation
            keyExtractor={item => item}
            data={yearOptions}
            initialScrollToIndex={yearOptions.indexOf(1984)}
            onSelected={({item}) => setYear(item)}
            renderItem={({item}) => (
              <View style={{height: 30}}>
                <Text
                  style={
                    item === year
                      ? {
                          fontFamily: fontName,
                          fontWeight: '500',
                          color: '#fff',
                          fontSize: 26,
                          textShadowRadius: 4,
                          textShadowColor: '#8CEF80',
                        }
                      : {
                          fontFamily: fontName,
                          fontWeight: '500',
                          color: '#000',
                          fontSize: 20,
                        }
                  }>
                  {item}
                </Text>
              </View>
            )}
          />
        }
      />
      <Space />
      <InputFieldRow
        left="🛬"
        center="Have you recently returned from a foreign land?"
        right={
          <YesNoSegmentedControl
            selectedIndex={state1}
            onTabPress={() => setState1(s => (s === 0 ? 1 : 0))}
          />
        }
      />
      <Space />
      <InputFieldRow
        left="💊"
        center="Do you have any pre-existing medical conditions?"
        right={
          <YesNoSegmentedControl
            selectedIndex={state2}
            onTabPress={() => setState2(s => (s === 0 ? 1 : 0))}
          />
        }
      />
      <Space />
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity onPress={() => {}}>
          <LinearGradient
            style={{
              width: 214,
              height: 50,
              borderRadius: 100,
              backgroundColor: 'rgba(0, 220, 180, 0.5)',
              justifyContent: 'center',
            }}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            locations={[0.02, 0.5, 0.98]}
            colors={[
              'rgba(0, 220, 180, 0)',
              '#00dcc2',
              'rgba(0, 220, 180, 0)',
            ]}>
            <Text
              style={{
                color: '#104812',
                fontFamily: 'Dosis',
                fontWeight: 'bold',
                fontSize: 16,
                lineHeight: 20,
                textAlign: 'center',
                letterSpacing: 2,
              }}>
              CONTINUE
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};
