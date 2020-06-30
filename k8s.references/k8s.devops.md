
## K8s DevOps Key Features
         -  Implement Kubernetes to orchestrate and scale applications proficiently
         -  Leverage the latest features of Kubernetes to resolve common as well as complex problems in a cloud-native environment
         -  Gain hands-on experience in securing, monitoring, and troubleshooting your application
         
         -  Kubernetes is a popular open source orchestration platform for managing containers in a cluster environment. 
         -  With this Kubernetes cookbook, you'll learn how to implement Kubernetes using a recipe-based approach.
         -  you can  create highly available Kubernetes clusters on multiple clouds such as Amazon Web Services (AWS), 
            Google Cloud Platform (GCP), Azure, Alibaba, and on-premises data centers.

         -  Starting with recipes for installing and configuring Kubernetes instances, you'll discover how to work with Kubernetes clients, services, and key metadata. 
         -  how to build continuous integration/continuous delivery (CI/CD) pipelines for your applications
         -  understand various methods to manage containers.
         -  delve into Kubernetes' integration with Docker and Jenkins, and even perform a batch process and configure data volumes.
         -  learn methods for scaling, security, monitoring, logging, and troubleshooting. 
         -  volume snapshots, creating high availability clusters with kops, running workload operators 

          By the end of this course, you'll have developed the skills required to implement Kubernetes in production and manage containers proficiently.

         - What you will learn
                    - Deploy cloud-native applications on Kubernetes
                    - Automate testing in the DevOps workflow
                    - Discover and troubleshoot common storage issues
                    - Dynamically scale containerized services to manage fluctuating traffic needs
                    - Understand how to monitor your containerized DevOps environment
                    - Build DevSecOps into CI/CD pipelines
```

1. Building Production-Ready Kubernetes Clusters
                    - Configuring a Kubernetes cluster on Amazon Web Services
                    - Installing the command-line tools to configure AWS services
                    - Installing kops to provision a Kubernetes cluster
                    - Provisioning a Kubernetes cluster on Amazon EC2
                    - Provisioning a managed Kubernetes cluster on Amazon
                    - Using the AWS Shell
                    - Using a gossip-based cluster
                    - Using different regions for an S3 bucket
                    - Editing the cluster configuration
                    - Deleting your cluster
                    - Provisioning an EKS cluster using the Amazon EKS Management Console
                    - Deploying Kubernetes Dashboard

2. Configuring a Kubernetes cluster on Google Cloud Platform
                    - Installing the command-line tools to configure GCP services
                    - Provisioning a managed Kubernetes cluster on GKE
                    - Connecting to Google Kubernetes Engine (GKE) clusters
                    - Using Google Cloud Shell
                    - Deploying with a custom network configuration
                    - Deleting your cluster
                    - Viewing the Workloads dashboard


3. Configuring a Kubernetes cluster on Microsoft Azure
                    - Installing the command-line tools to configure Azure services
                    - Provisioning a managed Kubernetes cluster on AKS
                    - Connecting to AKS clusters
                    - Deleting your cluster
                    - Viewing Kubernetes Dashboard

4. Configuring a Kubernetes cluster on Alibaba Cloud
                    - Installing the command-line tools to configure Alibaba Cloud services
                    - Provisioning a highly available Kubernetes cluster on Alibaba Cloud
                    - Connecting to Alibaba Container Service clusters
                    - Configuring and managing Kubernetes clusters with Rancher

5. Installing Rancher Server
                    - Deploying a Kubernetes cluster
                    - Importing an existing cluster
                    - Enabling cluster and node providers
                    - Bind mounting a host volume to keep data
                    - Keeping user volumes persistent
                    - Running Rancher on the same Kubernetes nodes

6. Configuring Red Hat OpenShift
                    - Downloading OpenShift binaries
                    - Provisioning an OpenShift cluster
                    - Connecting to OpenShift clusters
                    - Deleting your cluster

7. Configuring a Kubernetes cluster using Ansible
                    - Installing Ansible
                    - Provisioning a Kubernetes cluster using an Ansible playbook
                    - Connecting to the Kubernetes cluster
                    - Troubleshooting installation issues
                    - Setting log levels

8. Operating Applications on Kubernetes
                    - Deploying workloads using YAML files
                              - Creating a Deployment
                              - Verifying a Deployment
                              - Editing a Deployment
                              - Rolling back a deployment
                              - Deleting a Deployment

9. Deploying workloads using Kustomize
                    - Validating the Kubernetes cluster version
                    - Generating Kubernetes resources from files
                    - Creating a base for a development and production Deployment


10. Deploying workloads using Helm charts
                    - Installing Helm 2.x
                    - Installing an application using Helm charts
                    - Searching for an application in Helm repositories
                    - Upgrading an application using Helm
                    - Rolling back an application using Helm
                    - Deleting an application using Helm
                    - Adding new Helm repositories
                    - Building a Helm chart

11. Deploying and operating applications using Kubernetes operators
                    - Installing KUDO and the KUDO kubectl plugin
                    - Installing the Apache Kafka Operator using KUDO
                    - Installing Operator Lifecycle Manager
                    - Installing the Zalando PostgreSQL Operator

12. Deploying and managing the life cycle of Jenkins X
                    - Installing the Jenkins X CLI
                    - Creating a Jenkins X Kubernetes cluster
                    - Verifying Jenkins X components
                    - Switching Kubernetes clusters
                    - Validating cluster conformance
                    - Importing an application
                    - Upgrading a Jenkins X application
                    - Deleting a Jenkins X Kubernetes cluster

13. Deploying and managing the life cycle of GitLab
                    - Installing GitLab using Helm
                    - Connecting to the GitLab dashboard
                    - Creating the first GitLab user
                    - Upgrading GitLab
                    - Using your own wildcard certificate
                    - Using autogenerated self-signed certificates
                    - Enabling the GitLab Operator
                    - Deleting GitLab

14. Building CI/CD Pipelines
                1. Creating a CI/CD pipeline in Jenkins X
                        Connecting to Jenkins Pipeline Console
                        Importing an application as a pipeline
                        Checking application status
                        Promoting an application to production
                        Creating a pipeline using a QuickStart application

                2. Creating a CI/CD pipeline in GitLab
                        Creating a project using templates
                        Importing an existing project from GitHub
                        Enabling Auto DevOps
                        Enabling Kubernetes cluster integration
                        Creating a pipeline using Auto DevOps
                        Incrementally rolling out applications to production
                        GitLab Web IDE
                        Monitoring environments

                3. Creating a CI/CD pipeline in CircleCI
                        Getting started with CircleCI
                        Deploying changes to a Kubernetes cluster on EKS

                4. Setting up a CI/CD pipeline using GitHub Actions
                                - Creating a workflow file
                                - Creating a basic Docker build workflow
                                - Building and publishing images to Docker Registry
                                - Adding a workflow status badge

                5. Setting up a CI/CD pipeline on Amazon Web Services
                                - Creating an AWS CodeCommit code repository
                                - Building projects with AWS CodeBuild
                                - Creating an AWS CodeDeploy deployment
                                - Building a pipeline with AWS CodePipeline

                6. Setting up a CI/CD pipeline with Spinnaker on Google Cloud Build
                                - Installing and configuring the Spin CLI
                                - Configuring a service account for the CI/CD
                                - Configuring events to trigger a pipeline
                                - Deploying Spinnaker using Helm
                                - Creating a Google Cloud Source code repository
                                - Building projects with Google Cloud Build
                                - Configuring a Spinnaker pipeline
                                - Rolling out an application to production

                7. Setting up a CI/CD pipeline on Azure DevOps
                                - Getting started with Azure DevOps
                                - Configuring Azure Pipelines
                                - Deploying changes to an AKS cluster



15. Automating Tests in DevOps
                     1. Building event-driven automation with StackStorm
                                - Installing StackStorm
                                - Accessing the StackStorm UI
                                - Using the st2 CLI
                                - Defining a rule
                                - Deploying a rule

                     2. Automating tests with the Litmus framework
                                - Installing the Litmus Operator
                                - Using Chaos Charts for Kubernetes
                                - Creating a pod deletion chaos experiment
                                - Reviewing chaos experiment results
                                - Viewing chaos experiment logs

                     3. Automating Chaos Engineering with Gremlin
                                - Setting up Gremlin credentials
                                - Installing Gremlin on Kubernetes
                                - Creating a CPU attack against a Kubernetes worker
                                - Creating a node shutdown attack against a Kubernetes worker
                                - Running predefined scenario-based attacks
                                - Deleting Gremlin from your cluster

                     4. Automating your code review with Codacy
                                - Accessing the Project Dashboard
                                - Reviewing commits and PRs
                                - Viewing issues by category
                                - Adding a Codacy badge to your repository

                      5. Detecting bugs and anti-patterns with SonarQube
                                - Installing SonarQube using Helm
                                - Accessing the SonarQube Dashboard
                                - Creating a new user and tokens
                                - Enabling quality profiles
                                - Adding a project
                                - Reviewing a project's quality
                                - Adding marketplace plugins
                                - Deleting SonarQube from your cluster

                      6. Detecting license compliance issues with FOSSA
                               - Adding projects to FOSSA
                               - Triaging licensing issues
                               - Adding a FOSSA badge to your project


16. Preparing for Stateful Workloads
                      1. Managing Amazon EBS volumes in Kubernetes
                               - Creating an EBS storage class
                               - Changing the default storage class
                               - Using EBS volumes for persistent storage
                               - Using EBS storage classes to dynamically create persistent volumes
                               - Deleting EBS persistent volumes
                               - Installing the EBS CSI driver to manage EBS volumes

                      2. Managing GCE PD volumes in Kubernetes
                               - Creating a GCE persistent disk storage class
                               - Changing the default storage class
                               - Using GCE PD volumes for persistent storage
                               - Using GCE PD storage classes to create dynamic persistent volumes
                               - Deleting GCE PD persistent volumes
                               - Installing the GCP Compute PD CSI driver to manage PD volumes

                      3. Managing Azure Disk volumes in Kubernetes
                               - Creating an Azure Disk storage class
                               - Changing the default storage class to ZRS
                               - Using Azure Disk storage classes to create dynamic PVs
                               - Deleting Azure Disk persistent volumes
                               - Installing the Azure Disk CSI driver

                      4. Configuring and managing persistent storage using Rook
                               - Installing a Ceph provider using Rook
                               - Creating a Ceph cluster
                               - Verifying a Ceph cluster's health
                               - Create a Ceph block storage class
                               - Using a Ceph block storage class to create dynamic PVs
                         
                      5. Configuring and managing persistent storage using OpenEBS
                               - Installing iSCSI client prerequisites
                               - Installing OpenEBS
                               - Using ephemeral storage to create persistent volumes
                               - Creating storage pools
                               - Creating OpenEBS storage classes
                               - Using an OpenEBS storage class to create dynamic PVs

                     
                      6. Setting up NFS for shared storage on Kubernetes
                               - Installing NFS prerequisites
                               - Installing an NFS provider using a Rook NFS operator
                               - Using a Rook NFS operator storage class to create dynamic NFS PVs
                               - Installing an NFS provisioner using OpenEBS
                               - Using the OpenEBS NFS provisioner storage class to create dynamic NFS PVs
                                
                      7. Troubleshooting storage issues
                               - Persistent volumes in the pending state
                               - A PV is stuck once a PVC has been deleted

17. Disaster Recovery and Backup

                      1. Configuring and managing S3 object storage using MinIO
                               - Creating a deployment YAML manifest
                               - Creating a MinIO S3 service
                               - Accessing the MinIO web user interface

                      2. Managing Kubernetes Volume Snapshots and restore
                               - Enabling feature gates
                               - Creating a volume snapshot via CSI
                               - Restoring a volume from a snapshot via CSI
                               - Cloning a volume via CSI
                    
                      3. Application backup and recovery using Velero
                               - Installing Velero
                               - Backing up an application
                               - Restoring an application
                               - Creating a scheduled backup
                               - Taking a backup of an entire namespace
                               - Viewing backups with MinIO
                               - Deleting backups and schedules

                       4. Application backup and recovery using Kasten
                               - Installing Kasten
                               - Accessing the Kasten Dashboard
                               - Backing up an application
                               - Restoring an application

                        5. Cross-cloud application migration
                               - Creating an export profile in Kasten
                               - Exporting a restore point in Kasten
                               - Creating an import profile in Kasten
                               - Migrating an application in Kasten
                               - Importing clusters into OpenEBS Director
                               - Migrating an application in OpenEBS Director


17. Scaling and Upgrading Applications

                        1. Scaling applications on Kubernetes
                               - Validating the installation of Metrics Server
                               - Manually scaling an application
                               - Autoscaling applications using a Horizontal Pod Autoscaler
                            
                        2. Assigning applications to nodes
                                - Labeling nodes
                                - Assigning pods to nodes using nodeSelector
                                - Assigning pods to nodes using node and inter-pod Affinity

                        3. Creating an external load balancer
                                - Creating an external cloud load balancer
                                - Finding the external address of the service

                        4. Creating an ingress service and service mesh using Istio
                                - Installing Istio using Helm
                                - Verifying the installation
                                - Creating an ingress gateway
                                - Deleting Istio

                        5. Creating an ingress service and service mesh using Linkerd
                                - Installing the Linkerd CLI
                                - Installing Linkerd
                                - Verifying a Linkerd deployment
                                - Adding Linkerd to a service
                                - Accessing the dashboard
                                - Deleting Linkerd

                        6. Auto-healing pods in Kubernetes
                                - Testing self-healing pods
                                - Adding liveness probes to pods
                            
                        7. Managing upgrades through blue/green deployments
                                - Creating the blue deployment
                                - Creating the green deployment
                                - Switching traffic from blue to green


18.  Observability and Monitoring on Kubernetes

                        1. Monitoring in Kubernetes
                                - Adding metrics using Kubernetes Metrics Server
                                - Monitoring metrics using the CLI
                                - Monitoring metrics using Kubernetes Dashboard
                                - Monitoring node health

                        2. Inspecting containers
                                - Inspecting pods in Pending status
                                - Inspecting pods in ImagePullBackOff status
                                - Inspecting pods in CrashLoopBackOff status

                        3. Monitoring using Amazon CloudWatch
                                - Enabling Webhook authorization mode
                                - Installing Container Insights Agents for Amazon EKS
                                - Viewing Container Insights metrics

                        4. Monitoring using Google Stackdriver
                                - Installing Stackdriver Kubernetes Engine Monitoring support for GKE
                                - Configuring a workspace on Stackdriver
                                - Monitoring GKE metrics using Stackdriver

                        5. Monitoring using Azure Monitor
                                - Enabling Azure Monitor support for AKS using the CLI
                                - Monitoring AKS performance metrics using Azure Monitor
                                - Viewing live logs using Azure Monitor

                        6. Monitoring Kubernetes using Prometheus and Grafana
                                - Deploying Prometheus using Helm charts
                                - Monitoring metrics using Grafana dashboards
                                - Adding a Grafana dashboard to monitor applications

                        7  Monitoring and performance analysis using Sysdig
                                - Installing the Sysdig agent
                                - Analyzing application performance

                        8. Managing the cost of resources using Kubecost
                                - Installing Kubecost
                                - Accessing the Kubecost dashboard
                                - Monitoring Kubernetes resource cost allocation

20.  Securing Applications and Clusters

                        1. Using RBAC to harden cluster security
                                - Viewing the default Roles
                                - Creating user accounts
                                - Creating Roles and RoleBindings
                                - Testing the RBAC rules

                        2. Configuring Pod Security Policies
                                - Enabling PSPs on EKS
                                - Enabling PSPs on GKE
                                - Enabling PodSecurityPolicy on AKS
                                - Creating a restricted PSPs
                                - Restricting pods to access certain volume types
                                - Using Kubernetes PodSecurityPolicy advisor

                        3. Using Kubernetes CIS Benchmark for security auditing
                                - Running kube-bench on Kubernetes
                                - Running kube-bench on managed Kubernetes services
                                - Running kube-bench on OpenShift

                        4. Building DevSecOps into the pipeline using Aqua Security
                                - Scanning images using Trivy
                                - Building vulnerability scanning into GitLab
                                - Building vulnerability scanning into CircleCI

                        5. Monitoring suspicious application activities using Falco
                                - Installing Falco on Kubernetes
                                - Detecting anomalies using Falco
                                - Defining custom rules

                        6. Securing credentials using HashiCorp Vault
                                - Installing Vault on Kubernetes
                                - Accessing the Vault UI
                                - Storing credentials on Vault


21. Logging with Kubernetes
                        1. Accessing Kubernetes logs locally
                               - Accessing logs through Kubernetes
                               - Debugging services locally using Telepresence

                        2. Accessing application-specific logs
                               - Getting shell access in a container
                               - Accessing PostgreSQL logs inside a container

                        3. Building centralized logging in Kubernetes using the EFK stack
                               - Deploying Elasticsearch Operator
                               - Requesting the Elasticsearch endpoint
                               - Deploying Kibana
                               - Aggregating logs with Fluent Bit
                               - Accessing Kubernetes logs on Kibana

                        4. Logging Kubernetes using Google Stackdriver
                               - Installing Stackdriver Kubernetes Engine Monitoring support for GKE
                               - Viewing GKE logs using Stackdriver

                        5. Using a managed Kubernetes logging service
                               - Connecting clusters to Director Online
                               - Accessing logs using Director Online

                        6. Logging for your Jenkins CI/CD environment
                               - Installing the Fluentd plugin
                               - Streaming Jenkins logs to Elasticsearch;using Fluentd
                               - Installing the Logstash plugin
                               - Streaming Jenkins logs to Elasticsearch using Logstash


```