.PHONY: api/render
api/render:
	cd spec && npx redoc-cli build openapi.yaml --options.theme.colors.primary.main=orange && cd -
