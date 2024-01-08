FROM openjdk:21-jdk-slim
WORKDIR /opt/user-service
COPY ./target/*.jar ./user-service.jar
EXPOSE :8084
ENTRYPOINT [ "java", "-jar", "user-service.jar" ]
