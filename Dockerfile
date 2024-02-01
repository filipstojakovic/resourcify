FROM maven:3.9.6-eclipse-temurin-21-alpine AS build
WORKDIR /resourcify
COPY ./pom.xml ./pom.xml
COPY ./api-gateway/pom.xml ./api-gateway/pom.xml
COPY ./user-service/pom.xml ./user-service/pom.xml
COPY ./resource-reservation/pom.xml ./resource-reservation/pom.xml
COPY ./common/pom.xml ./common/pom.xml

RUN mvn -q -ntp -B -pl common -am dependency:go-offline
COPY ./common/src ./common/src
RUN mvn -q -B -pl common install

RUN mvn -e -B dependency:resolve

COPY ./api-gateway/src ./api-gateway/src
COPY ./user-service/src ./user-service/src
COPY ./resource-reservation/src ./resource-reservation/src

RUN mvn -e -B package -Dmaven.test.skip


FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
ARG SERVICE_NAME
ENV SERVICE_NAME=${SERVICE_NAME}
COPY --from=build /resourcify/${SERVICE_NAME}/target/*.jar ./app.jar
CMD ["java", "-jar", "app.jar"]
