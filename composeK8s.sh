#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BLINK='\033[5m'
NC='\033[0m' # No Color

function showHelp() {
    printf "$0 [-option]"
    printf '\n'
    printf "${BLUE}Options:${CYAN}"
    printf '\n'
    printf ' -b  --build\t\t: Build all the docker images\n'
    printf ' -rb --remove-build\t: Remove the docker images\n'
    printf ' -d  --deploy\t\t: Deploy by deleting the olds deploy and setting new pods and services\n'
    printf ' -dd --delete-deploy\t: Remove old deploy, removing services and deployments\n'
    printf ' -a  --all\t\t: Perform all the complete process: Remove old build, build images, and deploy on the current cluster.\n'
    printf ' -h  --help\t\t: Display a list of all the available options.${NC}\n'
    exit 1
}

function setMinikubeDockerEnvironment() {
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
}

function buildDockerImagesLocally() {
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

    docker build -f galleryPicturesProvider/Dockerfile -t gallery-images:v1 .
    echo -e "${BLUE}gallery-images image was created${NC}\n"

    docker build -f admin/Dockerfile -t gallery-admin:v1 .
    echo -e "${BLUE}gallery-admin image was created${NC}\n"

    docker build -f gallery/Dockerfile -t gallery-app:v1 .
    echo -e "${BLUE}gallery-app image created${NC}\n"

    echo -e "${GREEN}Build done.${NC}"
    docker images
    echo -e "\n${BLINK}${RED}GalleryArt ${GREEN}Images have been created...${NC}"
}

function removeDockerLocalImages() {
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
}

function removeDeployAndServicesFromMinikubeCluster() {
    echo -e "${GREEN}Starting Art Gallery deployment${NC}";
    echo -e "${RED}Deleting old services and deployments${NC}";
    kubectl delete services --all -n art
    kubectl delete deployments --all -n art
    kubectl delete namespace art
}

function deployToMinikubeCluster() {

    cd ./kubernetes
    minikubeHost=$(minikube ip)

    echo -e "${GREEN}Creating namespace ${RED}art${NC}";
    kubectl create -f gallery-namespace.yaml 

    #Deploy containers in order
    echo -e "${GREEN}Deploying containers${NC}";
    kubectl create -f gallery-mysql8-deployment.yaml
    kubectl create -f gallery-scripts-deployment.yaml 
    kubectl create -f gallery-pictures-deployment.yaml 
    kubectl create -f gallery-jwt-deployment.yaml 
    kubectl create -f gallery-admin-deployment.yaml
    kubectl create -f gallery-app-deployment.yaml

    #Create services in order
    echo -e "${GREEN}Creating services${NC}";
    kubectl create -f gallery-mysql8-svc.yaml 
    kubectl create -f gallery-scripts-svc.yaml 
    kubectl create -f gallery-pictures-svc.yaml 
    kubectl create -f gallery-jwt-svc.yaml 
    kubectl create -f gallery-admin-svc.yaml 
    kubectl create -f gallery-app-svc.yaml

    echo -e "\n${GREEN}Listing${NC}";
    kubectl get services -n art
    kubectl get pods -n art
    minikube service list
    echo -e "\n${BLINK}${GREEN}Deploy done...${NC}";
}

function perform {
echo "ewew"
    if [ $1 == "-b" ] || [ $1 == "--build" ];  then
        setMinikubeDockerEnvironment
        buildDockerImagesLocally
    elif [ $1 == "-rb" ] || [ $1 == "--remove-build" ];  then
        setMinikubeDockerEnvironment
        removeDockerLocalImages
    elif [ $1 == "-d" ] || [ $1 == "--deploy" ];  then
        deployToMinikubeCluster
    elif [ $1 == "-dd" ] || [ $1 == "--delete-deploy" ];  then
        removeDeployAndServicesFromMinikubeCluster
    elif [ $1 == "-a" ] || [ $1 == "--all" ];  then
        removeDeployAndServicesFromMinikubeCluster
        setMinikubeDockerEnvironment
        removeDockerLocalImages
        buildDockerImagesLocally
        deployToMinikubeCluster
    elif [ $1 == "-h" ] || [ $1 == "--help" ];  then
        showHelp
    else
        printf "${RED}Unknown option [$1] ...\n\n${NC}"
        showHelp
    fi
}

# Main script
if [ $# -ne 1 ]; then
    echo -e "${RED}Only one parameter allowed.\n${NC}"
    showHelp
else # have the argument
    if [ -n $1 ]; then
        perform $1
    else
        echo -e "${RED}Invalid option...\n${NC}"
        showHelp
    fi
fi

