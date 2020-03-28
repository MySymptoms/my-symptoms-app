import {combineReducers} from 'redux';
import {
  HealthDataEntry,
  healthDataReducer,
  HealthDataState,
} from './healthDataReducer';

import _ from 'lodash';
import {reportsReducer, ReportsReducerState} from './reportsReducer';
import {
  dateToReportIdReducer,
  DateToReportIdReducerState,
} from './dateToReportIdReducer';
import {userReducer, UserReducerState} from './userReducer';

const rootReducer = combineReducers<RootState>({
  healthData: healthDataReducer,
  reports: reportsReducer,
  dateToReportId: dateToReportIdReducer,
  user: userReducer,
});
export default rootReducer;

export interface RootState {
  healthData: HealthDataState;
  reports: ReportsReducerState;
  dateToReportId: DateToReportIdReducerState;
  user: UserReducerState;
}

export const selectCurrentHealthReport = (state: RootState) =>
  state.healthData.currentReport;

export const selectReportById = (reportId: string) => (state: RootState) =>
  state.healthData.reports.find(r => r.report.id === reportId);

export const selectLatestReport = (
  state: RootState,
): HealthDataEntry | undefined =>
  _.first(_.orderBy(state.healthData.reports, ['timestamp'], ['desc']));
