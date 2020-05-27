```
$ kubectl explain
Did something weird happen when your pod deployed?
$ kubectl get pods
$ kubectl describe pods my-pod

Check the logs
 # dump pod logs (stdout)
$ kubectl logs my-pod    

# dump pod container logs(stdout, multi-container case) 
$ kubectl logs my-pod -c my-container 
# stream pod logs (stdout)
$ kubectl logs -f my-pod

# stream pod container logs(stdout, multi-container case)
$ kubectl logs -f my-pod -c my-container

Interactive debugging
$ kubectl run -i --tty alpine --image=alpine -- sh
$ telepresence
$ kubectl attach my-pod -i
$ kubectl port-forward my-pod 5000:6000
$ kubectl exec my-pod -- ls /
$ kubectl exec my-pod -c my-container -- ls /
$ kubectl top pod POD_NAME --containers

# Run pod as interactive shell

# create local shell that connects to
remote cluster with telepresence.io

# Attach to Running Container

# Forward port 6000 of Pod to
your to 5000 on your local
machine
# Run command in existing
pod (1 container case)
# Run command in existing pod
(multi-container case)
# Show metrics for a given pod
and its containers## k8s troubleshooting 
```
