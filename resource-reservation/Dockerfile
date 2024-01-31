FROM eclipse-temurin:21-jre-alpine
WORKDIR /opt/resource-service
COPY ./target/*.jar ./resource-service.jar
EXPOSE 8082
ENTRYPOINT [ "java", "-jar", "resource-service.jar" ]
