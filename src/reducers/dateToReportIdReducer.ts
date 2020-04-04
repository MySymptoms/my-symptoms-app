import {
  CREATE_REPORT,
  CreateReportAction,
  REMOVE_REPORT,
  RemoveReportAction,
} from './reportsReducer';
import {RootState} from './rootReducer';

export type DateToReportIdReducerState = Record<string, string>;

export const dateToReportIdReducer = (
  state: DateToReportIdReducerState = {},
  action: CreateReportAction | RemoveReportAction,
): DateToReportIdReducerState => {
  switch (action.type) {
    case CREATE_REPORT:
      return {
        ...state,
        [action.date]: action.report_id,
      };
    case REMOVE_REPORT: {
      const nextState = {
        ...state,
      };
      const reportDate = Object.keys(state).find(
        date => state[date] === action.report_id,
      );
      if (reportDate) {
        delete nextState[reportDate];
      }
      return nextState;
    }
    default:
      return state;
  }
};

export const selectDateToReportId = (state: RootState) =>
  Object.keys(state.dateToReportId);

export const selectDateToReportIdByDate = (state: RootState, date: string) =>
  state.dateToReportId[date];
