FROM openjdk:21-jdk-slim
WORKDIR /opt/api-gateway
COPY ./target/*.jar api-gateway.jar
EXPOSE 8083
ENTRYPOINT [ "java", "-jar", "api-gateway.jar" ]
