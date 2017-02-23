#!/bin/sh
SCRIPT_PATH=$(cd "$(dirname "$0")"; pwd);
PROJECT_ROOT=${SCRIPT_PATH}/..
cd ${PROJECT_ROOT}
mkdir -p ./dist/
echo "cleaning dist"
rm -rf ./dist/*
./scripts/copy.sh
node_modules/.bin/tsc

if [ "$1" = "clean" ];
then
  find ./dist \( -name "*.js.map" -o -name "*.d.ts" -o -name "*.spec.js" \) -type f -delete
  #find ./dist -name "test" -type d -exec rm -rf {} \;
  find ./dist -type d -name "test" -delete
fi
