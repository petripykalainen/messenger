FROM node:13

WORKDIR /usr/app/backend

COPY package.json .
RUN npm install
COPY . .

RUN chmod +x ./entrypoint.sh
