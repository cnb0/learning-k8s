[Assign Pods to Nodes](https://kubernetes.io/docs/tasks/configure-pod-container/assign-pods-nodes/)
```

- Assign a Kubernetes Pod to a particular node in a Kubernetes cluster.

    - Add a label to a node
            - $ kubectl label nodes <your-node-name> disktype=ssd
    - Create a pod that gets scheduled to your chosen node
            - below pod configuration file describes a pod that has a node selector, disktype: ssd. 
              This means that the pod will get scheduled on a node that has a disktype=ssd label.

                      spec:
                        containers:
                        - name: nginx
                            image: nginx
                            imagePullPolicy: IfNotPresent
                        nodeSelector:
                            disktype: ssd

    - Create a pod that gets scheduled to specific node
            - schedule a pod to one specific node via setting nodeName.
                        spec:
                         nodeName: foo-node # schedule pod to specific node
                         containers:
                            - name: nginx
                              image: nginx
                              imagePullPolicy: IfNotPresent
                              
            - Use the configuration file to create a pod that will get scheduled on 
              foo-node only

```
