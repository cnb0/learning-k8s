
### Namespaces



In this exercise, we will create a namespace and use it to deploy segregated resources to our cluster.

step 1 - remove pods
---------------------------
First, remove everything so we have a clean slate:

```
$ kubectl delete -f attendee-resources/workshop-03b
$ watch kubectl get pods
```

step 2 - create the namespace
--------------------------------
Now, lets list the current namespaces in our cluster:

```
$ kubectl get namespaces
$ kubectl get ns
```

The default namespace is where any resource without a namespace ends up 
(it does what it says on the tin).

get ns is a shortcut for get namespaces.

Use kubectl to create a demo namespace:

```
$ kubectl create ns demo
```
Check it was created:

```
$ kubectl get ns
```

step 3 - deploy a pod to our namespace
------------------------------------------
There is a file attendee-resources/workshop-03c/pod.yaml that will create a demo pod.
Notice the metadata section of the manifest and how it mentions demo as the namespace to deploy to.

```
---
kind: Pod
apiVersion: v1
metadata:
  name: k8s-counter
  labels:
    name: my-example-pod
  namespace: demo
spec:
  containers:
  - name: my-container
    image: gcr.io/jetstack-workshops/k8s-counter
    ports:
    - containerPort: 8080
      protocol: TCP
Lets deploy this pod into our demo namespace:

$ kubectl apply -f attendee-resources/workshop-03c/pod.yaml
```

step 4 - list pods in various namespaces
------------------------------------------
Now we can see the effect of having assigned a namespace to the pod we just deployed.

let’s list the pods in the default namespace:

```
$ kubectl get pods
```
Notice how we do not see the demo pod we just deployed.

Now lets look at the pods in the demo namespace:

```
$ kubectl get pods --namespace=demo
```

Now we can see the pod we just deployed.

Do the same with less typing:

You will be using the --namespace=xxx flag a lot - let’s save some typing by using the shortcut:

```
$ kubectl get pods -n=demo
```

-n=xxx is a shortcut for --namespace=xxx.

Open the pod in a browser:

We can see our demo pod in a browser (it’s a drawing program with k8s logos - try clicking!):

```
$ kubectl port-forward -n demo k8s-counter 8089:8080
```


step 5 - list all the stuff in all the namespaces
There is a --all-namespaces flag, that you can use with kubectl:

```
$ kubectl get pods --all-namespaces
```

This together with the “all” resource type can be used to list all the things:

```
$ kubectl get all --all-namespaces
```

Same exceptions apply as before…
```
