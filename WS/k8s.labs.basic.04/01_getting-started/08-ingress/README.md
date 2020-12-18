# Defining Ingress Rules

All necessary information about the usage of Ingress can be found in the official documentation: [Ingress | Kubernetes](https://kubernetes.io/docs/concepts/services-networking/ingress/), there are multiple ways to define Ingress. 


## Prepare Minikube

In case of Minikube
```
minikube addons enable ingress
```

## Inspect the Yaml

```
cat yaml/ingress.k8s-ws.v1.yaml
```

## Create generic ingress

```
kubectl create -f yaml/ingress.k8s-ws.v1.yaml
```

## Test ingress from host 

```
kubectl get ingress k8s-ws
curl <ip of ingress>
```

## Create an additional service

```
kubectl create deployment hello --image=nodyd/hello
kubectl expose deployment hello --name=hello --port 80 --target-port 80
```

## Test

```
kubectl exec -it tester -- curl hello
```

## Inspect the Yaml

```
cat yaml/ingress.k8s-ws.v2.yaml
```

## Apply the updated Ingress

```
kubectl apply -f yaml/ingress.k8s-ws.v2.yaml
```

## Test ingress from host

```
kubectl get ingress k8s-ws
curl <ip of ingress>
curl <ip of ingress>/hello
```


## Create an additional service
```
kubectl create deployment google-hello --image=gcr.io/google-samples/hello-app:1.0
kubectl expose deployment google-hello --name=ghello --port 80 --target-port 8080
```

## Test

```
kubectl exec -it tester -- curl ghello
```

## Inspect the Yaml

```
cat yaml/ingress.k8s-ws.v3.yaml
```

## Apply the updated Ingress

```
kubectl apply -f yaml/ingress.k8s-ws.v3.yaml
```

## Test ingress from host

```
kubectl get ingress k8s-ws
curl <ip of ingress>
curl <ip of ingress>/hello
curl -H "Host: foobar" <ip of ingress>
```
