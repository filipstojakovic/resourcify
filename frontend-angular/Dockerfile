FROM node:16.16-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build-docker

FROM nginx
COPY --from=builder /app/dist/frontend/ /usr/share/nginx/html
COPY /nginx/nginx-custom.conf /etc/nginx/conf.d/default.conf
