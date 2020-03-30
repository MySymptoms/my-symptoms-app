import React, {FC} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components/native';
import {selectShareData, setShareData} from '../reducers/userReducer';
import {Space} from './Block';
import {Text} from 'react-native';
import {CheckIcon} from './CheckIcon';
import {Colors} from '../lib/colors';
import {CrossIcon} from './CrossIcon';

export const ShareDataButton: FC = () => {
  const dispatch = useDispatch();
  const shareData = useSelector(selectShareData);

  return (
    <ShareButton
      onPress={() => {
        dispatch(setShareData(!shareData));
      }}>
      <ShareButtonText>Share data anonymously</ShareButtonText>
      <Space />
      {shareData ? (
        <CheckIcon stroke={Colors.stepOneColor} />
      ) : (
        <CrossIcon stroke={Colors.stepFiveColor} />
      )}
    </ShareButton>
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

const ShareButton = styled(Button)`
  background: #008475;
  flex-direction: row;
`;

const ShareButtonText = styled.Text`
  color: #003d02;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 1px;
`;
