FROM eclipse-temurin:21.0.1_12-jre
WORKDIR /opt/user-service
COPY ./target/*.jar ./user-service.jar
EXPOSE 8084
ENTRYPOINT [ "java", "-jar", "user-service.jar" ]
