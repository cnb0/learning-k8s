
## Managing Kubernetes 

        - While Kubernetes has greatly simplified the task of deploying containerized applications, managing this orchestration framework on a daily basis can still be a complex undertaking. With this practical book, site reliability and DevOps engineers will learn how to build, operate, manage, and upgrade a Kubernetes cluster—whether it resides on cloud infrastructure or on-premises.

        - Dissect how Kubernetes works internally and demonstrate ways to maintain, adjust, and 
        - Improve the cluster to suit your particular use case. 
        - Learn how to make architectural choices for 
                    designing a cluster, 
                    managing access control, 
                    monitoring and alerting, and 
                    upgrading Kubernetes. 
        - Dive in and discover how to take full advantage of this orchestration framework’s capabilities.

        - Learn how your cluster operates, how developers use it to deploy applications, and how Kubernetes can facilitate a developer’s job
        - Adjust, secure, and tune your cluster by understanding Kubernetes APIs and configuration options
        - Detect cluster-level problems early and learn the steps necessary to respond and recover quickly
        - Determine how and when to add libraries, tools, and platforms that build on, extend, or otherwise improve a Kubernetes cluster

```

1. Introduction
                        How the Cluster Operates
                        Adjust, Secure, and Tune the Cluster
                        Responding When Things Go Wrong
                        Extending the System with New and Custom Functionality
 
2. An Overview of Kubernetes
                        Containers
                        Container Orchestration
                        The Kubernetes API
                        Basic Objects: Pods, ReplicaSets, and Services
                        Organizing Your Cluster with Namespaces, Labels, and Annotations
                        Advanced Concepts: Deployments, Ingress, and StatefulSets
                        Batch Workloads: Job and ScheduledJob
                        Cluster Agents and Utilities: DaemonSets

3. Kubernetes Architecture
                        Concepts
                        Declarative Configuration
                        Reconciliation or Controllers
                        Implicit or Dynamic Grouping
                        Structure
                        Unix Philosophy of Many Components
                        API-Driven Interactions
                        Components
                        Head Node Components
                        Components On All Nodes
                        Scheduled Components

4. The Kubernetes API Server
                        Basic Characteristics for Manageability
                        Pieces of the API Server
                        API Management
                        API Paths
                        API Discovery
                        OpenAPI Spec Serving
                        API Translation
                        Request Management
                        Types of Requests
                        Life of a Request
                        API Server Internals
                        CRD Control Loop
                        Debugging the API Server
                        Basic Logs
                        Audit Logs
                        Activating Additional Logs
                        Debugging kubectl Requests

5. Scheduler
                        An Overview of Scheduling
                        Scheduling Process
                        Predicates
                        Priorities
                        High-Level Algorithm
                        Conflicts
                        Controlling Scheduling with Labels, Affinity, Taints, and Tolerations
                        Node Selectors
                        Node Affinity
                        Taints and Tolerations

6. Installing Kubernetes
                        kubeadm
                        kubelet
                        Installing the Control Plane
                        kubeadm Configuration
                        Preflight Checks
                        Certificates
                        etcd
                        kubeconfig
                        Taints
                        Installing Worker Nodes
                        Add-Ons
                        Phases
                        High Availability
                        Upgrades
                        Summary

7. Authentication and User Management
                        Users
                        Authentication
                        kubeconfig
                        Service Accounts

8. Authorization
                        REST
                        Authorization
                        Role-Based Access Control
                        Role and ClusterRole
                        RoleBinding and ClusterRoleBinding
                        Testing Authorization

9. Admission Control
                        Configuration
                        Common Controllers
                        PodSecurityPolicies
                        ResourceQuota
                        LimitRange
                        Dynamic Admission Controllers
                        Validating Admission Controllers
                        Mutating Admission Controllers

10. Networking
                        Container Network Interface
                        Choosing a Plug-in
                        kube-proxy
                        Service Discovery
                        DNS
                        Environment Variables
                        Network Policy
                        Service Mesh

11. Monitoring Kubernetes
                        Goals for Monitoring
                        Differences Between Logging and Monitoring
                        Building a Monitoring Stack
                        Getting Data from Your Cluster and Applications
                        Aggregating Metrics and Logs from Multiple Sources
                        Storing Data for Retrieval and Querying
                        Visualizing and Interacting with Your Data
                        What to Monitor?
                        Monitoring Machines
                        Monitoring Kubernetes
                        Monitoring Applications
                        Blackbox Monitoring
                        Streaming Logs
                        Alerting

12. Disaster Recovery
                        High Availability
                        State
                        Application Data
                        Persistent Volumes
                        Local Data
                        Worker Nodes
                        etcd
                        Ark

13. Extending Kubernetes
                        Kubernetes Extension Points
                        Cluster Daemons
                        Use Cases for Cluster Daemons
                        Installing a Cluster Daemon
                        Operational Considerations for Cluster Daemons
                        Hands-On: Example of Creating a Cluster Daemon
                        Cluster Assistants
                        Use Cases for Cluster Assistants
                        Installing a Cluster Assistant
                        Operational Considerations for Cluster Assistants
                        Hands-On: Example of Cluster Assistants
                        Extending the Life Cycle of the API Server
                        Use Cases for Extending the API Life Cycle
                        Installing API Life Cycle Extensions
                        Operational Considerations for Life Cycle Extensions
                        Hands-On: Example of Life Cycle Extensions
                        Adding Custom APIs to Kubernetes
                        Use Cases for Adding New APIs
                        Custom Resource Definitions and Aggregated API Servers
                        Architecture for Custom Resource Definitions
                        Installing Custom Resource Definitions
                        Operational Considerations for Custom Resources