FROM node:alpine as build

WORKDIR '/messenger'

COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /messenger/build /usr/share/nginx/html
