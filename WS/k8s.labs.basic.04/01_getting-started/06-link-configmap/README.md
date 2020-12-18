# Link ConfigMap with properries

All necessary information about the usage of ConfigMaps can be found in the official documentation: [Configure a Pod to Use a ConfigMap](https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/), there are multiple ways to interact with ConfigMaps. 


## Check the updated deployment

```
cat yaml/deployment.k8s-ws.yaml
```

## Apply deployment

```
kubectl apply -f yaml/deployment.k8s-ws.yaml
```

## Check result

```
kubectl get pods
kubectl exec -it tester -- curl mysvc
```

