package config

import (
	"fmt"
	"os"
	"reflect"
	"strconv"

	arg "github.com/jessevdk/go-flags"
)

// Flags defines the command line flags used for the application
type Flags struct {
	LogDir  string `long:"log_dir" env:"LOG_DIR" default:"_log"`
	LogName string `long:"log_name" env:"LOG_NAME" default:"stefan"`

	HTTPPort string `long:"http_port" env:"HTTP_PORT" default:"1337"`
	Debug    bool   `long:"debug" env:"DEBUG"`

	MysqlUser     string `long:"mysql_user" env:"MYSQL_USER" default:"user"`
	MysqlPassword string `long:"mysql_password" env:"MYSQL_PASSWORD" default:"password"`
	MysqlProtocol string `long:"mysql_protocol" env:"MYSQL_PROTOCOL" default:"tcp"`
	MysqlAddress  string `long:"mysql_address" env:"MYSQL_ADDRESS" default:"localhost:3306"`
	MysqlDBName   string `long:"mysql_dbname" env:"MYSQL_DBNAME" default:"app"`

	OpenCageAPIKey string `long:"opencage_api_key" env:"OPENCAGE_API_KEY" default:"11475753ca774083a8af843635c7171b"`
}

// New returns all flags defined in the config. Priority for each flag is env variable -> program arguments.
func New() (Flags, error) {
	flags := new(Flags)
	if _, err := arg.NewParser(flags, arg.IgnoreUnknown).Parse(); err != nil {
		panic(fmt.Sprintf("can't parse CLI arguments: %s", err))
	}
	return *flags, setFieldValue(flags)
}

// setFieldValue tries to replace the current flags struct value with a defined environment variable.
// This means that a program can have both environment variables as well as input argument flags.
// Env variables has higher priority than input argument flags
func setFieldValue(val interface{}) error {
	elements := reflect.ValueOf(val).Elem()
	for i := 0; i < elements.NumField(); i++ {
		fld := elements.Type().Field(i)
		fieldName := fld.Name
		fieldTag := fld.Tag.Get("env")
		field := elements.FieldByName(fieldName)

		// override default value with env value
		var fieldVal string
		if envval, found := os.LookupEnv(fieldTag); found {
			fieldVal = envval
		}
		switch fld.Type.Kind() {
		case reflect.Struct:
			err := setFieldValue(field.Addr().Interface())
			if err != nil {
				return err
			}
		case reflect.Int:
			if len(fieldVal) > 0 {
				v, err := strconv.ParseInt(fieldVal, 10, 64)
				if err != nil {
					return fmt.Errorf("flags: invalid value for %s : %s -> %s", fieldName, fieldVal, err)
				}
				field.SetInt(v)
			}
		case reflect.Bool:
			if len(fieldVal) > 0 {
				b, err := strconv.ParseBool(fieldVal)
				if err != nil {
					return fmt.Errorf("flags: invalid value for %s : %s -> %s", fieldName, fieldVal, err)
				}
				field.SetBool(b)
			}
		case reflect.String:
			if len(fieldVal) > 0 {
				field.SetString(fieldVal)
			}
		default:
			return fmt.Errorf("Unsupported type in Flags %s", fld.Type.String())
		}
	}
	return nil
}
