package symptom

import (
	"errors"

	"github.com/google/uuid"
)

func ValidateSymptomReport(req SymptomReportRequest) error {
	if !isValidUUID(req.UserID) {
		return errors.New("invalid clientId")
	}
	if len(req.Reports) == 0 {
		return errors.New("No reports provided")
	}
	for _, report := range req.Reports {
		if !isValidUUID(report.ID) {
			return errors.New("invalid reportId")
		}
	}
	return nil
}

func isValidUUID(u string) bool {
	_, err := uuid.Parse(u)
	return err == nil
}
