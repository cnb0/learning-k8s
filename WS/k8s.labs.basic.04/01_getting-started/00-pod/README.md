# Container to Pod

All necessary information about Pods can be found in the official documentation: [Pods | Kubernetes](https://kubernetes.io/docs/concepts/workloads/pods/). 

## List All

```
kubectl get all 
```

## List Namespaces 

```
kubectl get ns
```

## Set Namespace

```
kubectl config set-context --current --namespace=<insert-namespace-name-here>
```

```
kubectl config set-context --current --namespace=$(whoami)
```

## List Pods of current namespace

```
kubectl get pods
```


## Start Pod

```
kubectl run k8s-ws --image nodyd/k8s-ws
```

## List Pods

```
kubectl get pods
```

## Exec into pod

```
kubectl exec -it k8s-ws -- sh
```

## curl localhost

```
curl 127.0.0.1:5000
```

## Leave pod

```
exit
```

## Delete pod

```
kubectl delete pod k8s-ws
```

## List Pods

```
kubectl get pods
```

