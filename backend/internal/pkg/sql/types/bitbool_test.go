// +build unit_test

package types

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestBitBool(t *testing.T) {
	// Test true value
	tests := []struct {
		name  string
		input BitBool
	}{
		{
			name:  "true value",
			input: BitBool(true),
		},
		{
			name:  "false value",
			input: BitBool(false),
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			v, err := test.input.Value()
			assert.NoError(t, err, "unexpected error when getting value")
			var b BitBool
			err = (&b).Scan(v)
			assert.NoError(t, err, "unexpected error when scanning")
			assert.Equal(t, test.input, b, "values didn't match after scan")
		})
	}
}
