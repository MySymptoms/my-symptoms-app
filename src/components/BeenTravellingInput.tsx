import React from 'react';
import {BoxInput} from './BoxInput';
import {Icons} from '../lib/icons';
import {SegmentedControl} from './SegmentedControl';
import {useSelector, useDispatch} from 'react-redux';
import {
  selectRecentTravels,
  setHasTravelledRecently,
} from '../reducers/userReducer';
import { useTranslation } from 'react-i18next';

export const BeenTravellingInput = () => {
  const {t} = useTranslation();
  const hasTraveled = useSelector(selectRecentTravels);
  const dispatch = useDispatch();

  return (
    <BoxInput
      icon={Icons.PlaneLanding}
      text={t("Have you recently returned from a foreign country?")}
      rightComponent={
        <SegmentedControl
          firstOption={t("yes")}
          secondOption={t("no")}
          selectedIndex={hasTraveled ? 0 : 1}
          onTabPress={option => {
            dispatch(setHasTravelledRecently(option === 0 ? true : false));
          }}
        />
      }
    />
  );
};
