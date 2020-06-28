[configure liveness, readiness and startup probes for containers](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/)

```
0. Container probes 
                
                1. LivenessProbe 
                2. ReadinessProbe  
                3. Startup Probes 

        - A Probe is a diagnostic performed periodically by the kubelet on a Container. 
          To perform a diagnostic, the kubelet calls a Handler implemented by the Container. There are three types of handlers:

                - ExecAction: 
                            -  Executes a specified command inside the Container. 
                            -  The diagnostic is considered successful if the command exits with a status code of 0.

                - TCPSocketAction: 
                            - Performs a TCP check against the Container's IP address on a specified port. 
                            - The diagnostic is considered successful if the port is open.

                - HTTPGetAction: 
                            - Performs an HTTP Get request against the Container's IP address on a specified port and path. 
                            - The diagnostic is considered successful if the response has a status  code
                            greater than or equal to 200 and less than 400.

        - Each probe has one of three results:

               - Success: The Container passed the diagnostic.
               - Failure: The Container failed the diagnostic.
               - Unknown: The diagnostic failed, so no action should be taken.

 

1. LivenessProbe :
        - The kubelet uses liveness probes to know when to restart a container. 
          For example, liveness probes could catch a deadlock, where an application is running, but unable to make progress. 
          Restarting a container in such a state can help to make the application more available despite bugs.

2. ReadinessProbe : 
        - The kubelet uses readiness probes to know when a container is ready to start accepting traffic. 
          A Pod is considered ready when all of its containers are ready.
          One use of this signal is to control which Pods are used as backends for Services. 
          When a Pod is not ready, it is removed from Service load balancers.

3. Startup Probes :  
        - The kubelet uses startup probes to know when a container application has started. 
          If such a probe is configured, it disables liveness and readiness checks until it succeeds, 
          making sure those probes don't interfere with the application startup. 
          This can be used to adopt liveness checks on slow starting containers, 
          avoiding them getting killed by the kubelet before they are up and running



1. LivenessProbe :

            - Define a liveness Shell command 
                    - Many applications running for long periods of time eventually transition to broken states, and 
                    cannot recover except by being restarted. Kubernetes provides liveness probes to detect and remedy such situations.
                                    
                                    args:
                                    - /bin/sh
                                    - -c
                                    - touch /tmp/healthy; sleep 30; rm -rf /tmp/healthy; sleep 600
                                    livenessProbe:
                                    exec:
                                        command:
                                        - cat
                                        - /tmp/healthy
                                    initialDelaySeconds: 5
                                    periodSeconds: 5

                    - The periodSeconds field specifies that the kubelet should perform a liveness probe every 5 seconds. 
                    - The initialDelaySeconds field tells the kubelet that it should wait 5 seconds before performing the first probe.
                    - To perform a probe, the kubelet executes the command cat /tmp/healthy in the target container. 
                            If the command succeeds, it returns 0, and the kubelet considers the container to be alive and healthy. 
                            If the command returns a non-zero value, the kubelet kills the container and restarts it
                            
                - Define a liveness HTTP request 
                        - Another kind of liveness probe uses an HTTP GET request.

                                    spec:
                                        containers:
                                        - name: liveness
                                            image: k8s.gcr.io/liveness
                                            args:
                                            - /server
                                            livenessProbe:
                                            httpGet:
                                                path: /healthz
                                                port: 8080
                                                httpHeaders:
                                                - name: Custom-Header
                                                value: Awesome
                                            initialDelaySeconds: 3
                                            periodSeconds: 3
                                        
                        - To perform a probe, the kubelet sends an HTTP GET request to the server that is running in the container and 
                          listening on port 8080. 
                        - If the handler for the server's /healthz path returns a success code, the kubelet considers the container 
                          to be alive and healthy. 
                        - If the handler returns a failure code, the kubelet kills the container and restarts it.
                                 - Any code greater than or equal to 200 and less than 400 indicates success. 
                                   Any other code indicates failure.
            
                - Define a TCP liveness probe
                         - A third type of liveness probe uses a TCP socket
                             - With this configuration, the kubelet will attempt to open a socket to your container on the specified port. 
                               If it can establish a connection, the container is considered healthy, if it can’t it is considered a failure.

                                     spec:
                                        containers:
                                        - name: goproxy
                                            image: k8s.gcr.io/goproxy:0.1
                                            ports:
                                            - containerPort: 8080
                                            readinessProbe:
                                            tcpSocket:
                                                port: 8080
                                            initialDelaySeconds: 5
                                            periodSeconds: 10
                                            livenessProbe:
                                            tcpSocket:
                                                port: 8080
                                            initialDelaySeconds: 15
                                            periodSeconds: 20

                            - configuration for a TCP check is quite similar to an HTTP check. This example uses both readiness
                               and liveness probes. 
                              The kubelet will send the first readiness probe 5 seconds after the container starts. 
                              This will attempt to connect to the goproxy container on port 8080. 
                              If the probe succeeds, the Pod will be marked as ready. The kubelet will continue to run this 
                              check every 10 seconds.

                            - In addition to the readiness probe, this configuration includes a liveness probe. 
                              The kubelet will run the first liveness probe 15 seconds after the container starts. 
                              Just like the readiness probe, this will attempt to connect to the goproxy container on port 8080. 
                              If the liveness probe fails, the container will be restarted.

                - Use a named port
                            - You can use a named ContainerPort for HTTP or TCP liveness checks:

                                    ports:
                                    - name: liveness-port
                                    containerPort: 8080
                                    hostPort: 8080

                                    livenessProbe:
                                    httpGet:
                                        path: /healthz
                                        port: liveness-port

                - When should you use a liveness probe?
                           - If the process in your Container is able to crash on its own whenever it encounters an issue or 
                             becomes unhealthy, 
                             you do not necessarily need a liveness  probe; the kubelet will automatically perform the correct action 
                             in accordance with the Pod's restartPolicy.
                           - If you'd like your Container to be killed and restarted if a probe fails, 
                             then specify a liveness probe, and specify a restartPolicy of Always or OnFailure.
 
 2. Define readiness probes
         - Sometimes, applications are temporarily unable to serve traffic. 
           For example, an application might need to load large data or configuration files during startup, 
           or depend on external services after startup.  In such cases, you don't want to kill the application,
           but you don’t want to send it requests either. 
         - Kubernetes provides readiness probes to detect and mitigate these situations. 
           A pod with containers reporting that they are not ready does not receive traffic 
           through Kubernetes Services.

        - * Readiness probes runs on the container during its whole lifecycle.
        -  Readiness probes are configured similarly to liveness probes. 
           The only difference is that you use the readinessProbe field instead of the livenessProbe field.

                                    readinessProbe:
                                        exec:
                                            command:
                                            - cat
                                            - /tmp/healthy
                                        initialDelaySeconds: 5
                                        periodSeconds: 5

         - Configuration for HTTP and TCP readiness probes also remains identical to liveness probes.
         - Readiness and liveness probes can be used in parallel for the same container. 
           Using both can ensure that traffic does not reach a container that is not ready for it, and 
           that containers are restarted when they fail.

       - When should you use a readiness probe?

                - If you'd like to start sending traffic to a Pod only when a probe succeeds, specify a readiness probe. 
                    In this case, the readiness probe might be the same as the liveness probe, 
                    but the existence of the readiness probe in the spec means that the Pod will start without receiving any traffic and 
                    only start receiving traffic after the probe starts succeeding. 
                    If your Container needs to work on loading large data, configuration files, or migrations during startup, 
                    specify a readiness probe.

                - If you want your Container to be able to take itself down for maintenance, you can specify a readiness probe 
                  that checks an endpoint specific to readiness that is different from the liveness probe.

                - Note that if you just want to be able to drain requests when the Pod is deleted, 
                  you do not necessarily need a readiness probe; on deletion, the Pod automatically puts itself into an unready 
                  state regardless of whether the readiness probe exists. 
                  The Pod remains in the unready state while it waits for the Containers in the Pod to stop.


3. Protect slow starting containers with startup probes
            - Sometimes, you have to deal with legacy applications that might require an additional startup time on their first initialization. 
            - In such cases, it can be tricky to set up liveness probe parameters without compromising the fast response to deadlocks 
              that motivated such a probe. The trick is to set up a startup probe with the same command, HTTP or TCP check, 
              with a failureThreshold * periodSeconds long enough to cover the worse case startup time.

                                  ports:
                                    - name: liveness-port
                                      containerPort: 8080
                                      hostPort: 8080

                                  livenessProbe:
                                    httpGet:
                                        path: /healthz
                                        port: liveness-port
                                    failureThreshold: 1
                                    periodSeconds: 10

                                  startupProbe:
                                    httpGet:
                                        path: /healthz
                                        port: liveness-port
                                    failureThreshold: 30
                                    periodSeconds: 10

            - The application will have a maximum of 5 minutes (30 * 10 = 300s) to finish its startup. 
            - Once the startup probe has succeeded once, the liveness probe takes over to provide a fast response to container deadlocks. 
              If the startup probe never succeeds, the container is killed after 300s and subject to the pod's restartPolicy

      - When should you use a startup probe?
                - If your Container usually starts in more than initialDelaySeconds + failureThreshold × periodSeconds, 
                  you should specify a startup probe that checks the same endpoint as the liveness probe. 
                - The default for periodSeconds is 30s. You should then set its failureThreshold high enough to allow the Container to start,
                  without changing the default values of the  liveness probe. This helps to protect against deadlocks.


- Configure Probes
            - Probes have a number of fields that you can use to more precisely control the behavior of liveness and readiness checks:

                        - initialDelaySeconds: Number of seconds after the container has started before liveness or readiness probes are initiated.
                                                Defaults to 0 seconds. Minimum value is 0.
                        - periodSeconds: How often (in seconds) to perform the probe. Default to 10 seconds. Minimum value is 1.
                        - timeoutSeconds: Number of seconds after which the probe times out. Defaults to 1 second. Minimum value is 1.
                        - successThreshold: Minimum consecutive successes for the probe to be considered successful after having failed.
                                            Defaults to 1. Must be 1 for liveness. Minimum value is 1.
                        - failureThreshold: When a probe fails, Kubernetes will try failureThreshold times before giving up. 
                                            Giving up in case of liveness probe means restarting the container. 
                                            In case of readiness probe the Pod will be marked Unready. Defaults to 3. Minimum value is 1.

            - HTTP probes have additional fields that can be set on httpGet:

                        - host: Host name to connect to, defaults to the pod IP. You probably want to set "Host" in httpHeaders instead.
                        - scheme: Scheme to use for connecting to the host (HTTP or HTTPS). Defaults to HTTP.
                        - path: Path to access on the HTTP server.
                        - httpHeaders: Custom headers to set in the request. HTTP allows repeated headers.
                        - port: Name or number of the port to access on the container. Number must be in the range 1 to 65535.
               
               - For an HTTP probe, the kubelet sends an HTTP request to the specified path and port to perform the check. 
                 The kubelet sends the probe to the pod’s IP address, unless the address is overridden by the optional host field in httpGet. 

               - If scheme field is set to HTTPS, the kubelet sends an HTTPS request skipping the certificate verification. 
                 In most scenarios, you do not want to set the host field. Here's one scenario where you would set it. 
                 Suppose the container listens on 127.0.0.1 and the Pod's hostNetwork field is true. 
                 Then host, under httpGet, should be set to 127.0.0.1. 
                 If your pod relies on virtual hosts, which is probably the more common case, you should not use host, 
                 but rather set the Host header in httpHeaders.

            - For a TCP probe, the kubelet makes the probe connection at the node, not in the pod, 
              which means that you can not use a service name in the host parameter since the kubelet is unable to resolve it



``` 