[DaemonSet](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/)


```
- A DaemonSet ensures that all (or some) Nodes run a copy of a Pod. 
   
   - As nodes are added to the cluster, Pods are added to them. 
   - As nodes are removed from the cluster, those Pods are garbage collected. 
   - Deleting a DaemonSet will clean up the Pods it created.
   - The name of a DaemonSet object must be a valid DNS subdomain name.

   - Some typical uses of a DaemonSet are:
           - running a cluster storage daemon on every node
           - running a logs collection daemon on every node
           - running a node monitoring daemon on every node

   - In a simple case, one DaemonSet, covering all nodes, would be used for each type of daemon. A more complex setup might use multiple DaemonSets for a single type of daemon, but with different flags and/or different memory and cpu requests for different hardware types.


- Writing a DaemonSet Spec 

    - Create a DaemonSet
             - Pod Template
                    - The .spec.template is one of the required fields in .spec.
                    - A Pod Template in a DaemonSet must have a RestartPolicy equal 
                      to Always, or be unspecified, which defaults to Always  
             - Pod Selector 
                    - The .spec.selector field is a pod selector.
                      It works the same as the .spec.selector of a Job.   

- Running Pods on select Nodes 
             - If you specify a .spec.template.spec.nodeSelector, then the DaemonSet controller will create Pods on nodes which match that node selector.   Likewise if you specify a .spec.template.spec.affinity, 
             - Then DaemonSet controller will create Pods on nodes which match that node affinity. 
               If you do not specify either, then the DaemonSet controller will create Pods on all nodes.


- How Daemon Pods are scheduled 
             - Scheduled by default scheduler
                - A DaemonSet ensures that all eligible nodes run a copy of a Pod. 
                - Normally, the node that a Pod runs on is selected by the Kubernetes scheduler. 
                - However, DaemonSet pods are created and scheduled by the DaemonSet controller instead. 
                
                That introduces the following issues:
                    - Inconsistent Pod behavior: Normal Pods waiting to be scheduled are created and in Pending state, 
                      but DaemonSet pods are not created in Pending state. This is confusing to the user.
                    - Pod preemption is handled by default scheduler. When preemption is enabled, the DaemonSet controller will make scheduling decisions   without considering pod priority and preemption.

- Taints and Tolerations

             - Although Daemon Pods respect taints and tolerations, the following tolerations are added to DaemonSet Pods automatically according to the related features.
             - Communicating with Daemon Pods

- Communicating with Daemon Pods 

             - Some possible patterns for communicating with Pods in a DaemonSet are:

               - Push: Pods in the DaemonSet are configured to send updates to another service, such as a stats database. They do not have clients.
               - NodeIP and Known Port: Pods in the DaemonSet can use a hostPort, so that the pods are reachable via the node IPs. 
                 Clients know the list of   node IPs somehow, and know the port by convention.
               - DNS: Create a headless service with the same pod selector, and then discover DaemonSets using the endpoints resource or 
                 retrieve multiple A records from DNS.
               - Service: Create a service with the same Pod selector, and use the service to reach a daemon on a random node. 
                 (No way to reach specific node.)        


- Updating a DaemonSet 
              - If node labels are changed, the DaemonSet will promptly 
                add Pods to newly matching nodes and delete Pods from newly not-matching nodes.

              - You can modify the Pods that a DaemonSet creates. However, Pods do not allow all fields to be updated. Also, the DaemonSet controller will   use the original template the next time a node (even with the same name) is created.

              - You can delete a DaemonSet. If you specify --cascade=false with kubectl, then the Pods will be left on the nodes. 
                If you subsequently create a new DaemonSet with the same selector, the new DaemonSet 
                adopts the existing Pods. If any Pods need replacing the DaemonSet replaces them according to its updateStrategy.

              - You can perform a rolling update on a DaemonSet


- Alternatives to DaemonSet 
        - Init scripts
            - It is certainly possible to run daemon processes by directly starting them on a node (e.g. using init, upstartd, or systemd). 
            - This is perfectly fine. However, there are several advantages to running such processes via a DaemonSet:

            - Ability to monitor and manage logs for daemons in the same way as applications.
            - Same config language and tools (e.g. Pod templates, kubectl) for daemons and applications.
            - Running daemons in containers with resource limits increases isolation between daemons from app containers. However, this can also be   accomplished by running the daemons in a container but not in a Pod (e.g. start directly via Docker).
            
        - Bare Pods
            -  It is possible to create Pods directly which specify a particular node to run on. However, a DaemonSet replaces Pods that are deleted or terminated for any reason, such as in the case of node failure or disruptive node maintenance, such as a kernel upgrade. 
            For this reason, you should use a DaemonSet rather than creating individual Pods.

        - Static Pods
            - It is possible to create Pods by writing a file to a certain directory watched by Kubelet. These are called static pods. Unlike DaemonSet,   static Pods cannot be managed with kubectl or other Kubernetes API clients. Static Pods do not depend on the apiserver, making them useful in cluster bootstrapping cases. Also, static Pods may be deprecated in the future.

        - Deployments
              - DaemonSets are similar to Deployments in that they both create Pods, and 
                those Pods have processes which are not expected to terminate (e.g. web servers, storage servers).

              - Use a Deployment for stateless services, like frontends, where scaling up and down the number of replicas and 
                rolling out updates are more important than controlling exactly which host the Pod runs on. 
                
              -  Use a DaemonSet when it is important that a copy of a Pod always run on all or certain hosts, and 
                when it needs to start before other Pods.

```