package types

import "database/sql"

// NullInt64 is a wrapper around sql.NullInt64
type NullInt64 struct {
	sql.NullInt64
}

// NewNullInt64 creates a new NullInt64
func NewNullInt64(input int64) *NullInt64 {
	return &NullInt64{sql.NullInt64{Valid: true, Int64: input}}
}
