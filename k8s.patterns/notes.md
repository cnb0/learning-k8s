### Foundational Patterns
```
Predictable Demands
      Our sample random generator dealing with hard requirements on ConfigMap and 
      PersistentVolumeClaims as well as with resource limits.

Declarative Deployment
     Rolling and fixed update of the random generator Deployment from version 1.0 to 2.0.

Health Probe
     Liveness and Readiness probes for the random generator.

Managed Lifecycle
     postStart and preStop hooks demonstrated with the random generator application.

Automated Placement
     Example with node selector, pod and node affinity, taint and tolerations demonstrated.
```
### Behavorial Patterns

```
Batch Job
     Generate thousands of random numbers into a file with a batch job

Periodic Job
Reuses the Batch Job example, but runs it periodically at a configured schedule

Daemon Service
Sample maintenance script for maintenance jobs on every node of a cluster

Singleton Service
Example of a PodDisruptionBudget for controlling voluntary disruptions

Stateful Service
StatefulSet example for our random-generator

Service Discovery
Various ways how to access our random-generator REST service

Self Awareness
Using the Downward API for setting environment variables and mount resource fields as files 
with the random-generator service.
```

### Structural Patterns
```
Init Container
Initialize a HTTP server’s HTML source from a remote git repository

Sidecar
Git polling example for a sidecar

Adapter
Adapter for exporting timing information from the sample random-generator application 
in a Prometheus format

Ambassador
Ambassador for moving on the log of the random-generator
```

### Configuration Patterns
```
EnvVar Configuration
A simple example of how to use environment variables literally and from ConfigMaps and Secrets for 
our random-generator service.

Configuration Resource
Example how to configure the random-generator Spring Boot application with a ConfigMap

Immutable Configuration
Several examples of how to use immutable configuration containers for application configuration. 
This includes examples for the plain Docker case and for Kubernetes.

Configuration Template
Example how to use a template configuration standalone.xml which is processed with a template 
processed and filled with data from ConfigMap before a Wildfly server is started.
```

### Advanced Patterns
```
Controller
Simple, pure shell based controller which watches ConfigMap resources for changes and restarts Pods 
by using a label selector provided as annotation. An additional example controller exposes an 
Ingress route when it detects an exposeService label attached to the service.

Operator
Operator based on the ConfigMap watch controller and introduces a CRD ConfigWatcher which connects 
a ConfigMap with a set of Pods to restart in case of a config change.

Elastic Scale
Horizontal and vertical scaling examples with the random-generator Service [*]

Image Builder
Setup a chained build on OpenShift and use Knative build for doing builds within the cluster.
```
