#!/usr/bin/bash

docker network create -d bridge roachnet
docker compose up -d
docker exec -it cockroach1 ./cockroach init --insecure


