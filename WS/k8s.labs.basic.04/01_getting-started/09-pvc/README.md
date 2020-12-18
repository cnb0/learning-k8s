# Persistent Volume & Persistent Volume Claims

All necessary information about the usage of Persistent Volumes and Persistent Volume Claims can be found in the official documentation: [Persistent Volumes | Kubernetes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/). 


**DANGER!** read. [Container Breakouts – Part 1: Access to root directory of the Host](https://blog.nody.cc/posts/container-breakouts-part1/)

## Create the pod

```
kubectl create -f yaml/pod.pvc-pod.yaml
```

## See that the pod is not started

```
kubectl get pod pvc-pod
```

## Create Persistent Volume Claim (necessary for pod)

```
kubectl create -f yaml/pvc.pvc-test.yaml
```

## See that the pod is still not started and the volume is pending

```
kubectl get pod pvc-pod
kubectl get pvc pvc-test
```

## Create Persistent Volume, so that the PVC can allocate it

```
kubectl create -f yaml/pv.pv-test.yaml
```

## Check The PVC that the PV is allocated

```
kubectl get pvc
kubectl get pv
```

## See that the volume is mounted (empty)

```
kubectl exec -it pvc-pod -- ls -l /data
```

## Create a file in the volume

```
kubectl exec -it pvc-pod -- sh
echo "Test" > /data/hello-from-the-pod.txt
```

## Delete pod & Create him again

```
kubectl delete pod pvc-pod
kubectl create -f yaml/pod.pvc-pod.yaml
```

## See that the file is still there

```
kubectl exec -it pvc-pod -- ls -l /data
```


