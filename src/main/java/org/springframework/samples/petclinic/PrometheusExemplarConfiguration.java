package org.springframework.samples.petclinic;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.micrometer.core.instrument.Clock;
import io.micrometer.prometheus.PrometheusConfig;
import io.micrometer.prometheus.PrometheusMeterRegistry;
import io.opentelemetry.api.trace.Span;
import io.prometheus.client.CollectorRegistry;
import io.prometheus.client.exemplars.DefaultExemplarSampler;
import io.prometheus.client.exemplars.tracer.otel_agent.OpenTelemetryAgentSpanContextSupplier;

@Configuration
public class PrometheusExemplarConfiguration {

	@Bean
	public PrometheusMeterRegistry prometheusMeterRegistryWithExemplar(PrometheusConfig prometheusConfig,
			CollectorRegistry collectorRegistry, Clock clock) {
		return new PrometheusMeterRegistry(prometheusConfig, collectorRegistry, clock,
				new DefaultExemplarSampler(new OpenTelemetryAgentSpanContextSupplier() {

					@Override
					public String getTraceId() {
						if (!Span.current().getSpanContext().isSampled()) {
							return null;
						}
						System.out.print("Trace ID *********** : " + super.getTraceId());
						return super.getTraceId();
					}
				}));
	}

}
