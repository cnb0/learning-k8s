
### DevOps 5

An advanced exploration of the skills and knowledge required for operating Kubernetes clusters, 
with a focus on metrics gathering and alerting, 
with the goal of making clusters and applications inside them autonomous through self-healing and self-adaptation.

- Key Features -
    - Overview of advanced core Kubernetes techniques,-oriented towards monitoring and alerting.
    
    - Takes a deep dive into monitoring, alerting, logging, auto-scaling, and 
      subjects aimed at making clusters resilient, self-sufficient, and self-adaptive

    - Discusses how to customise and create dashboards and alerts

Book Description
    - Continuous Deployment to Kubernetes,  journey to monitoring, logging, and autoscaling Kubernetes.

    - Monitoring, Logging, and Auto-Scaling Kubernetes: 
       - Making Resilient, Self-Adaptive, And Autonomous Kubernetes Clusters  helps you build a full DevOps Toolkit. 
       -  helps to able to operate Kubernetes clusters, with a focus on metrics gathering and alerting 
          with the goal of making clusters and applications inside them autonomous through self-healing and self-adaptation.
       -  Dive into the creation of self-adaptive and self-healing systems within Kubernetes.

 you will learn
    - Autoscaling Deployments and Statefulsets based on resource usage
    - Autoscaling nodes of a Kubernetes cluster
    - Debugging issues discovered through metrics and alerts
    - Extending HorizontalPodAutoscaler with custom metrics
    - Visualizing metrics and alerts
    - Collecting and querying logs



```

Autoscaling Deployments and StatefulSets Based on Resource Usage

                Creating a cluster
                Observing Metrics Server data
                Auto-scaling Pods based on resource utilization
                To replicas or not to replicas in Deployments and StatefulSets?


Auto-scaling Nodes of a Kubernetes Cluster

                Creating a cluster
                Setting up Cluster Autoscaling
                        Setting up Cluster Autoscaler in GKE
                        Setting up Cluster Autoscaler in EKS
                        Setting up Cluster Autoscaler in AKS
                Scaling up the cluster
                The rules governing nodes scale-up
                Scaling down the cluster
                The rules governing nodes scale-down
                Can we scale up too much or de-scale to zero nodes?
                Cluster Autoscaler compared in GKE, EKS, and AKS

Collecting and Querying Metrics and Sending Alerts

                        Creating a cluster
                        Choosing the tools for storing and querying metrics and alerting
                        A quick introduction to Prometheus and Alertmanager
                        Which metric types should we use?
                        Alerting on latency-related issues
                        Alerting on traffic-related issues
                        Alerting on error-related issues
                        Alerting on saturation-related issues
                        Alerting on unschedulable or failed pods
                        Upgrading old Pods
                        Measuring containers memory and CPU usage
                        Comparing actual resource usage with defined requests
                        Comparing actual resource usage with defined limits

Debugging Issues Discovered Through Metrics and Alerts

                        Creating a cluster
                        Facing a disaster
                        Using instrumentation to provide more detailed metrics
                        Using internal metrics to debug potential issues


Extending HorizontalPodAutoscaler with Custom Metrics

                        Creating a cluster
                        Using HorizontalPodAutoscaler without metrics adapter
                        Exploring Prometheus Adapter
                        Creating HorizontalPodAutoscaler with custom metrics
                        Combining Metric Server data with custom metrics
                        The complete HorizontalPodAutoscaler flow of events
                        Reaching nirvana


Visualizing Metrics and Alerts

                        Creating a cluster
                        Which tools should we use for dashboards?
                        Installing and setting up Grafana
                        Importing and customizing pre-made dashboards
                        Creating custom dashboards
                        Creating semaphore dashboards
                        A better dashboard for big screens
                        Prometheus alerts vs. Grafana notifications vs. semaphores vs. graph alerts


Collecting and Querying Logs

                        Creating a cluster
                        Exploring logs through kubectl
                        Choosing a centralized logging solution
                        Exploring logs collection and shipping
                        Exploring centralized logging through Papertrail
                        Combining GCP Stackdriver with a GKE cluster
                        Combining AWS CloudWatch with an EKS cluster
                        Combining Azure Log Analytics with an AKS cluster
                        Exploring centralized logging through Elasticsearch, Fluentd, and Kibana
                        Switching to Elasticsearch for storing metrics
                        What should we expect from centralized logging?