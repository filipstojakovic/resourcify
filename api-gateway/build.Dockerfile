FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /resourcify
COPY ../. /resourcify
RUN ls -l
RUN mvn clean install

FROM eclipse-temurin:21.0.1_12-jre
WORKDIR /resourcify/api-gateway
COPY --from=build /resourcify/api-gateway/target/*.jar api-gateway.jar
EXPOSE 8083
ENTRYPOINT [ "java", "-jar", "api-gateway.jar" ]
