package sql

import (
	"context"
	"fmt"
	"time"

	"github.com/MySymptoms/my-symptoms-app/internal/pkg/log"

	_ "github.com/go-sql-driver/mysql"

	"github.com/jmoiron/sqlx"
)

func InitMYSQL(ctx context.Context, logger log.Logger, username, password, protocol, address, dbname string) *sqlx.DB {
	// e.g. username:password@tcp(127.0.0.1:3306)/dbname
	databaseURL := fmt.Sprintf("%s:%s@%s(%s)/%s?parseTime=true", username, password, protocol, address, dbname)
	db, err := sqlx.Open("mysql", databaseURL)
	if err != nil {
		panic(err)
	}

	for {
		if err = db.Ping(); err == nil {
			break
		}
		logger.Warning(ctx, "could not connect to mysql: '%s'...trying again", err.Error())
		time.Sleep(time.Second * 1)
	}

	return db
}
