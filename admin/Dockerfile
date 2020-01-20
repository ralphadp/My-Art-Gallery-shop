FROM node:carbon

RUN mkdir -p /usr/src/artapp/admin
WORKDIR /usr/src/artapp/admin

COPY admin/package.json ./
COPY galleryRepository/ ../galleryRepository/
RUN npm install

COPY ./admin/ .
#Checking image directories 
RUN ls -ah .
RUN ls -ah ../
#Set env variables
RUN export MINIUBE_HOST=$(hostname -f);echo $MINIUBE_HOST;

EXPOSE 4000
CMD ["npm","start"]