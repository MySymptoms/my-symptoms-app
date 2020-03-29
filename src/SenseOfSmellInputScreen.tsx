import React, {FC} from 'react';
import {Background} from './components/Background';
import {StackNavigationProp} from '@react-navigation/stack';
import {Icon, Icons} from './lib/icons';
import {NavigationHeader} from './NavigationHeader';
import {View, StyleSheet} from 'react-native';
import {Colors} from './lib/colors';
import {fontName} from './lib/vars';
import {DoneButton} from './components/DoneButton';
import {SelectionGroup} from './components/SelectionGroup';
import {FancyGradientChart} from './FancyGradientChart';
import {createDataPoint, getGraphDate} from './DetailedReportScreen';
import {TrackMySymptomHeader} from './components/TrackMySymtomHeader';
import { RootStackParamList } from "../App";
import { RouteProp } from "@react-navigation/native";
import { useReportState } from "./useReportState";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'SenseOfSmell'>;
  route: RouteProp<RootStackParamList, 'SenseOfSmell'>;
};

export const SenseOfSmellInputScreen: FC<Props> = ({ route }) => {
  const { currentReportDate } = route.params;
  const {setValues, values, onSave} = useReportState(
    currentReportDate,
    'dry_cough',
  );
  return (
    <Background>
      <NavigationHeader
        center={<TrackMySymptomHeader symptomName="sense of smell" />}
        showBackButton
      />
      <View style={{flexDirection: 'row'}}>
        <Icon style={styles.emojiStyle} source={Icons.Nose} />
        <FancyGradientChart
          data={[
            createDataPoint(getGraphDate(24), 1),
            createDataPoint(getGraphDate(25), 1),
            createDataPoint(getGraphDate(26), 2),
            createDataPoint(getGraphDate(27), 2),
            createDataPoint(getGraphDate(28), 3),
          ]}
        />
      </View>
      <SelectionGroup
        title="have you lost your sense of smell?"
        onOptionSelected={() => {}}
        options={[
          {title: 'yes', color: '#FF7A7A'},
          {title: 'no', color: '#8cf081'},
        ]}
      />
      <View style={styles.center}>
        <DoneButton style={{marginTop: 50}} onPress={() => {}} />
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  tempInputContainer: {
    width: 170,
    height: 170,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: Colors.buttonBorder,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  tempInputText: {
    color: 'white',
    fontFamily: fontName,
    fontWeight: '500',
    fontSize: 48,
    lineHeight: 61,
  },
  center: {
    width: '100%',
    alignItems: 'center',
  },
  emojiStyle: {
    position: 'absolute',
    bottom: '30%',
  },
});
