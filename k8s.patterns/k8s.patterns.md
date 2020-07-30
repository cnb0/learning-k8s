
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
        insight into how application configurations can be handled in Kubernetes.
- Advanced patterns 
        cover more advanced topics such as extending the platform with operators.


1. Introduction
        The Path to Cloud Native
        Distributed Primitives
            Containers
            Pods
            Services
            Labels
            Annotations
            Namespaces

I. Foundational Patterns

            2. Predictable Demands
                  - Our sample random generator dealing with hard requirements on ConfigMap and 
                    PersistentVolumeClaims as well as with resource limits.
                                            Runtime Dependencies
                                            Resource Profiles
                                            Pod Priority
                                            Project Resources
                                            Capacity Planning

            3. Declarative Deployment
                    Rolling Deployment
                    Fixed Deployment
                    Blue-Green Release
                    Canary Release

            4. Health Probe
                    Process Health Checks
                    Liveness Probes
                    Readiness Probes


            5. Managed Lifecycle
                    SIGTERM Signal
                    SIGKILL Signal
                    Poststart Hook
                    Prestop Hook
                    Other Lifecycle Controls


            6. Automated Placement

                    Available Node Resources
                    Container Resource Demands
                    Placement Policies
                    Scheduling Process
                    Node Affinity
                    Pod Affinity and Antiaffinity
                    Taints and Tolerations



II. Behavioral Patterns


                    7. Batch Job
                    8. Periodic Job
                    9. Daemon Service
                    10. Singleton Service
                            Out-of-Application Locking
                            In-Application Locking
                            Pod Disruption Budget


                    11. Stateful Service
                            Networking
                            Identity
                            Ordinality
                            
                            Storage
                            Networking
                            Identity
                            Ordinality


                    12. Service Discovery
                            Internal Service Discovery
                            Manual Service Discovery
                            Service Discovery from Outside the Cluster
                            Application Layer Service Discovery
                        
                    13. Self Awareness



III. Structural Patterns

                    14. Init Container
                    15. Sidecar
                    16. Adapter
                    17. Ambassador


IV. Configuration Patterns
                18. EnvVar Configuration
                19. Configuration Resource
                20. Immutable Configuration
                    Docker Volumes
                    Kubernetes Init Containers
                    OpenShift Templates

                21. Configuration Template


V. Advanced Patterns

                22. Controller
                23. Operator
                Custom Resource Definitions
                Controller and Operator Classification
                Operator Development and Deployment


24. Elastic Scale
                Manual Horizontal Scaling
                Horizontal Pod Autoscaling
                Vertical Pod Autoscaling
                Cluster Autoscaling
                Scaling Levels

25. Image Builder
                OpenShift Build
                Knative Build



````
