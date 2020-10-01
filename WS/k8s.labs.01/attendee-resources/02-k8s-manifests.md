
### 03. K8s Manifests

```

Push the button - Deploy the pods and services to the cluster

In this exercise, we will deploy the entire sock shop stack to our cluster using pod manifests.

Note that the sock shop example provided is a proof of concept training demo, 
and should not necessarily be emulated in a production environment. 
During today’s workshops we’ll be looking at the sock shop’s configuration 
and outlining ways that it can be improved.

step 1 - remove front end pod
------------------------------------
First lets see what we have running from the last workshop and clear it up:

$ kubectl get po # po is short for pods and can be used in its place
$ kubectl delete po front-end

step 2 - deploy all pods and services
---------------------------------------------
There is a directory of manifests that describe the whole stack living inside
attendee-resources/workshop-03b.

Open some files in this directory and notice how they are essentially the same as 
our front-end pod but with minor alterations depending on what service it is.

We are going to deploy all pod and service manifests in this directory at once.

Make sure you are in the correct directory:

$ cd /path/to/attendee-resources
$ ls -l attendee-resources/workshop-03b
-rw-r--r--  1 dot dot  505 Jan 15 19:28 carts-db-pod.yaml
-rw-r--r--  1 dot dot  219 Jan 15 19:48 carts-db-svc.yaml
-rw-r--r--  1 dot dot  517 Jan 15 19:29 carts-pod.yaml
-rw-r--r--  1 dot dot  257 Jan 15 19:49 carts-svc.yaml
-rw-r--r--  1 dot dot  361 Jan 15 19:30 catalogue-db-pod.yaml
...
Now we can use kubectl apply to submit these resources to Kubernetes:

$ kubectl apply -f attendee-resources/workshop-03b
(-f is shorthand for --filename - and it can also be used on directories as we do here)

The API server should acknowledge the creation of these pod and service resources and 
you’ll in the output that the different resources are configured.

Confirm our services are registered:

$ kubectl get svc # svc is short for services
Now, we want to keep an eye on these pods as the images are pulled and the containers are started.

Watch pod status

$ watch kubectl get po
Wait for all pods to be in a Running state. When they’re all running we’re ready 
to continue. Kubernetes has achieved the desired state.

step 3 - get a list of all Kubernetes objects in your cluster
-----------------------------------------------------------------
Kubernetes is taking actions based on the resources stored in its data store. 
You might find it interesting to list all the resources with kubectl get all. 
We’ll learn today about the ones you’re most likely to use.

There are some exceptions that kubectl get all will not list, but we will 
learn about the most important ones later.

step 4 - use port-forward to connect
------------------------------------
Now it’s time to load up our site in a browser. 
We need an easy way to connect the browser on our 
laptop to the front-end pod running inside the cluster.

Open a port using the port-forward command on kubectl:

$ kubectl port-forward front-end 8079
Now you should be able to open the URL http://127.0.0.1:8079 in your browser 
and see the sock shop running in all its glory.

Notice how when you kill the port-forward command - you can no longer access the site.

Our frontend pod is using the in-cluster DNS to communicate with the other pods via their service names.

step 5 - delete the front end pod
------------------------------------
Ensure that the port-forward command is running, and open a new terminal window.

In this new terminal window, run the following command, which should return the sock shop’s HTML:

curl -s http://localhost:8079
In the terminal window where port-forward is running you should see the 
message Handling connection for 8079. Running the curl command again will continue to return the HTML.

Delete the front-end.yaml pod:

$ kubectl delete -f attendee-resources/workshop-03b/front-end.yaml
Continue to run the curl command, and within 60 seconds, you should see 
an error message stating container not running.

Kill the port-forward command and recreate the front-end.yaml pod using the 
kubectl apply command. Running the curl command will again return the sock shop’s HTML.

Note that when a node dies, the pods on that node are lost to us and are not 
rescheduled, in case the node suddenly comes back, e.g. the node just lost connection momentarily.

When we ask Kubernetes to delete a resource, it doesn’t get auto-healed. By 
running kubectl delete we have modified the desired state of the cluster, 
and Kubernetes has taken steps to ensure (eventually) that the actual state matches the desired state.


```
