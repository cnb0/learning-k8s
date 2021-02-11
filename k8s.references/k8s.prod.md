
## Production k8s

Kubernetes has become the dominant container orchestrator, but many organizations that have recently adopted this system are still struggling to run actual production workloads. 

The brilliance of Kubernetes is how configurable and extensible the system is, from pluggable runtimes to storage integrations. 
For platform engineers, software developers, infosec, network engineers, storage engineers, . how the path to success with Kubernetes involves a variety of technology, pattern, and abstraction considerations.

you will:

- Understand what the path to production looks like when using Kubernetes
- Examine where gaps exist in your current Kubernetes strategy
- Learn Kubernetes's essential building blocks--and their trade-offs
- Understand what's involved in making Kubernetes a viable location for applications
- Learn better ways to navigate the cloud native landscape

```
1. A Path to Production
                Defining Kubernetes
                        The Core Components
                        Beyond Orchestration - Extended Functionality
                        Kubernetes Interfaces
                        Summarizing Kubernetes
                Defining Application Platforms
                        The Spectrum of Approaches
                        Aligning Your Organizational Needs
                        Summarizing Application Platforms
                Building Application Platforms on Kubernetes
                        Starting From The Bottom
                        The Abstraction Spectrum
                        Determining Platform Services
                        The Building Blocks
 
2. Deployment Models
            Managed Service vs Roll Your Own
                    Managed Services
                    Roll Your Own
                    Making the Decision
            Automation
                    Pre-Built Installer
                    Custom Automation
            Architecture & Topology
                    Etcd Deployment Models
                    Cluster Tiers
                    Node Pools
                    Cluster Federation
            Infrastructure
                    Bare Metal vs Virtualized
                    Cluster Sizing
                    Compute Infrastructure
                    Networking Infrastructure
                    Automation Strategies
            Machine Installations
                    Configuration Management
                    Machine Images
                    What to Install
            Containerized Components
                    Addons
                    Upgrades
                    Platform Versioning
                    Plan to Fail
                    Integration Testing
                    Strategies
            Triggering Mechanisms
 
3. Container Runtime
            The Advent of Containers
            The Open Container Initiative
                    OCI Runtime Specification
                    OCI Image Specification
            The Container Runtime Interface
                    Starting a Pod
            Choosing a Runtime
                    docker
                    containerd
                    CRI-O
                    Kata Containers
                    Virtual Kubelet
 
4. Container Storage
            Storage Considerations
                    Access Modes
                    Volume Expansion
                    Volume Provisioning
                    Backup and Recovery
                    Block Devices, File and Object Storage
                    Ephemeral Data
                    Choosing a Storage Provider
            Kubernetes Storage Primitives
                    Persistent Volumes and Claims
                    Storage Classes
            The Container Storage Interface (CSI)
                    CSI Controller
                    CSI Node
            Implementing Storage as a Service
                    Installation
                    Exposing Storage Options
                    Consuming Storage
                    Resizing
                    Snapshots
 
5. Pod Networking
            Networking Considerations
                    IP Address Management
                    Routing Protocols
                    Encapsulation and Tunneling
                    Workload Routability
                    IPv4 and IPv6
                    Encrypted Workload Traffic
                    Network Policy
                    Summary: Networking Considerations
            The Container Networking Interface (CNI)
                    CNI Installation
            CNI Plugins
                    Calico
                    Cilium
                    AWS VPC CNI
                    Multus
                    Additional Plugins
        
6. Service Routing
            Kubernetes Services
                    The Service Abstraction
                    Endpoints
                    Service Implementation Details
                    Service Discovery
                    DNS Service Performance
            Ingress
                    The Case for Ingress
                    The Ingress API
                    Ingress Controllers and How They Work
                    Ingress Traffic Patterns
                    Choosing an Ingress Controller
                    Ingress Controller Deployment Considerations
                    DNS and Its Role in Ingress
                    Handling TLS certificates
            Service Mesh
                    When (Not) to Use a Service Mesh
                    The Service Mesh Interface (SMI)
                    The Data Plane Proxy
                    Service Mesh on Kubernetes
                    Data Plane Architecture
                    Adopting a Service Mesh
 
7. Secret Management
            Defense in Depth
                    Disk Encryption
                    Transport Security
                    Application Encryption
            The Kubernetes Secret API
                    Secret Consumption Models
                    Secret Data in etcd
                    Static Key Encryption
                    Envelope Encryption
            External Providers
                    Vault
                    Cyberark
                    Injection Integration
                    CSI Integration
            Secrets in the Declarative World
                    Sealing Secrets
                    Sealed Secrets Controller
                    Key Renewal
                    Multi-Cluster Models
            Best Practices for Secrets
                    Always Audit Secret Interaction
                    Don’t leak secrets
                    Prefer volumes over environment variables
                    Make secret store providers unknown to your application

8. Admission Control
            The Kubernetes Admission Chain
            In-Tree Admission Controllers
            Webhooks
                    Configuring Webhook Admission Controllers
                    Webhook Design Considerations
            Writing a Mutating Webhook
                    Plain HTTPS Handler
                    Controller Runtime
            Centralized Policy Systems
 
9. Observability
            Logging Mechanics
                    Container Log Processing
                    Kubernetes Audit Logs
                    Kubernetes Events
                    Alerting on Logs
                    Security Implications
            Metrics
                    Prometheus
                    Long Term Storage
                    Pushing Metrics
                    Custom Metrics
                    Organization & Federation
                    Alerts
                    Showback & Chargeback
                    Metrics Components
            Distributed Tracing
                    OpenTracing & OpenTelemetry
                    Tracing Components
                    Application Instrumentation
                    Service Meshes
 
10. Identity
            User Identity
                    Authentication Methods
                    Implementing Least Privilege Permissions for Users
            Application / Workload Identity
                    Authentication Methods
                    Platform Mediated Node Identity
            
11. Building Platform Services
            Points of Extension
                    Plugin Extensions
                    Webhook Extensions
                    Operator Extensions
            The Operator Pattern
                    Kubernetes Controllers
                    Custom Resources
            Operator Use Cases
                    Platform Utilities
                    General-Purpose Workload Operators
                    App Specific Operators
            Developing Operators
                    Operator Development Tooling
                    Data Model Design
                    Logic Implementation
            Extending the Scheduler
                    Predicates and Priorities
                    Scheduling Policies
                    Scheduling Profiles
                    Multiple Schedulers
                    Custom Scheduler
 
12. Multi-tenancy
            Degrees of Isolation
                    Single-tenant clusters
                    Multi-tenant clusters
            The Namespace Boundary
            Multi-tenancy in Kubernetes
                    Role-based Access Control (RBAC)
                    Resource Quotas
                    Admission Webhooks
                    Resource Requests and Limits
                    Network Policies
                    Pod Security Policies
                    Multi-tenant Platform Services
 
13. Autoscaling
            Types of Scaling
            Application Architecture
            Workload Autoscaling
                    Horizontal Pod Autoscaler
                    Vertical Pod Autoscaler
                    Autoscaling with Custom Metrics
                    Cluster Proportional Autoscaler
                    Custom Autoscaling
            Cluster Autoscaling
                     Cluster Overprovisioning
 
14. Application Considerations
            Deploying Applications to Kubernetes
                    Templating Deployment Manifests
                    Packaging Applications for Kubernetes
            Ingesting Configuration and Secrets
                    Kubernetes ConfigMaps and Secrets
                    Obtaining Configuration From External Systems
            Handling Re-scheduling Events
                    Pre-stop Container Lifecycle Hook
                    Graceful Container Shutdown
                    Satisfying Availability Requirements
            State Probes
                    Liveness Probes
                    Readiness Probes
                    Startup Probes
                    Implementing Probes
            Pod Resource Requests and Limits
                    Resource Requests
                    Resource Limits
            Application Logs
                    What to Log
                    Unstructured versus Structured Logs
                    Contextual Information in Logs
            Exposing Metrics
                    Instrumenting Applications
                    USE Method
                    RED Method
                    The Four Golden Signals
                    App-specific Metrics
            Instrumenting Services for Distributed Tracing
                    Initializing the Tracer
                    Creating Spans
                    Propagate Context
 
15. Software Supply Chain
            Building Container Images
                    The Golden Base Images Anti-Pattern
                    Choosing a Base Image
                    Runtime User
                    Pinning Package Versions
                    Build vs. Runtime Image
                    Cloud Native Buildpacks
            Image Registries
                    Vulnerability Scanning
                    Quarantine Workflow
                    Image Signing
            Continuous Delivery
                    Integrating Builds into a Pipeline
                    Push-based Deployments
                    Rollout Patterns
                    GitOps
 
16. Platform Abstractions
            Platform Exposure
            Self-Service Onboarding
            The Spectrum of Abstraction
                    Command Line Tooling
                    Abstraction Through Templating
                    Abstracting Kubernetes Primitives
                    Making Kubernetes Invisible