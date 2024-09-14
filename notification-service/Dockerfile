FROM node:20.17.0-alpine3.20 AS dependencies
WORKDIR /app
COPY package*.json ./
RUN npm install

FROM dependencies AS build
WORKDIR /app
COPY . .
RUN npm run build

FROM node:20.17.0-alpine3.20 AS production
WORKDIR /app
COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist
COPY --from=build /app/.env.docker ./
RUN npm install --only=production
CMD ["npm", "run", "run-build"]
