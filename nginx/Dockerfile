FROM nginx:latest AS server

COPY ./nginx/conf.d /etc/nginx/conf.d
COPY ./app/public /app/public

FROM server AS server_dev
VOLUME [ "./app/public", "/app/public" ]
VOLUME [ "./nginx/conf.d", "/etc/nginx/conf.d" ]