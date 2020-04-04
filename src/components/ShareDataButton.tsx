import React, {FC} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {selectShareData, setShareData} from '../reducers/userReducer';
import {useTranslation} from 'react-i18next';
import {HappySadButton} from './HappySadButton';

export const ShareDataButton: FC = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const shareData = useSelector(selectShareData);

  return (
    <HappySadButton
      isHappy={!shareData}
      onPress={() => {
        dispatch(setShareData(!shareData));
      }}>
      {shareData ? t('stop sharing data') : t('start sharing data')}
    </HappySadButton>
  );
};
