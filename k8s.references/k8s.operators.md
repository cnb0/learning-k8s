

### Kubernetes Operators

- Operators are a way of packaging, deploying, and managing Kubernetes applications. 
  A Kubernetes application doesn’t just run on Kubernetes;it’s composed and managed in Kubernetes terms.
  Operators add application-specific operational knowledge to a Kubernetes cluster, 
  making it easier to automate complex, stateful applications and to augment the platform. 
  Operators can coordinate application upgrades seamlessly, react to failures automatically, and 
  streamline repetitive maintenance like backups.

- Think of Operators as site reliability engineers in software. 
  They work by extending the Kubernetes control plane and API, 
  helping systems integrators, cluster administrators, and application developers 
  reliably deploy and manage key services and components. 

- Using real-world examples, demonstrate how to use Operators today and 
  how to create Operators for your applications with the Operator Framework and SDK.

- Learn how to establish a Kubernetes cluster and deploy an Operator
  Examine a range of Operators from usage to implementation

- Explore the three pillars of the Operator Framework: 
                - The Operator SDK, 
                - The Operator Lifecycle Manager
                - Operator Metering

- Build Operators from the ground up using the Operator SDK

- Build, package, and run an Operator in development, testing, and production phases

- Learn how to distribute your Operator for installation on Kubernetes clusters


```
1. Operators Teach Kubernetes New Tricks
            How Kubernetes Works
            Example: Stateless Web Server
            Stateful Is Hard
            Operators Are Software SREs
            How Operators Work
            Kubernetes CRs
            How Operators Are Made
            Example: The etcd Operator
            The Case of the Missing Member
            Who Are Operators For?
            Operator Adoption
            Let’s Get Going!

2. Running Operators
            Setting Up an Operator Lab
            Cluster Version Requirements
            Authorization Requirements
            Standard Tools and Techniques
            Suggested Cluster Configurations
            Checking Your Cluster Version
            Running a Simple Operator
            A Common Starting Point
            Fetching the etcd Operator Manifests
            CRs: Custom API Endpoints
            Who Am I: Defining an Operator Service Account
            Deploying the etcd Operator
            Declaring an etcd Cluster
            Exercising etcd
            Scaling the etcd Cluster
            Failure and Automated Recovery
            Upgrading etcd Clusters
            Cleaning Up

3. Operators at the Kubernetes Interface
            Standard Scaling: The ReplicaSet Resource
            Custom Resources
            CR or ConfigMap?
            Custom Controllers
            Operator Scopes
            Namespace Scope
            Cluster-Scoped Operators
            Authorization
            Service Accounts
            Roles
            RoleBindings
            ClusterRoles and ClusterRoleBindings

4. The Operator Framework
            Operator Framework Origins
            Operator Maturity Model
            Operator SDK
            Installing the Operator SDK Tool
            Operator Lifecycle Manager
            Operator Metering

5. Sample Application: Visitors Site
            Application Overview
            Installation with Manifests
            Deploying MySQL
            Backend
            Frontend
            Deploying the Manifests
            Accessing the Visitors Site
            Cleaning Up

6. Adapter Operators
            Helm Operator
            Building the Operator
            Fleshing Out the CRD
            Reviewing Operator Permissions
            Running the Helm Operator
            Ansible Operator
            Building the Operator
            Fleshing Out the CRD
            Reviewing Operator Permissions
            Running the Ansible Operator
            Testing an Operator


7. Operators in Go with the Operator SDK
            Initializing the Operator
            Operator Scope
            Custom Resource Definitions
            Defining the Go Types
            The CRD Manifest
            Operator Permissions
            Controller
            The Reconcile Function
            Operator Writing Tips
            Retrieving the Resource
            Child Resource Creation
            Child Resource Deletion
            Child Resource Naming
            Idempotency
            Operator Impact
            Running an Operator Locally
            Visitors Site Example


8. Operator Lifecycle Manager
            OLM Custom Resources
            ClusterServiceVersion
            CatalogSource
            Subscription
            InstallPlan
            OperatorGroup
            Installing OLM
            Using OLM
            Exploring the Operator
            Deleting the Operator
            OLM Bundle Metadata Files
            Custom Resource Definitions
            Cluster Service Version File
            Package Manifest File
            Writing a Cluster Service Version File
            Generating a File Skeleton
            Metadata
            Owned CRDs
            Required CRDs
            Install Modes
            Versioning and Updating
            Writing a Package Manifest File
            Running Locally
            Prerequisites
            Building the OLM Bundle
            Installing the Operator Through OLM
            Testing the Running Operator
            Visitors Site Operator Example

9. Operator Philosophy
            SRE for Every Application
            Toil Not, Neither Spin
            Automatable: Work Your Computer Would Like
            Running in Place: Work of No Enduring Value
            Growing Pains: Work That Expands with the System
            Operators: Kubernetes Application Reliability Engineering
            Managing Application State
            Golden Signals Sent to Software
            Seven Habits of Highly Successful Operators

10. Getting Involved
            Feature Requests and Reporting Bugs
            Contributing
            Sharing Operators



    A. Running an Operator as a Deployment Inside a Cluster
    B. Custom Resource Validation
    C. Role-Based Access Control (RBAC)
    Fine-Tuning the Role

```