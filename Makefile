.PHONY: start up npm-install

start:
	docker-compose up

up:
	docker-compose up -d

npm-install:
	docker-compose exec bandit_tickets_web_node npm install

