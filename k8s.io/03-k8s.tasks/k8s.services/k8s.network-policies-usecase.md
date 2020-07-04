
```

 

 00-create-cluster.md
 01-deny-all-traffic-to-an-application.md
 02-limit-traffic-to-an-application.md
 02a-allow-all-traffic-to-an-application.md
 03-deny-all-non-whitelisted-traffic-in-the-namespace.md
 04-deny-traffic-from-other-namespaces.md
 05-allow-traffic-from-all-namespaces.md
 06-allow-traffic-from-a-namespace.md
 07-allow-traffic-from-some-pods-in-another-namespace.md
 08-allow-external-traffic.md
 09-allow-traffic-only-to-a-port.md
 10-allowing-traffic-with-multiple-selectors.md
 11-deny-egress-traffic-from-an-application.md
 12-deny-all-non-whitelisted-traffic-from-the-namespace.md
 14-deny-external-egress-traffic.md


1. DENY all traffic to an application
    This NetworkPolicy will drop all traffic to pods of an application, selected using Pod Selectors.

    Use Cases:
        - It’s very common: 
        - To start whitelisting the traffic using Network Policies, first you need to blacklist the traffic using this policy.
        - You want to run a Pod and want to prevent any other Pods communicating with it.
        - You temporarily want to isolate traffic to a Service from other Pods.

2. LIMIT traffic to an application

                You can create Networking Policies allowing traffic from only certain Pods.

        Use Case:
                Restrict traffic to a service only to other microservices that need to use it.
                Restrict connections to a database only to the application using it.


2a. ALLOW all traffic to an application
Use Case: After applying a deny-all policy which blocks all non-whitelisted traffic to the application, now you have to allow access to an application from all pods in the current namespace.

Applying this policy makes any other policies restricting the traffic to the pod void, and allow all traffic to it from its namespace and other namespaces.

3. DENY all non-whitelisted traffic to a namespace
        bulb Use Case: This is a fundamental policy, blocking all cross-pod networking other than the ones whitelisted via the other Network Policies you deploy.
        Consider applying this manifest to any namespace you deploy workloads to (anything but kube-system).

        bulb Best Practice: This policy will give you a default "deny all" functionality. This way, you can clearly identify which components have dependency on which components and deploy Network Policies which can be translated to dependency graphs between components.

4. DENY all traffic from other namespaces
        (a.k.a LIMIT access to the current namespace)
        You can configure a NetworkPolicy to deny all the traffic from other namespaces while allowing all the traffic coming from the same namespace the pod deployed to.
    
    Use Cases :
        You do not want deployments in test namespace to accidentally send traffic to other services or databases in prod namespace.
        You host applications from different customers in separate Kubernetes namespaces and you would like to block traffic coming from outside a namespace.


5. ALLOW traffic to an application from all namespaces
        This NetworkPolicy will allow traffic from all pods in all namespaces to a particular application.

        Use Case:
                - You have a common service or a database which is used by deployments in different namespaces.
                - You do not need this policy unless there is already a NetworkPolicy blocking traffic to the application or 
                  a NetworkPolicy blocking non-whitelisted traffic to all pods in the namespace.

6. ALLOW all traffic from a namespace
        This policy is similar to allowing traffic from all namespaces but shows how you can choose particular namespaces.

        Use Case:
                - Restrict traffic to a production database only to namespaces where production workloads are deployed.
                - Enable monitoring tools deployed to a particular namespace to scrape metrics from the current namespace.

7. ALLOW traffic from some pods in another namespace
            Since Kubernetes v1.11, it is possible to combine podSelector and namespaceSelector with an AND (intersection) operation.

8. ALLOW traffic from external clients
This Network Policy enables external clients from the public Internet directly or via a Load Balancer to access to the pod.

Use Cases:

You need to expose the pods to the public Internet in a namespace denying all non-whitelisted traffic

9. ALLOW traffic only to a port of an application
        This NetworkPolicy lets you define ingress rules for specific ports of an application. If you do not specify a port in the ingress rules, the rule applies to all ports.

        A port may be either a numerical or named port on a pod.

        Use Cases :

        Allow monitoring system to collect the metrics by querying the diagnostics port of your application, without giving it access to the rest of the application.

10. ALLOW traffic only to a port of an application
         This NetworkPolicy lets you define ingress rules for specific ports of an application. If you do not specify a port in the ingress rules, the rule applies to all ports.

         A port may be either a numerical or named port on a pod.

         Use Cases :
            Allow monitoring system to collect the metrics by querying the diagnostics port of your application, without giving it access to the rest of the application.
11. DENY egress traffic from an application
        
        Use Cases:
            You want to prevent an application from establishing any connections to outside of the Pod.
            Useful for restricting outbound traffic of single-instance databases and datastores.
12. DENY all non-whitelisted traffic from a namespace
        bulb Use Case: This is a fundamental policy, blocking all outgoing (egress) traffic from a namespace by default (including DNS resolution). After deploying this, you can deploy Network Policies that allow the specific outgoing traffic.

        Consider applying this manifest to any namespace you deploy workloads to (except kube-system).
        
        Bulb Best Practice: This policy will give you a default "deny all" functionality. This way, you can clearly identify which components have dependency on which components and deploy Network Policies which can be translated to dependency graphs between components.

13. DENY external egress traffic
        (a.k.a LIMIT traffic to pods in the cluster)

        Use Cases:
            - You want to prevent certain type of applications from establishing connections to the external networks.    

```