import React, {FC, useState} from 'react';
import {Background} from './components/Background';
import {StackNavigationProp} from '@react-navigation/stack';
import {Icon, Icons} from './lib/icons';
import {NavigationHeader} from './NavigationHeader';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';
import {fontName} from './lib/vars';
import styled from 'styled-components/native';
import {SegmentedControl} from './components/SegmentedControl';
import map3x from './images/map3x.png';
import {PaddedContainer, Space} from './components/Block';
import {HelloUserHeader} from './components/HelloUserHeader';
import {ShareDataButton} from './components/ShareDataButton';
import _ from 'lodash';

type Props = {
  navigation: StackNavigationProp<{}>;
};

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const BlackBox = styled.View`
  background: #1f1f1f;
  border: 1px solid #000000;
  border-radius: 10px;
  padding: 20px;
  width: 96%;
  margin: auto;
`;

const BoxText = styled.Text`
  font-family: ${fontName};
  color: #cdcdcd;
  font-weight: 600;
  font-size: 18px;
  max-width: 200px;
`;

export const AdditionalDataInputScreen: FC<Props> = ({navigation}) => {
  const [hasTraveled, setHasTraveled] = useState(true);
  const [hasCondition, setHasCondition] = useState(false);

  return (
    <Background
      header={<NavigationHeader center={<HelloUserHeader />} showBackButton />}>
      <BlackBox>
        <Row style={styles.outerRow}>
          <Row>
            <Icon source={Icons.Baby} style={styles.emojiStyle} />
            <BoxText>What year were you born?</BoxText>
          </Row>

          <TextInput
            value="1990"
            onChangeText={() => {}}
            underlineColorAndroid="transparent"
            style={styles.year}
            keyboardType="numeric"
          />
        </Row>
      </BlackBox>
      <Space />
      <BlackBox>
        <Row style={styles.outerRow}>
          <Row>
            <Icon source={Icons.PlaneLanding} style={styles.emojiStyle} />
            <BoxText>Have you recently retruned from a foreign land?</BoxText>
          </Row>
          <SegmentedControl
            firstOption="YES"
            secondOption="NO"
            selectedIndex={hasTraveled ? 0 : 1}
            onTabPress={() => {
              setHasTraveled(!hasTraveled);
            }}
          />
        </Row>
      </BlackBox>
      <Space />
      <BlackBox>
        <Row style={styles.outerRow}>
          <Row>
            <Icon source={Icons.Pill} style={styles.emojiStyle} />
            <BoxText>Do you have any medical preconditions?</BoxText>
          </Row>
          <SegmentedControl
            firstOption="YES"
            secondOption="NO"
            selectedIndex={hasCondition ? 0 : 1}
            onTabPress={() => {
              setHasCondition(!hasCondition);
            }}
          />
        </Row>
      </BlackBox>
      <Space />
      <Space />
      <PaddedContainer>
        <View style={styles.center}>
          <Button onPress={() => navigation.navigate('Diagnosis')}>
            <Row>
              <Icon source={Icons.Corona} style={styles.emojiStyle} />
              <ButtonText>I have been diagnosed with Covid-19</ButtonText>
            </Row>
          </Button>
          <Space />
          <Image
            source={map3x}
            width={Dimensions.get('window').width}
            style={styles.map}
          />
          <ShareText>
            If you are interested, you can help us compile a gloabal map that
            illustrates what symptoms actually lead to Covid-19 💛
          </ShareText>
          <Space />
          <ShareDataButton />
          <Space />
          <Row>
            <View style={styles.peopleSharedBorder}>
              <Text style={styles.peopleShared}>2234</Text>
            </View>
            <Text style={styles.text}>
              {' '}
              have shared their data anonymously so far
            </Text>
          </Row>
        </View>
      </PaddedContainer>
    </Background>
  );
};

const Button = styled.TouchableOpacity`
  align-items: center;
  background: #333;
  border-radius: 40px;
  padding: 15px 20px;
  border: 3px rgba(0, 0, 0, 0.6);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  elevation: 100;
`;

const ButtonText = styled.Text`
  color: white;
`;
const ShareText = styled.Text`
  color: white;
  width: 90%;
  line-height: 21px;
  letter-spacing: 1px;
`;

const ShareButton = styled(Button)`
  background: #008475;
`;

const ShareButtonText = styled.Text`
  color: #003d02;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 1px;
`;

const styles = StyleSheet.create({
  center: {
    width: '100%',
    alignItems: 'center',
  },
  emojiStyle: {
    marginRight: 10,
  },
  year: {
    fontSize: 26,
    color: 'white',
    alignSelf: 'flex-end',
    fontFamily: fontName,
  },
  outerRow: {
    justifyContent: 'space-between',
  },
  map: {
    width: Dimensions.get('window').width - 60,
    height: (Dimensions.get('window').width - 60) / 1.75,
    resizeMode: 'contain',
  },
  text: {
    color: 'white',
  },
  peopleShared: {
    color: 'white',
    fontWeight: '700',
  },
  peopleSharedBorder: {
    borderBottomWidth: 2,
    borderBottomColor: 'white',
  },
});
