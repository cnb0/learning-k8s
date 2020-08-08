# Troubleshooting k8s - service discovery


- There is a barrier between you and the process you want to monitor and 
  traditional troubleshooting tools run on the host doesn’t understand containers,
  namespaces and orchestration platforms.
- k8s orchestration brings a minimal runtime, just the service and its dependencies without all the troubleshooting tools, 
- think of troubleshooting with just busybox!
  They are scheduled across your cluster… containers move, scale up and down. 
- Are highly volatile, appearing and disappearing as the process ends, gone.
- Talk to each other through new virtual network layers.

- Reproducing exactly what happened inside container can be very challenging as they terminate when the process dies or just ends

- Kubernetes allows you to create container groups and define services on top of them. 
  Kubernetes assigns each service a virtual static IP address routable within the cluster, 
  so any connection that reaches this IP address will be automatically routed to one of the containers in the group.

- The benefit of using services is that you are able to access the functionality provided by the containers 
  without knowing their identity. 
  This is basically an easy to discover load balancer. 
  And to make things even easier, Kubernetes also generates an internal DNS entry that resolves to this IP address.

- When it’s all in place it feels a little bit like magic. But, looking under the hood, it’s easy to understand what Kubernetes is doing. With a little more  work – and digging into system calls – we can see how Kubernetes goes about it. Let’s start with the what and then go into the how.

- SkyDNS resolves DNS requests asking etcd HTTP API and how Kubernetes implements stateless load balancing using iptables