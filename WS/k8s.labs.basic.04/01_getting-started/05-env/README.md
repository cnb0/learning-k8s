# Environment 

All necessary information about Environment Variables can be found in the official documentation: [Define Environment Variables for a Container](https://kubernetes.io/docs/tasks/inject-data-application/define-environment-variable-container/). 


## Check output before change

```
kubectl exec -it tester -- curl mysvc
```

## Inspect the new deployment

```
cat yaml/deployment.k8s-ws.yaml
```

## Apply new deployment

```
kubectl apply -f yaml/deployment.k8s-ws.yaml
```

## See whats happen

```
kubectl get pods
kubectl exec -it tester -- curl mysvc
```
