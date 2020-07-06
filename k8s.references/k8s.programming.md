

## Programming Kubernetes

To develop native applications in Kubernetes,Developers and AppOps administrators 
will learn how to build Kubernetes-native applications that interact directly with the API server to query or update the state of resources. 
explain the characteristics of these apps and show you how to program Kubernetes to build them.

You’ll explore the basic building blocks of Kubernetes, including the client-go API library and custom resources. 
All you need to get started is a rudimentary understanding of development and system administration tools and practices, 
such as package management, the Go programming language, and Git.

- Walk through Kubernetes API basics and dive into the server’s inner structure
- Explore Kubernetes’s programming interface in Go, including Kubernetes API objects
- Learn about custom resources—the central extension tools used in the Kubernetes ecosystem
- Use tags to control Kubernetes code generators for custom resources
- Write custom controllers and operators and make them production ready
- Extend the Kubernetes API surface by implementing a custom API server


```
1. Introduction
                What Does Programming Kubernetes Mean?
                A Motivational Example
                Extension Patterns
                Controllers and Operators
                The Control Loop
                Events
                Edge- Versus Level-Driven Triggers
                Changing Cluster Objects or the External World
                Optimistic Concurrency
                Operators

2. Kubernetes API Basics
                The API Server
                The HTTP Interface of the API Server
                API Terminology
                Kubernetes API Versioning
                Declarative State Management
                Using the API from the Command Line
                How the API Server Processes Requests

3. Basics of client-go
                The Repositories
                The Client Library
                Kubernetes API Types
                API Machinery
                Creating and Using a Client
                Versioning and Compatibility
                API Versions and Compatibility Guarantees
                Kubernetes Objects in Go
                TypeMeta
                ObjectMeta
                spec and status
                Client Sets
                Status Subresources: UpdateStatus
                Listings and Deletions
                Watches
                Client Expansion
                Client Options
                Informers and Caching
                Work Queue
                API Machinery in Depth
                Kinds
                Resources
                REST Mapping
                Scheme
                Vendoring
                glide
                dep
                Go Modules

4. Using Custom Resources
                Discovery Information
                Type Definitions
                Advanced Features of Custom Resources
                Validating Custom Resources
                Short Names and Categories
                Printer Columns
                Subresources
                A Developer’s View on Custom Resources
                Dynamic Client
                Typed Clients
                controller-runtime Client of Operator SDK and Kubebuilder

5. Automating Code Generation
                Why Code Generation
                Calling the Generators
                Controlling the Generators with Tags
                Global Tags
                Local Tags
                deepcopy-gen Tags
                runtime.Object and DeepCopyObject
                client-gen Tags
                informer-gen and lister-gen

6. Solutions for Writing Operators
                Preparation
                Following sample-controller
                Bootstrapping
                Business Logic
                Kubebuilder
                Bootstrapping
                Business Logic
                The Operator SDK
                Bootstrapping
                Business Logic
                Other Approaches
                Uptake and Future Directions

7. Shipping Controllers and Operators
                Lifecycle Management and Packaging
                Packaging: The Challenge
                Helm
                Kustomize
                Other Packaging Options
                Packaging Best Practices
                Lifecycle Management
                Production-Ready Deployments
                Getting the Permissions Right
                Automated Builds and Testing
                Custom Controllers and Observability

8. Custom API Servers
                Use Cases for Custom API Servers
                Example: A Pizza Restaurant
                The Architecture: Aggregation
                API Services
                Inner Structure of a Custom API Server
                Delegated Authentication and Trust
                Delegated Authorization
                Writing Custom API Servers
                Options and Config Pattern and Startup Plumbing
                The First Start
                Internal Types and Conversion
                Writing the API Types
                Conversions
                Defaulting
                Roundtrip Testing
                Validation
                Registry and Strategy
                API Installation
                Admission
                Deploying Custom API Servers
                Deployment Manifests
                Setting Up RBAC
                Running the Custom API Server Insecurely
                Certificates and Trust
                Sharing etcd

9. Advanced Custom Resources
                Custom Resource Versioning
                Revising the Pizza Restaurant
                Conversion Webhook Architecture
                Conversion Webhook Implementation
                Setting Up the HTTPS Server
                Deploying the Conversion Webhook
                Seeing Conversion in Action
                Admission Webhooks
                Admission Requirements in the Restaurant Example
                Admission Webhook Architecture
                Registering Admission Webhooks
                Implementing an Admission Webhook
                Admission Webhook in Action
                Structural Schemas and the Future of CustomResourceDefinitions
                Structural Schemas
                Pruning Versus Preserving Unknown Fields
                Controlling Pruning
                IntOrString and RawExtensions
                Default Values
```