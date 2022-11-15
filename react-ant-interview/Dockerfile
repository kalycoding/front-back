# syntax=docker/dockerfile:1
FROM node:16.14
WORKDIR /frontend
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .
