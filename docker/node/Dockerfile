# STAGE 1
FROM node:lts-alpine AS builder

WORKDIR /app

COPY . /app

RUN npm install
RUN npm run build

# STAGE 2
FROM node:lts-alpine

WORKDIR /app

COPY package.json .
COPY --from=builder /app/build .

EXPOSE ${NODE_PORT}
