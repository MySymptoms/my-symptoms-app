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

const initialState: ReportsReducerState = {
  '7b8a8627-ee14-4912-b453-9131249f9937': {
    report_id: '7b8a8627-ee14-4912-b453-9131249f9937',
    date: '2020-03-28',
    updated_at: '2020-03-28T13:14:00.11212+01:00',
    coarse_location: {lat: 33, long: 23},
    symptoms: {
      no_symptoms: {
        symptom: 'no_symptoms',
        values: {
          checked: true,
        },
      },
      fever: {
        // or null/undefined
        symptom: 'fever',
        values: {
          degrees: 37.6, // celcius
        },
      },
      dry_cough: {
        symptom: 'dry_cough',
        values: {
          frequency: 'every_minute', // "few_times_an_hour", "few_times_a_day"
          intensity: '',
          disruption: '',
        },
      },
      sense_of_taste: null,
      tiredness: {
        symptom: 'tiredness',
        values: {
          energy_level: 9, // 1-9
          nausea: true,
          fainting: true,
        },
      },
      shortness_of_breath: {
        symptom: 'shortness_of_breath',
        values: {
          feeling: 'breathe_normally', // "shortness of breath", "tightness in my chest", "cannot get enough air"
          fainting: false, // What did we say? remove this and add a dizzyness thing? Or only the nausea thing?
        },
      },
    },
  },
};

export const reportsReducer = (
  state: ReportsReducerState = initialState,
  action: CreateReportAction | UpdateSymptomAction<keyof SymptomsRecord>,
): ReportsReducerState => {
  switch (action.type) {
    case UPDATE_SYMPTOM: {
      const report = state[action.uuid];
      const symptoms = state[action.uuid].symptoms;
      return {
        ...state,
        [action.uuid]: {
          ...report,
          symptoms: {
            ...symptoms,
            [action.symptomKey]: {
              symptom: action.symptomKey,
              values: action.symptom,
            },
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
