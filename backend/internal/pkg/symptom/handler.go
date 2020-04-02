package symptom

import (
	"context"

	"github.com/MySymptoms/my-symptoms-app/internal/pkg/sql/models"
)

type Handler struct {
	datastore datastore
}

func NewHandler(datastore datastore) *Handler {
	return &Handler{
		datastore: datastore,
	}
}

func (h *Handler) AddReport(ctx context.Context, req SymptomReportRequest) error {
	for _, report := range req.Reports {
		dbReport := models.DBSymptomReport{
			UserID:                    req.UserID,
			ReportID:                  report.ID,
			Date:                      report.Date,
			UpdatedAt:                 report.UpdatedAt,
			Latitude:                  report.Location.Latitude,
			Longitude:                 report.Location.Longitude,
			HasNoSymptom:              report.Symptoms.NoSymptoms.Values.Checked,
			Temperature:               report.Symptoms.Fever.Values.Degrees,
			TemperatureUnit:           report.Symptoms.Fever.Values.Unit,
			DryCoughFrequency:         report.Symptoms.DryCough.Values.Frequency,
			DryCoughIntensity:         report.Symptoms.DryCough.Values.Intensity,
			DryCoughDisruption:        report.Symptoms.DryCough.Values.Disruption,
			Tiredness:                 0, // TODO
			ShortnessOfBreathFeeling:  report.Symptoms.ShortnessOfBreath.Values.Feeling,
			ShortnessOfBreathFainting: report.Symptoms.ShortnessOfBreath.Values.Fainting,
			HasAchesAndPains:          report.Symptoms.AchesAndPain.Values.HaveAche,
			AchesAndPainsFrequency:    report.Symptoms.AchesAndPain.Values.Frequency,
			SoreThroatFeeling:         report.Symptoms.SoreThroat.Values.Feeling,
			SoreThroatStatus:          report.Symptoms.SoreThroat.Values.Throat,
			HasDiarrhoea:              report.Symptoms.Diarrhoea.Values.Presense,
			DiarrhoeaFrequency:        report.Symptoms.Diarrhoea.Values.Frequency,
			HasNausea:                 report.Symptoms.Nausea.Values.Presense,
			NauseaFrequency:           report.Symptoms.Nausea.Values.Frequency,
			HasRunnyNose:              report.Symptoms.RunnyNose.Values.Presense,
			RunnyNoseFrequency:        report.Symptoms.RunnyNose.Values.Frequency,
			SenseOfTasteDescription:   report.Symptoms.SenseOfTaste.Values.Description,
			SenseOfSmellDescription:   report.Symptoms.SenseOfSmell.Values.Description,
		}
		err := h.datastore.AddReport(ctx, dbReport)
		if err != nil {
			return err
		}
	}
	return nil
}

func (h *Handler) GetReports(ctx context.Context, clientID string) (map[string]Report, error) {
	reports := make(map[string]Report)
	dbReports, err := h.datastore.GetReports(ctx, clientID)
	if err != nil {
		return nil, err
	}
	for _, dbReport := range dbReports {
		reports[dbReport.ReportID] = Report{
			ID:        dbReport.ReportID,
			Date:      dbReport.Date,
			UpdatedAt: dbReport.UpdatedAt,
			Location: Location{
				Latitude:  dbReport.Latitude,
				Longitude: dbReport.Longitude,
			},
			Symptoms: Symptoms{
				NoSymptoms: NoSymptoms{
					Symptom: &Symptom{
						Type: SymptomTypeNoSymptoms,
					},
					Values: NoSymptomValues{
						Checked: bool(dbReport.HasNoSymptom),
					},
				},
				Fever: Fever{
					Symptom: &Symptom{
						Type: SymptomTypeFever,
					},
					Values: FeverValues{
						Unit:    dbReport.TemperatureUnit,
						Degrees: dbReport.Temperature,
					},
				},
				DryCough: DryCough{
					Symptom: &Symptom{
						Type: SymptomTypeDryCough,
					},
					Values: DryCoughValues{
						Frequency:  dbReport.DryCoughFrequency,
						Intensity:  dbReport.DryCoughIntensity,
						Disruption: dbReport.DryCoughDisruption,
					},
				},
				Tiredness: Tiredness{
					Symptom: &Symptom{
						Type: SymptomTypeTiredness,
					},
					Values: TirednessValues{},
				},
				ShortnessOfBreath: ShortnessOfBreath{
					Symptom: &Symptom{
						Type: SymptomTypeShortnessOfBreath,
					},
					Values: ShortnessOfBreathValues{
						Feeling:  dbReport.ShortnessOfBreathFeeling,
						Fainting: bool(dbReport.ShortnessOfBreathFainting),
					},
				},
				AchesAndPain: AchesAndPain{
					Symptom: &Symptom{
						Type: SymptomTypeAchesAndPain,
					},
					Values: AchesAndPainValues{
						HaveAche:  bool(dbReport.HasAchesAndPains),
						Frequency: dbReport.AchesAndPainsFrequency,
					},
				},
				SoreThroat: SoreThroat{
					Symptom: &Symptom{
						Type: SymptomTypeSoreThroat,
					},
					Values: SoreThroatValues{
						Feeling: dbReport.SoreThroatFeeling,
						Throat:  dbReport.SoreThroatStatus,
					},
				},
				Diarrhoea: Diarrhoea{
					Symptom: &Symptom{
						Type: SymptomTypeDiarrhoea,
					},
					Values: DiarrhoeaValues{
						Presense:  bool(dbReport.HasDiarrhoea),
						Frequency: dbReport.DiarrhoeaFrequency,
					},
				},
				Nausea: Nausea{
					Symptom: &Symptom{
						Type: SymptomTypeNausea,
					},
					Values: NauseaValues{
						Presense:  bool(dbReport.HasNausea),
						Frequency: dbReport.NauseaFrequency,
					},
				},
				RunnyNose: RunnyNose{
					Symptom: &Symptom{
						Type: SymptomTypeRunnyNose,
					},
					Values: RunnyNoseValues{
						Presense:  bool(dbReport.HasRunnyNose),
						Frequency: dbReport.RunnyNoseFrequency,
					},
				},
				SenseOfTaste: SenseOfTaste{
					Symptom: &Symptom{
						Type: SymptomTypeSenseOfTaste,
					},
					Values: SenseOfTasteValues{
						Description: dbReport.SenseOfTasteDescription,
					},
				},
				SenseOfSmell: SenseOfSmell{
					Symptom: &Symptom{
						Type: SymptomTypeSenseOfSmell,
					},
					Values: SenseOfSmellValues{
						Description: dbReport.SenseOfSmellDescription,
					},
				},
			},
		}
	}
	return reports, nil
}
