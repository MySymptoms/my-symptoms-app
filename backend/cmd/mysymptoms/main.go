package main

import (
	"context"

	"github.com/MySymptoms/my-symptoms-app/internal/app"
	"github.com/MySymptoms/my-symptoms-app/internal/pkg/config"
)

func main() {
	ctx := context.Background()

	flags, err := config.New()
	if err != nil {
		panic(err)
	}

	app.Run(ctx, flags)
}
