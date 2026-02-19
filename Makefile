install:
	npm ci
	npm install -C frontend

build:
	rm -rf frontend/dist
	npm run build -C frontend

start:
	npx start-server -s ./frontend/dist


lint-frontend:
	make -C frontend lint

frontend-dev:
	cd frontend && npm run dev

backend-dev:
	npx start-server

dev:
	npx concurrently "make backend-dev" "make frontend-dev"