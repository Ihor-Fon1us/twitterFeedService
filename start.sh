#!/usr/bin/bash
cd ./src
docker build . -t twitterfeedservice
docker network create -d bridge roachnet
docker compose up -d
docker exec -it cockroach1 ./cockroach init --insecure
cd ../twitterfeedservice_bot
docker build . -t twitterfeedservice_bot
docker compose up -d


