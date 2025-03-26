# Stage 1
FROM node AS dist

WORKDIR /spa

COPY ./spa/package*.json .

RUN npm install 

COPY ./spa .

RUN npm run build

# Stage 2
FROM nginx:latest AS spa_server

COPY --from=dist /spa/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]