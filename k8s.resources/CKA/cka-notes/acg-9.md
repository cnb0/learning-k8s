# Services

Services allow you to expose an application running on a set of pods. They provide an abstract way to load balance between pods.

Endpoints - backend entities (pods) that a service routes traffic to.

#### Types of Services
Types of service determine how and where they are exposed.

1. ClusterIp
  - Expose applications within the cluster
  - `port` - this is the port that you use to communicate with the service
  - `targetPort` - this is the port that is exposed on the endpoints (pods)
2. NodePort
  - Expose applications outside the cluster
  - `nodePort` - this is the port that is listening externally (on all nodes, including controlplane)
  - You can leave out nodePort, and k8s will automatically assign a high port to the service
3. LoadBalancer
  - Expose applications outside the cluster
  - Use an external cloud load balancer as well
4. ExternalName (not in CKA)


#### Service commands
- `kubectl get endpoints <svc-name>`

#### Discovering services with DNS
Fully qualified domain name of the service is as follows..
- `svc-name.namespace-name.svc.cluster-domain.local`
- `web-frontend.default.svc.cluster.local`

If you're in the same namespace, you can simply refer to the service using `<svc-name>`

#### Ingress Objects
- Ingress is a k8s object that manages external access to the services within the cluster.

- This is similar to a NodePort, but allows for TLS termination, advanced load balancing, virtual hosting, etc.

- They do nothing by themselves, you must install an ingress controller.

- They define a series of routing rules with paths

- You can use named ports within Ingress objects
