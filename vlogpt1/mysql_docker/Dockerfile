FROM mysql:latest
ENV MYSQL_DATABASE=vlog_db
ENV MYSQL_ROOT_PASSWORD=root_password
ENV MYSQL_USER=vlog_user
ENV MYSQL_PASSWORD=vlog_password
COPY Schema.sql ./docker-entrypoint-initdb.d/