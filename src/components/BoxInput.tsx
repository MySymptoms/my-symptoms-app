import React, {FC, ReactNode} from 'react';
import styled from 'styled-components/native';
import {Icon, Icons} from '../lib/icons';
import {
  Dimensions,
  TextInput,
  StyleSheet,
  ImageSourcePropType,
  View,
} from 'react-native';
import {fontName} from '../lib/vars';
import {Divider} from './Divider';

interface Props {
  icon: ImageSourcePropType;
  text: string;
  rightComponent: ReactNode;
  expandingBottomComponent?: ReactNode;
  showExpandingBottomComponent?: boolean;
}

export const BoxInput: FC<Props> = ({
  icon,
  text,
  rightComponent,
  showExpandingBottomComponent,
  expandingBottomComponent,
}) => {
  return (
    <BlackBox>
      <Row style={styles.outerRow}>
        <Row>
          <Icon source={icon} style={styles.emojiStyle} />
          <BoxText>{text}</BoxText>
        </Row>

        {rightComponent}
      </Row>
      {showExpandingBottomComponent && (
        <View>
          <Divider />
          {expandingBottomComponent}
        </View>
      )}
    </BlackBox>
  );
};

const BoxText = styled.Text`
  font-family: ${fontName};
  color: #ffffff;
  font-weight: 600;
  font-size: 18px;
  max-width: 200px;
`;

const BlackBox = styled.View`
  background: #1f1f1f;
  border: 1px solid #000000;
  border-radius: 10px;
  padding: 20px;
  width: 96%;
  margin: auto;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
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
  peopleShared: {
    color: 'white',
    fontWeight: '700',
  },
  peopleSharedBorder: {
    borderBottomWidth: 2,
    borderBottomColor: 'white',
  },
});
