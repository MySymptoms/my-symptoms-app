import {useSelector} from 'react-redux';
import {RootState} from '../reducers/rootReducer';
import {sortBy} from 'lodash';
import {getNumberForReportAndSymptom} from '../lib/symptomToNumber';
import {isDefined} from '../lib/util';
import {Report} from '../reducers/reportsReducer';
import {SymptomsRecord} from '../reducers/symptoms';
import {createDataPoint} from '../DetailedReportScreen';
import {parseISO} from 'date-fns';
import { GraphDataPoint } from "../FancyGradientChart";

export const useHistoricalDataForSymptom = <T extends keyof SymptomsRecord>(
  key: T,
): GraphDataPoint[] =>
  useSelector((state: RootState) => {
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
  });
