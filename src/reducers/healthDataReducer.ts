export const SUBMIT_HEALTHDATA_REPORT = 'healthdata/new';
export const UPDATE_CURRENT_REPORT = 'healthdata/current/update';

export interface HealthDataState {
  currentReport: HealthReportWithoutId;
  reports: HealthDataEntry[];
}

export interface HealthDataEntry {
  clientId: string;
  timestamp: Date;
  report: HealthReport;
}

export interface HealthReport extends HealthReportWithoutId {
  id: string;
}

export enum HealthReportField {
  Fever = 'fever',
  IsFever = 'isFeaver',
  Tiredness = 'tiredness',
  DryCough = 'dryCough',
  ShortnessOfBreath = 'shortnessOfBreath',
  AchesAndPains = 'achesAndPains',
  SoreThroat = 'soreThroat',
  Diarrhoea = 'diarrhoea',
  Nausea = 'nausea',
  RunnyNose = 'runnyNose',
}

export interface HealthReportWithoutId {
  [HealthReportField.Fever]: number;
  [HealthReportField.IsFever]: boolean;
  [HealthReportField.Tiredness]: number;
  [HealthReportField.DryCough]: number;
  [HealthReportField.ShortnessOfBreath]: number;
  [HealthReportField.AchesAndPains]: number;
  [HealthReportField.SoreThroat]: number;
  [HealthReportField.Diarrhoea]: number;
  [HealthReportField.Nausea]: number;
  [HealthReportField.RunnyNose]: number;
}

const initialState = {
  currentReport: {
    fever: 37,
    isFeaver: false,
    tiredness: 0,
    dryCough: 0,
    shortnessOfBreath: 0,
    achesAndPains: 0,
    soreThroat: 0,
    diarrhoea: 0,
    nausea: 0,
    runnyNose: 0,
  },
  reports: [],
};

export const healthDataReducer = (
  state: HealthDataState = initialState,
  action: any,
) => {
  switch (action.type) {
    case SUBMIT_HEALTHDATA_REPORT: {
      const a: SubmitHealthDataEntryAction = action;
      return {
        ...state,
        reports: [...state.reports, a.report],
        currentReport: initialState.currentReport,
      };
    }
    case UPDATE_CURRENT_REPORT: {
      const a: UpdateCurrentHealthDataReportAction = action;
      return {
        ...state,
        currentReport: {
          ...state.currentReport,
          [a.key]: a.value,
        },
      };
    }
    default:
      return state;
  }
};

export interface SubmitHealthDataEntryAction {
  type: typeof SUBMIT_HEALTHDATA_REPORT;
  clientId: string;
  timestamp: Date;
  report: HealthReport;
}

export const submitNewHelthDataReport = (
  clientId: string,
  timestamp: Date,
  report: HealthReport,
) => {
  return {
    type: SUBMIT_HEALTHDATA_REPORT,
    clientId,
    timestamp,
    report,
  };
};

export interface UpdateCurrentHealthDataReportAction {
  type: typeof SUBMIT_HEALTHDATA_REPORT;
  key: string;
  value: number | boolean;
}

export const updateCurrentReportField = (
  key: string,
  value: boolean | number,
) => {
  return {
    type: UPDATE_CURRENT_REPORT,
    key,
    value,
  };
};
