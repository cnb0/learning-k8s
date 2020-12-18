# Create a Service

All necessary information about Services can be found in the official documentation: [Services | Kubernetes](https://kubernetes.io/docs/concepts/services-networking/service/). 

## List All

```
kubectl get all
```

## List Services

```
kubectl get service
kubectl get svc
```

## Expose Deployment	

```
kubectl expose deployment k8s-ws --name=mysvc --port 80 --target-port 5000
```

## List Services

```
kubectl get svc
```

## Create a "tester" pod and access the service

```
kubectl run tester --image=nodyd/k8s-ws
kubectl exec -it tester -- sh
ping -c1 mysvc
curl mysvc
curl mysvc:80
```
## Leave the pod

```
exit
```

## inspect the IP addresses of the pod and the service

```
kubectl get all -o wide
```

## Change ServiceType ClusterIP-NodePort

```
kubectl patch svc mysvc --type='json' -p '[{"op":"replace","path":"/spec/type","value":"NodePort"}]'
```

## List Services and access the NodePort on the Host

On Minikube:

```
kubectl get svc mysvc
minikube service --url mysvc
curl $(minikube service --url mysvc)
```

On jumphost:
```
kubectl get svc mysvc
curl $(kubectl get pod -o wide | grep "Running" | awk '{print $7}' | head -n 1):<NodePort>
```
