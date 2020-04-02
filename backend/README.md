Backend for mycorona

# Installation:
make dep-locally

## Run
make run

## Endpoints
### Add reports
POST /api/v1/reports
Payload: 
```
{
  version: 1,
  user_id: 'uuid',
  reports: [
    {
      report_id: 'uuid',
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
            frequency: 'none', //'every_minute', "few_times_an_hour", "few_times_a_day"
            intensity: 'none', // 'bearable'"harsh", "physical_discomfort"
            disruption: 'nighttime', //"daytime"
          },
        },
        tiredness: {
          symptom: 'tiredness',
          values: {},
        },
        shortness_of_breath: {
          symptom: 'shortness_of_breath',
          values: {
            feeling: 'breathe_normally', // "shortness_of_breath", "tightness_in_my_chest", "cannot_get_enough_air"
            fainting: false,
          },
        },
        aches_and_pain: {
          symptom: 'aches_and_pain',
          values: {
            have_ache: true, //false
            frequency: 'not often', //"on_going", "persistent"
          },
        },
        sore_throat: {
          symptom: 'sore_throat',
          values: {
            feeling: 'normal', //"easy_to_gulp", "scratchy", "difficult_to_swallow"
            throat: 'not_inflamed', // "inflamed"
          },
        },
        diarrhoea: {
          symptom: 'diarrhoea',
          values: {
            presense: true, // false,
            frequency: 'not_often', // "often", "very_often"
          },
        },
        nausea: {
          symptom: 'nausea',
          values: {
            presense: true, //false
            frequency: 'not_often', // "often", "very_often"
          },
        },
        runny_nose: {
          symptom: 'runny_nose',
          values: {
            presense: true, //false
            frequency: 'not_often', //"often", "very_often"
          },
        },
        sense_of_taste: {
          symptom: 'sense_of_taste',
          values: {
            description: 'normal', // "less_than_usual", "can_not_taste_anything"
          },
        },
        sense_of_smell: {
          symptom: 'sense_of_smell',
          values: {
            description: 'normal', // "less_than_usual", "can_not_smell_anything"
          },
        },
      },
    },
  ],
}
```


## Get reports by user_id
GET /api/v1/report/user_id/<uuid>
