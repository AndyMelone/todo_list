setup:
	@make build
	@make up 
	
build:
	docker-compose up -d --build 
stop:
	docker-compose stop
up:
	docker-compose up -d
down:
	docker-compose down

