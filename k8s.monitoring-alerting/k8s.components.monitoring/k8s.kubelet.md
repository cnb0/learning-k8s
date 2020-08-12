
## Monitor Kubelet 

```

- Kubelet is a very important service inside Kubernetes’ control plane. 
- It’s the component that cares that the containers described by pods are running in the nodes.
  Kubelet works in a declarative way by receiving PodSpecs and  
  ensuring that the current state matches desired pods.
- Monitoring Kubelet is fundamental, as it is a key piece in the cluster operation. 
- All of the communication with the container runtime is done through Kubelet.
  It is the connection between Kubernetes and the OS running behind.

Some issues in your Kubernetes cluster that appear to be random can be explained by a problem in the Kubelet. Monitoring kubelet metrics can save you time when these problems come, and they will.

- Kubelet has some differences with other control plane components as it is the 
  only one that runs over the host OS in the nodes, not as a Kubernetes entity

- Getting metrics from Kubelet
    - Kubelet has been instrumented and it exposes Prometheus metrics by default in the port 10255 of the host, 
    - it provides information about pods volumes and internal operations. 
    - This endpoint can be easily scraped, obtaining useful information without the 
      need for additional scripts or exporters.

    - You can scrape Kubelet metrics accessing the port in the node directly without authentication.
            curl  http://[Node_Internal_IP]:10255/metrics

        - If we want to configure a Prometheus to scrape Kubelet, we  add this job to our targets:
            
 - Monitor Kubelet: what to look for?
    - Number of kubelet instances: 
        - This value will give an idea of the general health of the kubelet in the nodes. 
          The expected value is the number of nodes in the cluster.
    - Number of pods and containers running
    - Number of volumes
        - In the system, kubelet mounts the volumes indicated by the controller 
          so it can provide information on them.This can be useful to diagnose issues with volumes that are 
          not being mounted when a pod is recreated in a statefulSet. 
        - It provides two metrics than can be represented together 
          the number of desired volumes and the number of volumes actually mounted
    - Config errors: This metric acts as a flag for configuration errors in the node

- Golden signals of every operation performed by kubelet (Operation rate, operation error rate and operation duration). 
  Saturation can be measured with system metrics. 
   - Kubelet offers detailed information of the operations performed by the daemon
   
   - kubelet_runtime_operations_total       
            - Total count of runtime operations of each type.
   - kubelet_runtime_operations_errors_total
        - Count of errors in the operations
        - This can be a good indicator of low level issues in the node, 
          like problems with container runtime.
    - kubelet_runtime_operations_duration_seconds_bucket: 
        - Duration of the operations. Useful to calculate percentiles.
    - Pod start rate and duration
        - This could indicate issues with container runtime or with access to images.
           - kubelet_pod_start_duration_seconds_count
           - kubelet_pod_worker_duration_seconds_count
           - kubelet_pod_start_duration_seconds_bucket
           - Kubelet_pod_worker_duration_seconds_bucket

    - Storage golden signals (operation rate, error rate and duration).
            - storage_operation_duration_seconds_count
            - storage_operation_errors_total
            - storage_operation_duration_seconds_bucket

    - cgroup manager operation rate and duration
            - kubelet_cgroup_manager_duration_seconds_count
            - kubelet_cgroup_manager_duration_seconds_bucket
    - Pod Lifecycle Event Generator (PLEG)
            - kubelet_pleg_relist_duration_seconds_count
            - kubelet_pleg_relist_interval_seconds_bucket
            - kubelet_pleg_relist_duration_seconds_bucket

- Examples of issues in Kubelet
    - Pods are not starting
        - This is typically a sign of Kubelet having problems connecting
          to the container runtime running below. 
          - Check for the pod start rate and duration metrics to check 
            if there is latency creating the containers or 
            if they are in fact starting.
    - A node doesn’t seem to be scheduling new pods
        - Check the Kubelet job number. There is a chance that Kubelet has died in a node
          and it is unable to schedule pods
    - Kubernetes seems to be slow performing operations
       - Check all the golden signals in Kubelet metrics. 
         It may have issues with storage, latency communicating with the 
         container runtime engine or load issues


```
