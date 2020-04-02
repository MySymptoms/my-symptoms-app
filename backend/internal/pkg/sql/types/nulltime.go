package types

import (
	"database/sql"
	"time"
)

// NullTime is a wrapper around sql.NullTime
type NullTime struct {
	sql.NullTime
}

// NewNullTime creates a new NullTime
func NewNullTime(input time.Time) *NullTime {
	return &NullTime{sql.NullTime{Valid: true, Time: input}}
}
