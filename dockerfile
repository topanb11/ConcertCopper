FROM postgres
ENV POSTGRES_PASSWORD postgres
ENV POSTGRES_DB fastdb
COPY dump.sql /docker-entrypoint-initdb.d/