import {v4 as uuidv4} from 'uuid';
import {formatISO} from 'date-fns';
import {ThunkAction} from 'redux-thunk';
import {RootState} from './rootReducer';
import {AnyAction} from 'redux';
import {SymptomsRecord} from './symptoms';
import {selectLocation} from './locationReducer';

export const UPDATE_SYMPTOM = 'report/update-symptom';
export const CREATE_REPORT = 'report/create';

type Nullable<T> = {[P in keyof T]: T[P] | null};

export interface Report {
  report_id: string;
  date: string;
  updated_at: string;
  coarse_location: Location;
  symptoms: Nullable<SymptomsRecord>;
}

export interface Symptom {
  symptom: string;
  values: Record<string, string | number | boolean>;
}

export interface Location {
  lat: number;
  long: number;
}

export type ReportsReducerState = Record<string, Report>;

const initialState: ReportsReducerState = {};

export const reportsReducer = (
  state: ReportsReducerState = initialState,
  action: CreateReportAction | UpdateSymptomAction<keyof SymptomsRecord>,
): ReportsReducerState => {
  switch (action.type) {
    case UPDATE_SYMPTOM: {
      const report = state[action.uuid];
      const symptoms = state[action.uuid].symptoms;

      if (action.symptomKey === 'no_symptoms' && action.symptom.checked) {
        return {
          ...state,
          [action.uuid]: {
            ...report,
            updated_at: formatISO(action.now),
            symptoms: {
              dry_cough: null,
              fever: null,
              no_symptoms: {symptom: 'no_symptoms', values: {checked: true}},
              shortness_of_breath: null,
              tiredness: null,
              sense_of_taste: null,
              aches_and_pain: null,
              diarrhoea: null,
              nausea: null,
              runny_nose: null,
              sense_of_smell: null,
              sore_throat: null,
            },
          },
        };
      }

      return {
        ...state,
        [action.uuid]: {
          ...report,
          updated_at: formatISO(action.now),
          symptoms: {
            ...symptoms,
            [action.symptomKey]: {
              symptom: action.symptomKey,
              values: action.symptom,
            },
            no_symptoms: null,
          },
        },
      };
    }
    case CREATE_REPORT: {
      return {
        ...state,
        [action.report_id]: {
          report_id: action.report_id,
          date: action.date,
          updated_at: formatISO(action.now),
          coarse_location: action.location,
          symptoms: {
            dry_cough: null,
            fever: null,
            no_symptoms: null,
            shortness_of_breath: null,
            tiredness: null,
            sense_of_taste: null,
            aches_and_pain: null,
            diarrhoea: null,
            nausea: null,
            runny_nose: null,
            sense_of_smell: null,
            sore_throat: null,
          },
        },
      };
    }
    default:
      return state;
  }
};

export const requestUpdateSymptomInReport = <
  TKey extends keyof SymptomsRecord
>({
  date,
  now,
  symptomKey,
  symptom,
}: {
  date: string;
  now: Date;
  symptomKey: TKey;
  symptom: Partial<SymptomsRecord[TKey]['values']>;
}): ThunkAction<any, RootState, undefined, AnyAction> => (
  dispatch,
  getState,
) => {
  const state = getState();
  const {dateToReportId} = state;

  const {lat, long} = selectLocation(state);

  let reportId = dateToReportId[date];

  if (!reportId) {
    const action = createNewReport(date, now, {
      lat,
      long,
    });
    reportId = action.report_id;
    dispatch(action);
  }

  dispatch(updateSymptomInReport<TKey>(reportId, now, symptomKey, symptom));
};

export interface CreateReportAction {
  type: typeof CREATE_REPORT;
  report_id: string;
  date: string;
  now: Date;
  location: Location;
}

export const createNewReport = (
  date: string,
  now: Date,
  location: Location,
): CreateReportAction => {
  return {
    type: CREATE_REPORT,
    report_id: uuidv4(),
    date,
    now,
    location,
  };
};

interface UpdateSymptomAction<TKey extends keyof SymptomsRecord> {
  type: typeof UPDATE_SYMPTOM;
  uuid: string;
  now: Date;
  symptomKey: TKey;
  symptom: Partial<SymptomsRecord[TKey]['values']>;
}

export const updateSymptomInReport = <TKey extends keyof SymptomsRecord>(
  uuid: string,
  now: Date,
  symptomKey: TKey,
  symptom: Partial<SymptomsRecord[TKey]['values']>,
): UpdateSymptomAction<TKey> => {
  return {
    type: UPDATE_SYMPTOM,
    uuid,
    now,
    symptomKey,
    symptom,
  };
};

export const selectReport = (currentReportDate: string) => (
  state: RootState,
) => {
  const reportId = state.dateToReportId[currentReportDate];
  if (reportId) {
    return state.reports[reportId];
  } else {
    return null;
  }
};
