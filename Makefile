install:
	npm ci
	npm ci --prefix frontend

build:
	npm ci --prefix frontend
	rm -rf frontend/build
	npm run build --prefix frontend

start:
	npx start-server -s ./frontend/build


lint-frontend:
	make -C frontend lint
