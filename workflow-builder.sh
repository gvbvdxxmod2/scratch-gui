#!/bin/bash

CUR_PWD=$(pwd)

function buildGUI() {
    cd CUR_PWD/
    yarn run build
}

function setupGUI() {
    cd CUR_PWD/
    yarn install --force --ignore-engines --no-cache --no-lockfile
    yarn link scratch-storage
    yarn link scratch-blocks
    yarn link scratch-render-fonts
    yarn link scratch-vm
    yarn link 
}

function setupVM() {
    cd CUR_PWD/
    cd ../scratch-vm
    yarn link scratch-storage
    yarn link scratch-render-fonts
    yarn link scratch-blocks
    yarn link
    cd CUR_PWD/
}

function setupDeps() {
    cd CUR_PWD/
    cd ../
    git clone https://github.com/gvbvdxxmod2/scratch-paint
    git clone https://github.com/gvbvdxxmod2/scratch-render
    git clone https://github.com/gvbvdxxmod2/scratch-render-fonts
    git clone https://github.com/gvbvdxxmod2/scratch-storage
    git clone https://github.com/gvbvdxxmod2/scratch-vm
    cd scratch-paint
    yarn install --force --ignore-engines --no-cache --no-lockfile
    yarn link
    cd ../
    cd scratch-render
    yarn install --force --ignore-engines --no-cache --no-lockfile
    yarn link
    cd ../
    cd scratch-render-fonts
    yarn install --force --ignore-engines --no-cache --no-lockfile
    yarn link
    cd ../
    cd scratch-storage
    yarn install --force --ignore-engines --no-cache --no-lockfile
    yarn link
    cd ../
    cd scratch-blocks
    yarn install --force --ignore-engines --no-cache --no-lockfile
    yarn link
    cd ../
    cd scratch-vm
    yarn install --force --ignore-engines --no-cache --no-lockfile
    yarn link
    cd ../
}

sudo apt install python3

setupDeps()
setupVM()
setupGUI()

buildGUI()