# Storage

Container filesystems are ephemeral by default. If you want to persist data beyond the life of a container, you can use volumes, which is a way for containers to access external storage.

- Persistent Volumes are a way of treating storage as an abstract resource. Pods can consume storage from a persistent volume.

- Persistent Volume Claims are used by pods to consume storage from a persistent volume.

Volumes and PVs each have a volume type.
- NFS
- Cloud Storage
- ConfigMaps
- Secrets
- Simple Dir on k8s node

### Using Volumes
**Volumes** are part of the pod spec.
- `name`
- volumeType spec

**Volume Mounts** are part of the container spec.
- `name`
- `mountPath`

Two containers in a single pod can mount the same volume. The mountPath does not have to be the same, but they will see the same data in those paths.

Common volume types
- `hostPath` - a directory on the node
- `emptyDir` - a dynamic, ephemeral storage directory on the node. These are removed when the pod is removed. Useful for sharing data between multiple containers in a single pod.

### Persistent Volumes

Reclaim Policies
- Retain - saves data, requires manual intervention to clean up
- Delete - only works for cloud storage
- Recycle - automatically deletes all data, allows the volume to be reused with no manual steps

### Persistent Volume Claims
This represents a request for a certain amount of storage resources. When a claim is created, it looks for a persistent volume that is able to meet the requirements of the claim.

If a suitable PV is found, it will bind to that PV.

Persistent Volume Claims can be mounted by a pod just like other volume mounts. The Volume spec in the pod is a little different but the container can mount it just like any other volume type.

Edit the `spec.resources.requests.storage` attribute of a PVC to increase the storage request.

The persistent volume itself must have `allowVolumeExpansion : true`
