 ### 4. Rollouts

```
Create a canary deployment with a bad image and then rollback
In this workshop, we will deploy a canary version of the front-end,
alongside the stable version, and use a service to load balance traffic.

step 1 - create an alternate deployment manifest
----------------------------------------------------
Having learnt that we can easily mess up the site by blindly deploying what 
the designers do, we decide to rollout the change more gradually - starting with a canary release.

Copy the existing attendee-resources/workshop-04/deployments/front-end-dep.yaml file

$ mkdir -p attendee-resources/workshop-05a
$ cp attendee-resources/workshop-04/deployments/front-end-dep.yaml \
  attendee-resources/workshop-05a/front-end-dep.canary.yaml


Then edit this file and make the following changes:

change the metadata.name to front-end-canary
change the spec.selector.matchLabels.version to 0.2.1
change the spec.template.metadata.labels.version to 0.2.1
change the spec.template.spec.containers[0].image to gcr.io/jetstack-workshops/front-end:0.2.1

NOTE: keep the spec.replicas field the same between the stable and canary deployment. 
This will mean both versions receive 50% of the traffic each.

Both pods will still get traffic because the front-end service will match any pod with labels.name=front-end.

This is a classic use of Kubernetes deployments using labels. We combine several deployments 
into a group that will all get traffic from a single service. (So we intentionally only changed
the name of the deployment and not the name of the pods.)

NOTE: spec.selector.matchLabels specifies the already existing pods/replica sets that this 
deployment will govern, while spec.template.metadata.labels specifies what labels newly created 
pods will have. It’s best to always keep these in sync!

step 2 - push the deployment
Create our canary deployment:

$ kubectl apply -f attendee-resources/workshop-05a/front-end-dep.canary.yaml
Check the status

$ watch kubectl -n=sock-shop  get deploy

We should now see both front-end and front-end-canary deployments running alongside each other.

step 3 - check the site
Refresh your browser and you should see the pink design appear 50% of the time.

NOTE: This type of canary deployment is not actually well suited to testing a UI change. 
Randomly serving customers a different colour page each time they load it won’t give a consistent 
user experience or allow for any reliable information to be collected about how it affects sales etc.
It’s only used in this exercise to visually show the load balancer working.

step 4 - remove the canary
Once again, we know the outcome - the designers ruined the site with their colour scheme.
Thankfully though, we have limited the damage to only a portion of our users
because we used a canary deployment pattern.

Revert the deployment

Now we know the canary deployment didn’t work out we can simply re-apply the old version again.

$ kubectl delete -f attendee-resources/workshop-05a/front-end-dep.canary.yaml
