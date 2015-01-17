#!/bin/bash

if [ ".$ASSH_HOST" == "." ];then
  echo "set ASSH_HOST to remote host."
else 
  autossh -M 0 -q -f -N -o "ServerAliveInterval 60" -o "ServerAliveCountMax 3" -R 18080:localhost:8080 $ASSH_HOST
fi
