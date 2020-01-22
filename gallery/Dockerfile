FROM node:12-stretch

RUN mkdir -p /usr/src/artapp/gallery
WORKDIR /usr/src/artapp/gallery

ADD gallery/package.json ./
ADD galleryRepository/ ../galleryRepository/
ADD tests/ ../tests/
RUN npm install

COPY ./gallery/ .
VOLUME  ./gallery:/usr/src/artapp/gallery
#Checking image directories 
RUN ls -ah .
RUN ls -ah ../
#Set env variables
RUN export MINIUBE_HOST=$(hostname -f);echo $MINIUBE_HOST;

EXPOSE 3000
CMD ["npm","start"]