#!/usr/bin/env bash

if [ ! -v $NODE_ENV ] && ([ $NODE_ENV == "testing" ] || [ $NODE_ENV == "production" ]); then
  echo "Build Angular client on $NODE_ENV ..."
  ng build -c $NODE_ENV
else
  echo "NODE_ENV should be testing or production."
  exit 1
fi

