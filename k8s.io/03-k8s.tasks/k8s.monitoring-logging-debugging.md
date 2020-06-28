
## [k8s.Monitoring-Logging-debugging](https://kubernetes.io/docs/tasks/debug-application-cluster/)

```

- Troubleshoot control plane failure (kube-apiserver,kube-controller-manager,kube-scheduler,kubelet,kube-proxy )
- Troubleshoot worker node failure   ( node )
- Troubleshoot application failure (Pod ,replicaset)
- Troubleshoot networking ( services , endpoints , ingress/egress, ingress controller)

    
- Application Introspection and Debugging
     - Using kubectl describe pod to fetch details about pods 
             - Here you can see configuration information about the container(s) and 
               Pod (labels, resource requirements, etc.), 
               as well as status information about the container(s) and Pod (state, readiness, restart count, events, etc.)
                - $kubectl describe pod ${POD_NAME}
                    -  container state is one of Waiting, Running, or Terminated
                    - Ready tells you whether the container passed its last readiness probe
                            - which indicates that the pod is able to service requests and
                              should be added to the load balancing pools of all matching services
                    - Restart Count tells you how many times the container has been restarted;
                        this information can be useful for detecting crash loops in containers 
                        that are configured with a restart policy of 'always.'
             - Debugging Pending Pods
                    - solution to correct this situation, you can use kubectl scale to update your 
                      Deployment to specify four or fewer replicas
             - Events 
                    - Events are persisted in etcd and provide high-level information on what is happening in the cluster. 
                        $ kubectl get events
                        $ kubectl get events --namespace=my-namespace
             - Debugging a down/unreachable node 
                        $ kubectl get nodes
                        $ kubectl describe node  ${NODE_NAME} 
                        $ kubectl describe node  ${NODE_NAME} -o yaml
                        $ kubectl top node
                        $ kubectl top pod

             - Check Accessibility
                        $ curl http://web-service-ip:node-port
             - Check Service Status
                    - compare the endpoints and selector on the POD definition
                        $ kubectl describe svc web-service
             - Check the POD
                        $ kubectl get po
                        $ kubectl describe po web
                        $ kubectl logs web
                        $ kubectl logs web -f
                        $ kubectl logs web -f --previous
                        
- Troubleshoot Applications (Pod, Replicaset, Service)
        - Debugging 
            - Pods - $ kubectl describe pods ${POD_NAME}
                    - pod stays pending
                            - You don't have enough resources
                            -  You are using hostPort
                    - pod stays waiting
                            - check  name of the image correct
                            - you pushed the image to the repository?
                            - Run a manual docker pull <image> on your    machine to see if the image can be pulled
                    - pod crashing or unhealthy
                            - Debug running pods
                                 - Examine pod logs for container
                                       - kubectl logs ${POD_NAME} ${CONTAINER_NAME}
                                       - kubectl logs --previous ${POD_NAME} ${CONTAINER_NAME}
                                  - Debugging with container exec
                                         - kubectl exec ${POD_NAME} -c ${CONTAINER_NAME} -- ${CMD} ${ARG1} ... ${ARGN}  
                                         - kubectl exec cassandra -- cat /var/log/cassandra/system.log
                                         - kubectl exec -it cassandra -- sh
                    - Debugging with an ephemeral debug container ( alpha stage)
                    - Debugging via a shell on the node 
                             - ssh to host 

            - ReplicaSet
                    - to introspect events related to the replication controller
                        - kubectl describe rc ${CONTROLLER_NAME}

            - Services
                    - kubectl get endpoints ${SERVICE_NAME}
                    - service is missing endpoints ( use labels to list pods that match this selector )
                         - kubectl get pods --selector=name=nginx,type=frontend
                         - Verify that the pod's containerPort matches up with the Service's targetPort
                    - Network traffic is not forwarded
                            - likely that proxy can't contact your pods.
                                 - Are your pods working correctly? Look for restart count and debug pods.
                                 - Can you connect to your pods directly? 
                                    Get the IP address for the Pod, and try to connect directly to that IP.
                                 - Is your application serving on the port that you configured? 
                                    Kubernetes doesn't do port remapping, so if your application serves on 8080, 
                                    the containerPort field needs to be 8080  

- Determine the Reason for Pod Failure
            -  terminationMessagePolicy
                - Termination messages provide a way for containers to write information about
                  fatal events to a location where it can be easily retrieved and surfaced by tools
                  like dashboards and monitoring software
 
- Get a Shell to a Running Container
            - exec into container
                - kubectl exec shell-demo -- ps aux
                - kubectl exec shell-demo -- ls /
                - kubectl exec shell-demo -- cat /proc/1/mounts
                - kubectl exec shell-demo env
                - kubectl exec --stdin --tty shell-demo -- /bin/bash

            - Opening a shell when a Pod has more than one container
                   $ kubectl exec -i -t my-pod -c  main-app -- /bin/bash

- Debug Init Containers
        - Checking the status of Init Containers
                $ kubectl get pod <pod-name>
                 -  a status of Init:1/2 indicates that one of two Init Containers has completed successfully
        - Getting details about Init Containers
                 - kubectl describe pod <pod-name>
                 - kubectl get pod nginx --template '{{.status.initContainerStatuses}}'
        - Accessing logs from Init Containers
                 - kubectl logs <pod-name> -c <init-container-2>
        - Understanding Pod status
                A Pod status beginning with Init: summarizes the status of Init Container execution
                    - Init:Error , Init:CrashLoopBackOff , Pending , PodInitializing or running

- Debug a StatefulSet
            In order to list all the pods which belong to a StatefulSet 
                $ kubectl get pods -l app=myapp
                 - If you find that any Pods listed are in Unknown or Terminating state for an extended period of time, 
                   refer to the Deleting StatefulSet Pods . 
                   You can debug individual Pods in a StatefulSet  
- Debug Services
         - Running commands in a Pod
             - kubectl run -it --rm --restart=Never alpine --image=alpine sh
             - kubectl exec <POD-NAME> -c <CONTAINER-NAME> -- <COMMAND>
         - When node is not healthy ( deploy and scale  sample to test )
                - kubectl create deployment hostnames --image=k8s.gcr.io/serve_hostname
                - kubectl scale deployment hostnames --replicas=3
                - kubectl get pods -l app=hostnames

         - Does the Service exist?
                - validate whether service exist
                    - kubectl get svc ${SERVICE_NAME}
                 - next create service 
                     - kubectl expose deployment ${SERVICE_NAME} --port=80 --target-port=8080
                
          - Does the Service work by DNS name? 
                    - One of the most common ways that clients consume a Service is through a DNS name.

          - Does the Service work by IP?
                - assume if DNS works . check whether  your Service works by its IP address
                  From a Pod in your cluster, access the Service's IP 
                      - for i in $(seq 1 3); do wget -qO- 10.0.1.175:80 done

          - Is the Service defined correctly?
                    - kubectl get service ${SERVICE_NAME} -o json
                        - Is the Service port you are trying to access listed in spec.ports[]?
                        - Is the targetPort correct for your Pods (some Pods use a different port than the Service)?
                        - If you meant to use a numeric port, is it a number (9376) or a string "9376"?
                        - If you meant to use a named port, do your Pods expose a port with the same name?
                        - Is the port's protocol correct for your Pods?
          - Does the Service have any Endpoints? 
                 After you have confirmed that your Service is correctly defined and is resolved by DNS. 
                 -  check that the Pods you ran are actually being selected by the Service.
                      - kubectl get pods -l app=hostnames
                      - Check AGE and RESTARTS 
                            - The "AGE" column says that these Pods are about an hour old, 
                              which implies that they are running fine and not crashing.
                            - The "RESTARTS" column says that these pods are not crashing frequently or being restarted.
                              Frequent restarts could lead to intermittent connectivity issues. If the restart count is high, 
                              as next step is  debug pods.
                       - kubectl get endpoints ${SERVICE_NAME}
                            - If the ENDPOINTS column is <none>, you should check that the spec.selector
                              else This confirms that the endpoints controller has found the correct Pods for your Service. 
            - Are the Pods working?
               At this point, you know that your Service exists and has selected your Pods
                - from within pod - expect each Pod in the Endpoints list to return its own hostname
                        for ep in 10.244.0.5:9376 10.244.0.6:9376 10.244.0.7:9376; do
                        wget -qO- $ep
                        done            

            - Is the kube-proxy working?
               If you get here, your Service is running, has Endpoints, and 
               your Pods are actually serving. At this point,
               the whole Service proxy mechanism is suspect
                  - $ ps auxw | grep kube-proxy
                  - $ iptables-save | grep ${SERVICE_NAME}
                  - $ ipvsadm -ln
                       - For each port of each Service, plus any NodePorts, external IPs, and load-balancer IPs, 
                         kube-proxy will create a virtual server. 
                         For each Pod endpoint, it will create corresponding real servers
                  - Userspace mode
                        $ iptables-save | grep ${SERVICE_NAME}
                  - use curl to check is kube-proxy proxying?
                        $ curl {IP}:{PORT}
                 - check kube_proxy logs 
                     -  try restarting kube-proxy with the -v flag set to 4, and then look at the logs again

                 - Edge case: A Pod fails to reach itself via the Service IP
                         - Confirm hairpin-mode is set to hairpin-veth or promiscuous-bridge
                             $ ps auxw | grep kubelet
                                Confirm the effective hairpin-mode. To do this, you'll have to look at kubelet log

- k8s  debugging/troubleshooting networking 

            - Make sure you’re connecting to the service’s cluster IP from within the cluster, not from the outside.
            - Don’t bother pinging the service IP to figure out if the service is accessible 
                (remember, the service’s cluster IP is a virtual IP and pinging it will never work).
            - if you’ve defined a readiness probe, make sure it’s succeeding; otherwise the pod won’t be
              part of the service.
            - To confirm that a pod is part of the service, examine the corresponding Endpoints object
              with kubectl get endpoints.
            - If you’re trying to access the service through its FQDN or a part of it 
              (for example, myservice.mynamespace.svc.cluster.local 
              or myservice.mynamespace) and it doesn’t work,   see if you can access it using its 
              cluster IP instead of the FQDN.
            - Check whether you’re connecting to the port exposed by the service and not the target port.
            - Try connecting to the pod IP directly to confirm your pod is accepting connections on the correct port.
            - If you can’t even access your app through the pod’s IP, make sure your app isn’t only binding to localhost.

- Developing and debugging services locally
                  -  Try telepresence : https://www.telepresence.io/tutorials/kubernetes


- Debugging DNS Resolution - check dnsutils image 
        - Your cluster must be configured to use the CoreDNS addon 
        - Check if the DNS pod is running
            $ kubectl get pods --namespace=kube-system -l k8s-app=kube-dns
        - Check for errors in the DNS pod - For CoreDNS:
            $ kubectl logs --namespace=kube-system -l k8s-app=kube-dns

        - kubectl exec -it dnsutils -- nslookup kubernetes.default
        - Check the local DNS configuration firs
            - $ kubectl exec -ti dnsutils -- cat /etc/resolv.conf
        - Is DNS service up?
            - $ kubectl get svc --namespace=kube-system
        - Are DNS endpoints exposed?
            - $ kubectl get endpoints kube-dns --namespace=kube-system
        - Are DNS queries being received/processed?
             - kubectl -n kube-system edit configmap coredns

- Troubleshoot Clusters
        - $ kubectl get nodes
          $ kubectl describe node <nodename>
          $ sudo service kubelet status
          $ journalctl -u kubelet -f

        - $ kubectl cluster-info dump
        - Check Controlplane Services
            $ sudo service kube-apiserver status
            $ sudo service kube-controller-manager status
            $ sudo service kube-scheduler status
            $ sudo service kubelet status
            $ sudo service kube-proxy status
        - Check Service Logs
            $ kubectl logs kube-apiserver-master -n kube-system
            $ sudo journalctl -u kube-apiserver
        - Looking at logs
               - Master
                        - /var/log/kube-apiserver.log - API Server, responsible for serving the API
                        - /var/log/kube-scheduler.log - Scheduler, responsible for making scheduling decisions
                        - /var/log/kube-controller-manager.log - Controller that manages replication controllers
               - Worker Nodes
                        - /var/log/kubelet.log - Kubelet, responsible for running containers on the node
                        - /var/log/kube-proxy.log - Kube Proxy, responsible for service load balancing

- Node Networking configuration 
                $ ip addr
                $ ip link
                $ ip link show ens3
                $ arp node01
                $ ip link show docker0 
                $ ip route show default
                $ netstat -nplt
                $ netstat -anp | grep etcd

- Monitor Node Health
         - Node problem detector is a DaemonSet monitoring the node health. 
          It collects node problems from various daemons and reports them to the apiserver as NodeCondition and Event.

- Debugging Kubernetes nodes with crictl
        - crictl is a command-line interface for CRI-compatible container runtimes. 
          You can use it to inspect and debug container runtimes and applications on a Kubernetes node. 
         
- Pod Networking Configuration
                $ ip netns add white
                $ ip netns
                $ ip netns exec white ip link
                $ ip -n red link
                $ ip netns exec white arp
                $ ip netns exec white route
                $ ip link set veth-white netns white
                $ ip -n white addr add 192.168.1.1 dev veth-white
                $ ip -n white link set veth-white up
                $ ip link add v-net-0 type bridge
                $ ip link set dev v-net-0 up
                $ ip link add veth-white type veth peer name veth-white-br
                $ ip link set veth-white netns white
                $ ip link set veth-white-br master v-net-0
                $ ip -n white addr add 192.168.1.1 dev veth-white
                $ ip -n white link set veth-white up
                $ docker network ls
                $ docker inspect <network ns>

- Service Networking Configuration
                $ ps aux | grep kube-api
                    --service-cluster-ip-range=10.0.0.0/24
                $ iptables -L -t net | grep <service name>
                $ cat /var/log/kube-proxy.log
                $ kubectl logs weave-net-cwpbj weave -n kube-system

                - Check for ipalloc-range:

                  $ kubectl logs <kube-proxy-pod> -n kube-system
                          Check for "Flag proxy-mode="" unknown, assuming iptables proxy"

- Deploy and configure network load balancer
- Know how to use Ingress rules
- Know how to configure and use the cluster DNS
- Understand CNI


- Resource metrics pipeline - /apis/metrics.k8s.io/
         - Metrics Server is a cluster-wide aggregator of resource usage data
         - Measuring Resource Usage ( Memory/CPU )
         - metrics-server discovers all nodes on the cluster and queries each node's kubelet for CPU and memory usage
         - The resource metrics pipeline provides a limited set of metrics related to cluster components 
           such as the Horizontal Pod Autoscaler controller, as well as the kubectl top utility. 
           These metrics are collected by the lightweight, short-term, in-memory metrics-server and 
           are exposed via the metrics.k8s.io API.

- Tools for Monitoring Resources
    -  Full metrics pipeline ( prometheus)
        A full metrics pipeline gives you access to richer metrics. Kubernetes can respond to these metrics 
        by automatically scaling or adapting the cluster based on its current state, using mechanisms 
        such as the Horizontal Pod Autoscaler. The monitoring pipeline fetches metrics from the kubelet and 
        then exposes them to Kubernetes via an adapter by implementing either the custom.metrics.k8s.io or 
        external.metrics.k8s.io API.
    - Prometheus, can natively monitor Kubernetes, nodes, and Prometheus itself.

- Auditing
    - Kubernetes auditing provides a security-relevant chronological set of records documenting
      the sequence of activities that have affected system by individual users,
      administrators or other components of the system
    - Kube-apiserver performs auditing. Each request on each stage of its execution generates an event, 
      which is then pre-processed according to a certain policy and written to a backend. 
      The policy determines what's recorded and the backends persist the records. 
      The current backend implementations include logs files and webhooks.
    - Audit policy defines rules about what events should be recorded and what data they should include. 
      The audit policy object structure is defined in the audit.k8s.io API group. 
      When an event is processed, it's compared against the list of rules in order
       The first matching rule sets the "audit level" of the event. The known audit levels are:
            - None - don't log events that match this rule.
            - Metadata - log request metadata (requesting user, timestamp, resource, verb, etc.) but not request
                         or response body.
            - Request - log event metadata and request body but not response body. This does not 
                        apply for non-resource requests.
            - RequestResponse - log event metadata, request and response bodies. This does not apply for 
                                 non-resource requests.

- Auditing with Falco
      - Falco is an open source project for intrusion and abnormality detection for Cloud Native platforms
      - Install Falco by using one of the following methods:
            - Standalone Falco
            - Kubernetes DaemonSet
            - Falco Helm Chart

- Events in Stackdriver
      - Kubernetes events are objects that provide insight into what is happening inside a cluster, 
        such as what decisions were made by scheduler or why some pods were evicted from the node.  
        events are useful for debugging your application 

      - Since events are API objects, they are stored in the apiserver on master. To avoid filling up master's disk,
        a retention policy is enforced: events are removed one hour after the last occurrence. 
        To provide longer history and aggregation capabilities, a third party solution should be installed
        to capture events.

     -  exports Kubernetes events to Stackdriver Logging, where they can be processed and analyzed.
        
- Logging Using Stackdriver
        - To ingest logs, you must deploy the Stackdriver Logging agent to each node in your cluster. 
          The agent is a configured fluentd instance, where the configuration is stored in a ConfigMap and 
          the instances are managed using a Kubernetes DaemonSet. 
          The actual deployment of the ConfigMap and DaemonSet for your cluster depends on your individual cluster setup

- Logging Using Elasticsearch and Kibana
        - To ingest logs into Elasticsearch and view them using Kibana, as an alternative to Stackdriver Logging on GCE
        - Elasticsearch and Kibana used for cluster logging

```
