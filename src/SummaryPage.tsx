import React, {ReactNode} from 'react';
import {Image, View} from 'react-native';
import styled from 'styled-components/native';
import {fontName} from './lib/vars';
import {HalfSpace, Space} from './components/Block';
import {CheckIcon} from './components/CheckIcon';
import {Background} from './components/Background';
import {NavigationHeader} from './NavigationHeader';
import PaperSheet from '../assets/paper_sheet.png';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../App';
import {useSelector} from 'react-redux';
import {selectUser} from './reducers/userReducer';
import {HelloUserHeader} from './components/HelloUserHeader';
import {useHistoricalDataForSymptom} from './hooks/useHistoricalDataForSymptom';
import _ from 'lodash';
import {useTemperatureConvertedToUserPreference} from './hooks/useTemperatureConvertedToUserPreference';
import {CrossIcon} from './components/CrossIcon';
import {useTranslation} from 'react-i18next';

const Row = styled.View`
  flex-direction: row;
`;

const BlackBox = styled.View`
  background: #1f1f1f;
  border: 1px solid #000000;
  border-radius: 10px;
`;

const MyText = styled.Text`
  font-family: ${fontName};
  color: #cdcdcd;
  font-weight: 600;
  font-size: 36px;
`;

const RowWithContentRight: React.FC<{leftText: string; right: ReactNode}> = ({
  leftText,
  right,
}) => (
  <BlackBox style={{flexDirection: 'row', padding: 14, alignItems: 'center'}}>
    <MyText style={{flex: 2, paddingLeft: 20}}>{leftText}</MyText>
    {right}
  </BlackBox>
);

const SummaryViewListItem: React.FC<{text: string}> = ({text}) => (
  <BlackBox
    style={{
      flexDirection: 'row',
      borderRadius: 4,
      marginLeft: 50,
      alignItems: 'center',
      position: 'relative',
    }}>
    <MyText style={{fontSize: 22, padding: 10}}>{text}</MyText>
    <BlackBox
      style={{
        position: 'absolute',
        top: 20,
        left: -5,
        width: 10,
        height: 10,
      }}
    />
  </BlackBox>
);

const SummaryViewColumn: React.FC = ({children}) => (
  <BlackBox style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
    {children}
  </BlackBox>
);

export const SummaryPage = () => {
  const {t} = useTranslation();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const user = useSelector(selectUser);
  const fever = _.last(useHistoricalDataForSymptom('fever'));

  const temperatureInCelsius = fever ? fever.y : 0;

  const temperatureIsNaN = fever === undefined;

  const {
    temperatureUnit,
    convertedTemperature,
  } = useTemperatureConvertedToUserPreference(temperatureInCelsius);

  return (
    <Background
      header={
        <NavigationHeader
          showBackButton
          center={<HelloUserHeader />}
          right={<Image source={PaperSheet} />}
          onPressRight={() => navigation.navigate('DetailedReport')}
        />
      }>
      <View style={{paddingHorizontal: 15}}>
        <Row>
          <SummaryViewColumn>
            <MyText style={{fontSize: 36}}>{t('Age')}</MyText>
            <MyText style={{fontSize: 60, color: '#fff'}}>
              {user.birthYear != null
                ? new Date().getUTCFullYear() - user.birthYear
                : 'N/A'}
            </MyText>
          </SummaryViewColumn>
          <Space />
          <SummaryViewColumn>
            <MyText>{t('Travelled')}</MyText>
            <BlackBox
              style={{borderRadius: 50, padding: 10, backgroundColor: '#000'}}>
              {user.recentTravels === true ? (
                <CheckIcon width={30} height={30} />
              ) : (
                <CrossIcon width={30} height={30} />
              )}
            </BlackBox>
          </SummaryViewColumn>
        </Row>
        <Space />
        <RowWithContentRight
          leftText={t('Fever')}
          right={
            <BlackBox
              style={{
                flex: 2,
                backgroundColor: '#ffbc5c',
                alignItems: 'center',
              }}>
              <MyText style={{fontSize: 60, color: '#000', padding: 14}}>
                {temperatureIsNaN
                  ? 'N/A'
                  : Math.round(convertedTemperature * 10) / 10}
              </MyText>
            </BlackBox>
          }
        />
        <Space />
        <View>
          <RowWithContentRight
            leftText={t('Medical Conditions')}
            right={
              <BlackBox
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 50,
                  padding: 20,
                  backgroundColor: '#000',
                }}>
                {user.preExistingAilments != null ? (
                  <CheckIcon height={50} width={50} />
                ) : (
                  <CrossIcon height={50} width={50} />
                )}
                <View style={{width: 50, height: 50}} />
              </BlackBox>
            }
          />
          {user.preExistingAilments != null &&
            user.preExistingAilments.split('\n').map((symptom, index) => (
              <React.Fragment key={index}>
                <HalfSpace />
                <SummaryViewListItem text={symptom} />
              </React.Fragment>
            ))}
        </View>
      </View>
    </Background>
  );
};
