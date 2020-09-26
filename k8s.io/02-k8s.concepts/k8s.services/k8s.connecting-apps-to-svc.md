
## [Connecting Applications with Services](https://kubernetes.io/docs/concepts/services-networking/connect-applications-service/)

```
- By default, Docker uses host-private networking, 
    - containers can talk to other containers only if they are on the same machine. 
    - In order for Docker containers to communicate across nodes, 
      there must be allocated ports on the machine's own IP address, which are then forwarded or proxied to the containers. 
    - This obviously means that containers must either coordinate which ports they use very carefully or 
      ports must be allocated dynamically.

- Coordinating port allocations across multiple developers or teams that provide containers is very difficult to do at scale, and 
  exposes users to cluster-level issues outside of their control. 
- Kubernetes assumes that pods can communicate with other pods, regardless of which host they land on. 
  Kubernetes gives every pod its own cluster-private IP address,   so you do not need to explicitly create 
  links between pods or   map container ports to host ports. 
  This means that containers within a Pod can all reach each other's ports on localhost, and
  all pods in a cluster can see each other without NAT. 
  
- Run reliable services on such a k8s networking model

- A Kubernetes Service is an abstraction which defines a logical set of Pods running somewhere in your cluster, 
  that all provide the same functionality. When created, each Service is assigned a unique IP address (also called clusterIP). 
- This address is tied to the lifespan of the Service, and will not change while the Service is alive. 
- Pods can be configured  to talk to the Service, and know that communication to the Service will be 
  automatically load-balanced  out to some pod that is a member of the Service.


    - $ kubectl expose deployment/my-nginx --port nginx 


        - expose it on an abstracted Service port 
            - targetPort: is the port the container accepts traffic on, 
            - port: is the abstracted Service port, which can be any port other pods use to access the service. 

        - a service is backed by a group of Pods. 
        - these Pods are exposed through endpoints. 
        - the service's selector will be evaluated continuously and the results will be POSTed to an Endpoints object also named my-nginx.
        - When a Pod dies, it is automatically removed from the endpoints, and 
            new Pods matching the Service's selector will automatically get added to the endpoints.
        - Check the endpoints, and note that the IPs are the same as the Pods created in the first step:

                $ kubectl get svc -l app=nginx
                $ kubectl get ep -l app=nginx
        - curl the nginx Service on <CLUSTER-IP>:<PORT> from any node in your cluster. 
                - Note that the Service IP is completely virtual, it never hits the wire.


- Accessing the Service 
    - Kubernetes supports 2 primary modes of finding a Service -
            - environment variables  -  default behaviour 
                - When a Pod runs on a Node, the kubelet adds a set of environment variables for each active Service
                    - kubectl exec my-nginx-3800858182-jr4a2 -- printenv | grep SERVICE

                - if service exist after replicas  
                        - downtime when pods are on same node 
                     
                - if service created before replicas 
                       - This will give you scheduler-level Service spreading of your Pods 
                       

            - DNS 
                     - requires the CoreDNS cluster addon
                     - kubernetes offers a DNS cluster addon Service that automatically assigns dns names to other Services. 
                     - You can check if it's running on your cluster:
                         $ kubectl get services kube-dns --namespace=kube-system

                         $ kubectl run curl --image=radial/busyboxplus:curl -it -- nslookup my-nginx

                
- Securing the Service
    -  Before exposing the Service to the internet, wewant to make sure the communication channel is secure. 
        For this, you will need:
            - self signed certificates for https 
            - An nginx server configured to use the certificates
            - A secret that makes the certificates accessible to pods
            
                    $ kubectl create configmap nginxconfigmap --from-file=default.conf
                    $ kubectl create secret tls nginxsecret \
                         --key /tmp/nginx.key --cert /tmp/nginx.crt

 - Exposing the Service 


```

