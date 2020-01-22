FROM node:10-alpine

RUN mkdir -p /usr/src/artapp/gscripts
WORKDIR /usr/src/artapp/gscripts

COPY package.json ./
RUN npm install

COPY . .
#Checking image directories 
RUN ls -ah .

EXPOSE 2000
CMD ["npm","start"]