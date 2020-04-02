package app

import (
	"context"
	"fmt"

	"github.com/MySymptoms/my-symptoms-app/internal/pkg/sql"
	"github.com/MySymptoms/my-symptoms-app/internal/pkg/symptom"

	"github.com/MySymptoms/my-symptoms-app/internal/pkg/api/v1/rest"
	"github.com/MySymptoms/my-symptoms-app/internal/pkg/config"
	"github.com/MySymptoms/my-symptoms-app/internal/pkg/log"
	"github.com/gin-gonic/gin"
)

// Run defines the logic for running the application
func Run(ctx context.Context, flags config.Flags) {
	// logger
	logger, err := log.NewWithStackLevel(log.LevelInfo, 3, flags.LogDir, flags.LogName)
	if err != nil {
		panic(fmt.Errorf("can't create logger: %w", err))
	}

	if flags.Debug {
		err := logger.SetLevel(log.LevelDebug)
		if err != nil {
			panic("could not set log level")
		}
	}

	// db
	db := sql.InitMYSQL(ctx, logger, flags.MysqlUser, flags.MysqlPassword, flags.MysqlProtocol, flags.MysqlAddress, flags.MysqlDBName)
	defer db.Close()

	// gin
	r := gin.Default()

	// features
	symptomDatastore := symptom.NewMysqlDatastore(db)
	symptomHandler := symptom.NewHandler(symptomDatastore)
	symptomController := symptom.NewController(logger, symptomHandler)

	restFacade := rest.NewFacade(logger, symptomController)
	restFacade.RegisterRoutes(r)

	r.Run(fmt.Sprintf(":%s", flags.HTTPPort))
}
