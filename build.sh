#!/usr/bin/env bash

if [ ! -v $NODE_ENV ] && ([ $NODE_ENV == "testing" ] || [ $NODE_ENV == "production" ]); then
  echo "Building Angular app for $NODE_ENV"

  build_testing='ng build -c testing'
  build_prod='ng build -c production'
  if [ $NODE_ENV == "testing" ]; then
   echo "running $build_testing ..."
   eval "$build_testing"
  elif [ $NODE_ENV == "production" ]; then
   echo "running $build_prod ..."
   eval "$build_prod"
  fi
else
  echo "NODE_ENV should be testing or production."
  exit 1
fi

