#!/usr/bin/env bash

docker compose -f docker-compose-build.yml down
docker compose -f docker-compose-prod.yml down