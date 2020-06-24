


you’re running services across different environments— 
                public to public, 
                private to public, 
                virtual machine to container—
                your cloud native software is beginning to encounter reliability issues.

How do you stay on top of this ever-increasing complexity? With the Istio service mesh, you’ll be able to manage 
                traffic, 
                control access, 
                monitor, 
                report, 
                get telemetry data, 
                manage quota, 
                trace, and 
                more with resilience across your microservice.

why your services need a service mesh and demonstrate step-by-step how Istio fits into the life cycle of a distributed application. You’ll learn about the tools and APIs for enabling and managing many of the features found in Istio.

        Explore the observability challenges Istio addresses
        Use request routing, traffic shifting, fault injection, and other features essential to running a solid service mesh
        Generate and collect telemetry information
        Try different deployment patterns, including A/B, blue/green, and canary
        Get examples of how to develop and deploy real-world applications with Istio support


```
1. Introducing the Service Mesh
            What Is a Service Mesh?
            Fundamentals
            Sailing into a Service Mesh
            Client Libraries: The First Service Meshes?
            Why Do You Need One?
            Don’t We Already Have This in Our Container Platforms?
            Landscape and Ecosystem
            Landscape
            Ecosystem
            The Critical, Fallible Network
            The Value of a Service Mesh
            The Istio Service Mesh
            The Origin of Istio
            The Current State of Istio
            Cadence
            Releases
            Feature Status
            Future
            What Istio Isn’t
            It’s Not Just About Microservices
            Terminology

2. Cloud Native Approach to Uniform Observability
            What Does It Mean to Be Cloud Native?
            The Path to Cloud Native
            Packaging and Deployment
            Application Architecture
            Development and Operations Processes
            Cloud Native Infrastructure
            What Is Observability?
            Pillars of Telemetry
            Logs
            Metrics
            Traces
            Combining Telemetry Pillars
            Why Is Observability Key in Distributed Systems?
            Uniform Observability with a Service Mesh
            Client Libraries
            Interfacing with Monitoring Systems
            
3. Istio at a Glance
            Service Mesh Architecture
            Planes
            Istio Control-Plane Components
            Service Proxy
            Istio Data-Plane Components
            Gateways
            Extensibility
            Customizable Sidecars
            Extensible Adapters
            Scale and Performance
            Deployment Models

4. Deploying Istio
            Preparing Your Environment for Istio
            Docker Desktop as the Installation Environment
            Configuring Docker Desktop
            Installing Istio
            Istio Installation Options
            Registering Istio’s Custom Resources
            Installing Istio Control-Plane Components
            Deploying the Bookinfo Sample Application
            Deploying the Sample App with Automatic Sidecar Injection
            Networking with the Sample App
            Uninstalling Istio
            Helm-Based Installations
            Install Helm
            Install with Helm Template
            Confirming a Helm-Based Installation
            Uninstalling a Helm-Based Installation
            Other Environments

5. Service Proxy
            What Is a Service Proxy?
            An iptables Primer
            Envoy Proxy Overview
            Why Envoy?
            Envoy in Istio
            Sidecar Injection
            Manual Sidecar Injection
            Ad Hoc Sidecarring
            Automatic Sidecar Injection
            Kubernetes Init Containers
            Sidecar Resourcing
            Envoy’s Functionality
            Core Constructs
            Certificates and Protecting Traffic

6. Security and Identity
            Access Control
            Authentication
            Authorization
            Identity
            SPIFFE
            Key Management Architecture
            Citadel
            Node Agents
            Envoy
            Pilot
            mTLS
            Configuring Istio Auth Policies
            Authentication Policy: Configuring mTLS
            Authorization Policy: Configuring Who Can Talk to Whom
7. Pilot
            Configuring Pilot
            Mesh Configuration
            Networking Configuration
            Service Discovery
            Configuration Serving
            Debugging and Troubleshooting Pilot
            istioctl
            Troubleshooting Pilot
            Tracing Configuration
            Listeners
            Routes
            Clusters

8. Traffic Management
            Understanding How Traffic Flows in Istio
            Understanding Istio’s Networking APIs
            ServiceEntry
            DestinationRule
            VirtualService
            Gateway
            Traffic Steering and Routing
            Resiliency
            Load-Balancing Strategy
            Outlier Detection
            Retries
            Timeouts
            Fault Injection
            Ingress and Egress
            Ingress
            Egress

9. Mixer and Policies in the Mesh
            Architecture
            Enforcing Policy
            Understanding How Mixer Policies Work
            Reporting Telemetry
            Attributes
            Sending Reports
            Checking Caches
            Adapters
            In-Process Adapters
            Out-of-Process Adapters
            Creating a Mixer Policy and Using Adapters
            Mixer Configuration
            Open Policy Agent Adapter
            Prometheus Adapter
            10. Telemetry
            Adapter Models
            Reporting Telemetry
            Metrics
            Configuring Mixer to Collect Metrics
            Setting Up Metrics Collection and Querying for Metrics
            Traces
            Disabling Tracing
            Logs
            Metrics
            Visualization

11. Debugging Istio
            Introspecting Istio Components
            Troubleshooting with a Management Plane
            Parlaying with kubectl
            Workload Preparedness
            Application Configuration
            Network Traffic and Ports
            Services and Deployments
            Pods
            Istio Installation, Upgrade, and Uninstall
            Installation
            Upgrade
            Uninstallation
            Troubleshooting Mixer
            Troubleshooting Pilot
            Debugging Galley
            Debugging Envoy
            Envoy’s Administrative Console
            503 or 404 Requests
            Sidecar Injection
            Version Compatibility

12. Real-World Considerations for Application Deployment
            Control-Plane Considerations
            Galley
            Pilot
            Mixer
            Citadel
            Case Study: Canary Deployment
            Cross-Cluster Deployments

13. Advanced Scenarios
            Types of Advanced Topologies
            Single-Cluster Meshes
            Multiple-Cluster Meshes
            Use Cases
            Choosing a Topology
            Cross-Cluster or Multicluster?
            Configuring Cross-Cluster
            Configure DNS and Deploy Bookinfo

```