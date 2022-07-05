#!/usr/bin/env bash

GITHUB_TOKEN="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"

docker image prune -a -f

docker pull quay.io/eclipse/che-theia-dev:next

docker tag quay.io/eclipse/che-theia-dev:next eclipse/che-theia-dev:next

./build.sh --build-args:GITHUB_TOKEN=${GITHUB_TOKEN} --dockerfile:Dockerfile.alpine --compressed-plugins --skip-tests