import {combineReducers} from 'redux';
import {
  HealthDataState,
  healthDataReducer,
  HealthDataEntry,
} from './healthDataReducer';

import _ from 'lodash';
import {ReportsReducerState, reportsReducer} from './reportsReducer';
import {
  DateToReportIdReducerState,
  dateToReportIdReducer,
} from './dateToReportIdReducer';

const rootReducer = combineReducers({
  healthData: healthDataReducer,
  reports: reportsReducer,
  dateToReportId: dateToReportIdReducer,
});
export default rootReducer;

export interface RootState {
  healthData: HealthDataState;
  reports: ReportsReducerState;
  dateToReportId: DateToReportIdReducerState;
}

export const selectCurrentHealthReport = (state: RootState) =>
  state.healthData.currentReport;

export const selectReportById = (reportId: string) => (state: RootState) =>
  state.healthData.reports.find(r => r.report.id === reportId);

export const selectLatestReport = (
  state: RootState,
): HealthDataEntry | undefined =>
  _.first(_.orderBy(state.healthData.reports, ['timestamp'], ['desc']));
