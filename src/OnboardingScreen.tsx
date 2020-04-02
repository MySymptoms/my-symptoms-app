import React, {useState, FC} from 'react';
import {Background} from './components/Background';
import {NavigationHeader} from './NavigationHeader';
import {HelloUserHeader} from './components/HelloUserHeader';
import {Icons} from './lib/icons';
import {BoxInput} from './components/BoxInput';
import {TextInput, StyleSheet, View} from 'react-native';
import {Space} from './components/Block';
import {SegmentedControl} from './components/SegmentedControl';
import {DoneButton} from './components/DoneButton';
import {useNavigation} from '@react-navigation/native';
import {BirthYearInput} from './components/BirthYearInput';
import {BeenTravellingInput} from './components/BeenTravellingInput';

export const OnboardingScreen = () => {
  const navigation = useNavigation();
  const [hasCondition, setHasCondition] = useState(false);
  const [conditions, setConditions] = useState('');

  return (
    <Background header={<NavigationHeader center={<HelloUserHeader />} />}>
      <BirthYearInput />
      <Space />
      <BeenTravellingInput />
      <Space />
      <BoxInput
        icon={Icons.Pill}
        text="Do you have any pre-existing medical conditions?"
        rightComponent={
          <SegmentedControl
            firstOption="YES"
            secondOption="NO"
            selectedIndex={hasCondition ? 0 : 1}
            onTabPress={() => {
              setHasCondition(!hasCondition);
            }}
          />
        }
        showExpandingBottomComponent={hasCondition}
        expandingBottomComponent={
          <TextInput
            style={styles.conditionsText}
            placeholder="List them here"
            placeholderTextColor="#C4C4C4"
            value={conditions}
            onChangeText={setConditions}
          />
        }
      />
      <Space />
      <Space />
      <Space />
      <View
        style={{
          width: '100%',
          alignItems: 'center',
        }}>
        <DoneButton
          text="submit"
          onPress={() => {
            navigation.navigate('Overview');
          }}
          showLine={false}
        />
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  conditionsText: {
    color: 'white',
  },
});
