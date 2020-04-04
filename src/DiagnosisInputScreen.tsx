import React, {FC} from 'react';
import {Background} from './components/Background';
import {StackNavigationProp} from '@react-navigation/stack';
import {Icon, Icons} from './lib/icons';
import {NavigationHeader} from './NavigationHeader';
import {StyleSheet, Text, View} from 'react-native';
import {fontName} from './lib/vars';
import styled from 'styled-components/native';
import {
  HalfPaddedContainer,
  PaddedContainer,
  Space,
  HalfSpace,
} from './components/Block';
import {SelectionGroup} from './components/SelectionGroup';
import {ShareDataButton} from './components/ShareDataButton';
import {useTranslation} from 'react-i18next';
import RNPickerSelect from 'react-native-picker-select';

type Props = {
  navigation: StackNavigationProp<{}>;
};

export const DiagnosisInputScreen: FC<Props> = ({navigation}) => {
  const {t} = useTranslation();

  return (
    <Background
      header={
        <NavigationHeader
          center={<Icon source={Icons.Corona} />}
          showBackButton
        />
      }>
      <PaddedContainer>
        <Space />
        <TitleText>
          {t('Please share more about your') + ' '}
          <Text style={{fontWeight: '700', color: 'white'}}>
            {t('diagnosis')}
          </Text>
        </TitleText>
      </PaddedContainer>
      <Space />
      <HalfPaddedContainer>
        <BrownBox>
          <Space />
          <PaddedContainer>
            <Row>
              <Icon source={Icons.Hospital} style={styles.emojiStyle} />
              <BoxText>{t('Where did you get tested?')}</BoxText>
            </Row>
          </PaddedContainer>
          <SelectionGroup
            title=""
            onOptionSelected={() => {}}
            options={[
              {title: t('hospital'), dataValue: 'hospital'},
              {title: t('drive through'), dataValue: 'drive_through'},
              {title: t('walk-in clinic'), dataValue: 'walk_in_clinic'},
              {title: t('other'), dataValue: 'other'},
            ]}
          />
          <HalfSpace />
        </BrownBox>
        <Space />
        <BrownBox>
          <Space />
          <PaddedContainer>
            <Row>
              <Icon source={Icons.Map} style={styles.emojiStyle} />
              <BoxText>{t('Which country did you get tested in?')}</BoxText>
            </Row>
          </PaddedContainer>
          <HalfSpace />
          <Space />
          <RNPickerSelect
            style={{
              ...pickerSelectStyles,
              iconContainer: {
                top: 20,
                right: 50,
              },
              placeholder: {
                color: 'white',
                fontSize: 20,
              },
            }}
            onValueChange={value => console.log(value)}
            items={[
              {label: 'Sweden', value: 'sweden'},
              {label: 'United States', value: 'united States'},
              {label: 'Narnia', value: 'narnia'},
            ]}
            Icon={SelectIcon}
          />
          <Space />
          <HalfSpace />
        </BrownBox>
      </HalfPaddedContainer>
      <Space />
      <Space />
      <Space />
      <View style={styles.center}>
        <ShareDataButton />
      </View>
    </Background>
  );
};

const SelectIcon = () => (
  <View
    style={{
      backgroundColor: 'transparent',
      borderTopWidth: 10,
      borderTopColor: 'gray',
      borderRightWidth: 10,
      borderRightColor: 'transparent',
      borderLeftWidth: 10,
      borderLeftColor: 'transparent',
      width: 0,
      height: 0,
    }}
  />
);

const TitleText = styled.Text`
  color: #b2b2b2;
  font-size: 18px;
  font-weight: 500;
  font-family: ${fontName};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const BrownBox = styled.View`
  background: #241313;
  border: 1px solid #000000;
  border-radius: 10px;
  overflow: hidden;
`;

const BoxText = styled.Text`
  font-family: ${fontName};
  color: white;
  font-weight: 600;
  font-size: 18px;
`;

const styles = StyleSheet.create({
  center: {
    width: '100%',
    alignItems: 'center',
  },
  emojiStyle: {
    marginRight: 10,
  },
  text: {
    color: 'white',
  },
});

const basePickerStyles = {
  marginLeft: '5%',
  width: '90%',
  fontSize: 20,
  textAlign: 'center',
  backgroundColor: '#372525',
  paddingVertical: 12,
  paddingHorizontal: 10,
  borderWidth: 2,
  borderColor: '#1A0000',
  borderRadius: 25,
  color: 'white',
  paddingRight: 60, // to ensure the text is never behind the icon
  paddingLeft: 20,
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    ...basePickerStyles,
  },
  inputAndroid: {
    ...basePickerStyles,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#1A0000',
  },
});
