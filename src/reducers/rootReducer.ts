import {combineReducers} from 'redux';
import {HealthDataState, healthDataReducer} from './healthDataReducer';

const rootReducer = combineReducers({
  healthData: healthDataReducer,
});
export default rootReducer;

export interface RootState {
  healthData: HealthDataState;
}

export const selectCurrentHealthReport = (state: RootState) =>
  state.healthData.currentReport;
