04. Scheduling

```
Spread the pods - Use advanced scheduling

In this workshop, we will see advanced Kubernetes scheduling in practice.

NOTE: if you are using the GCP free trial, you may encounter quota limits during this exercise. 
The Compute Engine limitations section, in the Free trial FAQ explains 
that free trial projects can have no more than 8 virtual CPUs. 
So if you are using the free trial, be careful to only add the suggested number of 
nodes during this exercise.

step 1 - scale a deployment and watch Kubernetes schedule to nodes
Pick one of the stateless microservices to scale - e.g. carts, catalogue, orders or 
even front-end. In this example, we pick the carts microservice and use the imperative 
kubectl scale command to scale-up to 4 replicas.

$ kubectl scale deployment/carts --replicas=4 -n=sock-shop

In order to see where the carts pods have been scheduled, we can add some additional
switches to a kubectl get pod command:

$ kubectl get pods -n sock-shop -l name=carts -o wide
NAME                     READY     STATUS    RESTARTS   AGE       IP          NODE
carts-57b6f6cc48-b6tgt   1/1       Running   0          14s       10.4.0.16   gke-demo-default-pool-342b8c90-vmjp
carts-57b6f6cc48-l2h88   1/1       Running   0          14s       10.4.0.15   gke-demo-default-pool-342b8c90-vmjp
carts-57b6f6cc48-qlbtd   1/1       Running   0          4m        10.4.1.8    gke-demo-default-pool-342b8c90-60sj
carts-57b6f6cc48-wllb7   1/1       Running   0          14s       10.4.1.15   gke-demo-default-pool-342b8c90-60sj

In this example, the carts pods have been spread evenly across the cluster (2 nodes and 2 pods per node). 
The reason for this spread is that the carts service exists and the Kubernetes scheduler will, 
by default, achieve service anti-affinity. See the SelectorSpreadPriority priority function in the scheduler.

step 2 - add an additional zone to the GKE cluster
By default, a GKE cluster is spun-up in a single zone and comprises nodes of the same instance type. 
However, it is possible to add extra nodes to a cluster, using additional node pools.

To schedule cross-zone in the next step, we need to add additional nodes in another zone 
to the GKE cluster configuration.

First, find out the region and zone of the current nodes by running:

$ kubectl get nodes --label-columns failure-domain.beta.kubernetes.io/region,failure-domain.beta.kubernetes.io/zone
NAME                                  STATUS    ROLES     AGE       VERSION        REGION         ZONE
gke-demo-default-pool-db4bfeb5-qrs2   Ready     <none>    22m       v1.13          europe-west1   europe-west1-b
gke-demo-default-pool-db4bfeb5-w0qk   Ready     <none>    22m       v1.13          europe-west1   europe-west1-b

Then get a list of all the compute zones in that region where your nodes are running:

$ gcloud compute zones list --filter=region=europe-west1
NAME            REGION        STATUS  NEXT_MAINTENANCE  TURNDOWN_DATE
europe-west1-b  europe-west1  UP
europe-west1-d  europe-west1  UP
europe-west1-c  europe-west1  UP

Adding an additional zone requires us to update the cluster configuration.

Before adding nodes in another zone, reduce the number of nodes to avoid running out of 
GCP quota. It’s possible to increase your quota, and doing so doesn’t incur any extra costs 
other than for the additional resources used. However there are limits for free accounts. 
The quota just exists to prevent unforeseen spikes in usage.

The following command will resize your cluster, enter y at the prompt:

$ gcloud container clusters resize <cluster-name> --num-nodes=2
Pool [default-pool] for [<cluster-name>] will be resized to 2.

Do you want to continue (Y/n)?  y

Resizing <cluster-name>...done.
...
The following example adds the europe-west1-c zone to the cluster.

$ gcloud container clusters update --node-locations europe-west1-b,europe-west1-c <cluster-name>
NOTE: the primary zone is required in this list (in this case, europe-west1-b).

NOTE: this will cause a limited period of control plane (master) downtime. The cluster
nodes in the existing zone will be unaffected during this process.

There will now be some new nodes in the specified zone. The number of nodes added 
will be the same as the number of nodes in the original zone, set by --num-nodes. 
You can see this by printing the failure-domain.beta.kubernetes.io/zone node label as a column:

$ kubectl get nodes --label-columns failure-domain.beta.kubernetes.io/region,failure-domain.beta.kubernetes.io/zone
NAME                                  STATUS    ROLES     AGE       VERSION        REGION         ZONE
gke-demo-default-pool-b5390259-bg2x   Ready     <none>    54s       v1.13          europe-west1   europe-west1-b
gke-demo-default-pool-b5390259-c2rl   Ready     <none>    54s       v1.13          europe-west1   europe-west1-b
gke-demo-default-pool-db4bfeb5-qrs2   Ready     <none>    28m       v1.13          europe-west1   europe-west1-c
gke-demo-default-pool-db4bfeb5-w0qk   Ready     <none>    28m       v1.13          europe-west1   europe-west1-c

We now have 2 new nodes in the new zone. But if you list the carts pods again, you will see that 
there are still multiple pods on the original nodes in the original zone:

kubectl -n sock-shop get pods -l name=carts -o wide
NAME                     READY     STATUS    RESTARTS   AGE       IP          NODE
carts-57b6f6cc48-fvpw9   1/1       Running   0          22m       10.0.1.15   gke-demo-default-pool-db4bfeb5-qrs2
carts-57b6f6cc48-htsj7   1/1       Running   0          22m       10.0.0.16   gke-demo-default-pool-db4bfeb5-w0qk
carts-57b6f6cc48-m4p4v   1/1       Running   0          22m       10.0.0.15   gke-demo-default-pool-db4bfeb5-w0qk
carts-57b6f6cc48-z92cq   1/1       Running   0          27m       10.0.1.6    gke-demo-default-pool-db4bfeb5-qrs2

In the next step we’ll modify the carts deployment to ensure that the carts pods are distributed across 
all the available nodes.

step 3 - inter-pod anti-affinity
In this step, we will add podAntiAffinity rules in order to achieve the following one carts pod per node

Inspect the carts Deployment manifest in attendee-resources/workshop-04/carts-dep-affinity.yaml 
and compare with the manifest in attendee-resources/workshop-02a/deployments/carts-dep.yaml. 
You’ll see that a PodAntiAffinity stanza has been added to the template.
Additionally, we have added a ‘version’ field to the Deployment template, which ensures that the 
Pods are repelling Pods of the same version. This is needed so that carts Pods that are in a 
Terminating state do not influence the scheduler’s decision-making regarding anti-affinity and Pod placement.

NOTE: this new block lives under the template Pod spec, not the deployment spec (affinity is a function of Pods). 
Below are two examples of using kubectl explain, which demonstrate that PodAntiAffinity 
is declared in the deployment.spec.template.spec (i.e. the Pod) stanza rather than in 
the top level of the deployment object:

kubectl explain deployment.spec.template.spec.affinity.podAntiAffinity.preferredDuringSchedulingIgnoredDuringExecution
kubectl explain deployment.spec.template.spec.affinity --recursive
Now apply the manifest:

$ kubectl apply -f attendee-resources/workshop-04/carts-dep-affinity.yaml
This will trigger a rolling update of the “carts” deployment.

Take another look at the pod list:

$ kubectl -n sock-shop get pods -l name=carts -o wide
NAME                     READY     STATUS        RESTARTS   AGE       IP          NODE
carts-57b6f6cc48-fgpch   1/1       Running       0          6s        10.0.2.8    gke-demo-default-pool-b5390259-c2rl
carts-57b6f6cc48-qzpfd   1/1       Running       0          5s        10.0.2.9    gke-demo-default-pool-b5390259-c2rl
carts-57b6f6cc48-r556d   1/1       Running       0          3s        10.0.3.9    gke-demo-default-pool-b5390259-bg2x
carts-57b6f6cc48-w24wz   1/1       Running       0          6s        10.0.3.8    gke-demo-default-pool-b5390259-bg2x
carts-859666f997-nmlvg   1/1       Terminating   0          1m        10.0.2.7    gke-demo-default-pool-b5390259-c2rl
carts-859666f997-pdgss   1/1       Terminating   0          1m        10.0.3.7    gke-demo-default-pool-b5390259-bg2x
carts-859666f997-qzn9z   1/1       Terminating   0          1m        10.0.0.17   gke-demo-default-pool-db4bfeb5-w0qk
carts-859666f997-x878c   1/1       Terminating   0          1m        10.0.1.16   gke-demo-default-pool-db4bfeb5-qrs2

You should see the old pods with status Terminating and new pods with status
Running or ContainerCreating and the new pods should be running on 
the two new nodes that we added earlier.

As a final exercise, try removing the affinity stanza and re-applying the carts deployment. 
You will probably notice that the carts pods are all moved to the two new nodes. Can you explain why?

step 4 - create a node pool of high-spec instances and limit their use
Next, we will create a small node pool (1 node per zone) of high-specification instances.
These instances should be protected so that pods cannot be scheduled onto them without
permission (e.g. imagine this as a pool of instances for a particular flavour of 
application or instances with specialist hardware).

WARNING: The following command may produce an error depending on your project’s quotas. 
Please read the note at the beginning of this exercise for more information about project quotas.

$ gcloud container node-pools create high-spec --machine-type=n1-highcpu-2 \
  --preemptible --num-nodes=1 --cluster=<cluster-name>
  
NOTE: Use the --preemptible flag to save money This will provision significantly lower cost 
preemptible VMs with up to 24 hour lifetime, ideal for testing)

In order to protect these new high spec nodes from general scheduling, we will use 
Kubernetes taints and tolerations.

First, we must ‘taint’ the new nodes (replace node1 and node2 with real node names from kubectl get nodes):

$ kubectl taint nodes <node1> <node2> dedicated=highCpu:NoSchedule
Now no pod can be scheduled to these nodes unless a pod has a matching ‘toleration’. 
The pod in attendee-resources/workshop-04/pod-toleration.yaml has this toleration in its spec. 
However, while it might schedule onto one of the highCpu nodes, there’s nothing to say it will. 
So, we’ll also add an affinity for those nodes to ensure our Pod ends up there. Alas, 
taints aren’t considered as labels, so we can’t match a node based on that for affinity purposes. 
Thus we’ll also add a label to the nodes to be able to identify them.

$ kubectl label nodes <node1> <node2> dedicated=highCpu
Now deploy the Pod. If you look in the file, you’ll see both the toleration and affinity setting.

$ kubectl apply -f attendee-resources/workshop-04/pod-toleration.yaml
$ kubectl get pod -l name=my-example-pod -o wide
The latter command should verify that the pod has scheduled to a ‘highCpu’ dedicated node (i.e. node1 or node2).

step 5 - delete the node pool
To finish, make sure you clean-up and remove the additional node pool.

$ gcloud container node-pools delete high-spec --cluster=<cluster-name>
```
