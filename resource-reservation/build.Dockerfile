FROM maven:3.9.6-eclipse-temurin-21-alpine AS build
WORKDIR /resourcify
COPY ../. /resourcify
RUN ls -l
RUN mvn clean install

FROM eclipse-temurin:21-jre-alpine
WORKDIR /resourcify/resource-reservation
COPY --from=build /resourcify/resource-reservation/target/*.jar resource-reservation.jar
EXPOSE 8082
ENTRYPOINT [ "java", "-jar", "resource-reservation.jar" ]
