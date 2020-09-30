### 02. Deployments

```
Deploy Sock Shop (declarative)

deploy the entire sock shop application

In this exercise, we will use declarative manifests to make a deployment of the whole stack.

step 1 - create the namespace
----------------------------------
To create the namespace, we will use a declarative manifest for it.
Open the attendee-resources/workshop-02a/00-sock-shop-ns.yaml file:

---
apiVersion: v1
kind: Namespace
metadata:
  name: sock-shop


This is essentially the same as the 
          $kubectl create ns sock-shop imperative command.

The different is that this manifest file can live in source control (which is good).

Create the namespace using a manifest:
$ kubectl create -f attendee-resources/workshop-02a/00-sock-shop-ns.yaml

step 2 - create the services
----------------------------------
Now - we will use the service manifests to create the services in the same, declarative manner.

Open an example service file from attendee-resources/workshop-02a/services.

Notice how the namespace field is set to sock-shop:

namespace: sock-shop

Before we deploy any actual pods - lets stand up our services so that
when they are running, they can talk to each other.

Use kubectl to create all the services in our sock-shop namespace:

$ kubectl apply -f attendee-resources/workshop-02a/services

Check the services were created:

$ kubectl -n=sock-shop get svc
        Notice how if we use the default namespace - we cannot see our services:

$ kubectl get svc

step 3 - create the deployments
----------------------------------

You will find all of the deployment manifests inside 
attendee-resources/workshop-02a/deployments have spec.replicas set to 1.

Increase the number of replicas for the stateless pods if you like.

create deployments for the entire stack using kubectl create:

$ kubectl apply -f attendee-resources/workshop-02a/deployments --record
$ watch kubectl -n=sock-shop get deploy
$ kubectl -n=sock-shop describe deployments

step 4 - view the site in your browser
----------------------------------
Because we have created the services - we can use the fact that the front-end service 
uses a load balancer to view our site using an IP address.

First - let’s get the IP address for the load balancer:

$ kubectl -n=sock-shop get svc

Grab the EXTERNAL-IP ( need to have cloud provider IP ) field of the front-end service and open your browser to that address.

NOTE: the external IP may take a short while to appear

Try registering an account and adding some socks to your cart.

```
