#!/usr/bin/env bash

docker compose -f docker-compose-build.yml up -d --build
docker compose -f docker-compose-build.yml exec build-fpm composer install
docker compose -f docker-compose-build.yml exec build-fpm composer install --no-dev
docker compose -f docker-compose-build.yml exec build-frontend npm run staging
docker compose -f docker-compose-build.yml stop

docker compose -f docker-compose-prod.yml build
docker compose -f docker-compose-prod.yml up -d
# docker compose exec app-fpm php artisan migrate