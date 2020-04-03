import React, {FC, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {SelectableButton} from './SelectableButton';
import {Space} from './Block';
import {Colors} from '../lib/colors';
import {fontName} from '../lib/vars';

export interface Option<T> {
  title: string;
  color?: string;
  dataValue: T;
}

interface Props<T> {
  title: string;
  options: Option<T>[];
  selectedDataValue?: T;
  onOptionSelected: (option: Option<T> | null, index: number) => void;
}

export function SelectionGroup<T>({
  title,
  options,
  selectedDataValue,
  onOptionSelected,
}: Props<T>) {
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
                  if (options[index].dataValue === selectedDataValue) {
                    onOptionSelected(null, -1);
                  } else {
                    onOptionSelected(options[index], index);
                  }
                }}
                title={header}
                selected={options[index].dataValue === selectedDataValue}
                lineColor={color}
              />
              <Space />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    textTransform: 'uppercase',
    color: Colors.sectionHeader,
    fontFamily: fontName,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 23,
    paddingLeft: 10,
  },
  horizontal: {flexDirection: 'row'},
});
