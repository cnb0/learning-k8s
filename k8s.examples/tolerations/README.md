# [Taint and Tolerations](https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/)

# Taint a node
```
kubectl taint nodes NODE-NAME type=specialnode:NoSchedule
```

# Taint a node with NoExecute
```
kubectl taint nodes NODE-NAME testkey=testvalue:NoExecute
```
