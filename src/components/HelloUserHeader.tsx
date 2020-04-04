import React, {FC} from 'react';
import styled from 'styled-components/native';
import {HalfSpace} from './Block';
import {UserEmojiField} from './UserEmojiField';
import {fontName} from '../lib/vars';
import {selectUserEmoji} from '../reducers/userReducer';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

export const HelloUserHeader: FC = () => {
  const {t} = useTranslation();
  const emoji = useSelector(selectUserEmoji);

  return (
    <Container>
      <MyText>{t('HELLO ANONYMOUS')} </MyText>
      <HalfSpace />
      <UserEmojiField emoji={emoji} />
    </Container>
  );
};

const MyText = styled.Text`
  font-family: ${fontName};
  color: #cdcdcd;
  font-weight: 600;
  font-size: 14px;
`;

const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;
