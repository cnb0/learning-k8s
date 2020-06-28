[Declare Network Policy](https://kubernetes.io/docs/tasks/administer-cluster/declare-network-policy/)
[Install Network policy provider](https://kubernetes.io/docs/tasks/administer-cluster/network-policy-provider/)

```
 - Kubernetes NetworkPolicy API to declare network policies that govern how pods communicate with each other
 - Make sure you've configured a network provider with network policy support. 
        - There are a number of network providers that support NetworkPolicy, including:
                    - Calico
                    - Cilium
                    - Kube-router
                    - Romana
                    - Weave Net

- Create an nginx deployment and expose it via a service
            $ kubectl create deployment nginx --image=nginx 
            $ kubectl expose deployment nginx --port=80 
            $ kubectl get svc,pod

- Test the service by accessing it from another Pod
            $ kubectl run busybox --rm -ti --image=busybox -- /bin/sh
            $ wget --spider --timeout=1 nginx       

- Limit access to the nginx service and Assign the policy to the service

          - To limit the access to the nginx service so that only Pods with the label access: 
            true can query it, create a NetworkPolicy object as follows:
                    apiVersion: networking.k8s.io/v1
                    kind: NetworkPolicy
                    metadata:
                        name: access-nginx
                    spec:
                      podSelector:
                          matchLabels:
                          app: nginx
                      ingress:
                        - from:
                           - podSelector:
                               matchLabels:
                               access: "true"

            - The name of a NetworkPolicy object must be a valid DNS subdomain name.
            - NetworkPolicy includes a podSelector which selects the grouping of Pods to which the policy applies. 
               You can see this policy selects Pods with the label app=nginx. 
               The label was automatically added to the Pod in the nginx Deployment. 
            - An empty podSelector selects all pods in the namespace

 - Test access to the service when access label is not defined
            - When you attempt to access the nginx Service from a Pod without the correct labels, the request times out:

                    $ kubectl run busybox --rm -ti --image=busybox -- /bin/sh
                    $ wget --spider --timeout=1 nginx
                        wget: download timed out
            - Define access label and test again

                  - You can create a Pod with the correct labels to see that the request is allowed:

                     $ kubectl run busybox --rm -ti --labels="access=true" --image=busybox -- /bin/sh
                     $ wget --spider --timeout=1 nginx

                        Connecting to nginx (10.100.0.16:80)
                        remote file exists