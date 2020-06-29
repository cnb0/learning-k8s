## [Validate IPv4/IPv6 dual-stack](https://kubernetes.io/docs/tasks/network/validate-dual-stack/)
```
- Validate IPv4/IPv6 dual-stack enabled Kubernetes clusters

0. prerequisite 
        - Provider support for dual-stack networking (Cloud provider or 
          otherwise must be able to provide Kubernetes nodes with
          routable IPv4/IPv6 network interfaces)
        - A network plugin that supports dual-stack (such as Kubenet or Calico)
        - Kube-proxy running in mode IPVS
        - Dual-stack enabled cluster

1. Validate Node/Pod addressing
        - Validate node addressing 
                - Each dual-stack Node should have a single IPv4 block and a single IPv6 block allocated.
                  Validate that IPv4/IPv6 Pod address ranges are configured by running the following command.
                    $ kubectl get nodes k8s-linuxpool1-34450317-0 -o go-template \
                      --template='{{range .spec.podCIDRs}}{{printf "%s\n" .}}{{end}}'
                        
                      o/p:   10.244.1.0/24
                             a00:100::/24
                    - There should be one IPv4 block and one IPv6 block allocated

                - Validate that the node has an IPv4 and IPv6 interface detected 
                        - $ kubectl get nodes k8s-linuxpool1-34450317-0 -o go-template \
                            --template='{{range .status.addresses}}{{printf "%s: %s \n" .type .address}}{{end}}'
                        
                                Hostname: k8s-linuxpool1-34450317-0
                                InternalIP: 10.240.0.5
                                InternalIP: 2001:1234:5678:9abc::5

        - Validate Pod addressing
                     - Validate that a Pod has an IPv4 and IPv6 address assigned
                           $ kubectl get pods pod01 -o go-template 
                             --template='{{range .status.podIPs}}{{printf "%s \n" .ip}}{{end}}'

                                  10.244.1.4
                                  a00:100::4


                      -  also we can validate Pod IPs using the Downward API via the status.podIPs fieldPath. 
                         The following snippet demonstrates how you can expose the Pod IPs via 
                          an environment variable called MY_POD_IPS within a container.

                                env:
                                - name: MY_POD_IPS
                                valueFrom:
                                    fieldRef:
                                    fieldPath: status.podIPs

                        -   prints the value of the MY_POD_IPS environment variable from within a container. 
                            The value is a comma separated list that corresponds to the Pod's IPv4 and IPv6 addresses.
                            
                                    $ kubectl exec -it pod01 -- set | grep MY_POD_IPS

                                        MY_POD_IPS=10.244.1.4,a00:100::4
                        - The Pod's IP addresses will also be written to /etc/hosts within a container
                                    
                                    $ kubectl exec -it pod01 -- cat /etc/hosts


2. Validate Services 

          -  Create the following Service without the ipFamily field set. 
             When this field is not set, the Service gets an IP from the first configured
             range via --service-cluster-ip-range flag on the kube-controller-manager.

                apiVersion: v1
                kind: Service
                metadata:
                    name: my-service
                spec:
                    selector:
                        app: MyApp
                    ports:
                        - protocol: TCP
                          port: 80
                          targetPort: 9376


                $ kubectl get svc my-service -o yaml

                        spec:
                            clusterIP: 10.0.29.179
                            ipFamily: IPv4
                            ports:
                            - port: 80
                                protocol: TCP
                                targetPort: 9376

                        - By viewing the YAML for the Service you can observe that the Service has the 
                          ipFamily field has set to reflect the address family of the first configured 
                          range set via --service-cluster-ip-range flag on kube-controller-manager.

            - Create the following Service with the ipFamily field set to IPv6
                    apiVersion: v1
                    kind: Service
                    metadata:
                         name: my-service
                    spec:
                        ipFamily: IPv6
                        selector:
                            app: MyApp
                        ports:
                            - protocol: TCP
                              port: 80
                              targetPort: 9376

                     - Validate that the Service gets a cluster IP address from the IPv6 address block. 
                       You may then validate access to the service via the IP and port.
                            $ kubectl get svc -l app=MyApp

            - Create a dual-stack load balanced Service
                    - If the cloud provider supports the provisioning of IPv6 enabled external load balancer, 
                      create the following Service with both the ipFamily field set to IPv6 and the type field set to LoadBalancer

                            apiVersion: v1
                            kind: Service
                            metadata:
                                name: my-service
                            labels:
                                app: MyApp
                            spec:
                                ipFamily: IPv6
                                type: LoadBalancer
                                selector:
                                    app: MyApp
                                ports:
                                    - protocol: TCP
                                      port: 80
                                      targetPort: 9376
                    - Validate that the Service receives a CLUSTER-IP address from the IPv6 address block along with an EXTERNAL-IP. 
                      You may then validate access to the service via the IP and port.
                            $ kubectl get svc -l app=MyApp

```         

