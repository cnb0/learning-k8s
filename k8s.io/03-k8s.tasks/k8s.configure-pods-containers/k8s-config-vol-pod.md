## [Configure a Pod to Use a Volume for Storage](https://kubernetes.io/docs/tasks/configure-pod-container/configure-volume-storage/)

```
- Configure a Pod to use a Volume for storage.

- A Container's file system lives only as long as the Container does. 
  So when a Container terminates and restarts, filesystem changes are lost. 
  
- For more consistent storage that is independent of the Container, you can use a Volume. 
- This is especially important for stateful applications, such as key-value stores (such as Redis) and databases.

- Configure a volume for a Pod
         - This Pod has a Volume of type emptyDir that lasts for the life of the Pod, 
            even if the Container terminates and restarts
         - local disk storage provided by emptyDir
              spec:
                containers:
                - name: redis
                  image: redis
                  volumeMounts:
                  - name: redis-storage
                    mountPath: /data/redis
                volumes:
                - name: redis-storage
                  emptyDir: {}
    
 $ kubectl exec -it redis -- /bin/bash
 
 
 ```
