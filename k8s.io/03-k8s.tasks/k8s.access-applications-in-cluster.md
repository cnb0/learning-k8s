[k8s.application-access-in-cluster](https://kubernetes.io/docs/tasks/access-application-cluster/)

 
```
- Web UI (Dashboard)
    - kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.0.0/aio/deploy/recommended.yaml
    - You can access Dashboard using the kubectl command-line tool by running the following command:
            $ kubectl proxy

- Accessing Clusters - 
            - kubectl config view
            - Directly accessing the REST API
                - Using kubectl proxy - $kubectl proxy --port=8080
                - explore the API - curl http://localhost:8080/api/
            - Programmatic access to the API  - go/python/java/js 
            - Accessing the API from a Pod - kubectl proxy 
                    - When accessing the API from a pod, locating and authenticating to the apiserver are somewhat 
                      different.
                    - The recommended way to locate the apiserver within the pod is with the kubernetes.default.svc 
                      DNS name,which resolves to a Service IP which in turn will be routed to an apiserver.
                    - $ kubectl proxy in a sidecar container in the pod, or as a background process within the 
                      container.This proxies the Kubernetes API to the localhost interface of the pod, 
                      so that other processes in any container of the pod can access it.
            - Accessing services running on the cluster
                  - You have several options for connecting to nodes, pods and services from outside the cluster
                        - Access services through public IPs
                                - Use a service with type NodePort or LoadBalancer to make the service reachable 
                                  outside the cluster
                        - Access services, nodes, or pods using the Proxy Verb
                        - Access from a node or pod in the cluster
                                - Run a pod, and then connect to a shell in it using kubectl exec. 
                                  Connect to other nodes, pods, and services from that shell.
            - Discovering builtin services 
                  - There are several services which are started on a cluster by kube-system. 
                    Get a list of these with the 
                        $ kubectl cluster-info
            - Manually constructing apiserver proxy URLs
                    - The supported formats for the name segment of the URL are:
                            <service_name> - proxies to the default or unnamed port using http
                            <service_name>:<port_name> - proxies to the specified port using http
                            https:<service_name>: - proxies to the default or unnamed port using https
                                                    (note the trailing colon)
                            https:<service_name>:<port_name> - proxies to the specified port using https
            - Many Proxies 
                    kubectl proxy
                    apiserver proxy
                    kube proxy 
                    Proxy/Load-balancer in front of apiserver(s)
                    Cloud Load Balancers on external services

- Configure Access to Multiple Clusters


- Use Port Forwarding to Access Applications in a Cluster
        - kubectl port-forward to connect to a Redis server running in a Kubernetes cluster. 
          This type of connection can be useful for database debugging
             - kubectl port-forward redis-master-765d459796-258hz 7000:6379
             - kubectl port-forward pods/redis-master-765d459796-258hz 7000:6379
             - kubectl port-forward deployment/redis-master 7000:6379
             - kubectl port-forward replicaset/redis-master 7000:6379
             - kubectl port-forward service/redis-master 7000:6379
        - Connections made to local port 7000 are forwarded to port 6379 of the Pod that is running 
          the Redis server.With this connection in place, you can use your local workstation to debug 
          the database that is running in the Pod.

        - Forward one or more local ports to a pod. 
            - Use resource type/name such as deployment/mydeployment to select a pod. Resource type defaults to 
              'pod' if omitted.If there are multiple pods matching the criteria, a pod will be selected
               automatically.The forwarding session ends when the selected pod terminates, and 
               rerun of the command is needed to resume forwarding.

        - Listen on ports 5000 and 6000 locally, forwarding data to/from ports 5000 and 6000 in the pod
            $ kubectl port-forward pod/mypod 5000 6000
        - Listen on ports 5000 and 6000 locally, forwarding data to/from ports 5000 and 6000 
           in a pod selected by the deployment
            $ kubectl port-forward deployment/mydeployment 5000 6000
        - Listen on ports 5000 and 6000 locally, forwarding data to/from ports 5000 and 6000 in a pod
          selected by the service
            $ kubectl port-forward service/myservice 5000 6000

        - Listen on port 8888 locally, forwarding to 5000 in the pod
            $ kubectl port-forward pod/mypod 8888:5000
        - Listen on port 8888 on all addresses, forwarding to 5000 in the pod
            $ kubectl port-forward --address 0.0.0.0 pod/mypod 8888:5000
        - Listen on port 8888 on localhost and selected IP, forwarding to 5000 in the pod
            $ kubectl port-forward --address localhost,10.19.21.23 pod/mypod 8888:5000
        - Listen on a random port locally, forwarding to 5000 in the pod
            $ kubectl port-forward pod/mypod :5000


- Use a Service to Access an Application in a Cluster
         - Kubernetes Service object external clients can use to access an application running in a cluster. 
            The Service provides load balancing for an application that has two running instances
                - Run two instances of a Hello World application.
                - Create a Service object that exposes a node port.
                - Use the Service object to access the running application

- Connect a Front End to a Back End Using a Service
          - Create and run a microservice using a Deployment object.
          - Route traffic to the backend using a frontend.
          - Use a Service object to connect the frontend application to the backend application

          - The key to connecting a frontend to a backend is the backend Service. 
            A Service creates a persistent IP address and DNS name entry so that the 
            backend microservice can always be reached. 
            A Service uses selectors to find the Pods that it routes traffic to.
          - The frontend connects to the backend worker Pods by using the DNS name given to the backend Service
          - Similar to the backend, the frontend has a Deployment and a Service. 
            The configuration for the Service has type: LoadBalancer, 
            which means that the Service uses the default load balancer of your cloud provider.
           - Send traffic through the frontend ( EXTERNAL_IP ) 
                The frontend and backends are now connected. 
                You can hit the endpoint by using the curl command on the external IP of your frontend Service.
                    $curl http://${EXTERNAL_IP} 


- Create an External Load Balancer
        - When creating a service, you have the option of automatically creating a cloud network load balancer. 
          This provides an externally-accessible IP address that sends traffic to the correct port on your cluster 
          nodes provided your cluster runs in a supported environment and is configured with the correct cloud 
          load balancer provider package.

- List All Container Images Running in a Cluster
        - use kubectl to list all of the Container images for Pods running in a cluster.
        - List Container images by Pod
            $ kubectl get pods --all-namespaces \
            -o=jsonpath='{range .items[*]}{"\n"}{.metadata.name}{":\t"}{range .spec.containers[*]}{.image}{", "}{end}{end}' 
        - List Container images filtering by Pod label
            $ kubectl get pods --all-namespaces -o=jsonpath="{..image}" -l app=nginx
        - List Container images filtering by Pod namespace 
            $ kubectl get pods --namespace kube-system -o jsonpath="{..image}"


- Set up Ingress on Minikube with the NGINX Ingress Controller
        - Enable the NGNIX Ingress controller
                - $ minikube addons enable ingress
                - $ kubectl get pods -n kube-system
                - $ kubectl create deployment web --image=gcr.io/google-samples/hello-app:1.0
                  $ kubectl expose deployment web --type=NodePort --port=8080
                  $ kubectl get service web
                  $ minikube service web --url  #You can now access the sample app via the Minikube IP address and NodePort
         - Create an Ingress resource 
                - Ingress resource that sends traffic to your Service via hello-world.info
                - $ kubectl get ingress
                - add 172.17.0.15 hello-world.info to /etc/hosts/
                - verify that the ingress controller is directing traffic 
                     curl hello-world.info

- Communicate Between Containers in the Same Pod Using a Shared Volume
        - use a Volume to communicate between two Containers running in the same Pod. 
          allow processes to communicate by sharing process namespace between containers.
        - The primary reason that Pods can have multiple containers is to support helper applications that assist a 
          primary application. 
          Typical examples of helper applications are data pullers, data pushers, and proxies.
          Helper and primary applications often need to communicate with each other. 
          Typically this is done through a shared filesystem, or through the loopback network interface, localhost.
          An example of this pattern is a web server along with a helper program that polls a Git repository for
          new updates

- Configure DNS for a Cluster
    - Kubernetes offers a DNS cluster addon, which most of the supported environments enable by default. 
    - CoreDNS is recommended and is installed by default with kubeadm.


```
