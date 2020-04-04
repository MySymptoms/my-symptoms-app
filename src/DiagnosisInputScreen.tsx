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
import {Picker} from '@react-native-community/picker';
import {useTranslation} from 'react-i18next';

type Props = {
  navigation: StackNavigationProp<{}>;
};

export const DiagnosisInputScreen: FC<Props> = ({navigation}) => {
  const {t} = useTranslation();

  return (
    <Background
      header={
        <NavigationHeader
          title={<Icon source={Icons.Corona} />}
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
              <BoxText>Which country are you in at the moment?</BoxText>
            </Row>
          </PaddedContainer>
          <Picker itemStyle={{color: 'white'}}>
            <Picker.Item label={'Sweden'} value={'sv'} />
            <Picker.Item label={'United States'} value={'us'} />
            <Picker.Item label={'United Kingdom'} value={'gb'} />
            <Picker.Item label={'Narnia'} value={'n/a'} />
          </Picker>
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
