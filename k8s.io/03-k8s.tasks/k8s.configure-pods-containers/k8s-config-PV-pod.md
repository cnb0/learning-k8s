[Configure a Pod to Use a PersistentVolume for Storage](https://kubernetes.io/docs/tasks/configure-pod-container/configure-persistent-volume-storage/)

 
```

- Configure a Pod to use a PersistentVolumeClaim for storage. Here is a summary of the process:

            - As cluster storage administrator, create a PersistentVolume backed by physical storage. 
            You do not associate the volume with any Pod.

            - You, now taking the role of a developer / cluster user, 
            create a PersistentVolumeClaim that is automatically bound to a suitable PersistentVolume.

            - You create a Pod that uses the above PersistentVolumeClaim for storage

 
1. Create a PersistentVolume (PV)

           - Create a hostPath PersistentVolume. 
              - Kubernetes supports hostPath for development and testing on a single-node cluster. 
              - A hostPath PersistentVolume uses a file or directory on the Node to emulate network-attached storage

           - In a production cluster, you would not use hostPath.
           - Instead a cluster administrator would provision a network resource like a 
                - GC persistent disk, NFS share, or an Amazon Elastic Block Store volume. 
           - Cluster administrators can also use StorageClasses to set up dynamic provisioning.

                                    apiVersion: v1
                                        kind: PersistentVolume
                                        metadata:
                                            name: task-pv-volume
                                            labels:
                                                type: local
                                        spec:
                                            storageClassName: manual
                                            capacity:
                                                storage: 10Gi
                                            accessModes:
                                                - ReadWriteOnce
                                            hostPath:
                                                path: "/mnt/data"

                    - The configuration file specifies that the volume is at /mnt/data on the cluster's Node. 
                    - The configuration also specifies a size of 10 gibibytes and an access mode of ReadWriteOnce, 
                      which means the volume can be mounted as read-write by a single Node. 
                    - It defines the StorageClass name manual for the PersistentVolume, 
                      which will be used to bind PersistentVolumeClaim requests to this PersistentVolume.



2. Create a PersistentVolumeClaim (PVC)
        - Pods use PersistentVolumeClaims to request physical storage
        - create a PersistentVolumeClaim that requests a volume of at least 3 gibibytes 
          that can provide read-write access for at least one Node
                                    apiVersion: v1
                                    kind: PersistentVolumeClaim
                                    metadata:
                                        name: task-pv-claim
                                    spec:
                                        storageClassName: manual
                                        accessModes:
                                             - ReadWriteOnce
                                         resources:
                                             requests:
                                             storage: 3Gi

                        - After you create the PersistentVolumeClaim, the Kubernetes control plane looks for a 
                          PersistentVolume that satisfies the claim's requirements. 
                        - If the control plane finds a suitable PersistentVolume with the same StorageClass, 
                          it binds the claim to the volume.

                          $ kubectl get pv task-pv-volume
                          $ kubectl get pvc task-pv-claim

3. Create a Pod
        - create a Pod that uses your PersistentVolumeClaim as a volume.

                                    spec:
                                        volumes:
                                            - name: task-pv-storage
                                              persistentVolumeClaim:
                                                claimName: task-pv-claim
                                        containers:
                                            - name: task-pv-container
                                              image: nginx
                                              ports:
                                                - name: "http-server" 
                                                  containerPort: 80
                                        volumeMounts:
                                                - mountPath: "/usr/share/nginx/html"
                                                  name: task-pv-storage

                                - Pod's configuration file specifies a PersistentVolumeClaim, 
                                  but it does not specify a PersistentVolume. 
                                - From the Pod's point of view, the claim is a volume.

4. Access control
            - Storage configured with a group ID (GID) allows writing only by Pods using the same GID. 
            - Mismatched or missing GIDs cause permission denied errors. 
            - To reduce the need for coordination with users, 
              an administrator can annotate a PersistentVolume with a GID.
              Then the GID is automatically added to any Pod that uses the PersistentVolume.

           - Use the pv.beta.kubernetes.io/gid annotation as follows:

                            apiVersion: v1
                            kind: PersistentVolume
                            metadata:
                                name: pv1
                                annotations:
                                    pv.beta.kubernetes.io/gid: "1234"


                        - When a Pod consumes a PersistentVolume that has a GID annotation, 
                          the annotated GID is applied to all containers in the Pod in the same way that GIDs specified in the 
                          Pod’s security context are. 
                        - Every GID, whether it originates from a PersistentVolume annotation or the Pod’s specification,
                          is applied to the first process run in each container.
                        - When a Pod consumes a PersistentVolume, the GIDs associated with the 
                          PersistentVolume are not present on the Pod resource itself

```
