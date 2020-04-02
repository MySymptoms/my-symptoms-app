package rest

import (
	"github.com/MySymptoms/my-symptoms-app/internal/pkg/log"
	"github.com/MySymptoms/my-symptoms-app/internal/pkg/symptom"

	"github.com/gin-gonic/gin"
)

// Facade defines all the endpoints for the rest api
type Facade struct {
	logger            log.Logger
	symptomController *symptom.Controller
}

// NewFacade returns a new facade for auth
func NewFacade(l log.Logger, symptomController *symptom.Controller) *Facade {
	return &Facade{
		logger:            l,
		symptomController: symptomController,
	}
}

// RegisterRoutes registers all the routes for the rest api
func (f *Facade) RegisterRoutes(engine *gin.Engine) {
	engine.POST("/api/v1/report", f.symptomController.AddReport())
	engine.GET("/api/v1/report/user_id/:user_id", f.symptomController.GetReports())
}
