#!/usr/bin/bash

docker compose up -d
docker exec -it cockroach1 ./cockroach init --insecure



