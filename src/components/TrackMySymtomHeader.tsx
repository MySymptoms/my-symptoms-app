import React, {FC} from 'react';
import styled from 'styled-components/native';
import {fontName} from '../lib/vars';
import {Colors} from '../lib/colors';
import {useTranslation} from 'react-i18next';

interface Props {
  symptomName: string;
}

export const TrackMySymptomHeader: FC<Props> = ({symptomName}) => {
  const {t} = useTranslation();
  return (
    <Container>
      <MyText>{t('tracking')} </MyText>
      <SymptomText>{symptomName}</SymptomText>
    </Container>
  );
};

const MyText = styled.Text`
  font-family: ${fontName};
  color: ${Colors.title};
  font-size: 14px;
  text-transform: uppercase;
`;

const SymptomText = styled(MyText)`
  font-weight: bold;
`;

const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;
