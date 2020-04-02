package symptom

import "time"

// {
//  "clientId": "0822badb-621a-4ee3-85e0-30ae5745ca2e",
//  "timestamp": "2020-03-24T17:13:38Z",
//  "report": {
//    "reportId": "d9c4055d-9448-4a7a-bf36-1f37cd6064ed",
//    "fever": 37.5,
//    "isFever": false,
//    "tiredness": 6,
//    "dryCough": 3,
//    "shortnessOfBreath": 1,
//    "achesAndPains": 10,
//    "soreThroat": 3,
//    "diarrhoea": 0,
//    "nausea": 0,
//    "runnyNose": 4
//  }
//}

type SymptomReportRequest struct {
	Version int      `json:"version"`
	UserID  string   `json:"user_id,omitempty"`
	Reports []Report `json:"reports,omitempty"`
}

const (
	SymptomTypeNoSymptoms        = "no_symptoms"
	SymptomTypeFever             = "fever"
	SymptomTypeDryCough          = "dry_cough"
	SymptomTypeTiredness         = "tiredness"
	SymptomTypeShortnessOfBreath = "shortness_of_breath"
	SymptomTypeAchesAndPain      = "aches_and_pains"
	SymptomTypeSoreThroat        = "sore_throat"
	SymptomTypeDiarrhoea         = "dirrhoea"
	SymptomTypeNausea            = "nausea"
	SymptomTypeSenseOfTaste      = "sense_of_taste"
	SymptomTypeSenseOfSmell      = "sense_of_smell"
	SymptomTypeRunnyNose         = "runny_nose"
)

type Report struct {
	ID        string    `json:"report_id,omitempty"`
	Date      string    `json:"date"`
	UpdatedAt time.Time `json:"updated_at"`
	Location  Location  `json:"coarse_location"`
	Symptoms  Symptoms  `json:"symptoms"`
}

type Symptoms struct {
	NoSymptoms        NoSymptoms        `json:"no_symptoms"`
	Fever             Fever             `json:"fever"`
	DryCough          DryCough          `json:"dry_cough"`
	Tiredness         Tiredness         `json:"tiredness"`
	ShortnessOfBreath ShortnessOfBreath `json:"shortness_of_breath"`
	AchesAndPain      AchesAndPain      `json:"aches_and_pain"`
	SoreThroat        SoreThroat        `json:"sore_throat"`
	Diarrhoea         Diarrhoea         `json:"diarrhoea"`
	Nausea            Nausea            `json:"nausea"`
	RunnyNose         RunnyNose         `json:"runny_nose"`
	SenseOfTaste      SenseOfTaste      `json:"sense_of_taste"`
	SenseOfSmell      SenseOfSmell      `json:"sense_of_smell"`
}

type Symptom struct {
	Type string `json:"symptom"`
}

type NoSymptoms struct {
	*Symptom
	Values NoSymptomValues `json:"values"`
}

type NoSymptomValues struct {
	Checked bool
}

type Fever struct {
	*Symptom
	Values FeverValues
}

type FeverValues struct {
	Unit    string  `json:"unit"`
	Degrees float64 `json:"degrees"`
}

type DryCough struct {
	*Symptom
	Values DryCoughValues `json:"values"`
}

type DryCoughValues struct {
	Frequency  string `json:"frequency"`
	Intensity  string `json:"intensity"`
	Disruption string `json:"disruption"`
}

type Tiredness struct {
	*Symptom
	Values TirednessValues `json:"values"`
}

type TirednessValues struct {
}

type ShortnessOfBreath struct {
	*Symptom
	Values ShortnessOfBreathValues `json:"values"`
}

type ShortnessOfBreathValues struct {
	Feeling  string `json:"feeling"`
	Fainting bool   `json:"fainting"`
}

type AchesAndPain struct {
	*Symptom
	Values AchesAndPainValues `json:"values"`
}

type AchesAndPainValues struct {
	HaveAche  bool   `json:"have_ache"`
	Frequency string `json:"frequency"`
}

type SoreThroat struct {
	*Symptom
	Values SoreThroatValues `json:"values"`
}

type SoreThroatValues struct {
	Feeling string `json:"feeling"`
	Throat  string `json:"throat"`
}
type Diarrhoea struct {
	*Symptom
	Values DiarrhoeaValues `json:"values"`
}

type DiarrhoeaValues struct {
	Presense  bool   `json:"presense"`
	Frequency string `json:"frequency"`
}

type Nausea struct {
	*Symptom
	Values NauseaValues `json:"values"`
}

type NauseaValues struct {
	Presense  bool   `json:"presense"`
	Frequency string `json:"frequency"`
}

type RunnyNose struct {
	*Symptom
	Values RunnyNoseValues `json:"values"`
}

type RunnyNoseValues struct {
	Presense  bool   `json:"presense"`
	Frequency string `json:"frequency"`
}

type SenseOfTaste struct {
	*Symptom
	Values SenseOfTasteValues `json:"values"`
}

type SenseOfTasteValues struct {
	Description string `json:"description"`
}
type SenseOfSmell struct {
	*Symptom
	Values SenseOfSmellValues `json:"values"`
}

type SenseOfSmellValues struct {
	Description string `json:"description"`
}

type Location struct {
	Latitude  float64 `json:"lat"`
	Longitude float64 `json:"long"`
}

// {
// version: 1,
// user_id: 'uuid',
// reports: [
//   {
// report_id: 'uuid',
// date: '2020-03-28',
// updated_at: '2020-03-28T13:14:00.11212+01:00',
// coarse_location: {lat: 33, long: 23},
// 		symptoms: {
// 		  no_symptoms: {
// 			symptom: 'no_symptoms',
// 			values: {
// 			  checked: true,
// 			},
// 		  },
// 		  fever: {
// 			// or null/undefined
// 			symptom: 'fever',
// 			values: {
// 			  unit: 'C',
// 			  degrees: 37.6, // celcius
// 			},
// 		  },
// 		  dry_cough: {
// 			symptom: 'dry_cough',
// 			values: {
// 			  frequency: 'none', //'every_minute', "few_times_an_hour", "few_times_a_day"
// 			  intencity: 'none', // 'bearable'"harsh", "physical_discomfort"
// 			  disruption: 'nighttime', //"daytime"
// 			},
// 		  },
// 		  tiredness: {
// 			symptom: 'tiredness',
// 			values: {},
// 		  },
// 		  shortness_of_breath: {
// 			symptom: 'shortness_of_breath',
// 			values: {
// 			  feeling: 'breathe_normally', // "shortness_of_breath", "tightness_in_my_chest", "cannot_get_enough_air"
// 			  fainting: false,
// 			},
// 		  },
// 		  aches_and_pain: {
// 			symptom: 'aches_and_pain',
// 			values: {
// 			  have_ache: true, //false
// 			  frequency: 'not often', //"on_going", "persistent"
// 			},
// 		  },
// 		  sore_throat: {
// 			symptom: 'sore_throat',
// 			values: {
// 			  feeling: 'normal', //"easy_to_gulp", "scratchy", "difficult_to_swallow"
// 			  throat: 'not_inflamed', // "inflamed"
// 			},
// 		  },
// 		  diarrhoea: {
// 			symptom: 'diarrhoea',
// 			values: {
// 			  presense: true, // false,
// 			  frequency: 'not_often', // "often", "very_often"
// 			},
// 		  },
// 		  nausea: {
// 			symptom: 'nausea',
// 			values: {
// 			  presense: true, //false
// 			  frequency: 'not_often', // "often", "very_often"
// 			},
// 		  },
// 		  runny_nose: {
// 			symptom: 'runny_nose',
// 			values: {
// 			  presense: true, //false
// 			  frequency: 'not_often', //"often", "very_often"
// 			},
// 		  },
// 		  sense_of_taste: {
// 			symptom: 'sense_of_taste',
// 			values: {
// 			  description: 'normal', // "less_than_usual", "can_not_taste_anything"
// 			},
// 		  },
// 		  sense_of_smell: {
// 			symptom: 'sense_of_smell',
// 			values: {
// 			  description: 'normal', // "less_than_usual", "can_not_smell_anything"
// 			},
// 		  },
// 		},
// 	  },
// 	],
//   }ck
