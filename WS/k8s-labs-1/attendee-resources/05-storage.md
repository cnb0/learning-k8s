### 05. Storage

```
Destroy the database pod

In the exercise (of destruction) we will delete the cart database pod, watch our data go away and 
then feel bad.

step 1 - create some state
----------------------------------
We first need to create an account and add some socks to our cart. We should have our whole
stack running - we just need to get a browser connection.

$ kubectl -n=sock-shop get svc
----------------------------------

Grab the EXTERNAL-IP field of the front-end service and open your browser to that address.
Register an account and then add a collection of socks to your cart 
(don’t go mad, we will delete this in a moment).Logout and log back in to confirm the
cart data is still there.

step 2 - delete the carts-db pod
----------------------------------
Let’s list the pods we have running so we can grab the id for the carts-db pod:

$ kubectl -n=sock-shop get po | grep carts-db
Get the pod name for the carts-db pod and then let’s delete it:

$ kubectl -n=sock-shop delete po <carts-db-pod-name>

step 3 - watch the pod re-deploy
----------------------------------
Because the carts-db is part of a deployment, the moment we delete a pod, the deployment 
will kick in and immediately re-schedule another one.

$ watch kubectl -n=sock-shop get po

step 4 - check the data is gone
----------------------------------
Visit the site in the browser again and notice that when you login, the cart data has gone.

step 5 - creating persistent data
----------------------------------
When Kubernetes was first released, it only supported stateless applications. Although support for
stateful applications was introduced from Kubernetes 1.5, the perception that Kubernetes doesn’t 
handle state has stuck around in some quarters.

Kubernetes does now support stateful applications (if you know what you’re doing!), and achieves
this through a few primitives such as StatefulSet, PersistentVolume and PersistentVolumeClaim.
These abstractions are covered in further detail in our Intermediate workshops, but for now 
it’s enough to know that Kubernetes is capable of supporting stateful workloads, which would 
allow the cart data in this example to persist even if the pod is terminated.

```
