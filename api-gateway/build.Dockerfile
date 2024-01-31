FROM maven:3.9.6-eclipse-temurin-21-alpine AS build
WORKDIR /resourcify
COPY ../ /resourcify
RUN mvn clean install

FROM eclipse-temurin:21-jre-alpine
WORKDIR /resourcify/api-gateway
COPY --from=build /resourcify/api-gateway/target/*.jar api-gateway.jar
ENTRYPOINT [ "java", "-jar", "api-gateway.jar" ]
