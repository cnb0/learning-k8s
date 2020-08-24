```
Kubernetes is the operating system of the cloud native world, 
providing a reliable and scalable platform for running containerized workloads. 

- battle-tested solutions to everyday problems. 
- build, step by step, an example cloud native application and its supporting infrastructure, 
- along with a development environment and continuous deployment pipeline application 
 
- Use Kubernetes to manage resource usage and the container lifecycle
- Optimize clusters for cost, performance, resilience, capacity, and scalability
- Learn the best tools for developing,testing, and deploying your applications
- Apply the latest industry practices for security, observability, and monitoring
- Adopt DevOps principles to help make your development teams lean, fast, and effective
 

1. Revolution in the Cloud
				The Creation of the Cloud
				Buying Time
				Infrastructure as a Service
				The Dawn of DevOps
				Nobody Understands DevOps
				The Business Advantage
				Infrastructure as Code
				Learning Together
				The Coming of Containers
				The State of the Art
				Thinking Inside the Box
				Putting Software in Containers
				Plug and Play Applications
				Conducting the Container Orchestra
				Kubernetes
				From Borg to Kubernetes
				What Makes Kubernetes So Valuable?
				Will Kubernetes Disappear?
				Kubernetes Doesn’t Do It All
				Cloud Native
				The Future of Operations
				Distributed DevOps
				Some Things Will Remain Centralized
				Developer Productivity Engineering
				You Are the Future
				 
2. First Steps with Kubernetes
				Running Your First Container
				Installing Docker Desktop
				What Is Docker?
				Running a Container Image
				The Demo Application
				Looking at the Source Code
				Introducing Go
				How the Demo App Works
				Building a Container
				Understanding Dockerfiles
				Minimal Container Images
				Running docker image build
				Naming Your Images
				Port Forwarding
				Container Registries
				Authenticating to the Registry
				Naming and Pushing Your Image
				Running Your Image
				Hello, Kubernetes
				Running the Demo App
				If the Container Doesn’t Start
				Minikube
				 
3. Getting Kubernetes
				Cluster Architecture
				The Control Plane
				Node Components
				High Availability
				The Costs of Self-Hosting Kubernetes
				It’s More Work Than You Think
				It’s Not Just About the Initial Setup
				Tools Don’t Do All the Work for You
				Kubernetes Is Hard
				Administration Overhead
				Start with Managed Services
				Managed Kubernetes Services
				Google Kubernetes Engine (GKE)
				Cluster Autoscaling
				Amazon Elastic Container Service for Kubernetes (EKS)
				Azure Kubernetes Service (AKS)
				OpenShift
				IBM Cloud Kubernetes Service
				Heptio Kubernetes Subscription (HKS)
				Turnkey Kubernetes Solutions
				Stackpoint
				Containership Kubernetes Engine (CKE)
				Kubernetes Installers
				kops
				Kubespray
				TK8
				Kubernetes The Hard Way
				kubeadm
				Tarmak
				Rancher Kubernetes Engine (RKE)
				Puppet Kubernetes Module
				Kubeformation
				Buy or Build: Our Recommendations
				Run Less Software
				Use Managed Kubernetes if You Can
				But What About Vendor Lock-in?
				Use Standard Kubernetes Self-Hosting Tools if You Must
				When Your Choices Are Limited
				Bare-Metal and On-Prem
				Clusterless Container Services
				Amazon Fargate
				Azure Container Instances (ACI)
				 
4. Working with Kubernetes Objects
				Deployments
				Supervising and Scheduling
				Restarting Containers
				Querying Deployments
				Pods
				ReplicaSets
				Maintaining Desired State
				The Kubernetes Scheduler
				Resource Manifests in YAML Format
				Resources Are Data
				Deployment Manifests
				Using kubectl apply
				Service Resources
				Querying the Cluster with kubectl
				Taking Resources to the Next Level
				Helm: A Kubernetes Package Manager
				Installing Helm
				Installing a Helm Chart
				Charts, Repositories, and Releases
				Listing Helm Releases
				 
5. Managing Resources
				Understanding Resources
				Resource Units
				Resource Requests
				Resource Limits
				Keep Your Containers Small
				Managing the Container Life Cycle
				Liveness Probes
				Probe Delay and Frequency
				Other Types of Probes
				gRPC Probes
				Readiness Probes
				File-Based Readiness Probes
				minReadySeconds
				Pod Disruption Budgets
				Using Namespaces
				Working with Namespaces
				What Namespaces Should I Use?
				Service Addresses
				Resource Quotas
				Default Resource Requests and Limits
				Optimizing Cluster Costs
				Optimizing Deployments
				Optimizing Pods
				Vertical Pod Autoscaler
				Optimizing Nodes
				Optimizing Storage
				Cleaning Up Unused Resources
				Checking Spare Capacity
				Using Reserved Instances
				Using Preemptible (Spot) Instances
				Keeping Your Workloads Balanced
				 
6. Operating Clusters
				Cluster Sizing and Scaling
				Capacity Planning
				Nodes and Instances
				Scaling the Cluster
				Conformance Checking
				CNCF Certification
				Conformance Testing with Sonobuoy
				Validation and Auditing
				K8Guard
				Copper
				kube-bench
				Kubernetes Audit Logging
				Chaos Testing
				Only Production Is Production
				chaoskube
				kube-monkey
				PowerfulSeal
				 
7. Kubernetes Power Tools
				Mastering kubectl
				Shell Aliases
				Using Short Flags
				Abbreviating Resource Types
				Auto-Completing kubectl Commands
				Getting Help
				Getting Help on Kubernetes Resources
				Showing More Detailed Output
				Working with JSON Data and jq
				Watching Objects
				Describing Objects
				Working with Resources
				Imperative kubectl Commands
				When Not to Use Imperative Commands
				Generating Resource Manifests
				Exporting Resources
				Diffing Resources
				Working with Containers
				Viewing a Container’s Logs
				Attaching to a Container
				Watching Kubernetes Resources with kubespy
				Forwarding a Container Port
				Executing Commands on Containers
				Running Containers for Troubleshooting
				Using BusyBox Commands
				Adding BusyBox to Your Containers
				Installing Programs on a Container
				Live Debugging with kubesquash
				Contexts and Namespaces
				kubectx and kubens
				kube-ps1
				Kubernetes Shells and Tools
				kube-shell
				Click
				kubed-sh
				Stern
				Building Your Own Kubernetes Tools
				 
8. Running Containers
				Containers and Pods
				What Is a Container?
				What Belongs in a Container?
				What Belongs in a Pod?
				Container Manifests
				Image Identifiers
				The latest Tag
				Container Digests
				Base Image Tags
				Ports
				Resource Requests and Limits
				Image Pull Policy
				Environment Variables
				Container Security
				Running Containers as a Non-Root User
				Blocking Root Containers
				Setting a Read-Only Filesystem
				Disabling Privilege Escalation
				Capabilities
				Pod Security Contexts
				Pod Security Policies
				Pod Service Accounts
				Volumes
				emptyDir Volumes
				Persistent Volumes
				Restart Policies
				Image Pull Secrets
				 
9. Managing Pods
				Labels
				What Are Labels?
				Selectors
				More Advanced Selectors
				Other Uses for Labels
				Labels and Annotations
				Node Affinities
				Hard Affinities
				Soft Affinities
				Pod Affinities and Anti-Affinities
				Keeping Pods Together
				Keeping Pods Apart
				Soft Anti-Affinities
				When to Use Pod Affinities
				Taints and Tolerations
				Pod Controllers
				DaemonSets
				StatefulSets
				Jobs
				Cronjobs
				Horizontal Pod Autoscalers
				PodPresets
				Operators and Custom Resource Definitions (CRDs)
				Ingress Resources
				Ingress Rules
				Terminating TLS with Ingress
				Ingress Controllers
				Istio
				Envoy
				 
10. Configuration and Secrets
				ConfigMaps
				Creating ConfigMaps
				Setting Environment Variables from ConfigMaps
				Setting the Whole Environment from a ConfigMap
				Using Environment Variables in Command Arguments
				Creating Config Files from ConfigMaps
				Updating Pods on a Config Change
				Kubernetes Secrets
				Using Secrets as Environment Variables
				Writing Secrets to Files
				Reading Secrets
				Access to Secrets
				Encryption at Rest
				Keeping Secrets
				Secrets Management Strategies
				Encrypt Secrets in Version Control
				Store Secrets Remotely
				Use a Dedicated Secrets Management Tool
				Recommendations
				Encrypting Secrets with Sops
				Introducing Sops
				Encrypting a File with Sops
				Using a KMS Backend
				 
11. Security and Backups
				Access Control and Permissions
				Managing Access by Cluster
				Introducing Role-Based Access Control (RBAC)
				Understanding Roles
				Binding Roles to Users
				What Roles Do I Need?
				Guard Access to Cluster-Admin
				Applications and Deployment
				RBAC Troubleshooting
				Security Scanning
				Clair
				Aqua
				Anchore Engine
				Backups
				Do I Need to Back Up Kubernetes?
				Backing Up etcd
				Backing Up Resource State
				Backing Up Cluster State
				Large and Small Disasters
				Velero
				Monitoring Cluster Status
				kubectl
				CPU and Memory Utilization
				Cloud Provider Console
				Kubernetes Dashboard
				Weave Scope
				kube-ops-view
				node-problem-detector
				 
12. Deploying Kubernetes Applications
				Building Manifests with Helm
				What’s Inside a Helm Chart?
				Helm Templates
				Interpolating Variables
				Quoting Values in Templates
				Specifying Dependencies
				Deploying Helm Charts
				Setting Variables
				Specifying Values in a Helm Release
				Updating an App with Helm
				Rolling Back to Previous Versions
				Creating a Helm Chart Repo
				Managing Helm Chart Secrets with Sops
				Managing Multiple Charts with Helmfile
				What’s in a Helmfile?
				Chart Metadata
				Applying the Helmfile
				Advanced Manifest Management Tools
				ksonnet
				Kapitan
				kustomize
				kompose
				Ansible
				kubeval
				 
13. Development Workflow
				Development Tools
				Skaffold
				Draft
				Telepresence
				Knative
				Deployment Strategies
				Rolling Updates
				Recreate
				maxSurge and maxUnavailable
				Blue/Green Deployments
				Rainbow Deployments
				Canary Deployments
				Handling Migrations with Helm
				Helm Hooks
				Handling Failed Hooks
				Other Hooks
				Chaining Hooks
				 
14. Continuous Deployment in Kubernetes
				What Is Continuous Deployment?
				Which CD Tool Should I Use?
				Jenkins
				Drone
				Google Cloud Build
				Concourse
				Spinnaker
				GitLab CI
				Codefresh
				Azure Pipelines
				CD Components
				Docker Hub
				Gitkube
				Flux
				Keel
				A CD Pipeline with Cloud Build
				Setting Up Google Cloud and GKE
				Forking the Demo Repository
				Introducing Cloud Build
				Building the Test Container
				Running the Tests
				Building the Application Container
				Validating the Kubernetes Manifests
				Publishing the Image
				Git SHA Tags
				Creating the First Build Trigger
				Testing the Trigger
				Deploying from a CD Pipeline
				Creating a Deploy Trigger
				Optimizing Your Build Pipeline
				Adapting the Example Pipeline
				 
15. Observability and Monitoring
				What Is Observability?
				What Is Monitoring?
				Black-Box Monitoring
				What Does “Up” Mean?
				Logging
				Introducing Metrics
				Tracing
				Observability
				The Observability Pipeline
				Monitoring in Kubernetes
				External Black-Box Checks
				Internal Health Checks
				 
16. Metrics in Kubernetes
				What Are Metrics, Really?
				Time Series Data
				Counters and Gauges
				What Can Metrics Tell Us?
				Choosing Good Metrics
				Services: The RED Pattern
				Resources: The USE Pattern
				Business Metrics
				Kubernetes Metrics
				Analyzing Metrics
				What’s Wrong with a Simple Average?
				Means, Medians, and Outliers
				Discovering Percentiles
				Applying Percentiles to Metrics Data
				We Usually Want to Know the Worst
				Beyond Percentiles
				Graphing Metrics with Dashboards
				Use a Standard Layout for All Services
				Build an Information Radiator with Master Dashboards
				Dashboard Things That Break
				Alerting on Metrics
				What’s Wrong with Alerts?
				On-call Should Not Be Hell
				Urgent, Important, and Actionable Alerts
				Track Your Alerts, Out-of-Hours Pages, and Wake-ups
				Metrics Tools and Services
				Prometheus
				Google Stackdriver
				AWS Cloudwatch
				Azure Monitor
				Datadog
				New Relic


```
