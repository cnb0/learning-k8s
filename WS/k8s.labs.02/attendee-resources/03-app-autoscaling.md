
03. Autoscaling

```

Application autoscaling

Configure parts of the Sock Shop to automatically scale with load

In this workshop, we’re going to set up Horizontal Pod Autoscaling for 
the front-end component of the Sock Shop.

This allows Kubernetes to automatically scale the front-end deployment up and down 
in order to target a specific average CPU utilisation across all the front ends pods.

Configuring autoscaling is all done through one resource, the HorizontalPodAutoscaler. 
It’s modelled through this separate resource in order to support a standardised model
of autoscaling across resource types (e.g. ReplicaSet, ReplicationController, Deployment & StatefulSet).

Step 1 - create the HorizontalPodAutoscaler
------------------------------------------------

The first thing we need to do here is create the HorizontalPodAutoscaler (HPA). 
This can be done imperatively with the kubectl autoscale command, or declaratively 
with the HPA resource. In the interest of best-practice, we’re going to do it declaratively.

Create a file named attendee-resources/workshops/front-end-hpa.yaml with the following contents:

apiVersion: autoscaling/v2beta1
kind: HorizontalPodAutoscaler
metadata:
  name: front-end
  namespace: sock-shop
spec:
  minReplicas: 1
  maxReplicas: 10
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: front-end
  metrics:
  - type: Resource
    resource:
      name: cpu
      targetAverageUtilization: 50

You can see the HPA references the front-end Deployment resource in the sock-shop namespace.
We’ve also set some minimums and maximums, so we can ensure a certain level of service availability.

Go ahead and create this resource.

$ kubectl apply -f attendee-resources/workshops/front-end-hpa.yaml

We shouldn’t see any immediate change within Kubernetes, unless you’ve got a lot of visitors 
buying a lot of socks at the moment! You can check the current resource utilisation of pods 
using the kubectl top command:

$ kubectl top pods -n sock-shop

You can find out more information about the status of your HPA with the kubectl describe command:

$ kubectl describe hpa -n sock-shop front-end
NOTE: kubectl describe hpa has a problem when kubectl is version 1.13, but you can 
inspect the object by running kubectl -n sock-shop get hpa front-end -o yaml..

Step 2 - generate some artificial load
------------------------------------------------

If you’re already selling socks to the general public at a high velocity,
you can skip this step. For all of us less successful entrepreneurs,
we’re going to simulate some load in order to watch the HPA scale up our cluster.

$ kubectl exec -itn sock-shop <front-end-pod-name> -- sh -c 'yes > /dev/null'
If we keep running kubectl top pods -n sock-shop alongside this command 
(in a separate terminal window), you should see the CPU load on the 
front-end pod gradually increasing. If we keep running in another terminal window,

$watch kubectl get pods -n sock-shop  

you should see new pods being created in order to bring this average utilisation down.
You can also see the details and status of the autoscaler by using the get hpa command:

$ kubectl get hpa -n sock-shop

NAME       REFERENCE             TARGETS     MINPODS   MAXPODS  REPLICAS   AGE
front-end  Deployment/front-end  52% / 50%   1         10       4          1m

You can see here that the HPA has scaled our Deployment to 4 replicas 
in order to maintain the CPU target of 50%.

Cancel the previous kubectl exec command to allow the front-end Deployment to scale back down.

```
