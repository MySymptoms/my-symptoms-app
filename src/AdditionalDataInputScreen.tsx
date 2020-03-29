import React, {FC, useState} from 'react';
import {Background} from './components/Background';
import {StackNavigationProp} from '@react-navigation/stack';
import {Icon, Icons} from './lib/icons';
import {NavigationHeader} from './NavigationHeader';
import {View, StyleSheet, Text, Image} from 'react-native';
import {Colors} from './lib/colors';
import {fontName} from './lib/vars';
import styled from 'styled-components/native';
import { SegmentedControl } from './components/SegmentedControl';
import map from './images/map.png';

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
  margin: 0 -10px;
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
    <Background>
      <NavigationHeader title={'HELLO ANONYMOUS'} showBackButton />
      <BlackBox style={{...styles.contentMargin, marginTop: 20}}>
        <Row style={styles.outerRow}>
          <Row>
            <Icon source={Icons.Baby} style={styles.emojiStyle} />
            <BoxText>What year were you born?</BoxText>
          </Row>
          <Text style={styles.year}>1984</Text>
        </Row>
      </BlackBox>
      <BlackBox style={styles.contentMargin}>
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
      <BlackBox style={styles.contentMargin}>
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
      <View style={styles.center}>
        <Image source={map} style={styles.map} />
      </View>
    </Background>
  );
};

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
  },
  contentMargin: {
    marginBottom: 20,
  },
  outerRow: {
    justifyContent: 'space-between',
  },
  map: {
    width: '70%',
    resizeMode: 'contain',
  },
});
