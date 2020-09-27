```
Can the kubelet run on nodes that use swap?
What do you need to specify when you install flannel on a k8s cluster? How?
In what format kubectl speaks to the k8s api?
How do namespace impact service dns resolution?
What flags controls the node health and eviction rate?
How can you attach metadata to an object? Do you know how to do it in one way or another?
How do you query the API http endpoint?
How many http api groups does the HTTP endpoint have?
Can you use the kubectl proxy command?

How does kubernetes interface with the container runtime?
What is CRI? How many shim there are? How do they work? How do I check which shim I am using (if I am using one)?
What are the kubelet steps of communication with the container runtime?
Do the kubelet listens or polls?
How do you use crictl and why?
Can you enum the process running on a non-master node? Can you enum the one running on the master?
How do you label a pod/node
What types of selectors do you have
What operators each selectors allow?
What do containers in a pod share?

What does the restart value mean in the get pod command?
How do deployment works?
What triggers a rollout? What doesn't?
What type of authentications does k8s support? What is the difference?
How does Authorization works?
What is the difference with Authentication
What is the correct order of stages that need to be followed to access the Kubernetes API?
Name two types of authorizers
What do you use to enforce resource quota?
What are services? How do they work? How many type of services there are?
What mechanism of service discovery does k8s implements?
Why using a name when defining the ports?
Can service without ClusterIP be created?

Can you create a service with no selectors? What happens?
Can you expose multiple ports? What do you need to do in this case?
Can you use SRV?
What are their limitation of using env variable for services?
What types of PV there are?
What is the difference between PV and PVC?
What kubectl flags shows you only the objects with a specific label?
How to use it as a selector?
What types of probes do a pod expose?
What are configmaps? What can you create them from?
What are the lifecycle hooks and what they do? What limitations do they have?
How schedule a specific pod to a specific node
What are the component of the cluster and where they run
How does a piece of information get from the command line to the yaml to the container/app

How can you scale up and down a deployments
How do kubernetes manage self healing
How to evict a node from pod from an upgrade? how to put it back online?
What is the default the security state of a pod networking
How can you apply a policy to pods
what is the process to create and replace TSL certificates for cluster component
Where does the images come from and why?
What is a security context and how to use them
How to secure etcd
How do you create a new role and assign it to a user
How to allocate persistant storage? what are the 3 access mode?
Difference between claim and volume
What are the two types of lifecyle for volumes?
How do you provide an application a persistante volume?

Which piece accept request in behalf of the cluster? which piece direct it around?
How is name resolution handled inside a pod?
What is the downward api?
What happens if you change the pod definition of a replicaset?
Can you delete a replicaset without affecting the pod? how?
What is a job? What is a cronjob?
What do resource quotas allow you to manage?
What are the lifecycle events?
How to show labels of a node?
How does nodeSelector work? problems?
How can you steer a pod towards or away from another pod?
What are taints?
What happens to pod already on a node when you taint them?
How can you make a deployment ignore taint?
