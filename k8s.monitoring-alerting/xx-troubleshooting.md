## K8s Troubleshooting commands 
```
To verify that the kube-scheduler component is healthy
$kubectl get componentstatuses

$ kubectl explain

Did something weird happen when your pod deployed?
$ kubectl get pods
$ kubectl describe pods my-pod

Check the logs - dump pod logs (stdout)
$ kubectl logs my-pod    

# dump pod container logs(stdout, multi-container case) 
$ kubectl logs my-pod -c my-container 

# stream pod logs (stdout)
$ kubectl logs -f my-pod

# stream pod container logs(stdout, multi-container case)
$ kubectl logs -f my-pod -c my-container

Interactive debugging
$ kubectl run -i --tty alpine --image=alpine -- sh
$ telepresence #https://www.telepresence.io/discussion/overview
$ kubectl attach my-pod -i
$ kubectl port-forward my-pod 5000:6000
$ kubectl exec my-pod -- ls /
$ kubectl exec my-pod -c my-container -- ls /
$ kubectl top pod POD_NAME --containers

# Run pod as interactive shell

# create local shell that connects to
remote cluster with telepresence.io

# Attach to Running Container

# Forward port 6000 of Pod to your to 5000 on your local machine
# Run command in existing 
pod (1 container case)
# Run command in existing pod
(multi-container case)
# Show metrics for a given pod
and its containers## k8s troubleshooting 
```

<hr></hr>

## Creating and managing pods

* Deploy a pod with the kubectl cli tool
* Manage the basic life cycle of a pod

## Listing Pods

```
kubectl get pods
```

## Creating Pods

```
kubectl run inspector \
  --labels="app=inspector,track=stable" \
  --replicas=1 \
  --image=b.gcr.io/kuar/inspector:1.0.0
```

## Watch for status

```
kubectl get pods --watch
```

## Get Pod info

```
kubectl describe pods inspector
```

## Visit the running service

Grab the `IP` address for the pod

```
kubectl describe pods inspector
```

And run this command on one of your Kubernetes nodes:

```
curl http://IP
```
