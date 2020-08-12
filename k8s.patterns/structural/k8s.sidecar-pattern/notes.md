
#Side Car - Pattern

- A Sidecar container extends and enhances the functionality of a preexisting container without changing it. 
- This pattern is one of the fundamental container patterns that allows single-purpose containers to cooperate closely together

- Examples of sidecar containers are 
           - log shippers 
           - log watchers
           - monitoring agents 

- Having a separate container for auxiliary tasks gives you access to 
           - health checks 
           - automatic restart 


```

- Compositions in Pods mean you have multiple containers (processes) running, health checked, restarted, and 
  consuming resources as the main application container does. 

- Modern Sidecar containers are small and consume minimal resources,
  but you have to decide whether it is worth running a separate process or 
  whether it is better to merge it into the main container.

- A container represents a natural boundary for a unit of functionality with a 
  distinct runtime, release cycle, API, and team owning it

- A proper container behaves like a single Linux process—solves one problem and 
  does it well—and is created with the idea of replaceability and reuse

- Strong point of a sidecar container lies in its ability to be small and pluggable.
. If you find that the sidecar container logic is getting more complex and/or becoming more
  tightly coupled with the main application container, it may better be integrated with the 
  main application’s code instead


```


- Docker stores those logs under /var/lib/docker/containers/container-ID/container-ID-json.log on the host machine.
- use a DaemonSet to deploy a log-collector container like Filebeat or Logstash to collect those logs and 
  send them to a log-aggregator like ElasticSearch.
- You’ll need to mount /var/lib/docker/containers as a hostPath volume to the DaemonSet Pod 
  to give the log-collector container access to the logs.


  - Example UseCase :
            - In this scenario, we have a nginx web server container running the nginx image. 
            - The access and error logs produced by the web server are not critical enough to be placed on a persistent volume. 
            - developers need access to the last 24 hours of logs so they can trace issues and bugs. 
            - we need to ship the access and error logs for the web server to a log-aggregation service.
            - Following the separation of concerns principle, we implement the Sidecar pattern by deploying a second container that ships the error and access logs from nginx. 
            - First Container Nginx does one thing, and it does it well; serving web pages. 
              The second container also specializes in its task; shipping logs. 
            - Since containers are running on the same Pod, we can use a shared emptyDir volume to read and write logs. 

            - The definition file for such a Pod may look as follows:

                    apiVersion: v1
                    kind: Pod
                    metadata:
                    name: webserver
                    spec:
                    volumes:
                        - name: shared-logs
                          emptyDir: {}

                    containers:
                        - name: nginx
                          image: nginx
                          volumeMounts:
                            - name: shared-logs
                              mountPath: /var/log/nginx

                        - name: sidecar-container
                          image: busybox
                          command: ["sh","-c","while true; do cat /var/log/nginx/access.log /var/log/nginx/error.log; sleep 30; done"]
                          volumeMounts:
                            - name: shared-logs
                              mountPath: /var/log/nginx


                              