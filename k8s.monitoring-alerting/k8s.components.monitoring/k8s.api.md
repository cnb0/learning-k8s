##  Monitor k8s API

  ```

- The  API server is a foundational component of the Kubernetes control plane. 
- All the communication between the cluster components is done via kube-apiserver
- we should be aware of what is going on in your control plane components & 
  learn how to leverage that in your favour when problems come, and they will
- monitoring of all the kubernetes API components can be as important as 
  monitoring your workloads and applications running inside the cluster.

- Monitoring kube-apiserver will let you detect and troubleshoot 
               - latency 
               - errors 
               - validate the service performs as expected
    - collect the most important metrics from the kube-apiserver and
      use them to monitor this service
    
      - All of the services running inside the cluster use API
        interface to communicate between each other 
        
      - The entirety of user interaction is handled through the API  
            - kubectl is a wrapper to send requests to the API 
            - kubectl uses HTTP to connect to the API server 
            - rest of the control plane components use gRPC 
            - We should be ready to monitor both channels (http, gRPC).

- Golden Signals approach to monitor API server health and performance:
              - Latency
              - Request rate
              - Errors
              - Saturation
    
- Getting the metrics to monitor kube-apiserver
         - API server has been instrumented and it exposes Prometheus metrics by default
            providing monitoring metrics like latency, requests, errors and etcd cache status.

         - This endpoint(/metrics can be easily scraped, obtaining useful information without 
            the need of additional scripts or exporters.

         - The API server requires authentication to make a request to /metrics endpoint, 
            so you need to get credentials with privileges If you are running Prometheus 
            inside the cluster 

         - we can authenticate using a service account, bound to a ClusterRole, 
           granting GET requests to /metrics endpoint

                                apiVersion: rbac.authorization.k8s.io/v1
                                kind: ClusterRole
                                metadata:
                                    labels:
                                        app: monitor
                                        component: server
                                    name: monitor
                                rules:
                                 - nonResourceURLs:
                                    - /metrics
                                   verbs:
                                    - get
            - This way, we can access /metrics endpoint using the bearer token from the service account, 
              present in the pod, in 
                        - /var/run/secrets/kubernetes.io/serviceaccount. 

            - We can test the authentication by executing this shell command from within the Prometheus pod
                - curl  https://kubernetes.default.svc/metrics
                        -H "Authorization: Bearer 
                         $(cat /var/run/secrets/kubernetes.io/serviceaccount/token)" 
                        --cacert /var/run/secrets/kubernetes.io/serviceaccount/ca.crt

- Configuring Prometheus to scrape the Kubernetes API server endpoint can be done by job to targets

- Monitor  API server: What to look for?
        - we can use Golden Signals to monitor API server. 

        - these metrics are latency, requests, errors and saturation 

        - how busy the server is towards its maximum capacity with current resources

        - Golden Signals is a technique used to monitor a service 
          through a number of metrics,that give insights on 
          how it’s performing for the consumers 
           - kubectl users and the internal cluster components. 
    
   - It’s a good idea to use percentiles to understand the latency spread
   
        - Request rate: 
            - The metric apiserver_request_total can be used to monitor the 
              requests to the service, from where they are coming, 
              to which service, which action and whether they were successful
            - you can get all the successful requests across the service
                  - apiserver_request_count counter
        
        - Errors: 
            - we can use the same query used for request rate, 
              but filter for 400 and 500 error codes
              
        - Saturation:
            -  We can monitor saturation through system resource consumption metrics 
               like CPU, memory and network I/O for this service.

- In addition to API server related metrics, we can access other relevant metrics. API server offers:
      -  From controller-manager:
                - controller manager - work queue addition rate: 
                    - How fast we are scheduling new actions to perform by controller.
                      These actions can include additions, deletions and modifications of any 
                       resource in the cluster (workloads, configmaps, services…).
                            - work queue latency
                                 - How fast is the controller-manager performing these actions?
                            - work queue depth
                                  - How many actions are waiting to be executed?
                -  From etcd:
                       - etcd cache entries: 
                             - How many query results have been cached?
                       - etcd cache hit/miss rate: 
                             - Is cache being useful?
                       - etcd cache duration: 
                             - How long are the cache results stored?
- examples of API issues
      - we can detect an increase of latency in the requests to the API.
      
      - This is typically a sign of overload in the API server. 
        Probably your cluster has a lot of load and the API server needs to be scaled out.

      - we can segment the metrics by type of request, by resource or verb. 
        This way you can detect where the problem is.
           Maybe you are having issues reading or writing to etcd and need to fix it.
      
      - You detect an increase in the depth and the latency of the work queue.
      
      - You are having issues scheduling actions. 
             - You should check that the scheduler is working.
             - Maybe some of your nodes are overloaded and you need to scale out your cluster. 
             - Maybe one node is having issues and you want to replace 
        
        
