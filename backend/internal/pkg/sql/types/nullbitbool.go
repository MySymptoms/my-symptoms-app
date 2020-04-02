package types

import (
	"database/sql/driver"
	"errors"
)

// NullBitBool is an implementation of a bool for the nullable MySQL type BIT(1).
type NullBitBool struct {
	Bool  bool
	Valid bool // valid if Bool is not NULL
}

// NewNullBitBool returns a new bit bool
func NewNullBitBool(input bool) *NullBitBool {
	return &NullBitBool{
		Valid: true,
		Bool:  input,
	}
}

// Value implements the driver.Valuer interface,
// and turns the BitBool into a bitfield (BIT(1)) for MySQL storage.
func (b NullBitBool) Value() (driver.Value, error) {
	if !b.Valid {
		return nil, nil
	}
	if b.Bool {
		return []byte{1}, nil
	}
	return []byte{0}, nil
}

// Scan implements the sql.Scanner interface,
// and turns the bitfield incoming from MySQL into a BitBool
func (b *NullBitBool) Scan(value interface{}) error {
	if value == nil {
		b.Bool, b.Valid = false, false
		return nil
	}
	b.Valid = true

	v, ok := value.([]byte)
	if !ok {
		return errors.New("bad []byte type assertion")
	}
	b.Bool = v[0] == 1
	return nil
}
