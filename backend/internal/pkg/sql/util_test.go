// +build unit_test

package sql

import (
	"reflect"
	"testing"
)

func TestDBFields(t *testing.T) {
	type args struct {
		values interface{}
	}

	type structAllTags struct {
		Foo    string `db:"foo"`
		Bar    int    `db:"bar"`
		FooBar bool   `db:"foo_bar"`
	}
	type structSomeTags struct {
		Foo    string `db:"foo"`
		Bar    int
		FooBar bool `db:"foo_bar"`
	}
	type structNoTags struct {
		Foo    string
		Bar    int
		FooBar bool
	}
	tests := []struct {
		name    string
		args    args
		want    []string
		want1   []string
		wantErr bool
	}{
		{
			name:    "struct with all tags",
			args:    args{structAllTags{}},
			want:    []string{"foo", "bar", "foo_bar"},
			want1:   []string{":foo", ":bar", ":foo_bar"},
			wantErr: false,
		},
		{
			name:    "struct with some tags",
			args:    args{structSomeTags{}},
			want:    []string{"foo", "foo_bar"},
			want1:   []string{":foo", ":foo_bar"},
			wantErr: false,
		},
		{
			name:    "struct with no tags",
			args:    args{structNoTags{}},
			want:    []string{},
			want1:   []string{},
			wantErr: false,
		},
		{
			name:    "wrong input type",
			args:    args{1234},
			want:    nil,
			want1:   nil,
			wantErr: true,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, got1, err := DBFields(tt.args.values)
			if (err != nil) != tt.wantErr {
				t.Errorf("DBTags() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("DBTags() = %v, want %v", got, tt.want)
			}

			if !reflect.DeepEqual(got1, tt.want1) {
				t.Errorf("DBTags() = %v, want %v", got, tt.want1)
			}
		})
	}
}
