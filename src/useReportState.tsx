import {SymptomsRecord} from './reducers/symptoms';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {requestUpdateSymptomInReport} from './reducers/reportsReducer';
import {useState} from 'react';

export function useReportState<TKey extends keyof SymptomsRecord>(
  currentReportDate: string,
  key: TKey,
) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const onSave = (values: SymptomsRecord[TKey]['values'] | null) => {
    if (values) {
      dispatch(
        requestUpdateSymptomInReport<TKey>({
          date: currentReportDate,
          now: new Date(),
          symptomKey: key,
          symptom: values,
        }),
      );
    }
    navigation.goBack();
  };

  const [values, setValues] = useState<SymptomsRecord[TKey]['values'] | null>(
    null,
  );

  return {values, setValues, onSave};
}
