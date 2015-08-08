FROM node:0.10.40

RUN mkdir /app

WORKDIR /app
ADD . /app
RUN npm install

EXPOSE 3333
