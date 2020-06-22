=== Foundational Patterns

link:foundational/PredictableDemands/README.adoc[Predictable Demands]::
  Our sample random generator dealing with hard requirements on ConfigMap and PersistentVolumeClaims as well as with resource limits.
link:foundational/DeclarativeDeployment/README.adoc[Declarative Deployment]::
  Rolling and fixed update of the random generator Deployment from version 1.0 to 2.0.
link:foundational/HealthProbe/README.adoc[Health Probe]::
  Liveness and Readiness probes for the random generator.
link:foundational/ManagedLifecycle/README.adoc[Managed Lifecycle]::
  `postStart` and `preStop` hooks demonstrated with the random generator application.
link:foundational/AutomatedPlacement/README.adoc[Automated Placement]::
  Example with node selector, pod and node affinity, taint and tolerations demonstrated.

=== Behavorial Patterns

link:behavorial/BatchJob/README.adoc[Batch Job]::
  Generate thousands of random numbers into a file with a batch job
link:behavorial/PeriodicJob/README.adoc[Periodic Job]::
  Reuses the link:behavorial/BatchJob/README.adoc[Batch Job] example, but runs it periodically at a configured schedule
link:behavorial/DaemonService/README.adoc[Daemon Service]::
  Sample maintenance script for maintenance jobs on every node of a cluster
link:behavorial/SingletonService/README.adoc[Singleton Service]::
  Example of a PodDisruptionBudget for controlling voluntary disruptions
link:behavorial/StatefulService/README.adoc[Stateful Service]::
  StatefulSet example for our random-generator
link:behavorial/ServiceDiscovery/README.adoc[Service Discovery]::
  Various ways how to access our random-generator REST service
link:behavorial/SelfAwareness/README.adoc[Self Awareness]::
  Using the Downward API for setting environment variables and mount resource fields as files with the random-generator service.

=== Structural Patterns

link:structural/InitContainer/README.adoc[Init Container]::
  Initialize a HTTP server's HTML source from a remote git repository
link:structural/Sidecar/README.adoc[Sidecar]::
  Git polling example for a sidecar
link:structural/Adapter/README.adoc[Adapter]::
  Adapter for exporting timing information from the sample random-generator application in a Prometheus format
link:structural/Ambassador/README.adoc[Ambassador]::
  Ambassador for moving on the log of the random-generator

=== Configuration Patterns

link:configuration/EnvVarConfiguration/README.adoc[EnvVar Configuration]::
  A simple example of how to use environment variables literally and from ConfigMaps and Secrets for our random-generator service.
link:configuration/ConfigurationResource/README.adoc[Configuration Resource]::
  Example how to configure the random-generator Spring Boot application with a ConfigMap
link:configuration/ImmutableConfiguration/README.adoc[Immutable Configuration]::
  Several examples of how to use immutable configuration containers for application configuration. This includes examples for the plain Docker case and for Kubernetes.
link:configuration/ConfigurationTemplate/README.adoc[Configuration Template]::
  Example how to use a template configuration `standalone.xml` which is processed with a template processed and filled with data from ConfigMap before a Wildfly server is started.

=== Advanced Patterns

link:advanced/Controller/README.adoc[Controller]::
  Simple, pure shell based controller which watches ConfigMap resources for changes and restarts Pods by using a label selector provided as annotation. An additional link:advanced/Controller/expose-controller/README.adoc[example controller] exposes an Ingress route when it detects an `exposeService` label attached to the service.
link:advanced/Operator/README.adoc[Operator]::
  Operator based on the ConfigMap watch link:advanced/Controller/README.adoc[controller] and introduces a CRD ConfigWatcher which connects a ConfigMap with a set of Pods to restart in case of a config change.
link:advanced/ElasticScale/README.adoc[Elastic Scale]::
  Horizontal and vertical scaling examples with the random-generator Service [*]
link:advanced/ImageBuilder/README.adoc[Image Builder]::
  Setup a link:advanced/ImageBuilder/openshift/README.adoc[chained build] on OpenShift and use link:advanced/ImageBuilder/knative/README.adoc[Knative build] for doing builds within the cluster.

