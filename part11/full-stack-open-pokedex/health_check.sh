#!/bin/bash

if [ -z "$1" ]
then
RVMHTTP="http://localhost:5000/health"
else
RVMHTTP="$1"
fi

echo "Endpoint: $RVMHTTP"

raw="$(curl $RVMHTTP)"

if [[ $raw == ok ]]
then
echo "ok"
exit 0
else
echo "fail"
exit 1
fi