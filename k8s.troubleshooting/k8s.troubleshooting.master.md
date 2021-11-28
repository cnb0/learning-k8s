
# k8s troubshooting scenarios

### Avoid installation issues

Planning and Installing

        •  Explain architectural decisions
        •  Select the install options
        •  Links for refences


Resource Management

        •  Learn what a resource is and its types
        •  Learn about Pod
        •  Troubleshoot resource management issues


Scenario – Insufficient Cluster Capacity

        Pod fails to get scheduled due to insufficient cluster capacity.
            •  Look at Pod related events, for an indication on resource shortage
            •  Look at node details, to find out allocated and available capacity
            •  Reduce Pod resource requirement or add more capacity


Pod Security Policy

        troubleshooting of issues with PSP.
            •  Check Pod related events for indication of PSP errors
            •  Check policy, role, and role bindings
            •  Create and modify the role and role bindings


Troubleshooting Networking Issues

        Understand Kubernetes network model and basic network info gathering.
            •  Get an overview of the Kubernetes network model
            •  Understand the troubleshooting steps
            •  Perform Calico specific debugging


Scenario – Deploy the Debug Tool

        network debug tool and it’s usage in troubleshooting.
            •  Use sample YAML
            •  Use ‘dig’ command


DNS or Pod-to-Service Communication Issues

        Pods unable to resolve network service.
            •  Deploy network debug tool in Pod network. and run basic network debug commands
            •  Look at network settings on the host
            •  Modify Kubernetes network settings or host network settings as required


Scenario – Kubernetes Dashboard Loading Is Slow

        Kubernetes dashboard loading is slow.
            •  Look at dashboard Pods and logs for any errors
            •  Look at the node running dashboard Pods for resource starvation, stats, and errors
            •  Modify Kubernetes network settings or host network settings as required


Multi-Platform Kubernetes Cluster

        Introduction to multi-platform cluster, scheduling, node selectors, and node affinity.
            •  Understand what Kubernetes multiplatform clusters are
            •  Learn about Kubernetes scheduling primitives
            •  Explore node selectors and node affinity


Taints and Tolerations

        Introduction to taints and tolerations.
            •  Introduction to both
            •  Look at Pod details and related events
            •  Look at further Pod details and related events


Common Issues with Multi-Platform Clusters

        Explore the Pod restarting and in CrashLoopBackOff state post deployment, in a multi-platform cluster.
            •  Look at Pod related events
            •  Look at Pod logs
            •  Modify Pod specs for targeted deployment


Scenario – Pending State Post-Deployment

        Pod status remains in pending state.
            •  Look at Pod details and related events
            •  Look at cluster node details
            •  Modify Pod specs or update cluster as required

 

Introduce the options available for managing the Kubernetes cluster.

            •  Understand the lifecycle operations
            •  Have a look on Kubernetes dashboard
            •  Explore the kubectl command

 

Creating and Managing Kubernetes Objects  using kubectl CLI.

            •  Understand different approaches for object creation
            •  Explore kubectl create command
            •  Implement kubectl apply and delete commands


Viewing Kubernetes Resources Using Kubectl CLI

            •  Have a look at different examples
            •  Explore the usage of the get command
            •  Explore the usage of the describe command

Modifying Kubernetes Resources Using Kubectl CLI

            •  Explore examples of Kubernetes object modification using the CLI
            •  Understand an example where a Pod getting OOMKilled due to low memory limit


Common issue when mixing declarative and imperative approaches with kubectl CLI.

            •  Understand an example where one person creates and scales the development
            •  Update to the container image

 
Kubernetes Dashboard Overview

            •  Explore the dashboard
            •  Explore the OpenShift dashboard


Introduction to logging in Kubernetes, and how to use basic logging in Kubernetes.

            •  Types of Kubernetes logging architecture
            •  Know about basic logging

 
Cluster-Level Logging in Kubernetes with details on logging patterns and visualizations.
         
            •  Understand cluster-level logging

 
Common Issues Related to Logging

        Root cause missing logs in Kubernetes logging infrastructure.
            •  Look at basic Pod logs
            •  Look at node details
            •  Make node or Pod changes as required


Resource Allocation and Configuration Aspects of the Logging Backend

            Modifying the logging configuration as per requirement.
            •  Explore the dashboard
            •  Modify log on CLI

 
 
Kubernetes Monitoring

        Monitoring and alerting in Kubernetes cluster, with brief details on RED and USE method.
            •  Understand the monitoring architecture and its steps
            •  Know the USE and RED method

 
Key resources and metrics to monitor the Kubernetes cluster.

            •  Know the key metrics to monitor – node, cluster, and pod
            •  View the metrics data
            •  Explore Grafana based monitoring dashboard

Alerting in Kubernetes and the creation of sample alerts.

            •  Know what alerting in Kubernetes cluster with Prometheus is
            •  Explore the Prometheus console
            •  Configure a new alert

Working with Replication Controllers


            •  Creating the replica set YAML Pod
            •  Limit the number of replicas
            •  Create service with N replicas

Deployment with Replica Sets – Next - Generation Replication Controllers

            •  Create service with N replicas
            •  Get information about running replicas

Running Jobs – Run Once and Forget

            •  Submit job to K8S
            •  Specify restart strategy
            •  Gather info about the running job

Using Deployments

            •  Redeploy application
            •  Use rolling update strategy
            •  Analyze instances

Using DaemonSet to Run Code on Multiple Nodes

            •  Create DaemonSet YAML definition
            •  Analyze selectors

Targeting Deployment to Specific Nodes

            •  Deploy using DaemonSet
            •  Specify rollout of the service
            •  Get the DaemonSet running

Setting Resource Limits for Application

            •  Create autoscaling rule
            •  Specify minimum and maximum limit
            •  Create dynamic auto scale rule

Capabilities and Security Policies

            •  Create cert and key
            •  Create Pod that uses security
            •  Validate the same

Troubleshooting Application Deployment Issues

            •  Deploy the Pod
            •  Get detailed info about state of the Pod
            •  Get the logs

Handling Out Of Memory Errors

            •  Create Pod definition with memory limit
            •  Start Pod with limit
            •  Analyze memory limit of running pod

Handling Garbage Collection and Eviction Thresholds

            •  Look at eviction threshold available in k8s
            •  See the ways of setting threshold for different type of limits

Services for Kubernetes Explained

            •  Create the load balancing service
            •  Add deployment
            •  Expose service and deployment on K8s

Service Discovery and Routing

            •  Create two independent services
            •  Expose both using k8s service discovery
            •  Test the connection between services


Ingress Resources Explained

            •  Add ingress to service
            •  Get IP and ports
            •  Use curl to put ingress traffic to the service

Troubleshooting Application Access Issues

            •  Create service with N instances
            •  Troubleshoot the access problem
            •  Solve problem with exposing service deployment

