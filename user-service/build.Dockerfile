FROM maven:3.9.6-eclipse-temurin-21-alpine AS build
WORKDIR /resourcify
COPY ../. /resourcify
RUN ls -l
RUN mvn clean install

FROM eclipse-temurin:21-jre-alpine
WORKDIR /resourcify/user-service
COPY --from=build /resourcify/user-service/target/*.jar user-service.jar
EXPOSE 8084
ENTRYPOINT [ "java", "-jar", "user-service.jar" ]
