
[k8s Pod v1 Core](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.18/#pod-v1-core)

```
- Pod v1 Core
        - Read Operations
                   - read the specified Pod
                                - HTTP Request : GET /api/v1/namespaces/{namespace}/pods/{name}

                   - list or watch objects of kind Pod
                                - HTTP Request : GET /api/v1/namespaces/{namespace}/pods
                                - HTTP Response :
                                             200 - Pod OK

                   - List All Namespaces -list or watch objects of kind Pod
                                - HTTP Request :   GET /api/v1/pods
              
        
        - Write Operations
                   - Create - create a Pod
                                - HTTP Request : POST /api/v1/namespaces/{namespace}/pods
                                - HTTP Response :
                                            200 - Pod OK
                                            201 - Pod Created
                                            202 - Pod Accepted

                   - Create Eviction - create eviction of a Pod 
                                - HTTP Request : POST /api/v1/namespaces/{namespace}/pods/{name}/eviction
                                - HTTP Response :
                                                    200 - Eviction OK
                                                    201 - Eviction Created
                                                    202 - Eviction Accepted

                   - Patch - partially update the specified Pod
                                - HTTP Request : PATCH /api/v1/namespaces/{namespace}/pods/{name}

                   - Replace - replace the specified Pod
                                - HTTP Request : PUT /api/v1/namespaces/{namespace}/pods/{name}
                   
                   - Delete - delete a Pod
                                - HTTP Request : DELETE /api/v1/namespaces/{namespace}/pods/{name}
                   
                   - Delete Collection - delete collection of Pod
                                - HTTP Request : DELETE /api/v1/namespaces/{namespace}/pods
        
        - Status Operations
                   - Patch Status  
                                - HTTP Request - PATCH /api/v1/namespaces/{namespace}/pods/{name}/status
                 
                   - Read Status -  read status of the specified Pod
                                - HTTP Request : GET /api/v1/namespaces/{namespace}/pods/{name}/status
                 
                   - Replace Status - replace status of the specified Pod
                                - HTTP Request :PUT /api/v1/namespaces/{namespace}/pods/{name}/status
        
        - Proxy Operations
                   - Create Connect Portforward - connect POST requests to portforward of Pod
                                - HTTP Request - POST /api/v1/namespaces/{namespace}/pods/{name}/portforward
                   - Create Connect Proxy
                   - Create Connect Proxy Path
                   - Delete Connect Proxy
                   - Delete Connect Proxy Path
                   - Get Connect Portforward
                   - Get Connect Proxy
                   - Get Connect Proxy Path
                   - Head Connect Proxy
                   - Head Connect Proxy Path
                   - Replace Connect Proxy
                   - Replace Connect Proxy Path

        - Misc Operations
                   - Read Log -  read log of the specified Pod
                             - HTTP Request - GET /api/v1/namespaces/{namespace}/pods/{name}/log
- PodTemplate v1 core
         - Write Operations
                   - Create
                   - Patch
                   - Replace
                   - Delete
                   - Delete Collection
         - Read Operations
                   - Read
                   - List
                   - List All Namespaces
         - PodTemplateSpec v1 core  
               Appears In:
                            - DaemonSetSpec [apps/v1]
                            - DeploymentSpec [apps/v1]
                            - JobSpec [batch/v1]
                            - PodTemplate [core/v1]
                            - ReplicaSetSpec [apps/v1]
                            - StatefulSetSpec [apps/v1]

- PodDisruptionBudget v1beta1 policy
                   - Write Operations
                   - Read Operations
                   - Status Operations
```
