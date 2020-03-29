interface BaseSymptom {
  symptom: string;
  values: object;
}

export interface FeverSymptom extends BaseSymptom {
  symptom: 'fever';
  values: {
    degrees: number;
  };
}

export interface DryCoughSymptom extends BaseSymptom {
  symptom: 'dry_cough';
  values: {
    frequency: 'every_minute' | 'few_times_an_hour' | 'few_times_a_day';
    intensity: string;
    disruption: string;
  };
}

export interface SenseOfTasteSymptom extends BaseSymptom {
  symptom: 'sense_of_taste';
  values: {
    description: 'normal' | 'less_than_usual' | 'can_not_taste_anything';
  };
}

export interface SenseOfSmellSymptom extends BaseSymptom {
  symptom: 'sense_of_smell';
  values: {
    description: 'normal' | 'less_than_usual' | 'can_not_smell_anything';
  };
}

export interface TirednessSymptom extends BaseSymptom {
  symptom: 'tiredness';
  values: {
    description:
      | 'as_usual'
      | 'tired_but_not_bedridden'
      | 'mostly_bedridden'
      | 'can_get_to_the_bathroom'
      | 'cannot_get_out_of_bed';
  };
}

export interface ShortnessOfBreathSymptom extends BaseSymptom {
  symptom: 'shortness_of_breath';
  values: {
    feeling:
      | 'breathe_normally'
      | 'shortness_of_breath'
      | 'tightness_in_my_chest'
      | 'cannot_get_enough_air';
    do_you_also_feel: 'fainting';
    frequency:
      | 'comes_suddenly'
      | 'is_persistent'
      | 'interferes_with_daily_activity';
  };
}

export interface NoSymptoms extends BaseSymptom {
  symptom: 'no_symptoms';
  values: {
    checked: boolean;
  };
}

export interface AchesAndPainSymptom extends BaseSymptom {
  symptom: 'aches_and_pain';
  values: {
    have_ache: boolean;
    frequency: 'not_often' | 'on-going' | 'persistent';
  };
}

export interface SoreThroatSymptom extends BaseSymptom {
  symptom: 'sore_throat';
  values: {
    feeling: 'normal' | 'easy_to_gulp' | 'scratchy' | 'difficult_to_swallow';
    throat_color: 'not_inflamed' | 'inflamed';
  };
}

export interface DiarrhoeaSymptom extends BaseSymptom {
  symptom: 'diarrhoea';
  values: {
    presense: boolean;
    frequency: 'not_often' | 'often' | 'very_often';
  };
}

export interface NauseaSymptom extends BaseSymptom {
  symptom: 'nausea';
  values: {
    presense: boolean;
    frequency: 'not_often' | 'often' | 'very_often';
  };
}

export interface RunnyNoseSymptom extends BaseSymptom {
  symptom: 'runny_nose';
  values: {
    presense: boolean;
    frequency: 'not_often' | 'often' | 'very_often';
  };
}

export interface SymptomsRecord {
  no_symptoms: NoSymptoms;
  fever: FeverSymptom;
  dry_cough: DryCoughSymptom;
  tiredness: TirednessSymptom;
  shortness_of_breath: ShortnessOfBreathSymptom;
  sense_of_taste: SenseOfTasteSymptom;
  sense_of_smell: SenseOfSmellSymptom;
  aches_and_pain: AchesAndPainSymptom;
  sore_throat: SoreThroatSymptom;
  diarrhoea: DiarrhoeaSymptom;
  nausea: NauseaSymptom;
  runny_nose: RunnyNoseSymptom;
}
