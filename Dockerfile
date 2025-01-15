FROM node:22-alpine

WORKDIR /docker-api 

COPY . .

RUN npm install


EXPOSE 9000

CMD ["npm","start"]