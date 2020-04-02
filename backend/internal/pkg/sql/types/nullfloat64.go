package types

import "database/sql"

// NullFloat64 is a wrapper around sql.NullFloat64
type NullFloat64 struct {
	sql.NullFloat64
}

// NewNullFloat64 creates a new NullFloat64
func NewNullFloat64(input float64) *NullFloat64 {
	return &NullFloat64{sql.NullFloat64{Valid: true, Float64: input}}
}
