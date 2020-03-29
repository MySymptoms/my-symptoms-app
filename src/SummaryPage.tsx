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
import {selectUserEmoji} from './reducers/userReducer';
import {HelloUserHeader} from './components/HelloUserHeader';

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
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const userEmoji = useSelector(selectUserEmoji);
  return (
    <Background
      style={{paddingHorizontal: 15}}
      header={
        <NavigationHeader
          showBackButton
          center={<HelloUserHeader emoji={userEmoji} />}
          right={<Image source={PaperSheet} />}
          onPressRight={() => navigation.navigate('DetailedReport')}
        />
      }>
      <Row>
        <SummaryViewColumn>
          <MyText style={{fontSize: 36}}>Age</MyText>
          <MyText style={{fontSize: 60, color: '#fff'}}>55</MyText>
        </SummaryViewColumn>
        <Space />
        <SummaryViewColumn>
          <MyText>Travelled</MyText>
          <BlackBox
            style={{borderRadius: 50, padding: 10, backgroundColor: '#000'}}>
            <CheckIcon />
          </BlackBox>
        </SummaryViewColumn>
      </Row>
      <Space />
      <RowWithContentRight
        leftText={'Fever'}
        right={
          <BlackBox
            style={{flex: 2, backgroundColor: '#ffbc5c', alignItems: 'center'}}>
            <MyText style={{fontSize: 60, color: '#000', padding: 14}}>
              37.9
            </MyText>
          </BlackBox>
        }
      />
      <Space />
      <View>
        <RowWithContentRight
          leftText={'Medical Conditions'}
          right={
            <View
              style={{
                flex: 1,
                alignItems: 'space-between',
              }}>
              <BlackBox
                style={{
                  borderRadius: 50,
                  padding: 20,
                  backgroundColor: '#000',
                }}>
                <CheckIcon height={50} width={50} />
              </BlackBox>
            </View>
          }
        />
        <HalfSpace />
        <SummaryViewListItem text="Asthma" />
        <HalfSpace />
        <SummaryViewListItem text="Heart conditions" />
        <HalfSpace />
        <SummaryViewListItem text="Immunocompromised" />
        <HalfSpace />
        <SummaryViewListItem text="Diabetes" />
      </View>
    </Background>
  );
};
