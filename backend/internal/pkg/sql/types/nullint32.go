package types

import "database/sql"

// NullInt32 is a wrapper around sql.NullInt32
type NullInt32 struct {
	sql.NullInt32
}

// NewNullInt32 creates a new NullInt32
func NewNullInt32(input int32) *NullInt32 {
	return &NullInt32{sql.NullInt32{Valid: true, Int32: input}}
}
