import {Colors} from './colors';
import {Report} from 'src/reducers/reportsReducer';
import {SymptomsRecord} from 'src/reducers/symptoms';

type KeyGetterWhatever<T> = {
  [K in keyof T]: (symptom: T[K]) => number | null;
};

const map: KeyGetterWhatever<SymptomsRecord> = {
  fever: ({values: {degrees: value}}) => {
    return value;
  },
  dry_cough: ({values: {intensity}}) => {
    switch (intensity) {
      case 'none':
        return 1;
      case 'bearable':
        return 2;
      case 'harsh':
        return 4;
      case 'physical_discomfort':
        return 5;
      default:
        return null;
    }
  },
  no_symptoms: ({values: {checked}}) => {
    return checked ? 1 : 5;
  },
  sense_of_taste: ({values: {description}}) => {
    switch (description) {
      case 'normal':
        return 1;
      case 'less_than_usual':
        return 3;
      case 'can_not_taste_anything':
        return 5;
      default:
        return null;
    }
  },
  sense_of_smell: ({values: {description}}) => {
    switch (description) {
      case 'normal':
        return 1;
      case 'less_than_usual':
        return 3;
      case 'can_not_smell_anything':
        return 5;
      default:
        return null;
    }
  },
  shortness_of_breath: ({values: {feeling}}) => {
    switch (feeling) {
      case 'breathe_normally':
        return 1;
      case 'shortness_of_breath':
        return 2;
      case 'tightness_in_my_chest':
        return 4;
      case 'cannot_get_enough_air':
        return 5;

      default:
        return null;
    }
  },
  tiredness: ({values: {description}}) => {
    switch (description) {
      case 'as_usual':
        return 1;
      case 'tired_but_not_bedridden':
        return 2;
      case 'mostly_bedridden':
        return 3;
      case 'can_get_to_the_bathroom':
        return 4;
      case 'cannot_get_out_of_bed':
        return 5;
      default:
        return null;
    }
  },
  aches_and_pain: ({values: {have_ache}}) => {
    return have_ache ? 5 : 1;
  },
  sore_throat: ({values: {feeling}}) => {
    switch (feeling) {
      case 'normal':
        return 1;
      case 'easy_to_gulp':
        return 2;
      case 'scratchy':
        return 4;
      case 'difficult_to_swallow':
        return 5;
      default:
        return null;
    }
  },
  diarrhoea: ({values: {presense}}) => {
    return presense ? 5 : 1;
  },
  nausea: ({values: {presense}}) => {
    return presense ? 5 : 1;
  },
  runny_nose: ({values: {presense}}) => {
    return presense ? 5 : 1;
  },
};

export function getNumberForReportAndSymptom<TKey extends keyof SymptomsRecord>(
  report: Report | null,
  symptom: TKey,
): number | null {
  if (!report) {
    return null;
  }

  if (!report.symptoms) {
    return null;
  }
  switch (symptom) {
    case 'aches_and_pain': {
      const reportedSymptom = report.symptoms.aches_and_pain;
      return reportedSymptom ? map['aches_and_pain'](reportedSymptom) : null;
    }
    case 'diarrhoea': {
      const reportedSymptom = report.symptoms.diarrhoea;
      return reportedSymptom ? map['diarrhoea'](reportedSymptom) : null;
    }
    case 'dry_cough': {
      const reportedSymptom = report.symptoms.dry_cough;
      return reportedSymptom ? map['dry_cough'](reportedSymptom) : null;
    }
    case 'fever': {
      const reportedSymptom = report.symptoms.fever;
      return reportedSymptom ? map['fever'](reportedSymptom) : null;
    }
    case 'nausea': {
      const reportedSymptom = report.symptoms.nausea;
      return reportedSymptom ? map['nausea'](reportedSymptom) : null;
    }
    case 'no_symptoms': {
      const reportedSymptom = report.symptoms.no_symptoms;
      return reportedSymptom ? map['no_symptoms'](reportedSymptom) : null;
    }
    case 'runny_nose': {
      const reportedSymptom = report.symptoms.runny_nose;
      return reportedSymptom ? map['runny_nose'](reportedSymptom) : null;
    }
    case 'sense_of_smell': {
      const reportedSymptom = report.symptoms.sense_of_smell;
      return reportedSymptom ? map['sense_of_smell'](reportedSymptom) : null;
    }
    case 'sense_of_taste': {
      const reportedSymptom = report.symptoms.sense_of_taste;
      return reportedSymptom ? map['sense_of_taste'](reportedSymptom) : null;
    }
    case 'shortness_of_breath': {
      const reportedSymptom = report.symptoms.shortness_of_breath;
      return reportedSymptom
        ? map['shortness_of_breath'](reportedSymptom)
        : null;
    }
    case 'sore_throat': {
      const reportedSymptom = report.symptoms.sore_throat;
      return reportedSymptom ? map['sore_throat'](reportedSymptom) : null;
    }
    case 'tiredness': {
      const reportedSymptom = report.symptoms.tiredness;
      return reportedSymptom ? map['tiredness'](reportedSymptom) : null;
    }
    default:
      return null;
  }
}
