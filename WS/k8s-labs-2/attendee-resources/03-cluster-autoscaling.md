03. Autoscaling (gcloud)

```
Cluster autoscaling

Ensure your cluster always has space to schedule new pods
So far, we’ve seen how to configure autoscaling for a single application within our cluster. 
This works great if we want to respond to user demand and we have spare capacity to run extra pods,
however we don’t always want to run a surplus. With the cluster-autoscaler, 
we can automatically scale up our Kubernetes cluster if there is not enough room to schedule new pods.

This will allow us to set extremely high limits on our HPAs, without having to reserve capacity 
to deal with load spikes.

Step one - set up cluster-autoscaler
As we are running on GKE, we can simply ‘enable’ the cluster autoscaler via gcloud. 
If we were running this outside of GKE, or wanted tighter control of the autoscaler,
we could choose to manually deploy the cluster-autoscaler.

$ gcloud container clusters update <cluster-name> \
 --enable-autoscaling --min-nodes=3 --max-nodes=7 --node-pool=default-pool

This enables autoscaling between 3 and 7 nodes on our default node pool.
Whilst this is executing, the master will become unavailable for a few minutes 
whilst it’s restarted. This is because the cluster-autoscaler components runs on the 
master node when using GKE.

Step two - trigger a scale, create some extra pods
In order to test the cluster autoscaler, we’re going to scale up one of our 
Sock Shop components so much that we exhaust the spare capacity in the cluster.

Edit the Deployment for the catalogue using kubectl edit to add a request
for 100m of CPU and increase the replica count to 30.

...
spec:
  replicas: 30
  template:
    ...
    spec:
      containers:
      - name: catalogue
        ...
        resources:
          requests:
            cpu: 100m
...
We should see some new pods being created, some of which will be scheduled (ContainerCreating), 
and the others stuck in a Pending state.

Check out the current pods (using get pods), and make sure at least one of them is failing 
to schedule due to insufficient CPU/memory. You can then monitor the nodes in the cluster 
with: watch kubectl get nodes. You should eventually see a new node entry in this list 
(noticeable by it’s Age being far newer than any other nodes).

Eventually (usually within 5 minutes), the previously Pending pod should be scheduled onto this new node!

Step three - scale down
Using kubectl edit again, we can scale the catalogue Deployment down again.

It may take 10-15 minutes, but you should eventually see the new nodes that were just 
brought online be shut down. This delay is to prevent the cluster rapidly changing
size up and down if the load spikes are only short.

Step four - clean up
$ gcloud container clusters update <cluster-name> --no-enable-autoscaling --node-pool=default-pool
If you find that there are still autoscaled nodes hanging around, you might want force it 
back down to the three nodes you started with too:

gcloud container clusters resize <cluster-name> --num-nodes=3
```
