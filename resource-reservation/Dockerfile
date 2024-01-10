FROM eclipse-temurin:21.0.1_12-jre
WORKDIR /opt/resource-service
COPY ./target/*.jar ./resource-service.jar
EXPOSE 8082
ENTRYPOINT [ "java", "-jar", "resource-service.jar" ]
