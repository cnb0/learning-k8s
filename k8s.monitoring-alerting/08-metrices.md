## K8s Metrices 
```
1. Node status and consumption
$kubectl get nodes
$kubectl get -o wide nodes

The output lists, the underlying OS-IMAGE, internal IP, and other useful information

NAME STATUS ROLES AGE VERSION INTERNAL-IP EXTERNAL-IP OS-IMAGE KERNEL-VERSION CONTAINER-RUNTIME
aks-agentpool-26533852-0 Ready agent 34d v1.11.5 10.240.0.4 <none> Ubuntu 16.04.5 
  LTS   4.15.0-1036-azure   docker://3.0.1


2. find out which nodes are consuming the most resources -
   It shows the CPU and memory usage of the nodes:
  $kubectl top nodes

3. From Cloud provider  UI -   Cluster , Nodes , Controllers , Container insights
  
  - check Container metrics, logs, and environmental variables
  - Logs are tied up with kube events 
  
  
  - kubectl events to monitor the application
  - logs  are to debug the applications
  - Kubernetes metrics for the operational monitoring of your deployments
  - AKS metrics and environment variables, as well as logs with log filtering. 
     set alerts on any metric that you would like to be notified of by leveraging Azure Insights.

```
