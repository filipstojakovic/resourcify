FROM eclipse-temurin:21-jre-alpine
WORKDIR /opt/api-gateway
COPY ./target/*.jar api-gateway.jar
EXPOSE 8083
ENTRYPOINT [ "java", "-jar", "api-gateway.jar" ]
