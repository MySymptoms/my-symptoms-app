import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {CircleButton} from './CircleButton';
import styled from 'styled-components/native';
import Hedgehog from '../assets/hedgehog.png';
import {Button, Space} from './components/Block';
import {fontName} from './lib/vars';

export const OverviewScreen = () => {
  return (
    <LinearGradient
      start={{x: 0.5, y: 1}}
      end={{x: 0.5, y: 0}}
      colors={['#000', 'rgba(37,37,37,0)']}
      locations={[0, 0.1502]}
      style={styles.linearGradient}>
      <View>
        <HeaderRow>
          <View style={{flex: 1}} />
          <CenterTitleText>TRACK MY SYMPTOMS</CenterTitleText>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <CircleButton onPress={() => {}}>
              <UserEmojiContainer>🦔</UserEmojiContainer>
            </CircleButton>
          </View>
        </HeaderRow>

        <Text style={{color: 'white'}}>TRACK MY COVID</Text>
      </View>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <View style={{flexDirection: 'row'}}>
          <Button>
            <Text style={styles.buttonEmoji}>🤒</Text>
            <Text style={styles.emojiButtonText}>Fever</Text>
          </Button>
          <Space />
          <Button>
            <Text style={styles.buttonEmoji}>😷</Text>
            <Text style={styles.emojiButtonText}>Dry Cough</Text>
          </Button>
          <Space />
          <Button>
            <Text style={styles.buttonEmoji}>🛌</Text>
            <Text style={styles.emojiButtonText}>Tiredness</Text>
          </Button>
        </View>
        <Space />
        <View style={{flexDirection: 'row'}}>
          <Button>
            <Text style={styles.buttonEmoji}>🥱</Text>
            <Text style={styles.emojiButtonText}>Shortness of breath</Text>
          </Button>
          <Space />
          <Button>
            <Text style={styles.buttonEmoji}>😓</Text>
            <Text style={styles.emojiButtonText}>Aches & Pains</Text>
          </Button>
          <Space />
          <Button>
            <Text style={styles.buttonEmoji}>😩</Text>
            <Text style={styles.emojiButtonText}>Sore Throat</Text>
          </Button>
        </View>
        <Space />
        <View style={{flexDirection: 'row'}}>
          <Button>
            <Text style={styles.buttonEmoji}>🚽</Text>
            <Text style={styles.emojiButtonText}>Diarrhoea</Text>
          </Button>
          <Space />
          <Button>
            <Text style={styles.buttonEmoji}>🤢</Text>
            <Text style={styles.emojiButtonText}>Nausea</Text>
          </Button>
          <Space />
          <Button>
            <Text style={styles.buttonEmoji}>🤧</Text>
            <Text style={styles.emojiButtonText}>Runny Nose</Text>
          </Button>
        </View>
      </View>
    </LinearGradient>
  );
};

const CenterTitleText = styled.Text`
  flex: 2;
  font-family: ${fontName};
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
  buttonEmoji: {
    fontSize: 30,
  },
  emojiButtonText: {
    fontSize: 15,
    color: '#fff',
    textAlign: 'center',
    fontFamily: fontName,
  },
  linearGradient: {
    backgroundColor: '#2E2E2E',
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
