#!/bin/sh

echo "Enter minikube"
minikube ssh
eval $(minikube docker-env)

echo "Start building images"
cd ./ArtGaleryShopping/
cd sqlDump/
docker build -t gallery-mysql:v1 .
cd ..
cd gscripts/
docker build -t gallery-scripts:v1 .
cd ..
cd galleryJWT/
docker build -t gallery-jwt:v1 .
cd ..
cd galleryPicturesProvider/
docker build -t gallery-pictures:v1 .
cd ..

echo "Images done..."
docker images