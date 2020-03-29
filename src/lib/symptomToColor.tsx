import {Colors} from './colors';
import {Report} from 'src/reducers/reportsReducer';
import {SymptomsRecord} from 'src/reducers/symptoms';

type KeyGetterWhatever<T> = {
  [K in keyof T]: (symptom: T[K]) => string | null;
};

const map: KeyGetterWhatever<SymptomsRecord> = {
  fever: ({values: {degrees: value}}) => {
    if (36.1 <= value && value <= 37.2) {
      return Colors.stepOneColor;
    } else if (value <= 38) {
      return Colors.stepThreeColor;
    } else {
      return Colors.stepFiveColor;
    }
  },
  dry_cough: ({values: {intensity}}) => {
    switch (intensity) {
      case 'none':
        return Colors.stepOneColor;
      case 'bearable':
        return Colors.stepTwoColor;
      case 'harsh':
        return Colors.stepFourColor;
      case 'physical_discomfort':
        return Colors.stepFiveColor;
      default:
        return null;
    }
  },
  no_symptoms: ({values: {checked}}) => {
    return checked ? Colors.stepOneColor : Colors.stepFiveColor;
  },
  sense_of_taste: ({values: {description}}) => {
    switch (description) {
      case 'normal':
        return Colors.stepOneColor;
      case 'less_than_usual':
        return Colors.stepThreeColor;
      case 'can_not_taste_anything':
        return Colors.stepFiveColor;
      default:
        return null;
    }
  },
  sense_of_smell: ({values: {description}}) => {
    switch (description) {
      case 'normal':
        return Colors.stepOneColor;
      case 'less_than_usual':
        return Colors.stepThreeColor;
      case 'can_not_smell_anything':
        return Colors.stepFiveColor;
      default:
        return null;
    }
  },
  shortness_of_breath: ({values: {feeling}}) => {
    switch (feeling) {
      case 'breathe_normally':
        return Colors.stepOneColor;
      case 'shortness_of_breath':
        return Colors.stepTwoColor;
      case 'tightness_in_my_chest':
        return Colors.stepFourColor;
      case 'cannot_get_enough_air':
        return Colors.stepFiveColor;

      default:
        return null;
    }
  },
  tiredness: ({values: {description}}) => {
    switch (description) {
      case 'as_usual':
        return Colors.stepOneColor;
      case 'tired_but_not_bedridden':
        return Colors.stepTwoColor;
      case 'mostly_bedridden':
        return Colors.stepThreeColor;
      case 'can_get_to_the_bathroom':
        return Colors.stepFourColor;
      case 'cannot_get_out_of_bed':
        return Colors.stepFiveColor;
      default:
        return null;
    }
  },
  aches_and_pain: ({values: {have_ache}}) => {
    return have_ache ? Colors.stepFiveColor : Colors.stepOneColor;
  },
  sore_throat: ({values: {feeling}}) => {
    switch (feeling) {
      case 'normal':
        return Colors.stepOneColor;
      case 'easy_to_gulp':
        return Colors.stepTwoColor;
      case 'scratchy':
        return Colors.stepFourColor;
      case 'difficult_to_swallow':
        return Colors.stepFiveColor;
      default:
        return null;
    }
  },
  diarrhoea: ({values: {presense}}) => {
    return presense ? Colors.stepFiveColor : Colors.stepOneColor;
  },
  nausea: ({values: {presense}}) => {
    return presense ? Colors.stepFiveColor : Colors.stepOneColor;
  },
  runny_nose: ({values: {presense}}) => {
    return presense ? Colors.stepFiveColor : Colors.stepOneColor;
  },
};

export const colorLookup = {
  tiredness: {
    values: {},
  },
};

export function getColorForReportAndSymptom<TKey extends keyof SymptomsRecord>(
  report: Report | null,
  symptom: TKey,
): string | null {
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
