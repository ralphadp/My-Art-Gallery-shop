FROM node:carbon

RUN mkdir -p /usr/src/artapp/galleryJWT
WORKDIR /usr/src/artapp/galleryJWT

COPY package.json ./
RUN npm install

COPY . .

EXPOSE 3333
CMD ["npm","start"]