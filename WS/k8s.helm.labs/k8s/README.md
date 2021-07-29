# Working with Kubernetes
```
$cd k8s

// Get list of nodes in cluster
$kubectl get node
$kubectl get node -o wide

// Deploy resources
$kubectl apply -f .

// Get data of resources
$kubectl get pod -w
$kubectl get deployment
$kubectl get rs
$kubectl get svc
$kubectl get pvc

// Scale deployment
$kubectl scale deployment frontend --replicas=5
$kubectl scale deployment backend --replicas=5

// Delete all resources
$kubectl delete -f .
```