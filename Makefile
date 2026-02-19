install:
	npm ci
	cd frontend && npm install --production=false

build:
	rm -rf frontend/dist
	cd frontend && npm run build

start:
	npx start-server -s ./frontend/dist

lint:
	npm run lint --prefix frontend

lint-frontend:
	make -C frontend lint

frontend-dev:
	cd frontend && npm run dev

backend-dev:
	npx start-server

dev:
	npx concurrently "make backend-dev" "make frontend-dev"