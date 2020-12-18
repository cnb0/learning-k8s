# Create and handle Yaml Files

All necessary information about Kubernetes Objects can be found in the official documentation: [Understanding Kubernetes Objects](https://kubernetes.io/docs/concepts/overview/working-with-objects/kubernetes-objects/). 

## Write a Pod specification

```
cat <<EOF > pod.my-second-pod.yaml
apiVersion: v1
kind: Pod
metadata:
  labels:
    run: my-second-pod
  name: my-second-pod
spec:
  containers:
  - image: nodyd/k8s-ws
    name: my-second-pod
EOF
```

## Create a Pod with a self-written specification

```
kubectl create -f pod.my-second-pod.yaml
kubectl get pods
```


## List Resources

```
kubectl get all
kubectl get configmaps
kubectl get secrets
```

## Get Yaml output of resources

```
kubectl get deployment k8s-ws -o yaml
kubectl get svc mysvc -o yaml
kubectl get configmap app-properties -o yaml
kubectl get secret app-cfg -o yaml
```

## Delete all resources

```
kubectl delete svc mysvc
kubectl delete deployment k8s-ws
kubectl delete pod tester
kubectl delete pod my-second-pod
kubectl delete configmap app-properties
kubectl delete secret app-cfg
kubectl get all
```

## Inspect the `*.yaml` files

```
ls -l yaml/
cat yaml/deployment.k8s-ws.yaml
cat yaml/pod.tester.yaml
cat yaml/service.mysvc.yaml
cat yaml/configmaps.app-properties.yaml
cat yaml/secret.app-cfg.yaml
```

## Create the resources with the yaml files

```
kubectl create -f yaml/configmaps.app-properties.yaml
kubectl create -f yaml/deployment.k8s-ws.yaml
kubectl create -f yaml/pod.tester.yaml
kubectl create -f yaml/secret.app-cfg.yaml
kubectl create -f yaml/service.mysvc.yaml
```

## See that everything is back

```
kubectl get all
```
