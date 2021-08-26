### 04 . Rollouts - Ready or Not - Use readiness and liveness probes


In this workshop, we will see how readiness and liveness probes are used by k8s
to determine whether an application is alive and ready to serve traffic.

‘Ready’ might mean to your application that a healthy database connection is established,
it can access message queues, caching servers or even a dependent API service, etc. 
If any of these ‘ready’ conditions are not met the application can return failure (i.e. a non-200 response in the
case of an HTTP probe). 

The Kubelet determines this via the probe and the pod is not routed traffic (via a service). 

This is really useful for rolling deploys where you want to ensure that pods only serve traffic once they’re fully ready.

A readinessProbe takes the same format as a livenessProbe, and may also be based on either HTTP (GET) or exec. 
In this example, we’ll use a HTTP GET again.

```
readinessProbe:
  httpGet:
    path: /ready
    port: 8080
  initialDelaySeconds: 5
  periodSeconds: 5
```

Create a Deployment of `gcr.io/jetstack-workshops/readiness-app:0.0.1`  pods (replicas: 3) that implements 
this readinessProbe, as well as a livenessProbe. You should also expose it as a Service.

This is the deployment YAML for reference:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: readiness
  name: readiness-app
spec:
  selector:
    matchLabels:
      app: readiness
  replicas: 3
  template:
    metadata:
      labels:
        app: readiness
    spec:
      containers:
      - name: readiness
        image: gcr.io/jetstack-workshops/readiness-app:0.0.1
        ports:
        - containerPort: 8080
        readinessProbe:
          httpGet:
            path: /ready
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 5
        livenessProbe:
          httpGet:
            path: /
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 5


$ kubectl apply -f attendee-resources/workshop-05b/readiness-app-deployment.yaml
$ kubectl expose deploy readiness-app --port=80 --target-port=8080

```


Simulate readiness failure
---------------------------------
Once the pods are all up and running (and it should be quick as the readiness-app image 
is a super small container image based on busybox), we will simulate a readiness failure in a
pod using /disable. 

In the real world, this might be a database connection or dependent API service, 
say, that has failed and it is preferred for traffic to be routed elsewhere.

To do this, you could either kubectl exec to a pod to call this or spin up a new busybox pod and
use the IP address of one of the readiness pods; we’re doing the former below. 

Note that you will need to use kubectl get pods to get the name of one of your readiness pods 
to replace the name used in the command below.

```
$ kubectl exec readiness-app-438635462-32jfq -c readiness -- wget http://localhost:8080/disable
```

The readinessProbe probe should now fail and the pod will be taken out of service.

```
$ watch kubectl get pods

NAME                             READY     STATUS    RESTARTS   AGE
readiness-app-438635462-32jfq    0/1       Running   0          1m


$ kubectl get endpoints
NAME             ENDPOINTS                   AGE
readiness-app    10.0.0.7:80,10.0.3.5:80     10s
```

You’ll notice ‘Ready’ has changed (0/1) and there should now only be two healthy ready-app endpoints.

Traffic will continue to be routed to these two pod endpoints without disruption - 

you may like to have a curl in a separate tab/terminal to see this in action.

The pod should remain ‘Running’ though, because the livenessProbe continues to report that the container 
is alive and running.

Now bring the pod back into service (i.e. the error has been fixed) with /enable and use the commands
above to see it come back.

Note: if a readinessProbe is not specified, the Kubelet assumes a container’s ready state to be success.

Simulate liveness failure
--------------------------
Using the same Deployment, this time we’ll simulate liveness failure. 

Visit /break and any calls to / thereafter will experience random latency (> 5 seconds). 

This should cause the livenessProbe to fail (timeout of 5 seconds) and the pod to be restarted.

```
$ watch kubectl get pods

NAME                             READY     STATUS    RESTARTS   AGE
readiness-app-438635462-32jfq    1/1       Running   1          1m
```


Note the restart count has incremented. This application will come back up in a healthy (i.e. live) 
state so further restarts shouldn’t occur (unless triggered).


```
