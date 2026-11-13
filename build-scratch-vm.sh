#!/bin/bash

cd ../
git clone https://github.com/gvbvdxxmod2/scratch-vm
cd scratch-vm
yarn install --force --ignore-engines --no-lockfile
yarn link

cd ../scratch-gui
yarn link scratch-vm