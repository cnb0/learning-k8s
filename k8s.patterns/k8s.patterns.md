
## k8s patterns 

```
- The way developers design, build, and run software has changed significantly with the evolution of microservices and containers.   
- provide common reusable elements, patterns, principles, and practices for designing and implementing cloud-native applications on Kubernetes

                - Foundational patterns
                        cover the core principles and practices for building container-based cloud-native applications.

                - Behavioral patterns 
                        explore finer-grained concepts for managing various types of container and platform interactions.

                - Structural patterns 
                        help you organize containers within a pod, the atom of the Kubernetes platform.

                - Configuration patterns provide
                        Insight into how application configurations can be handled in Kubernetes.

                - Advanced patterns 
                        Cover more advanced topics such as extending the platform with operators.

1. Introduction
        
        - The Path to Cloud Native
        - Distributed Primitives
           - Containers
           - Pods
           - Services
           - Labels
           - Annotations
           - Namespaces

I. Foundational Patterns

            2. Predictable Demands
                       - random generator app dealing with hard requirements on ConfigMap and 
                         PersistentVolumeClaims and  resource limits.
                                - Runtime Dependencies
                                - Resource Profiles
                                - Pod Priority
                                - Project Resources
                                - Capacity Planning

            3. Declarative Deployment
                               - Rolling Deployment
                                        - Rolling and fixed update of the random generator Deployment from 
                                          version 1.0 to 2.0.
                               - Fixed Deployment
                               - Blue-Green Release
                               - Canary Release

            4. Health Probe 
                              - Process Health Checks
                              - Liveness Probes
                              - Readiness Probes


            5. Managed Lifecycle
                        -  postStart and preStop hooks demonstrated with the random generator application
                              - SIGTERM Signal
                              - SIGKILL Signal
                              - Poststart Hook
                              - Prestop Hook
                              - Other Lifecycle Controls


            6. Automated Placement
                    - Example with node selector, pod and node affinity, taint and tolerations demonstrated.    
                                - Available Node Resources
                                - Container Resource Demands
                                - Placement Policies
                                - Scheduling Process
                                - Node Affinity
                                - Pod Affinity and Antiaffinity
                                - Taints and Tolerations



II. Behavioral Patterns


            7. Batch Job
                - Generate thousands of random numbers into a file with a batch job

            8. Periodic Job
                - Reuses the Batch Job example, but runs it periodically at a configured schedule

            9. Daemon Service
                - Sample maintenance script for maintenance jobs on every node of a cluster

           10. Singleton Service
                        Out-of-Application Locking

                            In-Application Locking
                            
                            Pod Disruption Budget
                                - PodDisruptionBudget for controlling voluntary disruptions


           11. Stateful Service
                            Networking
                            Identity
                            Ordinality
                            
                            Storage
                            Networking
                            Identity
                            Ordinality

            12. Service Discovery
                   - Various ways how to access our random-generator REST service
                      Internal Service Discovery
                      Manual Service Discovery
                      Service Discovery from Outside the Cluster
                      Application Layer Service Discovery
           
            13. Self Awareness
                   - Using the Downward API for setting environment variables and mount resource fields as files 
                      with the random-generator service

III. Structural Patterns

            14. Init Container
                - Initialize a HTTP server’s HTML source from a remote git repository

            15. Sidecar
                - Git polling example for a sidecar

            16. Adapter
                - Adapter for exporting timing information from the sample random-generator application 
                  in a Prometheus format

            17. Ambassador
                - Ambassador for moving on the log of the random-generator


IV. Configuration Patterns
            18. EnvVar Configuration
                - A simple example of how to use environment variables literally and from ConfigMaps and Secrets for 
                  our random-generator service        

            19. Configuration Resource
                - configure the random-generator Spring Boot application with a ConfigMap

            20. Immutable Configuration
                -  Use immutable configuration containers for application configuration. 
                    - Docker Volumes
                    - Kubernetes Init Containers
                    - OpenShift Templates

            21. Configuration Template
                   - use a template configuration standalone.xml which is processed with a template 
                     processed and filled with data from ConfigMap before a Wildfly server is started

V. Advanced Patterns

            22. Controller
                   - Simple, pure shell based controller which watches ConfigMap resources for changes and restarts Pods 
                     by using a label selector provided as annotation. An additional example controller exposes an 
                     Ingress route when it detects an exposeService label attached to the service.

            23. Operator
                   - Operator based on the ConfigMap watch controller and introduces a CRD ConfigWatcher which connects 
                     a ConfigMap with a set of Pods to restart in case of a config change
                   - Custom Resource Definitions
                   - Controller and Operator Classification
                   - Operator Development and Deployment

            24. Elastic Scale
                - Horizontal and vertical scaling examples with the random-generator Service 
                    -  Manual Horizontal Scaling
                    -  Horizontal Pod Autoscaling
                    -  Vertical Pod Autoscaling
                    -  Cluster Autoscaling
                    -  Scaling Levels

            25. Image Builder
                - Setup a chained build on OpenShift and use Knative build for doing builds within the cluster
                    -  OpenShift Build
                    -  Knative Build

````
