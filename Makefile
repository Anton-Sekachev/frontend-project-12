install:
	npm ci

build:
	rm -rf frontend/build
	npm run build --prefix frontend

start:
	npx start-server -s ./frontend/build


lint-frontend:
	make -C frontend lint
