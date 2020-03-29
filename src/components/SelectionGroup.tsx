import React, {FC, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {SelectableButton} from './SelectableButton';
import {Space} from './Block';
import {Colors} from '../lib/colors';
import {fontName} from '../lib/vars';

interface Option {
  title: string;
  color?: string;
  dataValue: any;
}

interface Props {
  title: string;
  options: Option[];
  onOptionSelected: (option: Option | null, index: number) => void;
}

export const SelectionGroup: FC<Props> = ({
  title,
  options,
  onOptionSelected,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <Space />
      <ScrollView horizontal style={{paddingBottom: 10, paddingLeft: 10}}>
        {options.map(({title: header, color}, index) => {
          return (
            <View style={styles.horizontal} key={index}>
              <SelectableButton
                onPress={() => {
                  if (selectedIndex === index) {
                    setSelectedIndex(null);
                    onOptionSelected(null, -1);
                  } else {
                    setSelectedIndex(index);
                    onOptionSelected(options[index], index);
                  }
                }}
                title={header}
                selected={index === selectedIndex}
                lineColor={color}
              />
              <Space />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    textTransform: 'uppercase',
    color: Colors.sectionHeader,
    fontFamily: fontName,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 23,
    paddingLeft: 10
  },
  horizontal: {flexDirection: 'row'},
});
