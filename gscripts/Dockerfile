FROM node:12.14-alpine

RUN mkdir -p /usr/src/artapp/gscripts
WORKDIR /usr/src/artapp/gscripts

COPY package.json ./
RUN npm install

COPY . .

EXPOSE 2000
CMD ["npm","start"]