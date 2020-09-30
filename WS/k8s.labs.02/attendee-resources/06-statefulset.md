### 06. StatefulSet

```

Deploy a mongodb replica set with a Helm chart using a StatefulSet

In this lab, we will use a Helm chart to provision a MongoDB replica set 
(not to be confused with a Kubernetes ReplicaSet!). 
This replica set will replace the single instance MongoDB pod used 
by the carts service in the Sock Shop.

The ready-made MongoDB chart uses a StatefulSet resource, disks are dynamically provisioned
(i.e. PV/PVC) and MongoDB pods have Init Containers for configuration and bootstrap.

As an extension, we will also add a PodDisruptionBudget to always ensure quorum 
is available at all times, even during node upgrades.

Before You Begin
Perform the following tasks before starting the exercise. Skip any tasks that 
you have already completed in previous workshops.

Ensure Sock Shop is running
Firstly, ensure you have Sock Shop up and running. In later steps, 
we will use the front end to add sock products to the cart.

As a reminder, to find the public IP for the Sock Shop, grab the EXTERNAL-IP field of the front-end service:

$ kubectl -n=sock-shop get svc
Browse the Sock Shop at this IP and check all is functioning.

Exercise: Provisioning a MongoDB Cluster

step 1 - install the Helm chart
-----------------------------------------------------------
In this step, we will replace the MongoDB Deployment with a highly-available
cluster using a ready-made Helm chart that uses a StatefulSet resource. 
The two versions will co-exist and we will then switch the carts-db service to select pods deployed by Helm.

The MongoDB Helm chart can be found at the Kubernetes Helm charts repo 
(note we are using the replica set chart that is now in stable).

The configuration has sensible defaults but we will override the settings. Using values.yaml as a basis:

Add suitable resource requests (and limits)
Request larger disks (i.e. 15GB)
Bonus: Create a storageClass for SSD persistent disks (type pd-ssd) and use
this in place of the default class to provision fast SSD volumes for the MongoDB replicas.

$ export RELEASE_NAME=mongodb
$ helm install --name $RELEASE_NAME --version 3.9.6 -f values.yaml stable/mongodb-replicaset --namespace sock-shop

step 2 - see replica pods and corresponding PVCs and PVs
-----------------------------------------------------------
Let’s list the MongoDB pods that are running. After a short time deploying,
we should see 3 MongoDB pods, each with separate PVCs and a bound PV disk.
You can use a single kubectl get command to fetch multiple resource types.

$ kubectl get po,pvc,pv -n sock-shop
step 3 - update the carts deployment
To use the Helm-deployed MongoDB replica set in place of the existing carts-db Deployment, 
it is necessary to edit the carts Deployment to use a new connection URI. 
With new carts pod(s), this will switch traffic. In this case, 
we will not concern ourselves with data migration as we would in a real scenario.

Update to the following:

apiVersion: apps/v1
kind: Deployment
metadata:
  name: carts
  labels:
    name: carts
  namespace: sock-shop
spec:
  replicas: 1
  selector:
    matchLabels:
      name: carts
  template:
    metadata:
      labels:
        name: carts
    spec:
      containers:
      - name: carts
        image: weaveworksdemos/carts:0.4.8
        ports:
        - containerPort: 80
        command:
        - java
        - -Djava.security.egd=file:/dev/urandom
        - -Dspring.data.mongodb.uri=mongodb://mongodb-mongodb-replicaset:27017/data?replicaSet=rs0
        - -jar
        - ./app.jar
        - --port=80
Note the updated spring.data.mongodb.uri that now refers to the headless service created by the Helm chart.

step 4 - add to the cart, kill the primary and watch election and reschedule
Add some socks to the shopping cart to insert some data into the database.

MongoDB is a single-master database. Using kubectl exec we can execute a 
mongo client command to identify the elected primary.

$ kubectl exec $RELEASE_NAME-mongodb-replicaset-1 -n sock-shop -- sh -c 'mongo --eval="printjson(rs.isMaster())"'
(note: you can exec against any pod created by the StatefulSet)

In the JSON response from the client command, find the primary. Let’s delete this pod. 
As this is a 3-instance replica set and quorum will continued to be maintained (2 of 3), 
the shopping cart should continue to function.

$ kubectl delete pod $RELEASE_NAME-mongodb-replicaset-1 -n sock-shop
Following the pod deletion, Kubernetes should rapidly recreate a pod with the same identity, 
reunited with the same disk. This will restore a full and healthy replica set again. 
Verify this is the case using MongoDB’s rs.status() command.

$ kubectl exec $RELEASE_NAME-mongodb-replicaset-1 -n sock-shop -- sh -c 'mongo --eval="printjson(rs.status())"'
step 5 - scale-up the replica set
Next, we will request the replica set scales up to 5 instances. This is simply a case of 
updating the replica count in values.yaml (as used previously) and upgrading the release with Helm.

$ helm upgrade $RELEASE_NAME -f values.yaml stable/mongodb-replicaset
The new replicas should be started one-by-one and in order - watch the pods start:

$ watch kubectl get pod -n sock-shop
bonus step 6 - add a pod disruption budget
Currently, a cluster node upgrade has the potential to cause disruption to the MongoDB r
eplica set. Although the StatefulSet controller will always try to ensure the desired number
of replicas exist, during node upgrade (or other voluntary evictions) there may be periods of
time in which quorum of the replica set is not maintained.

To mitigate this risk, we should use PodDisruptionBudget to specify a minimum number or percentage
of replicas of the database cluster that must be up at a time. This will be respected during 
voluntary evictions, such as node upgrades.

Create a PodDisruptionBudget for the MongoDB replica set by using appropriate label selectors 
(i.e. app and release labels). A minAvailable of 67% is recommended to ensure quorum 
(i.e. 2 of 3 replicas, 3 of 5 replicas, etc).



```
