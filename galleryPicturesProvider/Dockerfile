FROM node:carbon

RUN mkdir -p /usr/src/artapp/galleryPicturesProvider
WORKDIR /usr/src/artapp/galleryPicturesProvider

ADD galleryPicturesProvider/package.json ./
RUN npm install

COPY ./galleryPicturesProvider/ .
#Checking image directories 
RUN ls -ah .

EXPOSE 8888
CMD ["npm","start"]