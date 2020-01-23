FROM mysql

LABEL MAINTAINER Ralph A <ralphadp@gmail.com>

ENV MYSQL_DATABASE=gallery_db \
    MYSQL_ROOT_PASSWORD=root \
	MYSQL_PASSWORD=root

#EXPOSE 3308:3306

COPY ./gallery_db_dump.sql /docker-entrypoint-initdb.d/