import React, {FC, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components/native';
import {Space} from './components/Block';
import {fontName} from './lib/vars';
import {HorizontalStatusCalendar} from './HorizontalStatusCalendar';
import {Icon, Icons} from './lib/icons';
import {Colors} from './lib/colors';
import {useSelector} from 'react-redux';
import {RootStackParamList} from '../App';
import {Background} from './components/Background';
import {StackNavigationProp} from '@react-navigation/stack';
import {NavigationHeader} from './NavigationHeader';
import {SummaryViewIcon} from './components/SummaryViewIcon';
import {formatDate} from './lib/util';
import {OverviewSymptomButton} from './components/OverviewSymptomButton';
import {RootState} from './reducers/rootReducer';

type Props = {
  navigation: StackNavigationProp<RootStackParamList>;
};

export const OverviewScreen: FC<Props> = ({navigation}) => {
  const [currentDate, setCurrentDate] = useState(formatDate(new Date()));
  const emoji = useSelector((state: RootState) => state.user.user_emoji);

  return (
    <Background>
      <View>
        <NavigationHeader
          left={<SummaryViewIcon />}
          onPressLeft={() => navigation.navigate('Summary')}
          title={'TRACK MY SYMPTOMS'}
          right={<UserEmojiContainer>{emoji}</UserEmojiContainer>}
        />
        <HorizontalStatusCalendar
          style={{marginBottom: 30}}
          onChange={setCurrentDate}
          value={currentDate}
        />
      </View>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <View style={{flexDirection: 'row'}}>
          <OverviewSymptomButton
            color={'green'}
            onPress={() =>
              navigation.navigate('Fever', {currentReportDate: currentDate})
            }
            text={'Fever'}
            icon={Icons.FaceWithThermometer}
          />
          <Space />
          <OverviewSymptomButton
            color={'red'}
            onPress={() =>
              navigation.navigate('DryCough', {currentReportDate: currentDate})
            }
            text={'Dry Cough'}
            icon={Icons.Mask}
          />
          <Space />
          <OverviewSymptomButton
            color={null}
            onPress={() =>
              navigation.navigate('Tiredness', {currentReportDate: currentDate})
            }
            text={'Tiredness'}
            icon={Icons.Bed}
          />
        </View>
        <Space />
        <View style={{flexDirection: 'row'}}>
          <OverviewSymptomButton
            color={'orange'}
            onPress={() =>
              navigation.navigate('ShortnessOfBreath', {
                currentReportDate: currentDate,
              })
            }
            text={'Shortness of breath'}
            icon={Icons.Yawn}
          />
          <Space />
          <OverviewSymptomButton
            color={null}
            onPress={() =>
              navigation.navigate('AchesAndPain', {
                currentReportDate: currentDate,
              })
            }
            text={'Aches & Pains'}
            icon={Icons.Sweat}
          />
          <Space />
          <OverviewSymptomButton
            color={null}
            onPress={() =>
              navigation.navigate('SoreThroat', {
                currentReportDate: currentDate,
              })
            }
            text={'Sore Throat'}
            icon={Icons.Weary}
          />
        </View>
        <Space />
        <View style={{flexDirection: 'row'}}>
          <OverviewSymptomButton
            color={null}
            onPress={() =>
              navigation.navigate('Diarrhoea', {currentReportDate: currentDate})
            }
            text={'Diarrhoea'}
            icon={Icons.Toilet}
          />
          <Space />
          <OverviewSymptomButton
            color={null}
            onPress={() =>
              navigation.navigate('Nausea', {currentReportDate: currentDate})
            }
            text={'Nausea'}
            icon={Icons.Nauseated}
          />
          <Space />
          <OverviewSymptomButton
            color={null}
            onPress={() =>
              navigation.navigate('RunnyNose', {currentReportDate: currentDate})
            }
            text={'Runny Nose'}
            icon={Icons.Sneezing}
          />
        </View>
        <Space />
        <View style={{flexDirection: 'row'}}>
          <OverviewSymptomButton
            color={null}
            onPress={() =>
              navigation.navigate('SenseOfTaste', {
                currentReportDate: currentDate,
              })
            }
            text={'Sense of taste'}
            icon={Icons.Food}
          />
          <Space />
          <OverviewSymptomButton
            color={null}
            onPress={() =>
              navigation.navigate('SenseOfSmell', {
                currentReportDate: currentDate,
              })
            }
            text={'Sense of smell'}
            icon={Icons.Nose}
          />
          <Space />
          <View style={{width: 100, height: 100}} />
        </View>
        <Space />
        <TouchableOpacity onPress={() => {}}>
          <NoSymtoms>
            <Icon source={Icons.Flex} />
            <Space />
            <Text style={styles.emojiButtonText}>No symptoms today</Text>
          </NoSymtoms>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const NoSymtoms = styled.View`
  flex-direction: row;
  width: 245px;
  height: 62px;
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
