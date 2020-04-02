import React, {useState, FC} from 'react';
import {Background} from './components/Background';
import {NavigationHeader} from './NavigationHeader';
import {HelloUserHeader} from './components/HelloUserHeader';
import {Icons} from './lib/icons';
import {BoxInput} from './components/BoxInput';
import {fontName} from './lib/vars';
import {TextInput, StyleSheet, View} from 'react-native';
import {Space} from './components/Block';
import {SegmentedControl} from './components/SegmentedControl';
import {DoneButton} from './components/DoneButton';
import {getYear} from 'date-fns';
import {useSelector, useDispatch} from 'react-redux';
import {
  selectBirthYear,
  selectRecentTravels,
  selectPreExistingAilment,
  setHasTravelledRecently,
  setPreExistingAilments,
} from './reducers/userReducer';
import {useNavigation} from '@react-navigation/native';
import {BirthYearInput} from './components/BirthYearInput';

export const OnboardingScreen = () => {
  const navigation = useNavigation();
  const [birthYear, setBirthYear] = useState('1990');
  const [hasTraveled, setHasTraveled] = useState(false);
  const [hasCondition, setHasCondition] = useState(false);
  const [conditions, setConditions] = useState('');
  const dispatch = useDispatch();

  return (
    <Background header={<NavigationHeader center={<HelloUserHeader />} />}>
      <BirthYearInput />
      <Space />
      <BoxInput
        icon={Icons.PlaneLanding}
        text="Have you recently returned from a foreign country?"
        rightComponent={
          <SegmentedControl
            firstOption="YES"
            secondOption="NO"
            selectedIndex={hasTraveled ? 0 : 1}
            onTabPress={() => {
              setHasTraveled(!hasTraveled);
            }}
          />
        }
      />
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
            dispatch(setHasTravelledRecently(hasTraveled));
            dispatch(setPreExistingAilments(conditions));
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
