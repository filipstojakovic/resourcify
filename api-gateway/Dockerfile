FROM eclipse-temurin:21.0.1_12-jre
WORKDIR /opt/api-gateway
COPY ./target/*.jar api-gateway.jar
EXPOSE 8083
ENTRYPOINT [ "java", "-jar", "api-gateway.jar" ]
