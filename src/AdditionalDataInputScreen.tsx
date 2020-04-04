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
import {BirthYearInput} from './components/BirthYearInput';
import {BeenTravellingInput} from './components/BeenTravellingInput';
import {PreExistingAilmentsInput} from './components/PreExistingAilmentsinput';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {selectShareData} from './reducers/userReducer';

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
  const {t} = useTranslation();
  const [hasTraveled, setHasTraveled] = useState(true);
  const [hasCondition, setHasCondition] = useState(false);
  const shareData = useSelector(selectShareData);

  return (
    <Background
      header={<NavigationHeader center={<HelloUserHeader />} showBackButton />}>
      <BirthYearInput />
      <Space />
      <BeenTravellingInput />
      <Space />
      <PreExistingAilmentsInput />
      <Space />
      <Space />
      <PaddedContainer>
        <View style={styles.center}>
          <Button onPress={() => navigation.navigate('Diagnosis')}>
            <Row>
              <Icon source={Icons.Corona} style={styles.emojiStyle} />
              <ButtonText>
                {t('I have been diagnosed with Covid-19')}
              </ButtonText>
            </Row>
          </Button>
          <Space />
          <Image
            source={map3x}
            width={Dimensions.get('window').width}
            style={styles.map}
          />
          <ShareText>
            {shareData
              ? t('your data is being shared paragraph')
              : t('would you like to share data paragraph')}
          </ShareText>
          <Space />
          <ShareDataButton />
          <Space />
          <Row>
            <Text style={styles.numberPeopleShared}>2 234</Text>
            <Text style={styles.peopleShared}>
              {` ${t('from')}`} 🇸🇪 {t('shared their data anonymously so far')}
            </Text>
          </Row>
        </View>
        <Space />
        <Space />
        <Space />
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
  font-family: ${fontName};
  font-weight: 700;
  font-size: 16px;
`;
const ShareText = styled.Text`
  padding: 0 20px;
  color: white;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  font-family: ${fontName};
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
  numberPeopleShared: {
    color: 'white',
    fontWeight: '700',
    fontFamily: fontName,
    textDecorationLine: 'underline',
  },
  peopleShared: {
    color: 'white',
    fontFamily: fontName,
  },
});
