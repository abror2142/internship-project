FROM nginx:latest AS server

COPY ./nginx/conf.d /etc/nginx/conf.d
COPY ./api/public /api/public

FROM server AS server_dev
VOLUME [ "./api/public", "/api/public" ]
VOLUME [ "./nginx/conf.d", "/etc/nginx/conf.d" ]