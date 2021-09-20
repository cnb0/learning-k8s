
## k8s Cookbook

-  If your organization is preparing to move toward a cloud-native computing architecture, 
 this cookbook shows you how to successfully use Kubernetes, the de-facto standard for
 automating the deployment, scaling, and management of containerized applications. 
 With more than 80 proven recipes, developers, system administrators, and architects 
 will quickly learn how to get started with Kubernetes and understand its powerful API.


 - Recipes in this cookbook focus on:
                      -  Creating a Kubernetes cluster
                      -  Using the Kubernetes command-line interface
                      -  Managing fundamental workload types
                      -  Working with services
                      -  Exploring the Kubernetes API
                      -  Managing stateful and non-cloud native apps
                      -  Working with volumes and configuration data
                      -  Cluster-level and application-level scaling
                      -  Securing your applications
                      -  Monitoring and logging
                      -  Maintenance and troubleshooting



```
1. Getting Started with Kubernetes

        1.1. Using Kubernetes Without Installation
        1.2. Installing the Kubernetes CLI, kubectl
        1.3. Installing Minikube to Run a Local Kubernetes Instance
        1.4. Using Minikube Locally for Development
        1.5. Starting Your First Application on Minikube
        1.6. Accessing the Dashboard in Minikube

2. Creating a Kubernetes Cluster

        2.1. Installing kubeadm to Create a Kubernetes Cluster
        2.2. Bootstrapping a Kubernetes Cluster Using kubeadm
        2.3. Downloading a Kubernetes Release from GitHub
        2.4. Downloading Client and Server Binaries
        2.5. Using a hyperkube Image to Run a Kubernetes Master Node with Docker
        2.6. Writing a systemd Unit File to Run Kubernetes Components
        2.7. Creating a Kubernetes Cluster on Google Kubernetes Engine (GKE)
        2.8. Creating a Kubernetes Cluster on Azure Container Service (ACS)

3. Learning to Use the Kubernetes Client

        3.1. Listing Resources
        3.2. Deleting Resources
        3.3. Watching Resource Changes with kubectl
        3.4. Editing Resources with kubectl
        3.5. Asking kubectl to Explain Resources and Fields

4. Creating and Modifying Fundamental Workloads

        4.1. Creating a Deployment Using kubectl run
        4.2. Creating Objects from File Manifests
        4.3. Writing a Pod Manifest from Scratch
        4.4. Launching a Deployment Using a Manifest
        4.5. Updating a Deployment

5. Working with Services

        5.1. Creating a Service to Expose Your Application
                        - To provide a stable and reliable way to discover and 
                          access your application within the cluster.
        5.2. Verifying the DNS Entry of a Service
                        - You have created a service and want to verify that your 
                          DNS registration is working properly.
        5.3. Changing the Type of a Service
        5.4. Deploying an Ingress Controller on Minikube
        5.5. Making Services Accessible from Outside the Cluster

6. Exploring the Kubernetes API and Key Metadata

        6.1. Discovering API Endpoints of the Kubernetes API Server
        6.2. Understanding the Structure of a Kubernetes Manifest
        6.3. Creating Namespaces to Avoid Name Collisions
        6.4. Setting Quotas Within a Namespace
        6.5. Labeling an Object
        6.6. Using Labels for Queries
        6.7. Annotating a Resource with One Command

7. Managing Specialized Workloads

        7.1. Running a Batch Job
        7.2. Running a Task on a Schedule Within a Pod
        7.3. Running Infrastructure Daemons per Node
        7.4. Managing Stateful and Leader/Follower Apps
        7.5. Influencing Pods’ Startup Behavior

8. Volumes and Configuration Data

        8.1. Exchanging Data Between Containers via a Local Volume
        8.2. Passing an API Access Key to a Pod Using a Secret
        8.3. Providing Configuration Data to an Application
        8.4. Using a Persistent Volume with Minikube
        8.5. Understanding Data Persistency on Minikube
        8.6. Dynamically Provisioning Persistent Storage on GKE

9. Scaling

        9.1. Scaling a Deployment
        9.2. Automatically Resizing a Cluster in GKE
        9.3. Automatically Resizing a Cluster in AWS
        9.4. Using Horizontal Pod Autoscaling on GKE

10. Security

        10.1. Providing a Unique Identity for an Application
        10.2. Listing and Viewing Access Control Information
        10.3. Controlling Access to Resources
        10.4. Securing Pods

11. Monitoring and Logging

        11.1. Accessing the Logs of a Container
        11.2. Recover from a Broken State with a Liveness Probe
        11.3. Controlling Traffic Flow to a Pod Using a Readiness Probe
        11.4. Adding Liveness and Readiness Probes to Your Deployments
        11.5. Enabling Heapster on Minikube to Monitor Resources
        11.6. Using Prometheus on Minikube
        11.7. Using Elasticsearch–Fluentd–Kibana (EFK) on Minikube

12. Maintenance and Troubleshooting

        12.1. Enabling Autocomplete for kubectl
        12.2. Removing a Pod from a Service
        12.3. Accessing a ClusterIP Service Outside the Cluster
        12.4. Understanding and Parsing Resource Statuses
        12.5. Debugging Pods
        12.6. Getting a Detailed Snapshot of the Cluster State
        12.7. Adding Kubernetes Worker Nodes
        12.8. Draining Kubernetes Nodes for Maintenance
        12.9. Managing etcd

13. Developing Kubernetes

        13.1. Compiling from Source
        13.2. Compiling a Specific Component
        13.3. Using a Python Client to Interact with the Kubernetes API
        13.4. Extending the API Using Custom Resource Definitions (CRDs)

14. The Ecosystem

        14.1. Installing Helm, the Kubernetes Package Manager
        14.2. Using Helm to Install Applications
        14.3. Creating Your Own Chart to Package Your Application with Helm
        14.4. Converting Your Docker Compose Files to Kubernetes Manifests
        14.5. Creating a Kubernetes Cluster with kubicorn
        14.6. Storing Encrypted Secrets in Version Control
        14.7. Deploying Functions with kubeless


```