
# HELM 

 - A comprehensive introduction to automated application deployment on Kubernetes for beginners


  - Effectively manage applications deployed in Kubernetes using Helm
  - Learn to install, upgrade, share, and manage applications deployed in Kubernetes
  - Get up and running with a package manager for Kubernetes
    
  -  Containerization is currently known to be one of the best ways to implement DevOps. 
  -  While Docker introduced containers and changed the DevOps era, Google developed an extensive container orchestration system,
    Kubernetes, which is now considered the frontrunner in container orchestration. 
  -  explore the efficiency of managing applications running on Kubernetes using Helm.

  - Starting with a short introduction to Helm and how it can benefit the entire container environment, 
    you'll then delve into the architectural aspects, in addition to learning about Helm charts and its use cases. 
  - how to write Helm charts in order to automate application deployment on Kubernetes. 
  - Focused on providing enterprise-ready patterns relating to Helm and automation, 
  - Best practices for application development, delivery, and lifecycle management with Helm.

   - how to leverage Helm to develop an enterprise pattern for application delivery.
   - Develop an enterprise automation strategy on Kubernetes using Helm
   - Create easily consumable and configurable Helm charts
   - Use Helm in orchestration tooling and Kubernetes operators
   - Explore best practices for application delivery and life cycle management
   - Leverage Helm in a secure and stable manner that is fit for your enterprise
   - Discover the ins and outs of automation with Helm
   - Who this book is for
   - Kubernetes developers or administrators who are interested in learning Helm to provide automation for application development on Kubernetes. 

```
Section 1: Introduction and Setup
Chapter 1: Understanding Kubernetes and Helm
            From monoliths to modern microservices
            What is Kubernetes?
            Container Orchestration
            High availability
            Scalability
            Active community
            Deploying a Kubernetes application
            Deployment
            Services
            PersistentVolumeClaim
            Approaches in resource management
            Imperative and declarative configuration
            Resource configuration challenges
            The many types of Kubernetes resources
            Keeping the live and local states in sync
            Application life cycles are hard to manage
            Resource files are static
            Helm to the rescue!
            Understanding package managers
            The Kubernetes package manager

Chapter 2: Preparing a Kubernetes and Helm Environment
            Technical requirements
            Preparing a local Kubernetes environment with Minikube
            Installing Minikube
            Installing VirtualBox
            Configuring VirtualBox as the designated hypervisor
            Configuring Minikube resource allocation
            Exploring the basic usage
            Setting up Kubectl
            Installing Kubectl
            Installing Helm
            Configuring Helm
            Adding upstream repositories
            Adding plugins
            Environment variables
            Tab completion
            Authentication
            Authorization/RBAC

Chapter 3: Installing your First Helm Chart
            Technical requirements
            Understanding the WordPress application
            Finding a WordPress chart
            Searching for WordPress charts from the command line
            Viewing the WordPress chart in a browser
            Showing the WordPress chart information from the command line
            Creating a Kubernetes environment
            Installing the WordPress chart
            Creating a values file for configuration
            Running the installation
            Inspecting your release
            Additional installation notes
            The -n flag
            The HELM_NAMESPACE environment variable
            Choosing between --set and --values
            Accessing the WordPress application
            Upgrading the WordPress release
            Modifying the Helm values
            Running the upgrade
            Reusing and resetting values during an upgrade
            Rolling back the WordPress release
            Inspecting the WordPress history
            Running the rollback
            Uninstalling the WordPress release
            Cleaning up your environment


Section 2: Helm Chart Development
Chapter 4: Understanding Helm Charts
            Technical requirements
            Understanding the YAML format
            Defining key-value pairs
            Value types
            Understanding chart templates
            Go templating
            Understanding chart definitions
            Required fields
            Managing chart dependencies
            Downloading dependencies
            Conditional dependencies
            Overriding and referencing values from a child chart
            Importing values with import-values
            Life cycle management
            The basics of a Helm hook
            Hook execution
            Advanced hook concepts
            Documenting a Helm chart
            The LICENSE file
            The templates/NOTES.txt file
            Packaging a Helm chart

Chapter 5: Building Your First Helm Chart
            Technical requirements
            Understanding the Guestbook application
            Setting up the environment
            Creating a Guestbook Helm chart
            Scaffolding the initial file structure
            Evaluating the chart definition
            Adding a Redis chart dependency
            Modifying the values.yaml file
            Installing the Guestbook chart
            Improving the Guestbook Helm chart
            Creating pre-upgrade and pre-rollback life cycle hooks
            Adding input validation
            Publishing the Guestbook chart to a chart repository
            Creating a chart repository
            Publishing the Guestbook Helm chart
            Adding your chart repository

Chapter 6: Testing Helm Charts
            Technical requirements
            Setting up your environment
            Verifying Helm templating
            Validating template generation locally with helm template
            Linting Helm charts and templates
            Testing in a live cluster
            Creating the chart tests
            Running the chart tests
            Improving chart tests with the chart testing project
            Introducing the chart testing project
            Installing the chart testing tools
            Cleaning up

Section 3: Adanced Deployment Patterns
Chapter 7: Automating Helm Processes Using CI/CD and GitOps
            Technical requirements
            Understanding CI/CD and GitOps
            CI/CD
            Taking CI/CD to the next level using GitOps
            Setting up our environment
            Creating a CI pipeline to build Helm charts
            Designing the pipeline
            Understanding Jenkins
            Understanding the pipeline
            Running the pipeline
            Creating a CD pipeline to deploy applications with Helm
            Designing the pipeline
            Updating the environments
            Understanding the pipeline
            Running the pipeline

Chapter 8: Using Helm with the Operator Framework
            Technical requirements
            Understanding Kubernetes Operators
            Creating a Helm operator
            Setting up the environment
            Scaffolding the operator file structure
            Building the operator and pushing it to Quay
            Deploying the Guestbook Operator
            Deploying the Guestbook application
            Using Helm to manage Operators and CRs
            Cleaning up your Kubernetes environment

Chapter 9: Helm Security Considerations
            Technical requirements
            Data provenance and integrity
            Creating a GPG keypair
            Verifying Helm downloads
            Signing and verifying Helm charts
            Developing secure Helm charts
            Using secure images
            Handling secrets in Helm charts
            Configuring RBAC rules
            Accessing secure chart repositories
```