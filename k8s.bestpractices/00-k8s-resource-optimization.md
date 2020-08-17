# k8s Resource Management and Scaling

```
- Kubernetes scheduling mechanisms
- Affinities between resources and workloads
- Scaling smoothly with Kubernetes
- Arranging cluster resources
- Node administration


- Kubernetes is pretty good at running workloads for you in a reliable, efficient way with
  no real need for manual intervention. 
  Providing you give the scheduler accurate estimates of your containers’ resource needs, 
  you can largely leave Kubernetes to get on with it.

- Understanding how Kubernetes manages resources is key to building and running your cluster correctly. 
  The most important points to take away:

          - Kubernetes allocates CPU and memory resources to containers on the basis of requests and limits.
          - A container’s requests are the minimum amounts of resources it needs to run. Its limits specify 
            the maximum amount it’s allowed to use.
          - Minimal container images are faster to build, push, deploy, and start. 
            The smaller the container, the fewer the potential security vulnerabilities.
          - Liveness probes tell Kubernetes whether the container is working properly. If a container’s 
            liveness probe fails, it will be killed and restarted.
          - Readiness probes tell Kubernetes that the container is ready and able to serve requests.
             If the readiness probe fails, the container will be removed from any Services that reference it, 
             disconnecting it from user traffic.
          - PodDisruptionBudgets let you limit the number of Pods that can be stopped at once
            during evictions, preserving high availability for your application.
          - Namespaces are a way of logically partitioning your cluster. 
            You might create a namespace for each application, or group of related applications.
          - To refer to a Service in another namespace, you can use a DNS address like this: SERVICE.NAMESPACE.
          - ResourceQuotas let you set overall resource limits for a given namespace.
          - LimitRanges specify default resource requests and limits for containers in a namespace.
          - Set resource limits so that your applications almost, but don’t quite exceed them in normal usage.
          - Don’t allocate more cloud storage than you need, and don’t provision high-bandwidth storage unless
            it’s critical for your application’s performance.
          - Set owner annotations on all your resources, and scan the cluster regularly for unowned resources.
          - Find and clean up resources that aren’t being used (but check with their owners).
          - Reserved instances can save you money if you can plan your usage long-term.
          - Preemptible instances can save you money right now, but be ready for them to vanish at short notice. 
          - Use node affinities to keep failure-sensitive Pods away from preemptible nodes.


- Scheduling workloads
            - Optimizing resource utilization
                - Kubernetes allocates pods to nodes is based on the supply and demand of resources
                - the smaller the difference between the cluster capacity and the actual usage, 
                the higher resource utilization we can obtain.
                - Resource types and allocations
                    - There are two core resource types that participate in the scheduling process,
                    namely CPU and memory
                    - also additional resources are ephemeral storage and huge pages. 
                    Vendor-specific resources such as GPU, FPGA, and NICs can be used by the Kubernetes scheduler 
                     with device plugins

                - The concept of limits addresses :
                    -  If a pod uses more than a certain percentage of CPU, it will be throttled (not killed)
                    -  If a pod reaches the memory limit, it will be killed and restarted

                - kubelet has --max-pods flag, --pods-per-core, which enforces the maximum pods a core can run

            - Quality of Service (QoS) classes
                - There are three different service classes in Kubernetes: BestEffort, Burstable, and Guaranteed. 
                - The classification depends on a pod's configuration on requests and limits:
                - BestEffort : 
                                - The pod belongs to BestEffort ,If both requests and limits across 
                                all containers in a pod are zero or unspecified
                - Burstable 
                              - If any container in a pod requests at least one type of resource, regardless of the quantity, 
                - Guaranteed 
                              - the pod is classified as Gauranteed, If the limits for all resources across all containers 
                                in a pod are set, and  the number of requests of the same type of resource equals the limits, 

            - Placing pods with constraints

                    - well-known labels provided on most Kubernetes platforms:
                            - kubernetes.io/hostname
                            - failure-domain.beta.kubernetes.io/zone
                            - failure-domain.beta.kubernetes.io/region
                            - beta.kubernetes.io/instance-type
                            - beta.kubernetes.io/os
                            - beta.kubernetes.io/arch

            - Node selector
                    - a pod would only be put on nodes with matching labels
                    
- Affinity and anti-affinity

        - Affinity comes into play in two different scenarios: 
                    - pods-to-nodes and 
                    - pods-to-pods. 
            - It's configured under the .spec.affinity path of a pod. 
                - The first option, nodeAffinity, is pretty much the same as nodeSelector, 
                  but formulates the relation between pods and nodes in a more expressive manner.
                - The second option represents inter-pod enforcement in two forms: podAffinity and podAntiAffinity. 
                  For both nodes  and inter-pod affinity,
                  
                  there are two different degrees of requirements:
                        - requiredDuringSchedulingIgnoredDuringExecution   - hard
                        - preferredDuringSchedulingIgnoredDuringExecution  - soft
                - both requirements take effect during scheduling, not execution—that is,
                   - if a pod has already been scheduled on a node, it remains in execution even if the condition 
                     of that node becomes ineligible for scheduling the pod.
        - Node affinity
                - The description of a required statement is called nodeSelectorTerms, and 
                  is composed of one or more matchExpressions. matchExpressions, 
                  which is similar to the matchExpressions that is used by other
                  Kubernetes controllers such as Deployment and StatefulSets, 
                  but in this case, the matchExpressions node supports the 
                  following operators: 
                  In, NotIn, Exists, DoesNotExist, Gt, and Lt.

        - Inter-pod affinity
                - Inter-pod affinity takes effect on labels of certain running pods in a defined group of nodes
                - Inter-pod affinity requires the use of effective namespaces
                  
        - Prioritizing pods in scheduling
                - The priority of a pod is defined by the priority class it belongs to. 
                - A priority class uses a 32-bit integer that is less than 1e9 (one billion) to represent the priority. 
                    A larger number means a higher priority
                - if there are waiting pods to be scheduled, Kubernetes will pick higher priority pods first rather 
                    than by the order of the pods in the queue.

- Elastically scaling
        - When an application reaches its capacity, the most intuitive way to tackle the problem is
          by adding more power to the application
                - Horizontal Pod Autoscaler (HPA).
                    - An HPA object watches the resource consumption of pods that are managed by a controller 
                      (Deployment, ReplicaSet, or StatefulSet) at a given interval and
                       controls the replicas by comparing the desired target of certain metrics with their real usage.
        - Incorporating custom metrics
            - scaling with network connections, disk IOPS, and database transactions.
            -  the custom metrics API and external metrics API were introduced for Kubernetes
               components to access metrics that aren't supported

- Managing cluster resources
        - Resource quotas of namespaces
                - Compute Resources 
                        - requests.cpu
                        - requests.memory
                        - limits.cpu
                        - limits.memory
                - Storage resources
                        - requests.storage
                        - <sc>.storageclass.storage.k8s.io/requests
                        - <sc>.storageclass.storage.k8s.io/persistentvolumeclaims
                - Object count
                        - count/<resource>.<group>
                                - count/deployments.apps
                                - count/persistentvolumeclaims
                                - services.loadbalancers
                                - services.nodeports

        - ResourceQuota

        - LimitRange - Request pods with default compute resource limits
                - We could also specify default resource requests and limits for a namespace.
                    - using a LimitRange object, which contains a set of defaultRequest (requests) and default (limits).


- Node administration 
    - pod Eviction
            - To keep a node stable, kubelet reserves some resources as buffers to ensure it can 
              take actions before a node's kernel acts.
            - There are three configurable segregations or thresholds for different purposes:
                - kube-reserved: Reserves resources for node components of Kubernetes
                - system-reserved: Reserves resources for system daemons
                - eviction-hard: A threshold for when to evict pods

```
