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
  setBirthYear as reducerSetBirthYear,
  setHasTravelledRecently,
  setPreExistingAilments,
} from './reducers/userReducer';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from 'App';
import {StackNavigationProp} from '@react-navigation/stack';

const currentYear = getYear(new Date());

export const OnboardingScreen = () => {
  const navigation = useNavigation();
  const [birthYear, setBirthYear] = useState('1990');
  const [hasTraveled, setHasTraveled] = useState(false);
  const [hasCondition, setHasCondition] = useState(false);
  const [conditions, setConditions] = useState('');
  const dispatch = useDispatch();

  return (
    <Background header={<NavigationHeader center={<HelloUserHeader />} />}>
      <BoxInput
        icon={Icons.Baby}
        text="What year were you born?"
        rightComponent={
          <TextInput
            value={birthYear}
            onChangeText={setBirthYear}
            onBlur={() => {
              if (parseInt(birthYear) < 1900) {
                setBirthYear('1900');
              } else if (parseInt(birthYear) > currentYear) {
                setBirthYear(currentYear.toString());
              }
            }}
            underlineColorAndroid="transparent"
            style={styles.year}
            keyboardType="numeric"
          />
        }
      />
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
            dispatch(reducerSetBirthYear(parseInt(birthYear)));
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
  year: {
    fontSize: 26,
    color: 'white',
    alignSelf: 'flex-end',
    fontFamily: fontName,
  },
  conditionsText: {
    color: 'white',
  },
});