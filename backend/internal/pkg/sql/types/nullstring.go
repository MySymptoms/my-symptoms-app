package types

import (
	"database/sql"
)

// NullString is a wrapper around sql.NullString
type NullString struct {
	sql.NullString
}

// NewNullString creates a new NullString
func NewNullString(input string) *NullString {
	return &NullString{sql.NullString{Valid: true, String: input}}
}
