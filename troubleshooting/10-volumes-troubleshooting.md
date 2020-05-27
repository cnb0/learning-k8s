
### Troubleshooting Persistent Volumes
 ```
storage troubleshooting, including PV, PVC, LocalVolume and StorageClass.

Usually, getting the status and events of PV/PVC is our first step, e.g.

kubectl get pv
kubectl get pvc
kubectl get sc

kubectl describe pv <pv-name>
kubectl describe pvc <pvc-name>
kubectl describe sc <storage-class-name>
```
