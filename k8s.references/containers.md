
## Containerizing your applications and running them in production.

	Kubernetes is an open source orchestration platform for managing containers in a cluster environment. 

	Starting with creating Kubernetes clusters and running applications with proper authentication and authorization, 
	you'll learn how to create high-availability Kubernetes clusters on Amazon Web Services (AWS), and
	also learn how to use kubeconfig to manage different clusters. 

	Whether it is learning about Docker containers and Docker Compose, or 
	building a continuous delivery pipeline for your application, 
	this Learning Path will equip you with all the right tools and techniques to get started with containerization.

	What you will learn
        - Build your own container cluster
        - Run a highly distributed application with Docker Swarm or Kubernetes
        - Update or rollback a distributed application with zero downtime
        - Containerize your traditional or microservice-based application
        - Build a continuous delivery pipeline for your application
        - Track metrics and logs for every container in your cluster
        - Implement container orchestration to streamline deploying and managing applications

    Key Features
        - Deploy and manage highly scalable, containerized applications with Kubernetes
        - Build high-availability Kubernetes clusters
        - Secure your applications via encapsulation, networks, and secrets



```
1. What Are Containers and Why Should I Use Them?
                    What are containers?
                    Why are containers important?
                    What's the benefit for me or for my company?
                    The Moby project
                    Docker products
                    Docker CE
                    Docker EE
                    The container ecosystem
                    Container architecture

2. Setting up a Working Environment
                    The Linux command shell
                    PowerShell for Windows
                    Using a package manager
                    Installing Homebrew on a Mac
                    Installing Chocolatey on Windows
                    Choosing a code editor
                    Docker Toolbox
                    Docker for Mac and Docker for Windows
                    Installing Docker for Mac
                    Installing Docker for Windows
                    Using docker-machine on Windows with Hyper-V
                    Minikube
                    Installing Minikube on Mac and Windows
                    Testing Minikube and kubectl
                  
 3. Working with Containers
                    Running the first container
                    Starting, stopping, and removing containers
                    Running a random quotes container
                    Listing containers
                    Stopping and starting containers
                            Removing containers
                            Inspecting containers
                            Exec into a running container
                            Attaching to a running container
                    Retrieving container logs
                            Logging drivers
                            Using a container-specific logging driver
                            Advanced topic   changing the default logging driver
                    Anatomy of containers
                            Architecture
                            Namespaces
                            Control groups (cgroups)
                            Union filesystem (UnionFS)
                            Container plumbing
                                    Runc
                                    Containerd

4. Creating and Managing Container Images
                    What are images?
                            The layered filesystem
                            The writable container layer
                            Copy-on-write
                            Graph drivers
                    Creating images
                        Interactive image creation
                        Using Dockerfiles
                        The FROM keyword
                        The RUN keyword
                        The COPY and ADD keywords
                        The WORKDIR keyword
                        The CMD and ENTRYPOINT keywords
                        A complex Dockerfile
                        Building an image
                        Multistep builds
                        Dockerfile best practices
                    Saving and loading images
                        Sharing or shipping images
                        Tagging an image
                        Image namespaces
                        Official images
                        Pushing images to a registry

5. Data Volumes and System Management
                    Creating and mounting data volumes
                            Modifying the container layer
                            Creating volumes
                            Mounting a volume
                            Removing volumes
                    Sharing data between containers
                    Using host volumes
                    Defining volumes in images
                    Obtaining Docker system information
                    Listing resource consumption
                    Pruning unused resources
                            Pruning containers
                            Pruning images
                            Pruning volumes
                            Pruning networks
                            Pruning everything
                    Consuming Docker system events

6. Distributed Application Architecture
                    What is a distributed application architecture?
                    Patterns and best practices
                            Loosely coupled components
                            Stateful versus stateless
                            Service discovery
                            Routing
                            Load balancing
                            Defensive programming
                                Retries
                                Logging
                                Error handling
                    Redundancy
                    Health checks
                    Circuit breaker pattern
                    
                    Running in production
                            Logging
                            Tracing
                            Monitoring
                            Application updates
                                    Rolling updates
                                    Blue-green deployments
                                    Canary releases
                                    Irreversible data changes
                                    Rollback

7. Single-Host Networking
                    The container network model
                    Network firewalling
                    The bridge network
                    The host network
                    The null network
                    Running in an existing network namespace
                    Port management

8. Docker Compose
                    Demystifying declarative versus imperative
                    Running a multi-service app
                    Scaling a service
                    Building and pushing an application


9. Orchestrators
                What are orchestrators and why do we need them?
                    The tasks of an orchestrator
                    Reconciling the desired state
                    Replicated and global services
                    Service discovery
                    Routing
                    Load balancing
                    Scaling
                    Self-healing
                    Zero downtime deployments
                    Affinity and location awareness
                    Security
                            Secure communication and cryptographic node identity
                            Secure networks and network policies
                            Role-based access control (RBAC)
                            Secrets
                            Content trust
                            Reverse uptime
                    Introspection
                    Overview of popular orchestrators
                            Kubernetes
                            Docker Swarm
                            Apache Mesos and Marathon
                            Amazon ECS
                            Microsoft ACS 


10. Introduction to Docker Swarm
                Architecture
                Swarm nodes
                    Swarm managers
                    Swarm workers 
                Stacks, services, and tasks
                    Services
                    Task
                    Stack

11. Multi-host networking
                Creating a Docker Swarm
                    Creating a local single node swarm
                    Creating a local swarm in VirtualBox or Hyper-V
                    Using Play with Docker (PWD) to generate a Swarm
                    Creating a Docker Swarm in the cloud
                Deploying a first application
                        Creating a service
                        Inspecting the service and its tasks
                        Logs of a service
                        Reconciling the desired state
                        Deleting a service or a stack
                        Deploying a multi-service stack
                The swarm routing mesh


12. Zero Downtime Deployments and Secrets
                Zero downtime deployment
                        Popular deployment strategies
                        Rolling updates
                        Health checks
                        Rollback
                        Blue green deployments
                        Canary releases
                Secrets
                        Creating secrets
                        Using a secret
                        Simulating secrets in a development environment
                        Secrets and legacy applications
                        Updating secrets


13. Building Your Own Kubernetes Cluster
                Exploring the Kubernetes architecture
                        Kubernetes master
                        API server (kube-apiserver)
                        Scheduler (kube-scheduler)
                        Controller manager (kube-controller-manager)
                        Command-line interface (kubectl)
                        Kubernetes node
                        kubelet
                        Proxy (kube-proxy)
                etcd
                Kubernetes network
                Setting up the Kubernetes cluster on Windows by minikube
                Setting up the Kubernetes cluster on Linux via kubeadm
                        System configuration prerequisites
                            CentOS system settings
                        Booting up the service
                        Network configurations for containers
                        Getting a node involved

14. Setting up the Kubernetes cluster on Linux via Ansible (kubespray)
                Installing pip
                Installing Ansible
                Installing python-netaddr
                Setting up ssh public key authentication
                Maintaining the Ansible inventory
                Running the Ansible ad hoc command to test your environment
                Ansible troubleshooting
                        Need to specify a sudo password
                        Need to specify different ssh logon user
                        Need to change ssh port
                        Common ansible issue

15. Running your first container in Kubernetes
                Running a HTTP server (nginx)
                Exposing the port for external access
                Stopping the application

14. Walking through Kubernetes Concepts
                An overview of Kubernetes
                Linking Pods and containers
                Managing Pods with ReplicaSets
                    Creating a ReplicaSet
                    Getting the details of a ReplicaSet
                    Changing the configuration of a ReplicaSet
                    Deleting a ReplicaSet
                Deployment API
                    Using kubectl set to update the container image
                    Updating the YAML and using kubectl apply


15. Working with Services

                Creating a Service for different resources
                    Creating a Service for a Pod
                    Creating a Service for a Deployment with an external IP
                    Creating a Service for an Endpoint without a selector
                    Creating a Service for another Service with session affinity
                    Deleting a Service

                Working with volumes
                                emptyDir
                                hostPath
                                NFS
                                glusterfs
                                downwardAPI
                                gitRepo
                                PersistentVolumes
                                Using storage classes
                                gcePersistentDisk
                                awsElasticBlockStore

                Working with Secrets
                            Creating a Secret
                            Working with kubectl create command line
                                From a file
                                From a directory
                                From a literal value
                                Via configuration file
                                Using Secrets in Pods
                                    By environment variables
                                    By volumes
                                Deleting a Secret
                            Using ConfigMaps
                                Mounting Secrets and ConfigMap in the same volume
                Working with names
                Working with Namespaces
                    Creating a Namespace
                    Changing the default Namespace
                    Deleting a Namespace
                    Creating a LimitRange
                    Deleting a LimitRange

                Working with labels and selectors
                    Equality-based label selector
                    Set-based label selector
                    Linking Service to Pods or ReplicaSets using label selectors
                    Linking Deployment to ReplicaSet using the set-based selector
                 
16. Playing with Containers
                Scaling your containers
                    Scale up and down manually with the kubectl scale command
                    Horizontal Pod Autoscaler (HPA)
                Updating live containers
                        Deployment update strategy rolling-update
                        Rollback the update
                        Deployment update strategy recreate
                Forwarding container ports
                    Container-to-container communication
                    Pod-to-Pod communication
                            Working with NetworkPolicy
                    Pod-to-Service communication
                    External-to-internal communication
                    Working with Ingress

               Ensuring flexible usage of your containers
                    Pod as DaemonSets
                    Running a stateful Pod
                        Pod recovery by DaemonSets
                        Pod recovery by StatefulSet
                    Submitting Jobs on Kubernetes
                            Pod as a single Job
                            Create a repeatable Job
                            Create a parallel Job
                            Schedule to run Job using CronJob
                    Working with configuration files
                            YAML
                            JSON
                            Pod
                            Deployment
                            Service


17. Building High-Availability Clusters
                    Clustering etcd
                    Static mechanism
                    Discovery mechanism
                        kubeadm
                        kubespray
                        Kops
                    Building multiple masters
                        Setting up the first master
                        Setting up the other master with existing certifications
                        Adding nodes in a HA cluster

18. Building Continuous Delivery Pipelines
                    Moving monolithic to microservices
                        Microservices
                        Frontend WebUI
                    Microservices
                    Frontend WebUI
                    Working with the private Docker registry
                        Using Kubernetes to run a Docker registry server
                        Using Amazon elastic container registry
                        Using Google cloud registry
                    Launching a private registry server using Kubernetes
                            Creating a self-signed SSL certificate
                            Creating HTTP secret
                            Creating the HTTP basic authentication file
                            Creating a Kubernetes secret to store security files
                            Configuring a private registry to load a Kubernetes secret
                    Create a repository on the AWS elastic container registry
                    Determining your repository URL on Google container registry
                        Push and pull an image from your private registry
                        Push and pull an image from Amazon ECR
                        Push and pull an image from Google cloud registry
                        Using gcloud to wrap the Docker command
                        Using the GCP service account to grant a long-lived credential

                    Integrating with Jenkins
                                Setting up a custom Jenkins image
                                Setting up Kubernetes service account and ClusterRole
                                Launching the Jenkins server via Kubernetes deployment
                                Using Jenkins to build a Docker image
                                Deploying the latest container image to Kubernetes
19. Building Kubernetes on AWS

                Playing with Amazon Web Services
                        Creating an IAM user
                        Installing AWS CLI on macOS
                        Installing AWS CLI on Windows
                Creating VPC and Subnets
                Internet gateway
                NAT-GW
                Security group
                EC2
                Setting up Kubernetes with kops
                    Working with kops-built AWS cluster
                    Deleting kops-built AWS cluster
                Using AWS as Kubernetes Cloud Provider
                        Elastic load balancer as LoadBalancer service
                        Elastic Block Store as StorageClass
                Managing Kubernetes cluster on AWS by kops
                Modifying and resizing instance groups
                        Updating nodes
                        Updating masters
                        Upgrading a cluster



20. Advanced Cluster Administration
                Advanced settings in kubeconfig
                    Setting new credentials
                    Setting new clusters
                    Setting contexts and changing current-context
                    Cleaning up kubeconfig

                Setting resources in nodes
                    Configuring a BestEffort pod
                    Configuring a Guaranteed pod
                    Configuring a Burstable pod

                Playing with WebUI
                    Relying on the dashboard created by minikube
                    Creating a dashboard manually on a system using other booting tools

                Browsing your resource by dashboard
                Deploying resources by dashboard
                Removing resources by dashboard
                Working with the RESTful API

                Working with Kubernetes DNS
                    DNS for pod
                    DNS for Kubernetes Service
                    DNS for StatefulSet
                    Headless service when pods scale out

21. Authentication and authorization
                Authentication
                        Service account token authentication
                        X509 client certs
                        OpenID connect tokens
                Authorization
                        Role and RoleBinding
                        ClusterRole and ClusterRoleBinding
                        Role-based access control (RBAC)
                Admission control
                        NamespaceLifecycle
                        LimitRanger
                        ServiceAccount
                        PersistentVolumeLabel (deprecated from v1.8)
                        DefaultStorageClass
                        DefaultTolerationSeconds
                        ResourceQuota
                        DenyEscalatingExec
                        AlwaysPullImages
                        Initializers (alpha)
                        Webhook admission controllers (beta in v1.9)
```
