FROM openjdk:11.0.1-jre-slim-stretch
EXPOSE 8080
ARG JAR=spring-petclinic-2.7.0-SNAPSHOT.jar
COPY target/$JAR /app.jar
COPY opentelemetry-javaagent.jar /opentelemetry-javaagent.jar
ENTRYPOINT ["java","-jar","/app.jar"]
#ENTRYPOINT ["java","-javaagent:/opentelemetry-javaagent.jar","-Dotel.exporter.otlp.traces.endpoint=http://agent:4317","-Dotel.service.name=pet-clinic","-Dotel.traces.exporter=otlp","-Djava.util.logging.config.file=logging.properties","-jar","/app.jar"]