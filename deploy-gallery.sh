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

cd ./kubernetes
minikubeHost=$(minikube ip)

echo -e "${GREEN}Creating namespace ${RED}art${NC}";
kubectl create -f gallery-namespace.yaml 

echo -e "${GREEN}Deploying containers${NC}";
kubectl create -f gallery-mysql8-deployment.yaml
kubectl create -f gallery-scripts-deployment.yaml 
kubectl create -f gallery-pictures-deployment.yaml 
kubectl create -f gallery-jwt-deployment.yaml 
kubectl create -f gallery-admin-deployment.yaml
kubectl create -f gallery-app-deployment.yaml

echo -e "${GREEN}Creating services${NC}";
kubectl create -f gallery-mysql8-svc.yaml 
kubectl create -f gallery-scripts-svc.yaml 
kubectl create -f gallery-pictures-svc.yaml 
kubectl create -f gallery-jwt-svc.yaml 
kubectl create -f gallery-admin-svc.yaml 
kubectl create -f gallery-app-svc.yaml

echo -e "\n${GREEN}Listing${NC}";
kubectl get pods -n art
minikube service list
echo -e "\n${BLINK}${GREEN}Deploy done...${NC}";