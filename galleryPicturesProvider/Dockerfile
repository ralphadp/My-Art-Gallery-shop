FROM node:12.14-alpine

RUN mkdir -p /usr/src/artapp/galleryPicturesProvider
WORKDIR /usr/src/artapp/galleryPicturesProvider

COPY package.json ./
RUN npm install

COPY . .

EXPOSE 8888
CMD ["npm","start"]