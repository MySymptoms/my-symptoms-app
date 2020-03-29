interface BaseSymptom {
  symptom: string;
  values: object;
}

export interface FeverSymptom extends BaseSymptom {
  symptom: 'fever';
  values: {
    degrees: number;
  }
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
    lost_sense_of_taste: 'yes' | 'no';
  };
}

export interface TirednessSymptom extends BaseSymptom {
  symptom: 'tiredness';
  values: {
    energy_level: number; // 1-9
    nausea: boolean;
    fainting: boolean;
  };
}

export interface ShortnessOfBreathSymptom extends BaseSymptom {
  symptom: 'shortness_of_breath';
  values: {
    feeling:
      | 'breathe_normally'
      | 'shortness of breath'
      | 'tightness in my chest'
      | 'cannot get enough air';
    fainting: boolean; // What did we say? remove this and add a dizzyness thing? Or only the nausea thing?
  };
}

export interface NoSymptoms extends BaseSymptom {
  symptom: 'no_symptoms';
  values: {
    checked: boolean;
  };
}

export interface SymptomsRecord {
  no_symptoms: NoSymptoms;
  fever: FeverSymptom;
  dry_cough: DryCoughSymptom;
  tiredness: TirednessSymptom;
  shortness_of_breath: ShortnessOfBreathSymptom;
  sense_of_taste: SenseOfTasteSymptom;
}
