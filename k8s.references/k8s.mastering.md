
# Mastering Kubernetes
```

1. Understanding Kubernetes Architecture
        What is Kubernetes?
        What Kubernetes is not
        Understanding container orchestration
                Physical machines, virtual machines, and containers
                The benefits of containers
                Containers in the cloud
                Cattle versus pets
        Kubernetes concepts
                Clusters
                Nodes
                The master
                Pods
                Labels
                Annotations
                Label selectors
                Services
                Volume
                Replication controllers and replica sets
                StatefulSet
                Secrets
                Names
                Namespaces
         Diving into Kubernetes architecture in depth
                Distributed system design patterns
                        The sidecar pattern
                        The ambassador pattern
                        The adapter pattern
                        Multi-node patterns
                The Kubernetes APIs
                        Resource categories
                Kubernetes components
                        Master components
                        Node components
        Kubernetes runtimes
                The container runtime interface (CRI)
                Docker
                rkt
                    App container
                CRI-O
                Hyper containers
                    Frakti
                    Stackube
                Continuous integration and deployment
                    What is a CI/CD pipeline?
                    Designing a CI/CD pipeline for Kubernetes
- Creating Kubernetes Clusters

         Creating a single-node cluster with Minikube
                Meet kubectl
                Quick introduction to Minikube
                Getting ready
                On Windows
                On macOS
                Creating the cluster
                Troubleshooting
                Checking out the cluster
                Doing work
                Examining the cluster with the dashboard
        Creating a multi-node cluster with KinD
                Quick introduction to KinD
                Installing KinD
                Creating the cluster with KinD
                Doing work with KinD
                Accessing Kubernetes services locally though a proxy
        Creating a multi-node cluster with k3d
                Quick introduction to k3s and k3d
                Installing k3d
                Creating the cluster with k3d
        Comparing Minikube, KinD, and k3d
        Creating clusters in the cloud (GCP, AWS, Azure)
                The cloud-provider interface
                GCP
                Azure
                AWS
                    - Kubernetes on EC2
                    - AWS EKS
                    - Fargate
                
        Other cloud providers
                Once upon a time in China
                IBM Kubernetes Service
                Oracle Container Service
        Creating a bare-metal cluster from scratch
                Use cases for bare metal
                When should you consider creating a bare-metal cluster?
                Understanding the process
                Using virtual private cloud infrastructure
                Building your own cluster with Kubespray
                Building your cluster with KRIB
                Building your cluster with RKE
                Bootkube


- High Availability and Reliability
             - High availability concepts
                        Redundancy
                        Hot swapping
                        Leader election
                        Smart load balancing
                        Idempotency
                        Self-healing

             - High availability best practices
                        Creating highly available clusters
                        Making your nodes reliable
                        Protecting your cluster state
                                Clustering etcd
                                Verifying the etcd cluster
                        Protecting your data
                        Running redundant API servers
                        Running leader election with Kubernetes
                        Making your staging environment highly available
                        Testing high availability
              - High availability, scalability, and capacity planning
                        Installing the cluster autoscaler
                        Considering the vertical pod autoscaler
              - Live cluster updates
                        Rolling updates
                                Complex deployments
                        Blue-green deployments
                        Canary deployments
                        Managing data-contract changes
                        Migrating data
                        Deprecating APIs

              - Large cluster performance, cost, and design trade-offs
                        Availability requirements
                        Best effort
                        Maintenance windows
                        Quick recovery
                        Zero downtime
                        Site reliability engineering
                        Performance and data consistency

- Securing Kubernetes
               - Understanding Kubernetes security challenges
                        Node challenges
                        Network challenges
                        Image challenges
                        Configuration and deployment challenges
                        Pod and container challenges
                        Organizational, cultural, and process challenges
                - Hardening Kubernetes
                        Understanding service accounts in Kubernetes
                                 How does Kubernetes manage service accounts?
                        Accessing the API server
                                 Authenticating users
                                 Authorizing requests
                                 Using admission control plugins
                        Securing pods
                                 Using a private image repository
                                 ImagePullSecrets
                                 Specifying a security context
                                 Protecting your cluster with AppArmor
                                 Pod security policies
                                 Authorizing pod security policies via RBAC
                        Managing network policies
                                Choosing a supported networking solution
                                Defining a network policy
                                Limiting egress to external networks
                                Cross-namespace policies
                        Using secrets
                                Storing secrets in Kubernetes
                                Configuring encryption at rest
                                Creating secrets
                                Decoding secrets
                                Using secrets in a container
                        Running a multi-user cluster
                                The case for a multi-user cluster
                                Using namespaces for safe multi-tenancy
                                Avoiding namespace pitfalls
- Using Kubernetes Resources in Practice
                        Designing the Hue platform
                                Defining the scope of Hue
                                        Smart reminders and notifications
                                        Security, identity, and privacy
                                        Hue components
                                        Hue microservices
                                 Planning workflows
                                        Automatic workflows
                                        Human workflows
                                        Budget-aware workflows  
                        Using Kubernetes to build the Hue platform
                                Using kubectl effectively
                                Understanding kubectl resource configuration files
                                        ApiVersion
                                        Kind
                                        Metadata
                                        Spec
                        Deploying long-running microservices in pods
                                Creating pods
                                Decorating pods with labels
                                Deploying long-running processes with deployments
                                Updating a deployment
                        Separating internal and external services
                                Deploying an internal service
                                Creating the Hue-reminders service
                                Exposing a service externally
                                        Ingress
                        Advanced scheduling
                                Node selector
                                Taints and tolerations
                                Node affinity and anti-affinity
                                Pod affinity and anti-affinity
                        Using namespaces to limit access
                        Using kustomization for hierarchical cluster structures
                                Understanding the basics of kustomize
                                Configuring the directory structure
                                Applying kustomizations
                                        Patching
                                        Kustomizing the entire staging namespace
                        Launching jobs
                                Running jobs in parallel
                                Cleaning up completed jobs
                                Scheduling cron jobs
                        Mixing non-cluster components
                                Outside-the-cluster-network components
                                Inside-the-cluster-network components
                                Managing the Hue platform with Kubernetes
                                        Using liveness probes to ensure your containers are alive
                                Using readiness probes to manage dependencies
                                Employing init containers for orderly pod bring-up
                                Pod readiness and readiness gates
                                Sharing with DaemonSet pods
                        Evolving the Hue platform with Kubernetes
                                Utilizing Hue in an enterprise
                                Advancing science with Hue
                                Educating the kids of the future with Hue
 
- Managing Storage
                Persistent volumes walkthrough
                        Volumes
                                Using emptyDir for intra-pod communication
                                Using HostPath for intra-node communication
                                Using local volumes for durable node storage
                                Provisioning persistent volumes
                Provisioning persistent volumes externally
                Creating persistent volumes
                                Capacity
                                Volume mode
                                Access modes
                                Reclaim policy
                                Storage class
                                Volume type
                                Mount options
                Making persistent volume claims
                Mounting claims as volumes
                Raw block volumes
                Storage classes
                               Default storage class
                Demonstrating persistent volume storage end to end
                Public cloud storage volume types – GCE, AWS, and Azure
                                Amazon EBS
                                Amazon EFS
                                GCE persistent disk
                                Azure data disk
                                Azure Files
                GlusterFS and Ceph volumes in Kubernetes
                        Using GlusterFS
                                Creating endpoints
                                Adding a GlusterFS Kubernetes service
                                Creating pods
                        Using Ceph
                                Connecting to Ceph using RBD
                                Connecting to Ceph using CephFS
                Flocker as a clustered container data volume manager
                Integrating enterprise storage into Kubernetes
                        Rook – the new kid on the block
                Projecting volumes
                Using out-of-tree volume plugins with FlexVolume
                The Container Storage Interface
                        Volume snapshotting and cloning
                                Volume snapshots
                                Volume cloning

- Running Stateful Applications with Kubernetes
                Stateful versus stateless applications in Kubernetes
                        Understanding the nature of distributed data-intensive apps
                                Why manage state in Kubernetes?
                                Why manage state outside of Kubernetes?
                        Shared environment variables versus DNS records for discovery
                                Accessing external data stores via DNS
                                Accessing external data stores via environment variables
                                Consuming a ConfigMap as an environment variable
                                Using a redundant in-memory state
                                Using DaemonSet for redundant persistent storage
                                Applying persistent volume claims
                                Utilizing StatefulSets
                        Running a Cassandra cluster in Kubernetes
                                Quick introduction to Cassandra
                                The Cassandra Docker image
                                Hooking up Kubernetes and Cassandra
                                Creating a Cassandra headless service
                                Using StatefulSets to create the Cassandra cluster

- Deploying and Updating Applications
                        Horizontal pod autoscaling
                                Declaring an HPA
                                Custom metrics
                                Autoscaling with Kubectl
                        Performing rolling updates with autoscaling
                        Handling scarce resources with limits and quotas
                                Enabling resource quotas
                                Resource quota types
                                        Compute resource quota
                                        Storage resource quota
                                        Object count quota
                        Quota scopes
                        Resource quotas and priority classes
                        Requests and limits
                        Working with quotas
                                Using namespace-specific context
                                Creating quotas
                                Using limit ranges for default compute quotas
                        Choosing and managing the cluster capacity
                                Choosing your node types
                                Choosing your storage solutions
                                Trading off cost and response time
                                Using multiple node configurations effectively
                                Benefiting from elastic cloud resources
                                        Autoscaling instances
                                        Mind your cloud quotas
                                        Manage regions carefully
                                Considering container-native solutions
                        Pushing the envelope with Kubernetes
                                Improving the performance and scalability of Kubernetes
                                        Caching reads in the API server
                                        The pod lifecycle event generator
                                        Serializing API objects with protocol buffers
                                        etcd3
                                        Other optimizations
                        Measuring the performance and scalability of Kubernetes
                                        The Kubernetes SLOs
                                        Measuring API responsiveness
                                        Measuring end-to-end pod startup time
                        Testing Kubernetes at scale
                                        Introducing the Kubemark tool
                                        Setting up a Kubemark cluster
                                        Comparing a Kubemark cluster to a real-world cluster

Packaging Applications
                        Understanding Helm
                                The motivation for Helm
                                The Helm 2 architecture
                                Helm 2 components
                                        The Tiller server
                                        The Helm client
                                Helm 3
                        Using Helm
                                Installing Helm
                                        Installing the Helm client
                                        Installing the Tiller server for Helm 2
                                Finding charts
                                        Adding repositories
                        Installing packages
                                Checking the installation status
                                Customizing a chart
                                Additional installation options
                                Upgrading and rolling back a release
                                Deleting a release
                        Working with repositories
                        Managing charts with Helm
                                Taking advantage of starter packs
                        Creating your own charts
                                The Chart.yaml file
                                        Versioning charts
                                        The appVersion field
                                        Deprecating charts
                        Chart metadata files
                        Managing chart dependencies
                                Managing dependencies with requirements.yaml
                                Utilizing special fields in requirements.yaml
                        Using templates and values
                                Writing template files
                                Testing and troubleshooting your charts
                                Embedding built-in objects
                                Feeding values from a file
                                Scope, dependencies, and values

- Exploring Advanced Networking
                        Understanding the Kubernetes networking model
                                Intra-pod communication (container to container)
                                Inter-pod communication (pod to pod)
                                Pod-to-service communication
                                External access
                                Kubernetes networking versus Docker networking
                                Lookup and discovery
                                        Self-registration
                                        Services and endpoints
                                        Loosely coupled connectivity with queues
                                        Loosely coupled connectivity with data stores
                                        Kubernetes ingress
                                Kubernetes network plugins
                                        Basic Linux networking
                                        IP addresses and ports
                                        Network namespaces
                                        Subnets, netmasks, and CIDRs
                                        Virtual Ethernet devices
                                        Bridges
                                        Routing
                                        Maximum transmission unit
                                        Pod networking
                                        Kubenet
                                        Container networking interface
                                Kubernetes networking solutions
                                        Bridging on bare metal clusters
                                        Contiv
                                        Open vSwitch
                                        Nuage networks VCS
                                        Flannel
                                        Calico
                                        Romana
                                        Weave Net
                        Using network policies effectively
                                        Understanding the Kubernetes network policy design
                                        Network policies and CNI plugins
                                        Configuring network policies
                                        Implementing network policies
                        Load balancing options
                                External load balancer
                                        Configuring an external load balancer
                                        Finding the load balancer IP addresses
                                        Preserving client IP addresses
                                        Understanding even external load balancing
                        Service load balancing
                        Ingress
                                HAProxy
                                MetalLB
                                Keepalived VIP
                                Traefic
                        Writing your own CNI plugin
                                First look at the loopback plugin
                                        Building on the CNI plugin skeleton
                                        Reviewing the bridge plugin
 
- Running Kubernetes on Multiple Clouds and Cluster Federation
                        The history of cluster federation on Kubernetes
                        Understanding cluster federation
                                Important use cases for cluster federation
                                        Capacity overflow
                                        Sensitive workloads
                                        Avoiding vendor lock-in
                                        Geo-distributing high availability
                        Learning the basics of Kubernetes federation
                                Defining basic concepts
                                Federation building blocks
                                Federation features
                        The KubeFed control plane
                                The federation API server
                                The federation controller manager
                        The hard parts
                                Federated unit of work
                                Location affinity
                                Cross-cluster scheduling
                                Federated data access
                                Federated auto-scaling
                        Managing a Kubernetes Cluster Federation
                                Installing kubefedctl
                                Creating clusters
                                Configuring the Host Cluster
                                Registering clusters with the federation
                                Working with federated API types
                                Federating resources
                                        Federating an entire namespace
                                        Checking the status of federated resources
                                Using overrides
                                Using placement to control federation
                                Debugging propagation failures
                                Employing higher-order behavior
                                        Utilizing multi-cluster Ingress DNS
                                        Utilizing multi-cluster Service DNS
                                        Utilizing multi-cluster scheduling
                        Introducing the Gardener project
                                Understanding the terminology of Gardener
                                Understanding the conceptual model of Gardener
                                Diving into the Gardener architecture
                                Managing cluster state
                                        Managing the control plane
                                        Preparing the infrastructure
                                        Using the Machine controller manager
                                        Networking across clusters
                                        Monitoring clusters
                                        The gardenctl CLI
                                Extending Gardener
                                Gardener ring

- Serverless Computing on Kubernetes
                        Understanding serverless computing
                                Running long-running services on "serverless" infrastructure
                                Running FaaS on "serverless" infrastructure
                        Serverless Kubernetes in the cloud
                                Don't forget the cluster autoscaler
                                Azure AKS and Azure Container Instances
                                AWS EKS and Fargate
                                Google Cloud Run
                        Knative
                                Knative Serving
                                        The Knative Service object
                                        The Knative Route object
                                        The Knative Configuration object
                                        The Knative Revision object
                                Knative Eventing
                                        Getting familiar with Knative Eventing terminology
                                        The architecture of Knative Eventing
                                Taking Knative for a ride
                                        Installing Knative
                                        Deploying a Knative service
                                        Invoking a Knative service
                                        Checking the scale-to-zero option in Knative
                        Kubernetes FaaS frameworks
                                Fission
                                        Fission Workflows
                                        Experimenting with Fission
                                Kubeless
                                        Kubeless architecture
                                        Playing with Kubeless
                                        Using the Kubeless UI
                                        Kubeless with the serverless framework
                                Knative and riff
                                        Understanding riff runtimes
                                        Installing riff with Helm 2

- Monitoring Kubernetes Clusters
                        Understanding observability
                                Logging
                                        Log format
                                        Log storage
                                        Log aggregation
                                Metrics
                                Distributed tracing
                                Application error reporting
                                Dashboards and visualization
                                Alerting
                        Logging with Kubernetes
                                Container logs
                                Kubernetes component logs
                                Centralized logging
                                        Choosing a log collection strategy
                                        Cluster-level central logging
                                        Remote central logging
                                        Dealing with sensitive log information
                                Using Fluentd for log collection
                        Collecting metrics with Kubernetes
                                Monitoring with the metrics server
                                Exploring your cluster with the Kubernetes dashboard
                                The rise of Prometheus
                                        Installing Prometheus
                                        Interacting with Prometheus
                                        Incorporating kube-state-metrics
                                        Utilizing the node exporter
                                        Incorporating custom metrics
                                        Alerting with Alertmanager
                                        Visualizing your metrics with Grafana
                                        Considering Loki
                        Distributed tracing with Jaeger
                                What is OpenTracing?
                                        OpenTracing concepts
                                Introducing Jaeger
                                        Jaeger architecture
                                Installing Jaeger
                        Troubleshooting problems
                                Taking advantage of staging environments
                                Detecting problems at the node level
                                        Problem daemons
                                Dashboards versus alerts
                                Logs versus metrics versus error reports
                                Detecting performance and root cause with distributed tracing
                        
                        Utilizing Service Meshes
                                What is a service mesh?
                                        Control plane and data plane
                                Choosing a service mesh
                                        Envoy
                                        Linkerd 2
                                        Kuma
                                        AWS App Mesh
                                        Maesh
                                        Istio
                                Incorporating Istio into your Kubernetes cluster
                                        Understanding the Istio architecture
                                                Envoy
                                                Pilot
                                                Mixer
                                                Citadel
                                                Galley
                                Preparing a minikube cluster for Istio
                                Installing Istio
                                Installing Bookinfo
                                Traffic management
                                Security
                                        Istio identity
                                        Istio PKI
                                        Istio authentication
                                        Istio authorization
                                Policies
                                Monitoring and observability
                                        Logs
                                        Metrics
                                        Distributed tracing
                                        Visualizing your service mesh with Kiali

- Extending Kubernetes
                        Working with the Kubernetes API
                                Understanding OpenAPI
                                Setting up a proxy
                                Exploring the Kubernetes API directly
                                        Using Postman to explore the Kubernetes API
                                        Filtering the output with HTTPie and jq
                        Creating a pod via the Kubernetes API
                        Accessing the Kubernetes API via the Python client
                                        Dissecting the CoreV1API group
                                        Listing objects
                                        Creating objects
                                        Watching objects
                                        Invoking Kubectl programmatically
                                        Using Python subprocesses to run Kubectl
                        Extending the Kubernetes API
                                Understanding Kubernetes extension points and patterns
                                        Extending Kubernetes with plugins
                                        Extending Kubernetes with the cloud controller manager
                                        Extending Kubernetes with webhooks
                                        Extending Kubernetes with controllers and operators
                                        Extending Kubernetes scheduling
                                        Extending Kubernetes with custom container runtimes
                        Introducing custom resources
                        Developing custom resource definitions
                        Integrating custom resources
                                Dealing with unknown fields
                                Finalizing custom resources
                                Adding custom printer columns
                        Understanding API server aggregation
                        Utilizing the service catalog
                        Writing Kubernetes plugins
                                Writing a custom scheduler
                                        Understanding the design of the Kubernetes scheduler
                                        Scheduling pods manually
                                        Preparing our own scheduler
                                        Assigning pods to the custom scheduler
                                        Verifying that the pods were scheduled using the correct scheduler
                        Writing Kubectl plugins
                                Understanding Kubectl plugins
                                Managing Kubectl plugins with Krew
                                Creating your own Kubectl plugin
                                Kubectl plugin gotchas
                                Don't forget your shebangs!
                                Naming
                                Overriding existing Kubectl commands
                                Flat namespace for Krew plugins
                        Employing access control webhooks
                                Using an authentication webhook
                                Using an authorization webhook
                                Using an admission control webhook
                                        Configuring a webhook admission controller on the fly
                                Providing custom metrics for horizontal pod autoscaling
                                Extending Kubernetes with custom storage

- The Future of Kubernetes
                       - The Kubernetes momentum
                                The importance of the CNCF
                                        Project curation
                                        Certification
                                        Training
                                        Community and education
                        Tooling
                        The rise of managed Kubernetes platforms
                                Public cloud Kubernetes platforms
                                Bare-metal, private clouds, and Kubernetes on the edge
                                Kubernetes Platform as a Service (PaaS)
                        Upcoming trends
                                Security
                                Networking
                                Custom hardware and devices
                                Service mesh
                                Serverless computing
                                Kubernetes on the Edge
                                Native CI/CD
                                Operators


```