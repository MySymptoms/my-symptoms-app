import {CREATE_REPORT, CreateReportAction} from './reportsReducer';
import { RootState } from './rootReducer';

export type DateToReportIdReducerState = Record<string, string>;

export const dateToReportIdReducer = (
  state: DateToReportIdReducerState = {},
  action: CreateReportAction,
): DateToReportIdReducerState => {
  switch (action.type) {
    case CREATE_REPORT:
      return {
        ...state,
        [action.date]: action.report_id,
      };

    default:
      return state;
  }
};

export const selectDateToReportId = (state: RootState) =>
  Object.keys(state.dateToReportId);
