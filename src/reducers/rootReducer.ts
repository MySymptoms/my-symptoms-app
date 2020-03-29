import {combineReducers} from 'redux';
import {reportsReducer, ReportsReducerState} from './reportsReducer';
import {
  dateToReportIdReducer,
  DateToReportIdReducerState,
} from './dateToReportIdReducer';
import {userReducer, UserReducerState} from './userReducer';
import {locationReducer, LocationReducerState} from './locationReducer';

const rootReducer = combineReducers<RootState>({
  reports: reportsReducer,
  dateToReportId: dateToReportIdReducer,
  user: userReducer,
  location: locationReducer,
});
export default rootReducer;

export interface RootState {
  reports: ReportsReducerState;
  dateToReportId: DateToReportIdReducerState;
  user: UserReducerState;
  location: LocationReducerState;
}
