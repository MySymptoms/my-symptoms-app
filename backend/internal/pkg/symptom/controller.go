package symptom

import (
	"net/http"

	"github.com/MySymptoms/my-symptoms-app/internal/pkg/log"
	"github.com/gin-gonic/gin"
)

type Controller struct {
	logger  log.Logger
	handler *Handler
}

func NewController(logger log.Logger, handler *Handler) *Controller {
	return &Controller{
		logger:  logger,
		handler: handler,
	}
}

func (c *Controller) AddReport() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var req SymptomReportRequest
		if err := ctx.BindJSON(&req); err != nil {
			c.logger.Warning(ctx, err.Error())
			ctx.AbortWithStatus(http.StatusBadRequest)
			return
		}
		if err := ValidateSymptomReport(req); err != nil {
			c.logger.Warning(ctx, err.Error())
			ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		err := c.handler.AddReport(ctx, req)
		if err != nil {
			c.logger.Warning(ctx, "could not add report for request %#v: %s", req, err.Error())
			ctx.AbortWithStatusJSON(http.StatusBadGateway, gin.H{"error": "could not add report"})
			return
		}

		ctx.JSON(http.StatusOK, gin.H{"success": true})
	}
}

func (c *Controller) GetReports() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		clientID := ctx.Param("user_id")
		if clientID == "" {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "user_id was not provided"})
			return
		}
		reports, err := c.handler.GetReports(ctx, clientID)
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusBadGateway, gin.H{"error": "could not get reports"})
			return
		}
		ctx.JSON(http.StatusOK, reports)
	}
}
