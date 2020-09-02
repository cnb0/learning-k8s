## [Pod Overview](https://kubernetes.io/docs/concepts/workloads/pods/pod-overview/)

```

- Pod is the smallest deployable object in the Kubernetes object model
  Pods are the smallest deployable units of computing that can be created and managed in Kubernetes.

- Kubernetes uses controllers(Deployment,Daemonset,StatefulSet) to implement workload scaling and healing

- A Pod is the basic execution unit of a Kubernetes application
    - The smallest and simplest unit in the Kubernetes object model that you create or deploy
    - A Pod represents processes running on your cluster

- A Pod encapsulates 
            - an application's container (or multiple containers) 
            - storage resources 
            - a unique network identity (IP address), 
         as well as options that govern how the container(s) should run

- A Pod represents a unit of deployment: 
        - a single instance of an application in Kubernetes, which might consist 
          of either a single container portable executable image that contains 
          software and all of its dependencies. 
          or
          a small number of containers that are tightly coupled and that share resources.
        - Kubernetes manages the Pods rather than the containers directly.

-  To run containers in Pods, Kubernetes uses a container runtime
        - Docker is the most common container runtime used in a Kubernetes Pod, 
          but Pods support other container runtimes as well.) cri-o,containerd,systemd, frakti)

- Pods in a Kubernetes cluster can be used in two main ways:

        - Pods that run a single container. 
                - The "one-container-per-Pod" model is the most common Kubernetes use case; 
                  in this case, you can think of a Pod as a wrapper around a single container
        
        - Pods that run multiple containers that need to work together. 
                - A Pod might encapsulate an application composed of multiple co-located containers that are 
                  tightly coupled and need to share resources. 
                - These co-located containers might form a single cohesive unit of service-- 
                    - one container serving files from a shared volume to the public, 
                    - while a separate "sidecar" container refreshes or updates those files. 
                - The Pod wraps these containers and storage resources
                  together as a single manageable entity.

- Each Pod is meant to run a single instance of a given application. 

          - If you want to scale your application horizontally (to provide more overall resources
            by running more instances), you should use multiple Pods, one for each instance. 
            In Kubernetes, this is typically referred to as replication. 
            Replicated Pods are usually created and managed as a group by a workload resource and its _controller_. 

- How Pods manage multiple containers
          - Pods are designed to support multiple cooperating processes (as containers) that form a cohesive unit of service. 
          - The containers in a Pod are automatically co-located and co-scheduled on the same physical or 
            virtual machine in the cluster. 
          - The containers can share resources and dependencies, communicate with one another, and 
            coordinate when and how they are terminated.
          - grouping multiple co-located and co-managed containers in a single Pod is a relatively advanced use case. 
            You should use this pattern only in specific instances in which your containers are tightly coupled
                    - For example, you might have a container that acts as a web server for files in a shared volume, and 
                      a separate "sidecar" container that updates those files from a remote source 

         - Some Pods have init containers as well as app containers. 
           Init containers run and complete before the app containers are started.

- Pods provide two kinds of shared resources for their constituent containers: networking and storage.

           - Networking
                - Each Pod is assigned a unique IP address for each address family. 
                - Every container in a Pod shares the network namespace, including the IP address and network ports. 
                - Containers inside a Pod can communicate with one another using localhost. 
                - When containers in a Pod communicate with entities outside the Pod,
                  they must coordinate how they use the shared network resources (such as ports).

           - Storage
               - A Pod can specify a set of shared storage volumes. 
               - All containers in the Pod can access the shared volumes, 
                 allowing those containers to share data. 
               - Volumes also allow persistent data in a Pod to survive in case one of the containers 
                 within needs to be restarted. 

- Working with Pods
           - You'll rarely create individual Pods directly in Kubernetes--even singleton Pods. 
             This is because Pods are designed as relatively ephemeral, disposable entities. 
           - When a Pod gets created (directly by you, or indirectly by a _controller_), 
             it is scheduled to run on a Node in your cluster. 
             The Pod remains on that node until the process is terminated, the pod object is deleted, 
             the Pod is evicted for lack of resources, or the node fails.

- Restarting a container in a Pod should not be confused with restarting a Pod. 
  A Pod is not a process, but an environment for running a container. 
  A Pod persists until it is deleted

- Pods do not, by themselves, self-heal. 
    - If a Pod is scheduled to a Node that fails, or if the scheduling operation itself fails, the Pod is deleted; 
    - a Pod won't survive an eviction due to a lack of resources or Node maintenance. 
    - Kubernetes uses a higher-level abstraction, called a controller, that handles the work of managing
      the relatively disposable Pod instances. 
    - Thus, while it is possible to use Pod directly, it's far more common in Kubernetes to manage your
      pods using a controller

- Pods and controllers
        - You can use workload resources to create and manage multiple Pods for you. 
        - A controller for the resource handles replication and rollout and automatic healing in case of Pod failure. 
                 For example, if a Node fails, a controller notices that Pods on that Node have stopped working and
                              creates a replacement Pod. 
                             - The scheduler places the replacement Pod onto a healthy Node.

         - Here are some examples of workload resources that manage one or more Pods:

                    Deployment - manages a replicated application on cluster
                    StatefulSet - Manages the deployment and scaling of a set of Pods with durable storage and
                                  persistent ids for POD and provides guarantees about the ordering and uniqueness of these Po
                    DaemonSet  - Ensures a copy of POD is running across a set of nodes in cluster 

- Pod templates
         - Controllers for workload resources create Pods from a pod template and manage those Pods on your behalf.
         - PodTemplates are specifications for creating Pods, and are included in workload resources 
           such as Deployments, Jobs, and DaemonSets.
         - Each controller for a workload resource uses the PodTemplate inside the workload object to make actual Pods. 
         - The PodTemplate is part of the desired state of whatever workload resource you used to run your app.

         - Modifying the pod template or switching to a new pod template has no effect on the Pods that already exist. 
           Pods do not receive template updates directly; instead, a new Pod is created to match the revised pod template.

                    For example, a Deployment controller ensures that the running Pods match the current pod template. 
                    If the template is updated, the controller has to remove the existing Pods and create new Pods based 
                    on the updated template.
                    Each workload controller implements its own rules for handling changes to the Pod template.

          - On Nodes, the kubelet does not directly observe or manage any of the details around pod templates and updates; 
            those details are abstracted away. 
            That abstraction and separation of concerns simplifies system semantics, and 
            makes it feasible to extend the cluster's behavior without changing existing code


- Uses of pods 
        - Pods can be used to host vertically integrated application stacks (e.g. LAMP), 
          but their primary motivation is to support co-located, co-managed helper programs, such as:

                - content management systems, file and data loaders, local cache managers, etc.
                - log and checkpoint backup, compression, rotation, snapshotting, etc.
                - data change watchers, log tailers, logging and monitoring adapters, event publishers, etc.
                - proxies, bridges, and adapters controllers, managers, configurators, and updaters

        - Individual Pods are not intended to run multiple instances of the same application, in general.

- A Pod (as in a pod of whales or pea pod) is a group of one or more containers (such as Docker containers), 
  with shared storage/network, and  a specification for how to run the containers 

- A Pod's contents are always co-located and co-scheduled, and run in a shared context 

- A Pod models an application-specific "logical host" - it contains one or more application containers 
  which are relatively tightly coupled — in a pre-container world, being executed on the same physical or virtual machine 
  would mean being executed on the same logical host.

- The shared context of a Pod is a set of Linux namespaces, cgroups, and potentially other facets of isolation -
  the same things that isolate a Docker container. Within a Pod's context, 
  the individual applications may have further sub-isolations applied.

- Containers within a Pod share an IP address and port space, and can find each other via localhost. 
  They can also communicate with each other using standard inter-process communications 
  like SystemV semaphores or POSIX shared memory. 
- Containers in different Pods have distinct IP addresses and can not communicate by IPC without special configuration. 
  These containers usually communicate with each other via Pod IP addresses.

- Applications within a Pod also have access to shared volumes, which are defined as part of a Pod and 
  are made available to be mounted into each application's filesystem.
- In terms of Docker constructs, a Pod is modelled as a group of Docker containers with shared namespaces and 
  shared filesystem volumes.

- Like individual application containers, Pods are considered to be relatively ephemeral (rather than durable) entities. 
  In pod lifecycle, Pods are created, assigned a unique ID (UID), and scheduled to nodes where they 
  remain until termination (according to restart policy) or deletion. 

- If a Node dies, the Pods scheduled to that node are scheduled for deletion, after a timeout period. 
  A given Pod (as defined by a UID) is not "rescheduled" to a new node; instead, it can be replaced by an identical Pod, 
  with even the same name if desired, but with a new UID (see replication controller for more details).

- When something is said to have the same lifetime as a Pod, such as a volume, that means that it
  exists as long as that Pod (with that UID) exists.
  If that Pod is deleted for any reason, even if an identical replacement is created, the related thing (e.g. volume)
  is also destroyed and created anew.


```