FROM node:22-alpine

WORKDIR /docker-front

COPY package.json .

RUN npm install
COPY . .

EXPOSE 9050
CMD ["npm","run","dev"]

