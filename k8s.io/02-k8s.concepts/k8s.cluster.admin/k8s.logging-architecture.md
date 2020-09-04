
## [Logging Architecture](https://kubernetes.io/docs/concepts/cluster-administration/logging/)

```
- Application logs can help you understand what is happening inside your application. 
- The logs are particularly useful for debugging problems and monitoring cluster activity. 
- Most modern applications have some kind of logging mechanism; as such, most container engines 
  are likewise designed to support some kind of logging. 
- The easiest and most embraced logging method for containerized applications is to write to the standard output
  and   standard error streams.

- The native functionality provided by a container engine or runtime is usually not enough for a 
  complete logging solution.
        - For example, 
            - if a container crashes, 
            - a pod is evicted, or 
            - a node dies
        - you'll usually still want to access your application's logs. 
        - As such, logs should have a separate storage and lifecycle independent of nodes, pods, or containers. 
        - This concept is called cluster-level-logging. 
            - Cluster-level logging requires a separate backend to store, analyze, and query logs. 
            - kubernetes provides no native storage solution for log data, but you can integrate many
              existing logging solutions into your Kubernetes cluster.

- cluster-level logging architectures are described in assumption that a logging backend is present inside or 
  outside of your cluster. 
  - how logs are stored and handled on the node to be useful



- Basic logging in Kubernetes
        - basic logging in Kubernetes  outputs data to the standard output stream. 
        - Example uses a pod specification with a container that writes
            some text to standard output once per second.

            apiVersion: v1
            kind: Pod
            metadata:
                name: counter
            spec:
                containers:
                - name: count
                image: busybox
                args: [/bin/sh, -c,
                            'i=0; while true; do echo "$i: $(date)"; i=$((i+1)); sleep 1; done']

        - We can use kubectl logs to retrieve logs from a previous instantiation of a container
        with --previous flag,  in case the container has crashed.

        - If your pod has multiple containers, you should specify which container's logs you want
        to access by appending a container name to the comman


- Logging at the node level 
      -  Everything a containerized application writes to stdout and stderr 
         is handled and redirected somewhere by a container engine. 
            - For example, the Docker container engine redirects those two streams to a logging driver, 
              which is configured in Kubernetes to write to a file in json format.

        - By default, if a container restarts, the kubelet keeps one terminated container with its logs.
        - If a pod is evicted from the node, all corresponding containers are also evicted, along with their logs.
        - When you run kubectl logs as in the basic logging example, 
          the kubelet on the node handles the request and reads directly 
          from the log file, returning the contents in the response.

     - An important consideration in node-level logging is implementing log rotation, 
       so that logs don't consume all available storage on the node. 
     - Kubernetes currently is not responsible for rotating logs, 
       but rather a deployment tool should set up a solution to address that


 - System component logs
        - There are two types of system components: 
                - those that run in a container and 
                - those that do not run in a container. 
                    For example:
                         - The scheduler and kube-proxy run in a container.
                         - The kubelet and container runtime (docker), 
                           do not run in containers.
            - On nodes with systemd, the kubelet and container runtime write to journald
            - If systemd is not present, they write to .log files in the /var/log directory. 
            - System components inside containers always write to the /var/log directory,
            bypassing the default logging mechanism. 
                    - They use the klog logging library. 
        - similarly to the container logs, system component logs in the /var/log directory should be rotated. 
        - In Kubernetes clusters brought up by the kube-up.sh script, those logs are configured to be 
          rotated by the logrotate tool daily or once the size exceeds 100MB


- Cluster-level logging architectures
    - While Kubernetes does not provide a native solution for cluster-level logging, 
      there are several common approaches you can consider. Here are some options:
               - Push logs directly to a backend from within an application
                        - You can implement cluster-level logging by exposing or 
                          pushing logs directly from every application; however, the 
                          implementation for such a logging mechanism is outside the scope of Kubernetes

               - Use a node-level logging agent that runs on every node.
                        - The logging agent is a dedicated tool that exposes logs or pushes logs to a backend. 
                        - Commonly, the logging agent is a container that has access to a directory with log files 
                        from all of the application containers on that node.
                        - Because the logging agent must run on every node, 
                            - it's common to implement it as either
                                    - a DaemonSet replica, 
                                    - a manifest pod,  (deprecated)
                                    - a dedicated native process on the node (deprecated) 
                                    
                                    
                        - Using a node-level logging agent is the most common and encouraged approach for a Kubernetes cluster, 
                        because it creates only one agent per node, and it doesn't require any changes to the
                        applications running on the node. 
                        - However, node-level logging only works for applications' standard output and standard error

                        - Kubernetes doesn't specify a logging agent, but two optional logging agents are packaged with the Kubernetes    release: 
                                    - Stackdriver Logging for use with Google Cloud Platform
                                    - Elasticsearch. 
                                    
                                    - Both use fluentd with custom configuration as an agent on the node

               - Include a dedicated sidecar container for logging in an application pod
                    - You can use a sidecar container in one of the following ways:

                            - The sidecar container streams application logs to its own stdout.
                                - By having your sidecar containers stream to their own stdout and stderr streams, 
                                  we can take advantage of the kubelet and the logging agent that already run on each node.
                                - The sidecar containers read logs from a file, a socket, or the journald. 
                                  Each individual sidecar container prints log to its own stdout or stderr stream.

                                - This approach allows you to separate several log streams from different parts of your application, some of which can lack support for writing to stdout or stderr. 
                                - The logic behind redirecting logs is minimal, so it's hardly a significant overhead. 
                                - Additionally, because stdout and stderr are handled by the kubelet, you can use built-in tools like kubectl logs.

                               - For example. 
                                    - A pod runs a single container, and 
                                      the container writes to two different log files,  using two different formats.  
                                    - introduce two sidecar containers. 
                                            - Each sidecar container could tail a particular log file from a shared volume and 
                                              then redirect the logs to its own stdout stream

                            - The sidecar container runs a logging agent, 
                                  which is configured to pick up logs from an application container

                                  - If the node-level logging agent is not flexible enough for your situation, 
                                    you can create a sidecar container with a separate logging agent that
                                     you have configured specifically to run with your application.

                                  - Note: Using a logging agent in a sidecar container can lead to significant resource consumption. Moreover, you won't be able to access those logs using kubectl logs command, because they are not controlled by the kubelet.
                                  - As an example, you could use Stackdriver, which uses fluentd as a logging agent.
                                  - Here are two configuration files that you can use to implement this approach. 
                                    The first file contains a ConfigMap to configure fluentd.
               
                

```