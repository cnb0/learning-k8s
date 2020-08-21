
## Monitor Kubelet 
 
 ```
- kubelet  cares that the containers described by pods are running in the nodes.
  Kubelet works in a declarative way by receiving PodSpecs &  
  ensuring that the current state matches desired pods.
- monitoring kubelet is fundamental, as it is a key piece in the cluster operation 
- All of the communication with the CRI container runtime is done through kubelet.
  It is the connection between Kubernetes and the OS running behind.

- Kubelet  is the only one that runs over the host OS in the nodes, 
  not as a kubernetes entity

- kubelet issues examples
    - Pods are not starting
        - sign of Kubelet having problems connecting
          to the container runtime running below. 
          - Check for the pod start rate and duration
          - Metrics to check 
              - if there is latency creating the containers or 
              - if they are in fact starting.
              
    - A node doesn’t seem to be scheduling new pods
        - check the kubelet job number.
        - there is a chance that kubelet has died in a node
          and it is unable to schedule pods
          
    - Kubernetes seems to be slow performing operations
       - check all the golden signals in kubelet metrics. 
            - It may have issues with storage, 
            - latency communicating with the CRI or load issues

- getting METRICES from Kubelet
    - kubelet has been instrumented and
    - It exposes Prometheus metrics by default in the port 10255 of the host 
    - It provides information about pods volumes and internal operations. 
    - This endpoint can be easily scraped, obtaining useful information without the 
      need for additional scripts or exporters.

    - You can scrape Kubelet metrics accessing the port 
      in the node directly without authentication.
            curl  http://[Node_Internal_IP]:10255/metrics

    - If we want to configure a Prometheus to scrape Kubelet, we  add this job to our targets:
            
 - Monitor Kubelet: what to look for?
    - number of kubelet instances: 
        - This value will give an idea of the general health of the kubelet in the nodes. 
        - The expected value is the number of nodes in the cluster.
          
    - number of pods and containers running
    - number of volumes
        -  kubelet mounts the volumes indicated by the controller 
           so it can provide information on them.
         - This can be useful to diagnose issues with volumes that are 
           not being mounted when a pod is recreated in a statefulSet. 
           
        -  It provides two metrics than can be represented together 
            - # of volumes 
                  - # of desired volumes and the number of volumes actually mounted
            - config errors
                  - This metric acts as a flag for configuration errors in the node

- Golden signals of every operation performed by kubelet 
           - operation (RED)
                 - rate
                 - error rate 
                 - duration
            - saturation can be measured with system metrics 
  
   - kubelet offers detailed information of the operations performed by the daemon
          - total count of runtime operations of each type 
                  - kubelet_runtime_operations_total       
          - Count of errors in the operations 
              - good indicator of low level issues in the node, 
                like problems with container runtime.
                  - kubelet_runtime_operations_errors_total
           
          - Duration of the operations. Useful to calculate percentiles.
              - kubelet_runtime_operations_duration_seconds_bucket: 
          - Pod start rate and duration
              - To indicate issues with container runtime or 
                 with access to images.
                   - kubelet_pod_start_duration_seconds_count
                   - kubelet_pod_worker_duration_seconds_count
                   - kubelet_pod_start_duration_seconds_bucket
                   - Kubelet_pod_worker_duration_seconds_bucket

    - storage RED golden signals (operation rate, error rate and duration).
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



```
