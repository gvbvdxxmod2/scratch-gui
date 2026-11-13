#!/bin/bash

cd node_modules/scratch-blocks
yarn install --force --ignore-engines --no-lockfile
yarn run build
cd ../../