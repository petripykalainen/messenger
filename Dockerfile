From node:13 as build

WORKDIR /messenger

COPY ./client/package.json .
RUN npm install
COPY ./client .

RUN npm run build

FROM nginx
COPY --from=build /messenger/build /usr/share/nginx/html
