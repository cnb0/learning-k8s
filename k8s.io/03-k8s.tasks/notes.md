## [k8s tasks](https://kubernetes.io/docs/tasks/)
```
1. Install Tools 
         - Set up Kubernetes tools on your computer.
                - Install and Set Up kubectl
                - Install Minikube

2. Administer a Cluster
         - Learn common tasks for administering a cluster.
                - Administration with kubeadm
                - Manage Memory, CPU, and API Resources
                - Install a Network Policy Provider
                - Access Clusters Using the Kubernetes API
                - Access Services Running on Clusters
                - Advertise Extended Resources for a Node
                - Autoscale the DNS Service in a Cluster
                - Change the default StorageClass
                - Change the Reclaim Policy of a PersistentVolume
                - Cloud Controller Manager Administration
                - Cluster Management
                - Configure Out of Resource Handling
                - Configure Quotas for API Objects
                - Control CPU Management Policies on the Node
                - Control Topology Management Policies on a node
                - Customizing DNS Service
                - Declare Network Policy
                - Developing Cloud Controller Manager
                - Enabling EndpointSlices
                - Enabling Service Topology
                - Encrypting Secret Data at Rest
                - Guaranteed Scheduling For Critical Add-On Pods
                - IP Masquerade Agent User Guide
                - Limit Storage Consumption
                - Namespaces Walkthrough
                - Operating etcd clusters for Kubernetes
                - Reconfigure a Node's Kubelet in a Live Cluster
                - Reserve Compute Resources for System Daemons
                - Safely Drain a Node while Respecting the PodDisruptionBudget
                - Securing a Cluster
                - Set Kubelet parameters via a config file
                - Set up High-Availability Kubernetes Masters
                - Share a Cluster with Namespaces
                - Using a KMS provider for data encryption
                - Using CoreDNS for Service Discovery
                - Using NodeLocal DNSCache in Kubernetes clusters
                - Using sysctls in a Kubernetes Cluster

3. Configure Pods and Containers
         - Perform common configuration tasks for Pods and containers.

4. Manage Kubernetes Objects
         - Declarative and imperative paradigms for interacting with the Kubernetes API.
              - Declarative Management of Kubernetes Objects Using Configuration Files
              - Declarative Management of Kubernetes Objects Using Kustomize
              - Managing Kubernetes Objects Using Imperative Commands
              - Imperative Management of Kubernetes Objects Using Configuration Files
              - Update API Objects in Place Using kubectl patch

5. Inject Data Into Applications
         - Specify configuration and other data for the Pods that run your workload.
              - Define a Command and Arguments for a Container
              - Define Environment Variables for a Container
              - Expose Pod Information to Containers Through Environment Variables
              - Expose Pod Information to Containers Through Files
              - Distribute Credentials Securely Using Secrets
              - Inject Information into Pods Using a PodPreset

6. Run Applications
         - Run and manage both stateless and stateful applications.
              - Run a Stateless Application Using a Deployment
              - Run a Single-Instance Stateful Application
              - Run a Replicated Stateful Application
              - Scale a StatefulSet
              - Delete a StatefulSet
              - Force Delete StatefulSet Pods
              - Horizontal Pod Autoscaler
              - Horizontal Pod Autoscaler Walkthrough
              - Specifying a Disruption Budget for your Application

7. Run Jobs
         - Run Jobs using parallel processing.
              - Running Automated Tasks with a CronJob
              - Parallel Processing using Expansions
              - Coarse Parallel Processing Using a Work Queue
              - Fine Parallel Processing Using a Work Queue

8. Access Applications in a Cluster
         - Configure load balancing, port forwarding, or setup firewall or 
           DNS configurations to access applications in a cluster.
              - Web UI (Dashboard)
              - Accessing Clusters
              - Configure Access to Multiple Clusters
              - Use Port Forwarding to Access Applications in a Cluster
              - Use a Service to Access an Application in a Cluster
              - Connect a Front End to a Back End Using a Service
              - Create an External Load Balancer
              - List All Container Images Running in a Cluster
              - Set up Ingress on Minikube with the NGINX Ingress Controller
              - Communicate Between Containers in the Same Pod Using a Shared Volume
              - Configure DNS for a Cluster

9. Monitoring, Logging, and Debugging
         - Set up monitoring and logging to troubleshoot a cluster, or 
           debug a containerized application.

              - Application Introspection and Debugging
              - Auditing
              - Auditing with Falco
              - Debug a StatefulSet
              - Debug Init Containers
              - Debug Pods and ReplicationControllers
              - Debug Running Pods
              - Debug Services
              - Debugging DNS Resolution
              - Debugging Kubernetes nodes with crictl
              - Determine the Reason for Pod Failure
              - Developing and debugging services locally
              - Events in Stackdriver
              - Get a Shell to a Running Container
              - Logging Using Elasticsearch and Kibana
              - Logging Using Stackdriver
              - Monitor Node Health
              - Resource metrics pipeline
              - Tools for Monitoring Resources
              - Troubleshoot Applications
              - Troubleshoot Clusters

10. Extend Kubernetes
         - Understand advanced ways to adapt your Kubernetes cluster to 
           the needs of your work environment.
              - Configure the Aggregation Layer
              - Use Custom Resources
              - Set up an Extension API Server
              - Configure Multiple Schedulers
              - Use an HTTP Proxy to Access the Kubernetes API
              - Set up Konnectivity service

11. TLS
         - Understand how to protect traffic within your cluster using 
           Transport Layer Security (TLS).
              - Configure Certificate Rotation for the Kubelet
              - Manage TLS Certificates in a Cluster
              - Manual Rotation of CA Certificates

12. Manage Cluster Daemons
         - Perform common tasks for managing a DaemonSet, 
           such as performing a rolling update.
              - Perform a Rolling Update on a DaemonSet
              - Perform a Rollback on a DaemonSet

13. Service Catalog
         - Install the Service Catalog extension API.
              - Install Service Catalog using Helm
              - Install Service Catalog using SC

14. Networking
         - Learn how to configure networking for your cluster.
                - Validate IPv4/IPv6 dual-stack

15. Extend kubectl with plugins
         - Extend kubectl by creating and installing kubectl plugins.

16. Manage HugePages
         - Configure and manage huge pages as a schedulable resource in a cluster.
         - Kubernetes supports the allocation and consumption of pre-allocated huge pages by applications in a Pod

17. Schedule GPUs
         - Configure and schedule GPUs for use as a resource by nodes in a cluster.

```
