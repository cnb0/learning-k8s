## Use cases of Kubernetes monitoring
```

A Kubernetes cluster has multiple components and layers, and across each of them we will find different 
failure points that we need to monitor. 

- find out which nodes are consuming the most resources -
            It shows the CPU and memory usage of the nodes:
                        $ kubectl top nodes
- From Cloud Provider UI - Cluster,Nodes,Controllers,Container insights
  
  - Check container metrics, logs, and environmental variables
  - Logs are tied up with kube events 
  - kubectl events to monitor the application
  - logs  are to debug the applications
  - Kubernetes metrics for the operational monitoring of your deployments
  
  - AKS metrics and environment variables, as well as logs with log filtering. 
    set alerts on any metric that you would like to be notified of by leveraging 
    Azure Insights.

These are some typical use cases for Kubernetes monitoring.

1.Monitoring Kubernetes clusters and nodes
2.Monitoring Kubernetes deployments and pods
3.Monitoring Kubernetes applications

1. Monitoring Kubernetes clusters and nodes
            - By monitoring the cluster, you get an across-the-board view of the
              overall platform health and capacity. 
     
     Specific use cases can be among the following:

              - Cluster resource usage: 
                        - is the cluster infrastructure underutilized? Or are we over capacity?
              - Project and team chargeback: 
                         - what is each project or team resource usage?
              - Node availability and health: 
                         - are enough nodes available to replicate our applications? Are we going to
                                 run out of resources?
      
2. Monitoring Kubernetes deployments and pods
            - Looking at the Kubernetes constructs like namespaces, deployments, ReplicaSets or DaemonSets, 
               we can understand whether our applications have been properly deployed. For example:

                 - Missing and failed pods: 
                            - Are the pods running for each of our applications? How many pods are dying?
                 - Running vs. desired instances: How many instances for each service are actually ready? 
                             - How many do you expect to be ready?
                 - Pod resource usage against requests and limits: 
                             - Are CPU and memory requests and limits set? 
                               What is the actual usage against those?

3.Monitoring Kubernetes applications
          - But at the end of the day, your applications are what matter most.
            What is it that you want to look at here? 
            This is the part which is similar to what you may be used to:

          Application availability: 
                - is the application responding?
          Application health and performance: 
                - how many requests do we have? What’s the responsiveness or latency? 
                  Are we having any errors?
```
