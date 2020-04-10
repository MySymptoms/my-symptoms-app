import {RootState} from '../reducers/rootReducer';
import {SymptomsRecord} from '../reducers/symptoms';
import {createDataPoint, getGraphDate} from '../DetailedReportScreen';
import {GraphDataPoint} from '../FancyGradientChart';
import {Report} from '../reducers/reportsReducer';
import {getNumberForReportAndSymptom} from '../lib/symptomToNumber';
import {isDefined} from '../lib/util';
import {useSelector} from 'react-redux';
import {parseISO} from 'date-fns';
import {sortBy} from 'lodash';

export const useHistoricalDataForSymptom = <T extends keyof SymptomsRecord>(
  key: T,
): GraphDataPoint[] => useSelector(selectHistoricalDataForSymptom(key));

export function selectHistoricalDataForSymptom<T extends keyof SymptomsRecord>(
  key: T,
) {
  return (state: RootState) => {
    const reports = Object.values(state.reports);

    const transformSymptom = (report: Report) => {
      const symptom = report.symptoms[key];
      const numberForReportAndSymptom = getNumberForReportAndSymptom(
        report,
        key,
      );
      if (symptom && numberForReportAndSymptom) {
        return createDataPoint(
          parseISO(report.date),
          numberForReportAndSymptom,
        );
      } else {
        return null;
      }
    };

    const symptomsPerDay = reports.map(transformSymptom).filter(isDefined);

    return sortBy(symptomsPerDay, 'date');
  };
}
