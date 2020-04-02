package sql

import (
	"errors"
	"reflect"
)

// DBFields reflects on a struct and returns the values of fields with `db` tags,
// and returns the keys as well as the keys with colon prefix.
func DBFields(values interface{}) ([]string, []string, error) {
	v := reflect.ValueOf(values)
	if v.Kind() == reflect.Ptr {
		v = v.Elem()
	}
	fields := []string{}
	colonPrefixedFields := []string{}
	switch v.Kind() {
	case reflect.Struct:
		for i := 0; i < v.NumField(); i++ {
			field := v.Type().Field(i).Tag.Get("db")
			if field != "" {
				fields = append(fields, field)
				colonPrefixedFields = append(colonPrefixedFields, ":"+field)
			}
		}
		return fields, colonPrefixedFields, nil
	default:
		return nil, nil, errors.New("input is not a struct")
	}
}
