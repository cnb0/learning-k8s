

### 03. Deployments - Deploy the sock-shop in a declarative way

In this exercise, we will use declarative manifests to make deployments of the whole stack.

Before starting it’s best to delete the resources created in the previous workshop to
avoid confusion when creating new resources of the same names. 

This can be done with:

```
kubectl delete -f attendee-resources/workshop-03c
```

step 1 - create the namespace
-------------------------------------
To create the namespace we will use a declarative manifest.

Open the attendee-resources/workshop-04/00-sock-shop-ns.yaml file:
```
---
apiVersion: v1
kind: Namespace
metadata:
  name: sock-shop
  ```

or
```$ kubectl create ns sock-shop```   
The difference is that this manifest file can live in source control (which is good).

Create the namespace using the manifest:

```
$ kubectl apply -f attendee-resources/workshop-04/00-sock-shop-ns.yaml
```

step 2 - create the services
-----------------------------
Now we will use the service manifests to create the services in the same, declarative manner.

Open an example service file from attendee-resources/workshop-04/services.

Notice how the namespace field is set to sock-shop:

namespace: sock-shop

Before we deploy any actual pods, lets stand up our services so that when they 
are running, they can talk to each other.

Use kubectl to create all the services in our sock-shop namespace:

```
$ kubectl apply -f attendee-resources/workshop-04/services
```

Check the services were created:

```
$ kubectl -n=sock-shop get svc
```

Notice how if we use the default namespace, we cannot see our services:

```
$ kubectl get svc
```


step 3 - create the deployments
--------------------------------
create deployments for the entire stack using kubectl apply:

```
$ kubectl apply -f attendee-resources/workshop-04/deployments --record
$ watch kubectl -n=sock-shop get deploy
$ kubectl -n=sock-shop describe deployments
```

step 4 - view the site
--------------------------------
Because we have created the services, we can use the fact that the front-end service
uses a load balancer to view our site using its IP address.

First let’s get the IP address for the load balancer:

```
$ kubectl -n=sock-shop get svc
```

Grab the EXTERNAL-IP field of the front-end service and open your browser to that address.

NOTE: the external IP may take a short while to appear

Try registering an account and adding some socks to your cart.

step 5 - update the image
--------------------------

We know the story, our designers want to make a change and although we know this is a bad idea, 
we suspend reality for a minute for the benefit of learning.

This time, we will make the update to the manifest file in a declarative manner, by updating the
attendee-resources/workshop-04/deployments/front-end-dep.yaml file.
This is good because our change can then be committed to source control.

Change the image field in the `attendee-resources/workshop-04/deployments/front-end-dep.yaml` file 
from 
`weaveworksdemos/front-end:0.3.12`  ==> `gcr.io/jetstack-workshops/front-end:0.2.1`

Now use kubectl apply to send the updated manifest to the API server:

```
$ kubectl apply -f attendee-resources/workshop-04/deployments/front-end-dep.yaml --record
```


Check the deployment:

```
$ kubectl -n=sock-shop describe deploy front-end
```


step 6 - check the site
--------------------------
Refresh your browser to see the faulty style change in the new image.

step 7 - revert the change

Change the image field in the 
  `attendee-resources/workshop-04/deployments/front-end-dep.yaml` 
  file back to
   `weaveworksdemos/front-end:0.3.12`

Now re-apply the reverted deployment manifest:

```
$ kubectl apply -f attendee-resources/workshop-04/deployments/front-end-dep.yaml --record
```


NOTE: In practice you might use git to revert to the previous version of the manifest file, 
and the change might be deployed as part of a continuous integration (CI) pipeline.


step 8 - check the site
--------------------------
Refresh your browser to see that the site has been restored to the original style.

```
