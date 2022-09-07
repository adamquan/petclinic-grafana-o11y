#!/bin/bash

sudo systemctl start grafana-agent.service
java -javaagent:/opentelemetry-javaagent.jar -Dotel.exporter.otlp.traces.endpoint=http://localhost:4317 -Dotel.service.name=pet-clinic -Dotel.traces.exporter=otlp -Djava.util.logging.config.file=logging.properties -jar /app.jar
