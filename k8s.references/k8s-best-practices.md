For Kubernetes professionals with deep experience in distributed systems, enterprise application development, and
open source will guide you through the process of building applications with this container orchestration system. 
Based on the experiences of companies that are running Kubernetes in production successfully,
many of the methods are also backed by concrete code examples.

This book is ideal for those already familiar with basic Kubernetes concepts who want to learn common best practices. 
You’ll learn exactly what you need to know to build your best app with Kubernetes the first time.

- Set up and develop applications in Kubernetes
- patterns for monitoring, securing your systems,  
- managing upgrades, rollouts, and rollbacks
- Understand Kubernetes networking policies and where service mesh fits in
- Integrate services and legacy applications and develop higher-level platforms on top of Kubernetes
- Run machine learning workloads in Kubernetes


```
1. Setting Up a Basic Service
            Application Overview
            Managing Configuration Files
            Creating a Replicated Service Using Deployments
            Best Practices for Image Management
            Creating a Replicated Application
            Setting Up an External Ingress for HTTP Traffic
            Configuring an Application with ConfigMaps
            Managing Authentication with Secrets
            Deploying a Simple Stateful Database
            Creating a TCP Load Balancer by Using Services
            Using Ingress to Route Traffic to a Static File Server
            Parameterizing Your Application by Using Helm
            Deploying Services Best Practices

2. Developer Workflows
            Goals
            Building a Development Cluster
            Setting Up a Shared Cluster for Multiple Developers
            Onboarding Users
            Creating and Securing a Namespace
            Managing Namespaces
            Cluster-Level Services
            Enabling Developer Workflows
            Initial Setup
            Enabling Active Development
            Enabling Testing and Debugging
            Setting Up a Development Environment Best Practices
            Summary

3. Monitoring and Logging in Kubernetes
            Metrics Versus Logs
            Monitoring Techniques
            Monitoring Patterns
            Kubernetes Metrics Overview
            cAdvisor
            Metrics Server
            kube-state-metrics
            What Metrics Do I Monitor?
            Monitoring Tools
            Monitoring Kubernetes Using Prometheus
            Logging Overview
            Tools for Logging
            Logging by Using an EFK Stack
            Alerting
            Best Practices for Monitoring, Logging, and Alerting
            Monitoring
            Logging
            Alerting
             

4. Configuration, Secrets, and RBAC
            Configuration Through ConfigMaps and Secrets
            ConfigMaps
            Secrets
            Common Best Practices for the ConfigMap and Secrets APIs
            RBAC
            RBAC Primer
            RBAC Best Practices
  
 5. Continuous Integration, Testing, and Deployment
            Version Control
            Continuous Integration
            Testing
            Container Builds
            Container Image Tagging
            Continuous Deployment
            Deployment Strategies
            Testing in Production
            Setting Up a Pipeline and Performing a Chaos Experiment
            Setting Up CI
            Setting Up CD
            Performing a Rolling Upgrade
            A Simple Chaos Experiment
            Best Practices for CI/CD
  
6. Versioning, Releases, and Rollouts
            Versioning
            Releases
            Rollouts
            Putting It All Together
            Best Practices for Versioning, Releases, and Rollouts
 
7. Worldwide Application Distribution and Staging
            Distributing Your Image
            Parameterizing Your Deployment
            Load-Balancing Traffic Around the World
            Reliably Rolling Out Software Around the World
            Pre-Rollout Validation
            Canary Region
            Identifying Region Types
            Constructing a Global Rollout
            When Something Goes Wrong
            Worldwide Rollout Best Practices
  
8. Resource Management
            Kubernetes Scheduler
            Predicates
            Priorities
            Advanced Scheduling Techniques
            Pod Affinity and Anti-Affinity
            nodeSelector
            Taints and Tolerations
            Pod Resource Management
            Resource Request
            Resource Limits and Pod Quality of Service
            PodDisruptionBudgets
            Managing Resources by Using Namespaces
            ResourceQuota
            LimitRange
            Cluster Scaling
            Application Scaling
            Scaling with HPA
            HPA with Custom Metrics
            Vertical Pod Autoscaler
            Resource Management Best Practices
 
9. Networking, Network Security, and Service Mesh
            Kubernetes Network Principles
            Network Plug-ins
            Kubenet
            Kubenet Best Practices
            The CNI Plug-in
            CNI Best Practices
            Services in Kubernetes
            Service Type ClusterIP
            Service Type NodePort
            Service Type ExternalName
            Service Type LoadBalancer
            Ingress and Ingress Controllers
            Services and Ingress Controllers Best Practices
            Network Security Policy
            Network Policy Best Practices
            Service Meshes
            Service Mesh Best Practices
 
10. Pod and Container Security
            PodSecurityPolicy API
            Enabling PodSecurityPolicy
            Anatomy of a PodSecurityPolicy
            PodSecurityPolicy Challenges
            PodSecurityPolicy Best Practices
            PodSecurityPolicy Next Steps
            Workload Isolation and RuntimeClass
            Using RuntimeClass
            Runtime Implementations
            Workload Isolation and RuntimeClass Best Practices
            Other Pod and Container Security Considerations
            Admission Controllers
            Intrusion and Anomaly Detection Tooling
 
11. Policy and Governance for Your Cluster
            Why Policy and Governance Are Important
            How Is This Policy Different?
            Cloud-Native Policy Engine
            Introducing Gatekeeper
            Example Policies
            Gatekeeper Terminology
            Defining Constraint Templates
            Defining Constraints
            Data Replication
            UX
            Audit
            Becoming Familiar with Gatekeeper
            Gatekeeper Next Steps
            Policy and Governance Best Practices

12. Managing Multiple Clusters
            Why Multiple Clusters?
            Multicluster Design Concerns
            Managing Multiple Cluster Deployments
            Deployment and Management Patterns
            The GitOps Approach to Managing Clusters
            Multicluster Management Tools
            Kubernetes Federation
            Managing Multiple Clusters Best Practices
             
13. Integrating External Services and Kubernetes
            Importing Services into Kubernetes
            Selector-Less Services for Stable IP Addresses
            CNAME-Based Services for Stable DNS Names
            Active Controller-Based Approaches
            Exporting Services from Kubernetes
            Exporting Services by Using Internal Load Balancers
            Exporting Services on NodePorts
            Integrating External Machines and Kubernetes
            Sharing Services Between Kubernetes
            Third-Party Tools
            Connecting Cluster and External Services Best Practices
 
14. Running Machine Learning in Kubernetes
            Why Is Kubernetes Great for Machine Learning?
            Machine Learning Workflow
            Machine Learning for Kubernetes Cluster Admins
            Model Training on Kubernetes
            Distributed Training on Kubernetes
            Resource Constraints
            Specialized Hardware
            Libraries, Drivers, and Kernel Modules
            Storage
            Networking
            Specialized Protocols
            Data Scientist Concerns
            Machine Leaning on Kubernetes Best Practices
 
15. Building Higher-Level Application Patterns on Top of Kubernetes
            Approaches to Developing Higher-Level Abstractions
            Extending Kubernetes
            Extending Kubernetes Clusters
            Extending the Kubernetes User Experience
            Design Considerations When Building Platforms
            Support Exporting to a Container Image
            Support Existing Mechanisms for Service and Service Discovery
            Building Application Platforms Best Practices
            
16. Managing State and Stateful Applications
            Volumes and Volume Mounts
            Volume Best Practices
            Kubernetes Storage
            PersistentVolume
            PersistentVolumeClaims
            Storage Classes
            Kubernetes Storage Best Practices
            Stateful Applications
            StatefulSets
            Operators
            StatefulSet and Operator Best Practices
 
17. Admission Control and Authorization
            Admission Control
            What Are They?
            Why Are They Important?
            Admission Controller Types
            Configuring Admission Webhooks
            Admission Control Best Practices
            Authorization
            Authorization Modules
            Authorization Best Practices