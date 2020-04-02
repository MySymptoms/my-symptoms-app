package symptom

import (
	"context"

	"github.com/MySymptoms/my-symptoms-app/internal/pkg/sql/models"
)

type datastore interface {
	AddReport(ctx context.Context, report models.DBSymptomReport) error
	GetReports(ctx context.Context, clientID string) ([]models.DBSymptomReport, error)
}
