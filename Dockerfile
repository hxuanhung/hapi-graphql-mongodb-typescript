FROM node:7.6.0

COPY . /app

WORKDIR /app

RUN npm install

EXPOSE 3000

CMD ["npm","run", "server:dev"]
