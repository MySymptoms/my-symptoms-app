import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import {
  requestUpdateSymptomInReport,
  selectReport,
} from '../reducers/reportsReducer';
import {SymptomsRecord} from '../reducers/symptoms';
import {RootState} from '../reducers/rootReducer';

export function useReportState<TKey extends keyof SymptomsRecord>(
  currentReportDate: string,
  key: TKey,
) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const reportValues = useSelector((state: RootState) => {
    const report = selectReport(currentReportDate)(state);
    if (report) {
      return report.symptoms[key]?.values;
    } else {
      return null;
    }
  });

  const onSave = (
    values: Partial<SymptomsRecord[TKey]['values']> | null,
    goBack: boolean = true,
  ) => {
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
    // if (goBack) {
    //   setTimeout(() => {
    navigation.goBack();
    //   }, 2000)

    // }
  };

  const [values, setValues] = useState<Partial<
    SymptomsRecord[TKey]['values']
  > | null>(reportValues ?? null);

  const setValuesMerge = (vals: Partial<SymptomsRecord[TKey]['values']>) => {
    setValues(v => (v ? {...v, ...vals} : vals));
  };

  return {values, setValues: setValuesMerge, onSave};
}
