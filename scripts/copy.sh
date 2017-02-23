#!/bin/sh
SCRIPT_PATH=$(cd "$(dirname "$0")"; pwd);
cd ${SCRIPT_PATH}/../
echo "coping files"
rsync -r --exclude=local.json ./dist/
rsync -r --exclude=updater.lock ./db ./scripts ./dist/
rsync ./package.json ./yarn.lock ./dist/
