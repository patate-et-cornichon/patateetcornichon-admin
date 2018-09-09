#!/usr/bin/env bash


echo "Building Angular app for $NODE_ENV"

build_dev='ng build -c testing'
if [ $NODE_ENV == "testing" ]; then
 echo "running $build_dev ..."
 eval "$build_dev"
fi

build_prod='ng build -c production'
if [ $NODE_ENV == "production" ]; then
 echo "running $build_prod ..."
 eval "$build_prod"
fi
