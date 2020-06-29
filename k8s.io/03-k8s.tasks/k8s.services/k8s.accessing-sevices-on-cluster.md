
## [Access Services Running on K8s Clusters](https://kubernetes.io/docs/tasks/administer-cluster/access-cluster-services/)


- Connect to services running on the Kubernetes cluster
    - In Kubernetes, nodes, pods and services all have their own IPs. 
    -  In many cases, the node IPs, pod IPs, and some service IPs on a cluster will not be routable, 
       so they will not be reachable from a machine outside the cluster, such as your desktop machine


1. Ways to connect
        - You have several options for connecting to nodes, pods and services from outside the cluster:

            - Access services through public IPs.
                    - Use a service with type NodePort or LoadBalancer to make the service reachable outside the cluster. 
                    - check out services and kubectl expose documentation.
                    - Depending on your cluster environment, this may just expose the service to your corporate network, or 
                      it may expose it to the internet.Think about whether the service being exposed is secure. 
                      Does it do its own authentication?
                    - Place pods behind services. To access one specific pod from a set of replicas, such as for debugging, 
                      place a unique label on the pod and create a new service which selects this label.
                      
                      In most cases, it should not be necessary for application developer to directly access nodes via their nodeIPs.

            - Access services, nodes, or pods using the Proxy Verb.
                   - Does apiserver authentication and authorization prior to accessing the remote service. 
                     Use this if the services are not secure enough to expose to the internet, or 
                     to gain access to ports on the node IP, or for debugging.
                  - Proxies may cause problems for some web applications. Only works for HTTP/HTTPS. Described below.

            - Access from a node or pod in the cluster.
                  - Run a pod, and then connect to a shell in it using kubectl exec. Connect to other nodes, pods, and services from that shell.
                  -  Some clusters may allow you to ssh to a node in the cluster. From there you may be able to access cluster services. 
                   This is a non-standard method, and will work on some clusters but not others. 
                   Browsers and other tools may or may not be installed. Cluster DNS may not work

2. Discovering builtin services 
    - Typically, there are several services which are started on a cluster by kube-system. 
      Get a list of these with the kubectl cluster-info command:

            $kubectl cluster-info

   - Manually constructing apiserver proxy URLs        
     - use the kubectl cluster-info command to retrieve the service's proxy URL. 
       To create proxy URLs that include service endpoints, suffixes, and parameters, 
       you simply append to the service's proxy URL: 
       http://kubernetes_master_address/api/v1/namespaces/namespace_name/services/[https:]service_name[:port_name]/proxy 

       Examples :
                To access the Elasticsearch service endpoint _search?q=user:kimchy, you would use:

                    - http://104.197.5.247/api/v1/namespaces/kube-system/services/elasticsearch-logging/proxy/_search?q=user:kimchy
                
                To access the Elasticsearch cluster health information _cluster/health?pretty=true, you would use:

                    - https://104.197.5.247/api/v1/namespaces/kube-system/services/elasticsearch-logging/proxy/_cluster/health?pretty=true

                To access the https Elasticsearch service health information _cluster/health?pretty=true, you would use:

                    - https://104.197.5.247/api/v1/namespaces/kube-system/services/https:elasticsearch-logging/proxy/_cluster/health?pretty=true


```