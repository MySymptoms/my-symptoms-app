import {v4 as uuidv4} from 'uuid';
import {format, formatISO} from 'date-fns';
import {ThunkAction} from 'redux-thunk';
import {RootState} from './rootReducer';
import {AnyAction} from 'redux';

export const UPDATE_SYMPTOM = 'report/update-symptom';
export const CREATE_REPORT = 'report/create';

export interface Report {
  report_id: string;
  date: string;
  updated_at: string;
  coarse_location: Location;
  symptoms: Record<string, Symptom>;
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

const initialState = {
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
          unit: 'C',
          degrees: 37.6, // celcius
        },
      },
      dry_cough: {
        symptom: 'dry_cough',
        values: {
          frequency: 'every_minute', // "few_times_an_hour", "few_times_a_day"
          intencity: '',
          disruption: '',
        },
      },
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
  action: CreateReportAction | UpdateSymptomAction,
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
            [action.symptom.symptom]: {
              symptom: action.symptom.symptom,
              values: action.symptom.values,
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
          symptoms: {},
        },
      };
    }
    default:
      return state;
  }
};

export const requestCreateNewReport = ({
  date,
}: {
  date: string;
}): ThunkAction<any, RootState, undefined, AnyAction> => (
  dispatch,
  getState,
) => {
  const state = getState();
  const {dateToReportId} = state; // TODO: Create location reducer for last known location

  if (!(date in dateToReportId)) {
    dispatch(
      createNewReport(date, new Date(), {lat: 57.70887, long: 11.97456}),
    );
  }
};

export const requestUpdateSymptomInReport = ({
  date,
  now,
  symptom,
}: {
  date: string;
  now: Date;
  symptom: Symptom;
}): ThunkAction<any, RootState, undefined, AnyAction> => (
  dispatch,
  getState,
) => {
  const state = getState();
  const {dateToReportId} = state; // TODO: Create location reducer for last known location

  let reportId = dateToReportId[date];

  if (!reportId) {
    const action = createNewReport(date, now, {
      lat: 57.70887,
      long: 11.97456,
    });
    reportId = action.report_id;
    dispatch(action);
  }

  dispatch(updateSymptomInReport(reportId, symptom));
};

// dispatch(requestCreateNewReport());
// dispatch(updateSymptom());

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

interface UpdateSymptomAction {
  type: typeof UPDATE_SYMPTOM;
  uuid: string;
  now: Date;
  symptom: Symptom;
}

export const updateSymptomInReport = (
  uuid: string,
  now: Date,
  symptom: Symptom,
): UpdateSymptomAction => {
  return {
    type: UPDATE_SYMPTOM,
    uuid,
    now,
    symptom,
  };
};
