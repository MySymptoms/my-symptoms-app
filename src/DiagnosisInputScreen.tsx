import React, {FC} from 'react';
import {Background} from './components/Background';
import {StackNavigationProp} from '@react-navigation/stack';
import {Icon, Icons} from './lib/icons';
import {NavigationHeader} from './NavigationHeader';
import {Picker, StyleSheet, Text, View} from 'react-native';
import {fontName} from './lib/vars';
import styled from 'styled-components/native';
import {PaddedContainer, Space} from './components/Block';
import {SelectionGroup} from './components/SelectionGroup';
import {ShareDataButton} from './components/ShareDataButton';

type Props = {
  navigation: StackNavigationProp<{}>;
};

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const BrownBox = styled.View`
  background: #241313;
  border: 1px solid #000000;
  border-radius: 10px;
  padding: 20px;
  overflow: hidden;
  width: 96%;
  margin: auto;
`;

const BoxText = styled.Text`
  font-family: ${fontName};
  color: #cdcdcd;
  font-weight: 600;
  font-size: 18px;
`;

export const DiagnosisInputScreen: FC<Props> = ({navigation}) => {
  return (
    <Background
      header={
        <NavigationHeader
          title={<Icon source={Icons.Corona} />}
          showBackButton
        />
      }>
      <PaddedContainer>
        <TitleText>
          Please share more about your{' '}
          <Text style={{fontWeight: '700', color: 'white'}}>diagnosis</Text>
        </TitleText>
      </PaddedContainer>
      <Space />
      <BrownBox>
        <Row>
          <Icon source={Icons.Hospital} style={styles.emojiStyle} />
          <BoxText>Where did you get tested?</BoxText>
        </Row>
        <SelectionGroup
          title=""
          onOptionSelected={() => {}}
          options={[
            {title: 'hospital'},
            {title: 'drive through'},
            {title: 'walk in clinic'},
            {title: 'other'},
          ]}
        />
      </BrownBox>
      <Space />
      <BrownBox>
        <Row>
          <Icon source={Icons.Map} style={styles.emojiStyle} />
          <BoxText>Which country are you in at the moment?</BoxText>
        </Row>
        <Picker itemStyle={{color: 'white', background: 'blue'}}>
          <Picker.Item label={'Sweden'} value={'sv'} />
          <Picker.Item label={'United States'} value={'us'} />
          <Picker.Item label={'United Kingdom'} value={'gb'} />
          <Picker.Item label={'Narnia'} value={'n/a'} />
        </Picker>
      </BrownBox>
      <Space />
      <Space />
      <Space />
      <View style={styles.center}>
        <ShareDataButton />
      </View>
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

const TitleText = styled.Text`
  color: #b2b2b2;
  font-size: 18px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ShareButton = styled(Button)`
  background: #008475;
  align-items: center;
  border-radius: 40px;
  padding: 15px 20px;
  border: 3px rgba(0, 0, 0, 0.6);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  elevation: 100;
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
  text: {
    color: 'white',
  },
});
