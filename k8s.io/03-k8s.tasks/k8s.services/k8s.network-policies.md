## [Network Policies](https://kubernetes.io/docs/concepts/services-networking/network-policies/)
## [Network Policies Recipes](https://github.com/cnb0/kubernetes-network-policy-recipes)

```
-  A network policy is a specification of how groups of pods are allowed to communicate with each other and other network endpoints.
-  NetworkPolicy resources use labels to select pods and define rules which specify what traffic is allowed to the selected pods.

- Prerequisites  
        - Network policies are implemented by the network plugin. 
        - To use network policies, you must be using a networking solution which supports NetworkPolicy. 
        - Creating a NetworkPolicy resource without a controller that implements it will have no effect.

              -  Isolated and Non-isolated Pods
              -  The NetworkPolicy resource
              -  Behavior of to and from selectors
              -  Default policies
              -  Default deny all ingress traffic
              -  Default allow all ingress traffic
              -  Default deny all egress traffic
              -  Default allow all egress traffic
              -  Default deny all ingress and all egress traffic
              -  SCTP support


1. Isolated and Non-isolated Pods
        - By default, pods are non-isolated; they accept traffic from any source.
        - Pods become isolated by having a NetworkPolicy that selects them.
        - Once there is any NetworkPolicy in a namespace selecting a particular pod, 
          that pod will reject any connections that are not allowed by any NetworkPolicy. 
          (Other pods in the namespace that are not selected by any NetworkPolicy will continue to accept all traffic.)

        - Network policies do not conflict; they are additive. 
          If any policy or policies select a pod, the pod is restricted to what is allowed 
          by the union of those policies' ingress/egress rules. 
          Thus, order of evaluation does not affect the policy result

2. Default policies 
       - By default, if no policies exist in a namespace, then all ingress and 
         egress traffic is allowed to and from pods in that namespace. 
         The following examples let you change the default behavior in that namespace.
                             
                            apiVersion: networking.k8s.io/v1
                            kind: NetworkPolicy
                            metadata:
                            name: default-deny-ingress
                            spec:
                            podSelector: {}
                            policyTypes:
                            - Ingress

                        - Default deny all ingress traffic
                        - You can create a "default" isolation policy for a namespace by creating a 
                           NetworkPolicy that selects all pods but does not allow any ingress traffic to those pods.
                        - This ensures that even pods that aren't selected by any other NetworkPolicy will still be isolated. 
                          This policy does not change the default egress isolation behavior

3. Default allow all ingress traffic
        - if you want to allow all traffic to all pods in a namespace (even 
          if policies are added that cause some pods to be treated as "isolated"), 
          you can create a policy that explicitly allows all traffic in that namespace

                            apiVersion: networking.k8s.io/v1
                            kind: NetworkPolicy
                            metadata:
                            name: allow-all-ingress
                            spec:
                            podSelector: {}
                            ingress:
                            - {}
                            policyTypes:
                            - Ingress

4. Default deny all egress traffic
         - You can create a "default" egress isolation policy for a namespace by creating a NetworkPolicy that 
           selects all pods but does not allow any egress traffic from those pods.

                            apiVersion: networking.k8s.io/v1
                            kind: NetworkPolicy
                            metadata:
                            name: default-deny-egress
                            spec:
                               podSelector: {}
                               policyTypes:
                                 - Egress

              - This ensures that even pods that aren't selected by any other 
                NetworkPolicy will not be allowed egress traffic. 
                This policy does not change the default ingress isolation behavior

5. Default allow all egress traffic
           - If you want to allow all traffic from all pods in a namespace 
             (even if policies are added that cause some pods to be treated as "isolated"), 
             you can create a policy that explicitly allows all egress traffic in that namespace.

                            apiVersion: networking.k8s.io/v1
                            kind: NetworkPolicy
                            metadata:
                                name: allow-all-egress
                            spec:
                               podSelector: {}
                               egress:
                               - {}
                               policyTypes:
                               - Egress
6. Default deny all ingress and all egress traffic
            - You can create a "default" policy for a namespace which prevents all ingress & 
              egress traffic by creating the following NetworkPolicy in that namespace
                     
                            apiVersion: networking.k8s.io/v1
                            kind: NetworkPolicy
                            metadata:
                                name: default-deny-all
                            spec:
                                podSelector: {}
                                policyTypes:
                                - Ingress
                                - Egress

                   - This ensures that even pods that aren't selected by any other 
                     NetworkPolicy will not be allowed ingress or egress traffic.







``` 