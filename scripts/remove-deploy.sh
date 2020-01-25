#!/bin/sh
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
BLINK='\033[5m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting Art Gallery deployment${NC}";
echo -e "${RED}Deleting old services and deployments${NC}";
kubectl delete services --all -n art
kubectl delete deployments --all -n art
kubectl delete namespace art