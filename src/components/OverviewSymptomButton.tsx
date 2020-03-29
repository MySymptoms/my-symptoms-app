import * as React from 'react';
import {Button} from './Block';
import {Icon} from '../lib/icons';
import {ImageSourcePropType, StyleSheet, Text} from 'react-native';
import {HeartBeatIcon} from './HeartBeatIcon';
import {fontName} from '../lib/vars';
import {Colors} from '../lib/colors';

export interface OverviewSymptomButtonProps {
  icon: ImageSourcePropType;
  text: string;
  onPress: () => void;
  color: string | null;
}

export type ColorState = 'red' | 'green' | 'orange';

const getButtonBorderColor = (state: ColorState): string => {
  switch (state) {
    case 'green':
      return 'rgba(166, 255, 169, 0.4)';
    case 'orange':
      return 'rgba(255,188,92, 0.4)';
    case 'red':
      return 'rgba(255,122,122, 0.4)';
  }
};

const getIconColor = (state: ColorState): string => {
  switch (state) {
    case 'green':
      return Colors.lowStopColor;
    case 'orange':
      return Colors.mediumStopColor;
    case 'red':
      return Colors.highStopColor;
  }
};

export const OverviewSymptomButton: React.FC<OverviewSymptomButtonProps> = ({
  text,
  icon,
  onPress,
  color,
}) => {
  return (
    <Button
      style={{
        position: 'relative',
        borderColor: color ? color : undefined,
      }}
      onPress={onPress}>
      {color && (
        <HeartBeatIcon
          stroke={color}
          style={{position: 'absolute', top: 5, right: 5}}
        />
      )}
      <Icon source={icon} />
      <Text style={styles.emojiButtonText}>{text}</Text>
    </Button>
  );
};

const styles = StyleSheet.create({
  emojiButtonText: {
    fontSize: 15,
    color: '#fff',
    textAlign: 'center',
    fontFamily: fontName,
  },
});
