
## Best practices Monitoring Kubernetes in production
```
 ![alt text](./k8s. .png "alerting on")

- Monitoring Kubernetes, both the infrastructure platform and the running container workloads, 
- Traditional monitoring tools and processes aren’t adequate, as they do not provide 
  visibility into dynamic container environments.

- Best practices for alerting on Kubernetes platform and orchestration, including PromQL alerts .
- Effective alerting is at the bedrock of a monitoring strategy. 
- With the shift to orchestrated container environments and Kubernetes, your alerting strategy will need to evolve as well.

- k8s is designed to manage service-oriented applications using containers distributed across clusters of hosts. 
- k8s provides mechanisms for application deployment, scheduling, updating, service discovery and scaling
-  dramatically simplify the act of deploying your application in containers – and across clouds
  
- Challenges in managing application performance, 
               - gaining visibility into services, and 
               - your typical monitoring -> alerting -> troubleshooting workflow

 - Kubernetes increases infrastructure complexity
 - Microservices architecture
 - Cloud-native explosion and scale requirements
 -  It’s hard to see what’s inside containers               


- Use cases of Kubernetes monitoring
            - A Kubernetes cluster has multiple components and layers 
            - Across each of them we will find different failure points that we need to monitor

      - Monitoring Kubernetes clusters and nodes
            - By monitoring the cluster, you get an across-the-board view of the overall platform health and capacity

                - Cluster resource usage: is the cluster infrastructure underutilized? Or are we over capacity?
                - Project and team chargeback: what is each project or team resource usage?
                - Node availability and health: are enough nodes available to replicate our applications? 
                  Are we going to run out of resources?

      - Monitoring Kubernetes deployments and pods
            - Looking at the Kubernetes constructs like namespaces, deployments, ReplicaSets or DaemonSets, 
               we can understand whether our applications have been properly deployed. For example:
               - Missing and failed pods       
                        -  Are the pods running for each of our applications? How many pods are dying?
               - Running vs. desired instances 
                        - How many instances for each service are actually ready? How many do you expect to be ready?
               - Pod resource usage against requests and limits 
                        - Are CPU and memory requests and limits set? What is the actual usage against those?
     - Monitoring Kubernetes applications
                - Application availability 
                        - is the application responding?
                - Application health and performance
                        -  how many requests do we have? What’s the responsiveness or latency? Are we having any errors?

- Kubernetes monitoring tools
        - cadvisor and heapster
        
        - Kubernetes metrics server
            - Starting from Kubernetes 1.8, the resource usage metrics coming from the kubelets and cadvisor
              are available through the Kubernetes metrics server API the same way Kubernetes API is exposed.
            - This service doesn’t allow us to store values over time either, and lacks visualization or analytics. 
            - Kubernetes metrics server is used for Kubernetes advanced orchestration like Horizontal Pod Autoscaler for autoscaling.

        - Kubernetes Dashboard
            - Kubernetes Dashboard gives you a consistent way to visualize some of this basic data, 
              with only basic CPU / memory data available
            
         - Kubernetes kube-state-metrics
            - The model is to take Kubernetes events and convert them to metric
            - This gives you a sense of the steps you’d take to build reasonable monitoring for your Kubernetes environment
            -  It’s an add-on service that runs alongside your Kubernetes metrics-server that
                polls the Kubernetes API and translates characteristics about your Kubernetes constructs into metrics
                        - How many replicas did I schedule? And how many are currently available?
                        - How many pods are running / stopped / terminated?
                        - How many times has this pod restarted?

        - Kubernetes liveness and readiness probes
            - Kubernetes probes perform the important function of regularly monitoring the health or availability of a pod. 
            - Kubernetes monitoring probes allows you to arbitrarily define “Liveness” through a request against an endpoint or running a command. 
        - Prometheus for Kubernetes monitoring
             - Prometheus is a time series database
             - Prometheus monitoring is an entire monitoring stack around Prometheus server that collects and stores the metrics. 
             - This includes Grafana for dashboarding, and often a number of exporters: 
                    small sidecar containers that transform services metrics into Prometheus metrics format
             - scale or RBAC or complaince is not fully supported 

        - Sysdig Monitor for Prometheus monitoring scale
            - Sysdig Monitor and Sysdig backend are able to store and query Prometheus native metrics and labels. 
            - users can use Sysdig in the same way that they use Prometheus. 
            - You can leverage Prometheus Query Language queries for dashboards and alerts, or the Prometheus API for scripted queries,
            - as part of a DevOps workflow. This way, your investments in the Prometheus ecosystem can be preserved and
              extended while improving scale and security. 
            - Users can take advantage of the troubleshooting, correlation and support that we provide as part 
              of Sysdig Monitor for a complete Prometheus monitoring solution.

    ```