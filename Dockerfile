FROM node:7.6.0

COPY . /hapi

WORKDIR /hapi

RUN npm install && ls

EXPOSE 3000 5000

CMD ["npm","run", "dev:watch"]
