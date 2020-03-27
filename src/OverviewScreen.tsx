import React, {FC} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {CircleButton} from './components/CircleButton';
import styled from 'styled-components/native';
import PaperSheet from '../assets/paper_sheet.png';
import {Button, Space, CenterTitleText, HeaderRow} from './components/Block';
import {fontName} from './lib/vars';
import {HorizontalStatusCalendar} from './HorizontalStatusCalendar';
import {FancyGradientChart} from './FancyGradientChart';
import {Icon, Icons} from './lib/icons';
import {Colors} from './lib/colors';
import {getRandomEmoji} from './lib/emoji';
import {Routes} from '../App';
import {Background} from './components/Background';
import {StackNavigationProp} from '@react-navigation/stack';

type Props = {
  navigation: StackNavigationProp<{}>;
};

export const OverviewScreen: FC<Props> = ({navigation}) => {
  return (
    <Background>
      <View>
        <HeaderRow>
          <View>
            <CircleButton onPress={() => {}}>
              <Image source={PaperSheet} />
            </CircleButton>
          </View>
          <CenterTitleText>TRACK MY SYMPTOMS</CenterTitleText>
          <View>
            <CircleButton onPress={() => {}}>
              <UserEmojiContainer>{getRandomEmoji()}</UserEmojiContainer>
            </CircleButton>
          </View>
        </HeaderRow>
        <HorizontalStatusCalendar style={{marginBottom: 30}} />
      </View>
      <FancyGradientChart />
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <View style={{flexDirection: 'row'}}>
          <Button onPress={() => navigation.navigate(Routes.Fever)}>
            <Icon source={Icons.FaceWithThermometer} />
            <Text style={styles.emojiButtonText}>Fever</Text>
          </Button>
          <Space />
          <Button>
            <Icon source={Icons.Mask} />
            <Text style={styles.emojiButtonText}>Dry Cough</Text>
          </Button>
          <Space />
          <Button>
            <Icon source={Icons.Bed} />
            <Text style={styles.emojiButtonText}>Tiredness</Text>
          </Button>
        </View>
        <Space />
        <View style={{flexDirection: 'row'}}>
          <Button>
            <Icon source={Icons.Yawn} />
            <Text style={styles.emojiButtonText}>Shortness of breath</Text>
          </Button>
          <Space />
          <Button>
            <Icon source={Icons.Sweat} />
            <Text style={styles.emojiButtonText}>Aches & Pains</Text>
          </Button>
          <Space />
          <Button>
            <Icon source={Icons.Weary} />
            <Text style={styles.emojiButtonText}>Sore Throat</Text>
          </Button>
        </View>
        <Space />
        <View style={{flexDirection: 'row'}}>
          <Button>
            <Icon source={Icons.Toilet} />
            <Text style={styles.emojiButtonText}>Diarrhoea</Text>
          </Button>
          <Space />
          <Button>
            <Icon source={Icons.Nauseated} />
            <Text style={styles.emojiButtonText}>Nausea</Text>
          </Button>
          <Space />
          <Button>
            <Icon source={Icons.Sneezing} />
            <Text style={styles.emojiButtonText}>Runny Nose</Text>
          </Button>
        </View>
        <Space />
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Button>
            <Icon source={Icons.Food} />
            <Text style={styles.emojiButtonText}>Sense of taste</Text>
          </Button>
          <Space />
          <Button>
            <Icon source={Icons.Nose} />
            <Text style={styles.emojiButtonText}>Sense of smell</Text>
          </Button>
          <Space />
          <View style={{width: 100, height: 100}} />
        </View>
        <Space />
        <NoSymtoms>
          <Icon source={Icons.Flex} />
          <Text style={styles.emojiButtonText}>No symptoms today</Text>
        </NoSymtoms>
      </View>
    </Background>
  );
};

const NoSymtoms = styled.View`
  width: 110px;
  height: 110px;
  border: 2px solid black;
  justify-content: center;
  align-items: center;
  border-radius: 55px;
  background-color: ${Colors.buttonBackground};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  border: 3px rgba(0, 0, 0, 0.6);
  elevation: 100;
`;

const UserEmojiContainer = styled.Text`
  justify-content: center;
  align-items: center;
  line-height: 24px;
  font-size: 24px;
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
