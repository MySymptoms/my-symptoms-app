package models

import (
	"time"
)

type DBSymptomReport struct {
	ID                        int       `db:"id"`
	UserID                    string    `db:"user_id"`
	ReportID                  string    `db:"report_id"`
	Date                      string    `db:"date"`
	UpdatedAt                 time.Time `db:"updated_at"`
	Latitude                  float64   `db:"latitude"`
	Longitude                 float64   `db:"longitude"`
	HasNoSymptom              bool      `db:"has_no_symptom"`
	Temperature               float64   `db:"temperature"`
	TemperatureUnit           string    `db:"temperature_unit"`
	DryCoughFrequency         string    `db:"dry_cough_frequency"`
	DryCoughIntensity         string    `db:"dry_cough_intensity"`
	DryCoughDisruption        string    `db:"dry_cough_disruption"`
	Tiredness                 int       `db:"tiredness"`
	ShortnessOfBreathFeeling  string    `db:"shortness_of_breath_feeling"`
	ShortnessOfBreathFainting bool      `db:"shortness_of_breath_fainting"`
	HasAchesAndPains          bool      `db:"has_aches_and_pains"`
	AchesAndPainsFrequency    string    `db:"aches_and_pains_frequency"`
	SoreThroatFeeling         string    `db:"sore_throat_feeling"`
	SoreThroatStatus          string    `db:"sore_throat_status"`
	HasDiarrhoea              bool      `db:"has_diarrhoea"`
	DiarrhoeaFrequency        string    `db:"diarrhoea_frequency"`
	HasNausea                 bool      `db:"has_nausea"`
	NauseaFrequency           string    `db:"nausea_frequency"`
	HasRunnyNose              bool      `db:"has_runny_nose"`
	RunnyNoseFrequency        string    `db:"runny_nose_frequency"`
	SenseOfTasteDescription   string    `db:"sense_of_taste_description"`
	SenseOfSmellDescription   string    `db:"sense_of_smell_description"`
}
