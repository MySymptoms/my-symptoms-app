// +build unit_test

package types

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestNullBitBool(t *testing.T) {
	// Test true value
	tests := []struct {
		name  string
		input NullBitBool
		want  NullBitBool
	}{
		{
			name:  "non-null true",
			input: NullBitBool{Valid: true, Bool: true},
			want:  NullBitBool{Valid: true, Bool: true},
		},
		{
			name:  "non-null false",
			input: NullBitBool{Valid: true, Bool: false},
			want:  NullBitBool{Valid: true, Bool: false},
		},
		{
			name:  "null true (which shouldn't really exist",
			input: NullBitBool{Valid: false, Bool: true},
			want:  NullBitBool{Valid: false, Bool: false},
		},
		{
			name:  "null false",
			input: NullBitBool{Valid: false, Bool: false},
			want:  NullBitBool{Valid: false, Bool: false},
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			v, err := test.input.Value()
			assert.NoError(t, err, "unexpected error while getting input value")
			var b NullBitBool
			err = (&b).Scan(v)
			assert.NoError(t, err, "unexpected error while scanning")
			assert.Equal(t, test.want.Valid, b.Valid, "null values didn't match")
			assert.Equal(t, test.want.Bool, b.Bool, "bool values didn't match")
		})
	}
}
