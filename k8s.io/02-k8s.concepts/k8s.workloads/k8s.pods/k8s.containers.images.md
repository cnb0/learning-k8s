
## [Containers Overview](https://kubernetes.io/docs/concepts/containers/)
```
- Containers 
    - Containers are a technology for packaging the (compiled) code for an application along with
      the dependencies it needs at run time. Each container that you run is repeatable; 
      the standardization from having dependencies included means that you get the same behavior wherever you run it.

    - Containers decouple applications from underlying host infrastructure. 
      This makes deployment easier in different cloud or OS environments.

- Container Images
      - A container image is a ready-to-run software package, containing everything needed to run an application: 
        the code and any runtime it requires, application and system libraries, and default values for any essential settings.

      - By design, a container is immutable: you cannot change the code of a container that is already running. 
        If you have a containerized application and want to make changes, you need to build a new container that 
        includes the change,then recreate the container to start from the updated image.

      - A container image represents binary data that encapsulates an application and all its software depencies. 
        Container images are executable software bundles that can run standalone and that make very well defined 
        assumptions about their runtime environment.

      - You typically create a container image of your application and push it to a registry before referring to it in a Pod

- Container runtimes
      - The container runtime is the software that is responsible for running containers.
      - Kubernetes supports several container runtimes: Docker, containerd, CRI-O, and 
        any implementation of the Kubernetes CRI (Container Runtime Interface).


- Image Names
      - Container images are usually given a name such as pause, example/mycontainer, or kube-apiserver. 
        Images can also include a registry hostname; for example: fictional.registry. example/imagename, and 
        possible a port number as well; for example: fictional.registry.example:10443/imagename.

      - If you don't specify a registry hostname, Kubernetes assumes that you mean the Docker public registry.
      - Tags let you identify different versions of the same series of images.
      - You should avoid using the latest tag when deploying containers in production, 
        as it is harder to track which version of the image is running and more difficult to roll back to a working version.
        Instead, specify a meaningful tag such as v1.42.0.

 - Updating Images
      - The default pull policy is IfNotPresent which causes the kubelet to skip pulling an image if it already exists. 
        If you would like to always force a pull, you can do one of the following:
            - set the imagePullPolicy of the container to Always.
            - omit the imagePullPolicy and use :latest as the tag for the image to use.
            - omit the imagePullPolicy and the tag for the image to use.
            - enable the AlwaysPullImages admission controller.
      - When imagePullPolicy is defined without a specific value, it is also set to Always
 
 - Multi-architecture Images with Manifests 
       -  A manifest can reference image manifests for architecture-specific versions of an container

- Using a Private Registry
       - Private registries may require keys to read images from them.
         Credentials can be provided in several ways:
       - Configuring Nodes to Authenticate to a Private Registry
            - all pods can read any configured private registries
            - requires node configuration by cluster administrator
       - Pre-pulled Images
            - all pods can use any images cached on a node
            - requires root access to all nodes to setup
       - Specifying ImagePullSecrets on a Pod
            - only pods which provide own keys can access the private registry
       - Vendor-specific or local extensions
            - if you're using a custom node configuration, you (or your cloud provider) can implement your mechanism 
              for authenticating the node to the container registry.

- Container environment 
        - resources available to Containers in the Container environment
        - The Kubernetes Container environment provides several important resources to Containers:
            - A filesystem, which is a combination of an image and one or more volumes.
            - Information about the Container itself.
            - Information about other objects in the cluster.
        - Container information
            - The hostname of a Container is the name of the Pod in which the Container is running. 
              It is available through the hostname command or the gethostname function call in libc.
            - The Pod name and namespace are available as environment variables through the downward API.
            - User defined environment variables from the Pod definition are also available to the Container, 
              as are any environment variables specified statically in the Docker image.
        - Cluster information
            - A list of all services that were running when a Container was created is available to that Container as environment variables. 
              Those environment variables match the syntax of  Docker links.
              For a service named foo that maps to a Container named bar, the following variables are defined:
                    - FOO_SERVICE_HOST=<the host the service is running on>
                    - FOO_SERVICE_PORT=<the port the service is running on>
        - Services have dedicated IP addresses and are available to the Container via DNS, if DNS addon is enabled. 

- Container Lifecycle Hooks
         - kubelet managed Containers can use the Container lifecycle hook framework 
           to run code triggered by events during their management lifecycle
         
         - Kubernetes provides Containers with lifecycle hooks. The hooks enable Containers to be aware of events in their
           management lifecycle and run code implemented in a handler when the corresponding lifecycle hook is executed
         
         - Container hooks - Define postStart and preStop handlers 
                - Attach handlers to Container lifecycle events. Kubernetes supports the postStart and preStop events.
                  Kubernetes sends the postStart event immediately after a Container is started, and 
                  it sends the preStop event immediately before the Container is terminated
                
                - There are two hooks that are exposed to Containers:
                    1. PostStart
                        - This hook executes immediately after a container is created. However, there is no guarantee that the hook 
                          will execute before the container ENTRYPOINT. No parameters are passed to the handler.

                    2. PreStop
                        - This hook is called immediately before a container is terminated due to an API request or management event 
                          such as liveness probe failure, preemption, resource contention and others 
                        - A call to the preStop hook fails if the container is already in terminated or completed state 
                        - It is blocking, meaning it is synchronous, so it must complete before the call to delete the container 
                          can be sent. No parameters are passed to the handler
                        - Termination of Pods
                        
         - Hook handler implementations
                        - Containers can access a hook by implementing and registering a handler for that hook. 
                          There are two types of hook handlers that can be implemented for Containers:
                            - Exec - Executes a specific command, such as pre-stop.sh, inside the cgroups and namespaces of the Container. 
                                      Resources consumed by the command are counted against the Container.
                            - HTTP - Executes an HTTP request against a specific endpoint on the Container
```