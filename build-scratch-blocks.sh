#!/bin/bash

cd ../
git clone https://github.com/gvbvdxxmod2/scratch-blocks
cd scratch-blocks
yarn install --force --ignore-engines --no-lockfile
yarn run build
yarn link

cd ../scratch-gui
yarn link scratch-blocks