import React, {useState, FC} from 'react';
import {Background} from './components/Background';
import {NavigationHeader} from './NavigationHeader';
import {HelloUserHeader} from './components/HelloUserHeader';
import {Space} from './components/Block';
import {DoneButton} from './components/DoneButton';
import {useNavigation} from '@react-navigation/native';
import {BirthYearInput} from './components/BirthYearInput';
import {BeenTravellingInput} from './components/BeenTravellingInput';
import {PreExistingAilmentsInput} from './components/PreExistingAilmentsinput';
import {View} from 'react-native';

export const OnboardingScreen = () => {
  const navigation = useNavigation();

  return (
    <Background header={<NavigationHeader center={<HelloUserHeader />} />}>
      <BirthYearInput />
      <Space />
      <BeenTravellingInput />
      <Space />
      <PreExistingAilmentsInput />
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
