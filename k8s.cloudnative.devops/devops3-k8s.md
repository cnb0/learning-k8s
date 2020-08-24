
```
1. Running Kubernetes Cluster Locally
            Installing kubectl
            Installing Minikube
            Creating a local Kubernetes cluster with Minikube

2. Creating Pods
            Creating a Cluster
            Quick and dirty way to run Pods
            Defining Pods through declarative syntax
            Running multiple containers in a single Pod
            Monitoring health
            Pods are (almost) useless (by themselves)

3. Scaling Pods With ReplicaSets
            Creating a Cluster
            Creating ReplicaSets
            Operating ReplicaSets

4. Using Services to Enable Communication between Pods
            Creating a Cluster
            Creating Services by exposing ports
            Creating Services through declarative syntax
            Splitting the Pod and establishing communication through Services
            Defining multiple objects in the same YAML file
            Discovering Services


5. Kubernetes Pods, ReplicaSets, and Services compared to Docker Swarm stacks
            Deploying Releases with Zero-Downtime
            Creating a Cluster
            Deploying new releases
            Updating Deployments
            Zero-Downtime Deployments
            Rolling back or rolling forward?
            Rolling back failed Deployments
            Merging everything into the same YAML definition
            Updating multiple objects
            Scaling Deployments


6. Kubernetes Deployments compared to Docker Swarm stacks
            Using Ingress to Forward Traffic
            Creating a cluster
            Exploring deficiencies when enabling external access through Kubernetes services
            Enabling Ingress controllers
            Creating Ingress Resources based on paths
            Creating Ingress resources based on domains
            Creating an Ingress resource with default backends

7. Kubernetes Ingress compared to Docker Swarm equivalent
            Using Volumes to Access Hostsx26;#x27;s File System
            Creating a cluster
            Accessing host's resources through hostPath volumes
            Using hostPath volume type to inject configuration files
            Using gitRepo to mount a Git repository
            Persisting state through the emptyDir volume type


8. Using ConfigMaps to Inject Configuration Files
            Creating a cluster
            Injecting configurations from files
            Injecting configurations from key/value literals
            Injecting configurations from environment files
            Converting ConfigMap output into environment variables
            Defining ConfigMaps as YAML
            A plea NOT to use ConfigMaps!

9. Kubernetes ConfigMaps compared to Docker Swarm configs
            Using Secrets to Hide Confidential Information
            Creating a Cluster
            Exploring built-in Secrets
            Creating and mounting generic Secrets
            Secrets compared to ConfigMaps
            Not so secretive Secrets

10. Kubernetes Secrets compared to Docker Swarm Secrets
            Dividing a Cluster into Namespaces
            Creating a Cluster
            Deploying the first release
            Exploring virtual clusters
            Exploring the existing Namespaces
            Deploying to a new Namespace
            Communicating between Namespaces
            Deleting a Namespace and all its Objects


11. Kubernetes Namespaces compared to Docker Swarm equivalent (if there is any)
            Securing Kubernetes Clusters
            Accessing Kubernetes API
            Authorizing requests
            Creating a Cluster
            Creating users
            Exploring RBAC authorization
            Peeking into pre-defined Cluster roles
            Creating Role bindings and Cluster Role bindings
            Replacing Users with Groups


12. Kubernetes RBAC compared to Docker Swarm RBAC
                Managing Resources
                Creating a cluster
                Defining container memory and CPU resources
                Measuring actual memory and CPU consumption
                Exploring the effects of discrepancies between resource specifications and resource usage
                Adjusting resources based on actual usage
                Exploring quality of service (QoS) contracts
                Defining resource defaults and limitations within a namespace
                Defining resource quotas for a namespace


13. Kubernetes resource management compared to docker swarm equivalent
                Creating a Production-Ready Kubernetes Cluster
                What is kubernetes operations (kops) project?
                Preparing for the cluster setup
                Creating a kubernetes cluster in AWS
                Exploring the components that constitute the cluster
                Updating the cluster
                Upgrading the cluster manually
                Upgrading the cluster automatically
                Accessing the cluster
                Deploying applications
                Exploring high-availability and fault-tolerance
                Giving others access to the cluster
                Destroying the cluster


14. Kubernetes operations (kops) compared to Docker for AWS
                Persisting State
                Creating a Kubernetes cluster
                Deploying stateful applications without persisting state
                Creating AWS volumes
                Creating Kubernetes persistent volumes
                Claiming persistent volumes
                Attaching claimed volumes to Pods
                Using storage classes to dynamically provision persistent volumes
                Using default storage classes
                Creating storage classes
```