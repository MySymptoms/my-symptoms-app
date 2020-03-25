import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {CircleButton} from './CircleButton';
import styled from 'styled-components/native';

export const OverviewScreen = () => {
  return (
    <LinearGradient
      colors={['#000000', '#rgba(37,37,37,0)', '#2E2E2E']}
      style={styles.linearGradient}>
      <HeaderRow>
        <View style={{flex: 1}}></View>
        <CenterTitleText>TRACK MY SYMPTOMS</CenterTitleText>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <CircleButton onPress={() => {}}>
            <UserEmojiContainer>🦔</UserEmojiContainer>
          </CircleButton>
        </View>
      </HeaderRow>
    </LinearGradient>
  );
};

const CenterTitleText = styled.Text`
  flex: 2;
  font-family: Dosis;
  color: #c1c1c1;
`;

const UserEmojiContainer = styled.Text`
  justify-content: center;
  align-items: center;
  line-height: 24px;
  font-size: 24px;
`;

const HeaderRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
`;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});
