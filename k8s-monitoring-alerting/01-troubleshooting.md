## Listing Nodes

```sh
kubectl get nodes
kubectl describe node <node-name>
```

## Listing Pods

```sh
kubectl get pods -o wide
kubectl -n kube-system get pods -o wide
```

## Looking at Pod events

```sh
kubectl describe pod <pod-name>
```
```
1. Check control plane logs 
          -kube-apiserver 
          -kube-controller-manager 
          -kube-scheduler  
          -kube-dns  
2. kubelet logs
3. kube-proxy logs
```


## Looking at kube-apiserver logs

```sh
PODNAME=$(kubectl -n kube-system get pod -l component=kube-apiserver -o jsonpath='{.items[0].metadata.name}')
kubectl -n kube-system logs $PODNAME --tail 100
```

If kube-apiserver is not running as kubelet static Pods, then use `journalctl -u kube-apiserver` command instead.

## Looking at kube-controller-manager logs

```sh
PODNAME=$(kubectl -n kube-system get pod -l component=kube-controller-manager -o jsonpath='{.items[0].metadata.name}')
kubectl -n kube-system logs $PODNAME --tail 100
```

If kube-controller-manager is not running as kubelet static Pods, then use `journalctl -u kube-controller-manager` command instead.

## Looking at kube-scheduler logs

```sh
PODNAME=$(kubectl -n kube-system get pod -l component=kube-scheduler -o jsonpath='{.items[0].metadata.name}')
kubectl -n kube-system logs $PODNAME --tail 100
```

If kube-scheduler is not running as kubelet static Pods, then use `journalctl -u kube-scheduler` command instead.

## Looking at kube-dns logs

Kube-dns is usually running as addons. Each kube-dns Pod contains three containers and `kubedns` container's log could be got by

```sh
PODNAME=$(kubectl -n kube-system get pod -l k8s-app=kube-dns -o jsonpath='{.items[0].metadata.name}')
kubectl -n kube-system logs $PODNAME -c kubedns
```

## Looking at kubelet logs

SSH to the Node and then run

```sh
journalctl -l -u kubelet
```

## Looking at kube-proxy logs

Kube-proxy is usually running as daemonsets, whose logs could be got by

```sh
$ kubectl -n kube-system get pod -l component=kube-proxy
NAME               READY     STATUS    RESTARTS   AGE
kube-proxy-42zpn   1/1       Running   0          1d
kube-proxy-7gd4p   1/1       Running   0          3d
kube-proxy-87dbs   1/1       Running   0          4d
$ kubectl -n kube-system logs kube-proxy-42zpn
```
