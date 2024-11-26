setup:
	@make build
	@make up 
build:
	docker-compose up -d --build --no-cache --force-rm
stop:
	docker-compose stop
up:
	docker-compose up -d
