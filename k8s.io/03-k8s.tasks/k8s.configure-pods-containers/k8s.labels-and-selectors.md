
### [Labels and Selectors](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/)

```
1. Labels 
        - Labels are key/value pairs that are attached to objects, such as pods. 
        - Labels are intended to be used to specify identifying attributes of objects that are meaningful and 
        relevant to users, but do not directly imply semantics to the core system. 
        - Labels can be used to organize and to select subsets of objects. 
        - Labels can be attached to objects at creation time and subsequently added and modified at any time. 
        - Each object can have a set of key/value labels defined. Each Key must be unique for a given object.
                            "metadata": {
                            "labels": {
                                "key1" : "value1",
                                "key2" : "value2"
                            }
                            }

        - Labels allow for efficient queries and watches and are ideal for use in UIs and CLIs. 
        - Non-identifying information should be recorded using annotations.


        - Labels enable users to map their own organizational structures onto system objects in a loosely coupled fashion, 
        without requiring clients to store these mappings.

        - Service deployments and batch processing pipelines are often multi-dimensional entities 
        (e.g., multiple partitions or deployments, 
        - multiple release tracks, multiple tiers, multiple micro-services per tier). 
        - determined by the infrastructure rather than by users.

                Example labels:
                        "release" : "stable", "release" : "canary"
                        "environment" : "dev", "environment" : "qa", "environment" : "production"
                        "tier" : "frontend", "tier" : "backend", "tier" : "cache"
                        "partition" : "customerA", "partition" : "customerB"
                        "track" : "daily", "track" : "weekly"

        - label Key must be unique for a given object
        - kubernetes.io/ and k8s.io/ prefixes are reserved for Kubernetes core components.

                    metadata:
                        name: label-demo
                        labels:
                            environment: production
                            app: nginx

2. Label Selectors
        - Unlike names and UIDs, labels do not provide uniqueness. 
          In general, we expect many objects to carry the same label(s).

        - Via a label selector, the client/user can identify a set of objects. 
        - The label selector is the core grouping primitive in Kubernetes.

        - The API currently supports two types of selectors: 
                        - equality-based 
                        - set-based. 
             - A label selector can be made of multiple requirements which are comma-separated.
             - In the case of multiple requirements, all must be satisfied so the comma separator
               acts as a logical AND (&&) operator
                    - Equality-based requirement
                           - Equality- or inequality-based requirements allow filtering by label keys and values. 
                             Matching objects must satisfy all of the specified label constraints
                                    
                                    environment = production
                                    tier != frontend
                               
                           - The former selects all resources with key equal to environment and value equal to production. 
                           - The latter selects all resources with key equal to tier and value distinct from frontend, and 
                             all resources with no labels with the tier key. 
                           - One could filter for resources in production excluding frontend  using the comma operator: 
                                    environment=production,tier!=frontend 

                           - One usage scenario for equality-based label requirement is for Pods to specify node selection criteria

                                             spec:
                                                containers:
                                                    - name: cuda-test
                                                    image: "k8s.gcr.io/cuda-vector-add:v0.1"
                                                    resources:
                                                        limits:
                                                        nvidia.com/gpu: 1
                                                nodeSelector:
                                                    accelerator: nvidia-tesla-p100

                    - Set-based requirement
                            - Set-based label requirements allow filtering keys according to a set of values. 
                            - Three kinds of operators are supported: in,notin and exists (only the key identifier). For example:

                                    environment in (production, qa)
                                    tier notin (frontend, backend)
                                    partition
                                    !partition
                            - Set-based requirements are more expressive.  
                                - For instance, they can implement the OR operator on values:
                                      
                                       $ kubectl get pods -l 'environment in (production, qa)'
                                        
                                 - or restricting negative matching via exists operator:

                                       $ kubectl get pods -l 'environment notin (frontend)'

       

3. API - LIST and WATCH filtering
             - LIST and WATCH operations may specify label selectors to filter the sets of objects returned using a query parameter.
                Both requirements are permitted (presented here as   they  would appear in a URL query string):

                    - equality-based requirements: ?labelSelector=environment%3Dproduction,tier%3Dfrontend
                    - set-based requirements: ?labelSelector=environment+in+%28production%2Cqa%29%2Ctier+in+%28frontend%29

             -  Both label selector styles can be used to list or watch resources via a REST client. 
                   For example, targeting apiserver with kubectl and using equality-based one may write:

                    - Both label selector styles can be used to list or watch resources via a REST client. 
                        - For example, targeting apiserver with kubectl 
                            
                            using equality-based one may write:

                            $ kubectl get pods -l environment=production,tier=frontend
                          or
                            using set-based requirements:

                            $ kubectl get pods -l 'environment in (production),tier in (frontend)'  
             
 4. Set references in API objects   
               - Kubernetes objects, such as services and replicaSet use label selectors 
                 to specify sets of other resources, such as pods

 5. Resources that support set-based requirements    
           - Job, Deployment, ReplicaSet, and DaemonSet, support set-based requirements
                    - selector:
                        matchLabels:
                            component: redis
                        matchExpressions:
                            - {key: tier, operator: In, values: [cache]}
                            - {key: environment, operator: NotIn, values: [dev]}

           - matchLabels is a map of {key,value} pairs. 
                A single {key,value} in the matchLabels map is equivalent to an element of matchExpressions, 
                whose key field is "key", the operator is "In", and 
           - the values array contains only "value". matchExpressions is a list of pod selector requirements. 
           - Valid operators include In, NotIn, Exists, and DoesNotExist. 
           - The values set must be non-empty in the case of In and NotIn. 
           - All of the requirements, from both matchLabels and matchExpressions are ANDed together 
              they must all be satisfied in order to match
              
  6. Service and ReplicaSet

        - The set of pods that a service targets is defined with a label selector. 
        - Similarly, the population of pods that a replicaset should manage is also defined with a label selector.

        - Labels selectors for both objects are defined in json or yaml files using maps, and 
          only equality-based requirement selectors are supported
                
                selector:
                    component: redis

                - this selector is equivalent to component=redis or component in (redis)

  6. Selecting sets of nodes 
         - One use case for selecting over labels is to constrain the set of nodes onto which a pod can schedule

```