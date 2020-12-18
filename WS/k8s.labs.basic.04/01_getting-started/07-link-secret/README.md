# Inject Secrets into ENV 

All necessary information about the usage of Secrets can be found in the official documentation: [Distribute Credentials Securely Using Secrets](https://kubernetes.io/docs/tasks/inject-data-application/distribute-credentials-secure/), there are multiple ways to interact with Secrets. 

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

