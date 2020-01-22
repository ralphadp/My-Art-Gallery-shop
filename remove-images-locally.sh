#!/bin/sh
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
BLINK='\033[5m'
NC='\033[0m' # No Color

#Getting current OS 
unameOut="$(uname -s)"
if [[ $unameOut ==  *"Linux"* ]]; then
    machine=Linux;
elif [[ $unameOut == *"Darwin"* ]]; then
    machine=Mac;
elif [[ $unameOut == *"CYGWIN"* ]]; then
   machine=Cygwin;
elif [[ $unameOut == *"MINGW"* ]]; then
   machine=MinGw;
else
   machine="UNKNOWN:${unameOut}";
fi
echo -e "${GREEN}Executing under ${machine}${NC}";

#Setting minikube docker environment
printf "${GREEN}Setting docker environment variables for minikube on ${NC}"
if [ $machine == Linux ]; then
    echo -e "${GREEN}Linux distro ${NC}"
    eval $(minikube docker-env)
else
    echo -e "${GREEN}Non-Linux ${machine}${NC}"
    eval $(minikube docker-env --shell bash)
fi

######################
# Remove all the images
echo -e "${GREEN}Start removing${NC}"

echo -e "${RED}Removing gallery-app:v1 image${NC}"
docker rmi gallery-app:v1

echo -e "${RED}Removing gallery-admin:v1 image${NC}"
docker rmi gallery-admin:v1

echo -e "${RED}Removing gallery-images:v1 image${NC}"
docker rmi gallery-images:v1

echo -e "${RED}Removing gallery-jwt:v1 image${NC}"
docker rmi gallery-jwt:v1

echo -e "${RED}Removing gallery-scripts:v1 image${NC}"
docker rmi gallery-scripts:v1

echo -e "${RED}Removing gallery-mysql:v1 image${NC}"
docker rmi gallery-mysql:v1

docker images
echo -e "\n${BLINK}${GREEN}All images were removed.${NC}"