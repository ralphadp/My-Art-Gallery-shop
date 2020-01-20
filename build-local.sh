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
docker build -t gallery-images:v1 .
cd ..

docker build -f admin/Dockerfile -t gallery-admin:v1 .

echo "Images done..."
docker images