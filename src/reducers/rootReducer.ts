import {combineReducers} from 'redux';
import {
  HealthDataState,
  healthDataReducer,
  HealthDataEntry,
} from './healthDataReducer';

import _ from 'lodash';

const rootReducer = combineReducers({
  healthData: healthDataReducer,
});
export default rootReducer;

export interface RootState {
  healthData: HealthDataState;
}

export const selectCurrentHealthReport = (state: RootState) =>
  state.healthData.currentReport;

export const selectReportById = (reportId: string) => (state: RootState) =>
  state.healthData.reports.find(r => r.report.id === reportId);

export const selectLatestReport = (
  state: RootState,
): HealthDataEntry | undefined =>
  _.first(_.orderBy(state.healthData.reports, ['timestamp'], ['desc']));
