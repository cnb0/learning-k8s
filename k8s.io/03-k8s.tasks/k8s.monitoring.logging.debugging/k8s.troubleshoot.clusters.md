
## (Troubleshoot Clusters)[https://kubernetes.io/docs/tasks/debug-application-cluster/debug-cluster/]

```
- Troubleshoot Clusters

    - To get detailed information about the overall health of your cluster 
            - $ kubectl cluster-info dump

    - The first thing to debug in your cluster is if your nodes are all registered correctly
        - $ kubectl get nodes
            -  verify that all of the nodes you expect to see are present and 
               that they are all in the Ready state.
          $ kubectl describe node <nodename>
          
        
    - Check ControlPlane Services
            $ sudo service kube-apiserver           status
            $ sudo service kube-controller-manager  status
            $ sudo service kube-scheduler           status

            $ sudo service kubelet                  status
            $ sudo service kube-proxy               status
                        
            $ journalctl -u kubelet -f
       
      - Check Service Logs
            $ kubectl logs kube-apiserver-master   -n kube-system
            $ kubectl logs kube-controller-manager -n kube-system
            $ kubectl logs kube-scheduler          -n kube-system
            $ kubectl logs kubelet                 -n kube-system
            $ kubectl logs kube-proxy              -n kube-system


            $ sudo journalctl -u kube-apiserver
       
        -  Cluster requires logging into the relevant machines 
               - Master 
                          - /var/log/kube-apiserver.log          - API Server , responsible for serving the API
                          - /var/log/kube-scheduler.log          - Scheduler  , responsible for making scheduling decisions
                          - /var/log/kube-controller-manager.log - Controller that manages replication controllers

               - Worker Nodes
                          - /var/log/kubelet.log    - Kubelet,    responsible for running containers on the node
                          - /var/log/kube-proxy.log - Kube Proxy, responsible for service load balancing

        - Cluster failure modes

                - Root causes:
                          - VM(s) shutdown
                          - Network partition within cluster, or between cluster and users
                          - Crashes in Kubernetes software
                          - Data loss or unavailability of persistent storage (e.g. GCE PD or AWS EBS volume)
                          - Operator error, for example misconfigured Kubernetes software or application software

                - Specific scenarios:
                    
                    - Apiserver VM shutdown or apiserver crashing
                          - unable to stop, update, or start new pods, services, replication controller
                          - existing pods and services should continue to work normally, unless they depend on the Kubernetes API
                    
                    - Apiserver backing storage lost
                          - apiserver should fail to come up
                          - kubelets will not be able to reach it but will continue
                             to run the same pods and provide the same service proxying
                          - manual recovery or recreation of apiserver state necessary before apiserver is restarted

                    - Supporting services (node controller, replicaSet controller, scheduler, etc) VM shutdown or crashes
                           - Currently those are colocated with the apiserver, and
                             their unavailability has similar consequences as apiserver
                           - In future, these will be replicated as well and may not be co-located
                           - They do not have their own persistent state

                    - Individual node (VM or physical machine) shuts down
                         -  pods on that Node stop running

                    - Network partition
                         - partition A thinks the nodes in partition B are down; partition B thinks the apiserver is down. 
                           (Assuming the master VM ends up in partition A.)

                    - Kubelet software fault
                           - crashing kubelet cannot start new pods on the node
                           - kubelet might delete the pods or not
                           - node marked unhealthy
                           - ReplicaSet controllers start new pods elsewhere
                    
                    - Cluster operator error
                           - loss of pods, services, etc
                           - lost of apiserver backing store
                           - users unable to read API
