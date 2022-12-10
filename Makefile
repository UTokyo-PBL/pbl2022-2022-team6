.PHONY: go-fix-lint
go-fix-lint:
	find . -print | grep --regex '.*\.go$$' | xargs goimports -w -local "github.com/UTokyo-PBL/pbl2022-2022-team6"

.PHONY: render-api
render-api:
	cd spec && npx redoc-cli build openapi.yaml --options.theme.colors.primary.main=orange && cd -

.PHONY: gen-api
gen-api:
	mkdir -p ./gen/api/
	oapi-codegen --config config/oapi-codegen/server.yaml ./spec/openapi.yaml

.PHONY: __init-db-args
__init-db-args:
ifndef DB_HOST
	$(warning DB_HOST was not set; localhost is used)
	$(eval DB_HOST := localhost)
endif
ifndef DB_PORT
	$(warning DB_PORT was not set; 3306 is used)
	$(eval DB_PORT := 3306)
endif
ifndef DB_USER
	$(warning DB_USER was not set; root is used)
	$(eval DB_USER := root)
endif
ifndef DB_PASS
	$(warning DB_PASS was not set; passw0rd is used)
	$(eval DB_PASS := passw0rd)
endif
ifndef DB_NAME
	$(warning DB_NAME was not set; translango is used)
	$(eval DB_NAME := translango)
endif

.PHONY: gen-xo
gen-xo: __init-db-args
	go install github.com/xo/xo@42b11c7999bc6ac5be620949723f44bd0ec63e02
	mkdir -p gen/dbschema
	xo schema --out "gen/dbschema" -t json "mysql://$(DB_USER):$(DB_PASS)@$(DB_HOST):$(DB_PORT)/$(DB_NAME)"

.PHONY: gen-db
gen-db:
	mkdir -p gen/daocore
	go run ./script/dbgen ./gen/dbschema/xo.xo.json

.PHONY: migrate-db
migrate-db:
	for file in $$(find ddl/ -type f -name '*.sql' | sort); do mysql -u$(DB_USER) -p$(DB_PASS) -h$(DB_HOST) --protocol='tcp' --database=$(DB_NAME) < $$file; done

.PHONY: build
build:
	env GOOS=linux GOARCH=amd64 go build -o build/serve cmd/server/main.go

.PHONY: deploy
deploy:
	ssh team6 "pkill serve"
	scp ./build/serve team6:~/
	ssh team6 "nohup ./serve > $$(date "+%Y%m%d%H%M").log & disown %1"
