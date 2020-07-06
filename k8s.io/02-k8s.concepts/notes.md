## [k8s.concepts](https://kubernetes.io/docs/concepts/)

- Kubernetes is characterized as a declarative Container Orchestration Engine: 

- In a declarative system, the user supplies a representation of the 
  desired state of the system to the system. Then, the system considers 
  the current state and the desired state to determine the
  sequence of commands to transition from current state to desired state
  
- Kubernetes iteratively determines the next command to execute based on the current state only. 
  If and when no next command can be determined, Kubernetes reached a steady state.

- The Kubernetes Object Store is a set of Kubernetes Objects. 
  Kubernetes Objects are data records that come in different flavors, called kinds.

```
    1.  Overview 
              -  What is Kubernetes?
              -  Kubernetes Components
              -  The Kubernetes API
              -  Working with Kubernetes Objects

    2.  Cluster Architecture
              -  Nodes
              -  Control Plane-Node Communication
              -  Controllers
              -  Cloud Controller Manager
    3.  Containers
              -  Containers overview
              -  Images
              -  Container Environment
              -  Runtime Class
              -  Container Lifecycle Hooks
    4.  Workloads
              -  Pods
                    - Pod Overview
                    - Pods
                    - Pod Lifecycle
                    - Init Containers
                    - Pod Preset
                    - Pod Topology Spread Constraints
                    - Disruptions
                    - Ephemeral Containers
              -  Controllers
                    - ReplicaSet
                    - Deployments
                    - StatefulSets
                    - DaemonSet
                    - Jobs
                    - Garbage Collection
                    - TTL Controller for Finished Resources
                    - CronJob

    5.  Services, Load Balancing, and Networking
              - Service
              - Service Topology
              - EndpointSlices
              - DNS for Services and Pods
              - Connecting Applications with Services
              - Ingress
              - Ingress Controllers
              - Network Policies
              - Adding entries to Pod /etc/hosts with HostAliases
              - IPv4/IPv6 dual-stack     
    6.  Storage
              - Volumes
              - Persistent Volumes
              - Volume Snapshots
              - CSI Volume Cloning
              - Storage Classes
              - Volume Snapshot Classes
              - Dynamic Volume Provisioning
              - Node-specific Volume Limits
    7.  Configuration
              - Configuration Best Practices
              - ConfigMaps
              - Secrets
              - Managing Resources for Containers
              - Pod Overhead
              - Resource Bin Packing for Extended Resources
              - Organizing Cluster Access Using kubeconfig Files
              - Pod Priority and Preemption

    8.  Security
              - Overview of Cloud Native Security
              - Pod Security Standards

    9.  Policies
              - Limit Ranges
              - Resource Quotas
              - Pod Security Policies

    10. Scheduling and Eviction
              - Kubernetes Scheduler
              - Taints and Tolerations
              - Assigning Pods to Nodes
              - Scheduling Framework
              - Scheduler Performance Tuning

    11. Cluster Administration
              - Cluster Administration Overview
              - Certificates
              - Cloud Providers
              - Managing Resources
              - Cluster Networking
              - Logging Architecture
              - Metrics For The Kubernetes Control Plane
              - Configuring kubelet Garbage Collection
              - Proxies in Kubernetes
              - API Priority and Fairness
              - Installing Addons

    12. Extending Kubernetes
              - Extending your Kubernetes Cluster
              - Extending the Kubernetes API
              - Compute, Storage, and Networking Extensions
              - Operator pattern
              - Service Catalog
              - Poseidon-Firmament Scheduler
```
