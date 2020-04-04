import React, {useState} from 'react';
import {BoxInput} from './BoxInput';
import {Icons} from '../lib/icons';
import {TextInput, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {selectBirthYear, setBirthYear} from '../reducers/userReducer';
import {getYear} from 'date-fns';
import {fontName} from '../lib/vars';
import { useTranslation } from 'react-i18next';


const currentYear = getYear(new Date());

export const BirthYearInput = () => {
  const {t} =  useTranslation();
  const dispatch = useDispatch();
  const birthYear = useSelector(selectBirthYear)?.toString();

  const [year, setYear] = useState(birthYear || '1990');

  return (
    <BoxInput
      icon={Icons.Baby}
      text={t("What year were you born?")}
      rightComponent={
        <TextInput
          value={year}
          onChangeText={setYear}
          onBlur={() => {
            let validYear = parseInt(year);
            if (validYear < 1900) {
              validYear = 1900;
            } else if (validYear > currentYear) {
              validYear = currentYear;
            }
            setYear(validYear.toString());
            dispatch(setBirthYear(validYear));
          }}
          underlineColorAndroid="transparent"
          style={styles.year}
          keyboardType="numeric"
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  year: {
    fontSize: 26,
    color: 'white',
    alignSelf: 'flex-end',
    fontFamily: fontName,
  },
});
