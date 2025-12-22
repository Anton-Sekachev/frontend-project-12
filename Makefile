install:
	npm ci
	cd frontend && npm install

build:
	rm -rf frontend/build
	cd frontend && npm install --include=dev && npm run build
	npm ci

start:
	npx start-server -s ./frontend/build


lint-frontend:
	make -C frontend lint

# Запуск только фронтенда в режиме разработки
frontend-dev:
	cd frontend && npm run dev

# Запуск бэкенда в режиме разработки
backend-dev:
	npx start-server

dev:
	npx concurrently "make backend-dev" "make frontend-dev"