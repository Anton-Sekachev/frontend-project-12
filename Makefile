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
