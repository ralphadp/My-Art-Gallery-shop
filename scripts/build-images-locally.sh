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
echo -e "${GREEN}Building under ${machine}${NC}";

#Setting minikube docker environment
printf "${GREEN}Setting docker environment variables for minikube on ${NC}"
if [ $machine == Linux ]; then
    echo -e "${GREEN}Linux distro ${NC}"
    eval $(minikube docker-env)
else
    echo -e "${GREEN}Non-Linux ${machine}${NC}"
    eval $(minikube docker-env --shell bash)
fi

#change to workspace directory
cd ..

#####################
# Build all the images
echo -e "${GREEN}Start building images${NC}"
buildDir=$(pwd)

cd sqlDump/
docker build -t gallery-mysql:v1 .
cd $buildDir
echo -e "${BLUE}gallery-mysql image was created${NC}\n"

cd gscripts/
docker build -t gallery-scripts:v1 .
cd $buildDir
echo -e "${BLUE}gallery-scripts image was created${NC}\n"

cd galleryJWT/
docker build -t gallery-jwt:v1 .
cd $buildDir
echo -e "${BLUE}gallery-jwt image was created${NC}\n"

cd galleryPicturesProvider/
docker build -t gallery-images:v1 .
cd $buildDir
echo -e "${BLUE}gallery-images image was created${NC}\n"

docker build -f admin/Dockerfile -t gallery-admin:v1 .
echo -e "${BLUE}gallery-admin image was created${NC}\n"

docker build -f gallery/Dockerfile -t gallery-app:v1 .
echo -e "${BLUE}gallery-app image created${NC}\n"

echo -e "${GREEN}Build done.${NC}"
docker images
echo -e "\n${BLINK}${RED}GalleryArt ${GREEN}Images have been created...${NC}"