FROM node:20

ENV MONGO_URL=mongodb://mongo:27017/playfields
ENV PORT=3000
ENV JWT_HASH_MD5=d130b96005749c3b93f9d96c38872cdb

WORKDIR /app
COPY . .
COPY package.json .

RUN yarn install
RUN yarn build

EXPOSE 3000
