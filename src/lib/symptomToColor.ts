import {Colors} from './colors';
import {Report} from 'src/reducers/reportsReducer';
import {SymptomsRecord} from 'src/reducers/symptoms';
import {getNumberForReportAndSymptom} from './symptomToNumber';

type KeyGetterWhatever<T> = {[K in keyof T]: (symptom: T[K]) => string | null};

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

export const getColorForTemperature = (temp: number) => {
  if (36.1 <= temp && temp <= 37.2) {
    return Colors.stepOneColor;
  } else if (temp <= 38) {
    return Colors.stepThreeColor;
  } else {
    return Colors.stepFiveColor;
  }
};

export function getColorForReportAndSymptom<TKey extends keyof SymptomsRecord>(
  report: Report | null,
  symptom: TKey,
): string | null {
  const number = getNumberForReportAndSymptom(report, symptom);

  if (!number) {
    return null;
  }

  if (symptom === 'fever') {
    return getColorForTemperature(number);
  }

  const colors = [
    Colors.stepOneColor,
    Colors.stepTwoColor,
    Colors.stepThreeColor,
    Colors.stepFourColor,
    Colors.stepFiveColor,
  ];
  return colors[number - 1];
}
