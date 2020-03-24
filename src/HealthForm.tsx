import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';
import {SliderInput} from './SliderInput';
import {SwitchInput} from './SwitchInput';
import {
  HealthReport,
  updateCurrentReportField,
  HealthReportField,
  submitNewHelthDataReport,
} from './reducers/healthDataReducer';
import {useDispatch, useSelector} from 'react-redux';
import {selectCurrentHealthReport} from './reducers/rootReducer';
import {v4 as uuid} from 'uuid';

export const HealthForm = () => {
  const dispatch = useDispatch();
  const currentHealthReport = useSelector(selectCurrentHealthReport);
  const updateFormData = (key: string, value: number | boolean) => {
    dispatch(updateCurrentReportField(key, value));
  };

  return (
    <View>
      <Text style={{fontSize: 28}}>Health Form</Text>
      <SliderInput
        title="Temperature"
        min={35}
        max={43}
        step={0.1}
        onValueUpdated={value => {
          updateFormData(HealthReportField.Fever, value);
        }}
        value={currentHealthReport.fever}
        valueFormatter={(v: number) => v.toFixed(1)}
      />
      <SwitchInput
        title="Would you consider this a feaver?"
        onValueUpdated={value => {
          updateFormData(HealthReportField.IsFever, value);
        }}
        value={currentHealthReport.isFeaver}
      />
      <SliderInput
        value={currentHealthReport.tiredness}
        title="Tiredness"
        onValueUpdated={value => {
          updateFormData(HealthReportField.Tiredness, value);
        }}
      />
      <SliderInput
        value={currentHealthReport.dryCough}
        title="Dry Cough"
        onValueUpdated={value => {
          updateFormData(HealthReportField.DryCough, value);
        }}
      />
      <SliderInput
        value={currentHealthReport.shortnessOfBreath}
        title="Shortness Of Breath"
        onValueUpdated={value => {
          updateFormData(HealthReportField.ShortnessOfBreath, value);
        }}
      />
      <SliderInput
        value={currentHealthReport.achesAndPains}
        title="Aches and Pains"
        onValueUpdated={value => {
          updateFormData(HealthReportField.AchesAndPains, value);
        }}
      />
      <SliderInput
        value={currentHealthReport.soreThroat}
        title="Sore Throat"
        onValueUpdated={value => {
          updateFormData(HealthReportField.SoreThroat, value);
        }}
      />
      <SliderInput
        value={currentHealthReport.diarrhoea}
        title="Diarrhoea"
        onValueUpdated={value => {
          updateFormData(HealthReportField.Diarrhoea, value);
        }}
      />
      <SliderInput
        value={currentHealthReport.nausea}
        title="Nausea"
        onValueUpdated={value => {
          updateFormData(HealthReportField.Nausea, value);
        }}
      />
      <SliderInput
        value={currentHealthReport.runnyNose}
        title="Runny Nose"
        onValueUpdated={value => {
          updateFormData(HealthReportField.RunnyNose, value);
        }}
      />
      <Button
        title="Submit"
        onPress={() => {
          dispatch(
            submitNewHelthDataReport('uniqueClientId', new Date(), {
              ...currentHealthReport,
              id: uuid(),
            }),
          );
        }}
      />
    </View>
  );
};
