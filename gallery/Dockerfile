FROM node:carbon

RUN mkdir -p /usr/src/artapp/gallery
WORKDIR /usr/src/artapp/gallery

COPY gallery/package.json ./
COPY galleryRepository/ ../galleryRepository/
COPY tests/ ../tests/
RUN npm install

COPY ./gallery/ .
#Checking image directories 
RUN ls -ah .
RUN ls -ah ../
#Set env variables
RUN export MINIUBE_HOST=$(hostname -f);echo $MINIUBE_HOST;

EXPOSE 3000
CMD ["npm","start"]