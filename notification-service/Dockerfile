FROM node:16.16-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "start-docker"]
