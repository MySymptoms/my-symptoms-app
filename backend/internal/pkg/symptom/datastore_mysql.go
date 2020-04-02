package symptom

import (
	"context"
	"fmt"
	"strings"

	"github.com/MySymptoms/my-symptoms-app/internal/pkg/sql"
	"github.com/MySymptoms/my-symptoms-app/internal/pkg/sql/models"
	"github.com/jmoiron/sqlx"
)

type mysqlDatastore struct {
	db *sqlx.DB
}

// NewMysqlDatastore creates a mysql implementation of datastore
func NewMysqlDatastore(db *sqlx.DB) *mysqlDatastore {
	return &mysqlDatastore{
		db: db,
	}
}

func (d *mysqlDatastore) AddReport(ctx context.Context, report models.DBSymptomReport) error {
	fields, colonFields, err := sql.DBFields(report)
	if err != nil {
		return err
	}

	_, err = d.GetReport(ctx, report.ReportID)
	if err != nil {
		query := fmt.Sprintf(`
			INSERT INTO symptom_report
				(%s) 
			VALUES 
				(%s)`, strings.Join(fields, ","), strings.Join(colonFields, ","))

		_, err = d.db.NamedExec(query, &report)
		return err
	}
	updateStmt := "UPDATE symptom_report SET\n"
	var updateValues []string
	for i := 0; i < len(fields); i++ {
		updateValues = append(updateValues, fmt.Sprintf("%s = %s", fields[i], colonFields[i]))
	}
	updateStmt += strings.Join(updateValues, ",\n")
	updateStmt += "\nWHERE id = :id"

	_, err = d.db.NamedExec(updateStmt, &report)
	return err
}

func (d *mysqlDatastore) GetReports(ctx context.Context, userID string) ([]models.DBSymptomReport, error) {
	query := `SELECT * FROM symptom_report WHERE user_id = ?`
	var reports []models.DBSymptomReport
	return reports, d.db.Select(&reports, query, userID)
}

func (d *mysqlDatastore) GetReport(ctx context.Context, reportID string) (models.DBSymptomReport, error) {
	query := `SELECT * FROM symptom_report WHERE report_id = ?`
	var report models.DBSymptomReport
	return report, d.db.Get(&report, query, reportID)
}
