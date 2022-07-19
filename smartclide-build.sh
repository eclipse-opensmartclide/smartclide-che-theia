#!/usr/bin/env bash

GITHUB_TOKEN="TOKEN"

docker builder prune -f

docker image prune -a -f

docker pull quay.io/eclipse/che-theia-dev:next

docker tag quay.io/eclipse/che-theia-dev:next eclipse/che-theia-dev:next

./build.sh --build-args:GITHUB_TOKEN=${GITHUB_TOKEN} --dockerfile:Dockerfile.alpine --compressed-plugins --skip-tests