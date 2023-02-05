#!make
OS=$(shell uname)

ENV_FILE_EXISTS=$(shell [ -f .env ] && echo 1 || echo 0)
ifeq ($(ENV_FILE_EXISTS), 1)
include .env
endif

NODE_ENV?=development

# Project containers

start-app:
	@yarn start:dev
start-app-debug:
	@yarn start:debug

start: start-app

debug: start-app-debug

load-schema:
	@docker cp db/start.sql test_db:./schema.sql
	@docker exec test_db psql -U test test --file=schema.sql