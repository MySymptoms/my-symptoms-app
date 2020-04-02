.PHONY:
run: ## Run the application locally
	docker-compose up -d
	go run cmd/mysymptoms/main.go

.DEFAULT_GOAL := help

dep-locally: ## Install the deps locally
	brew install golang
	brew install golang-migrate

migrate-locally: ## run migrations
	migrate -source file://db/migrations -database 'mysql://user:password@tcp(localhost:3306)/app?multiStatements=true' up

clean: ## Cleanup db
	migrate -source file://db/migrations -database 'mysql://user:password@tcp(localhost:3306)/app?multiStatements=true' drop

.PHONY: help
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

