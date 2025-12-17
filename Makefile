install:
	npm ci
	npm ci --prefix frontend

build:
	rm -rf frontend/build
	cd frontend && npm ci && npm run build
	npm ci

start:
	npx start-server -s ./frontend/build


lint-frontend:
	make -C frontend lint
