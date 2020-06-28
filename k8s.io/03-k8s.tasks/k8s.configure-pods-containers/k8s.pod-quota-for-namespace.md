## [Configure a Pod Quota for a Namespace])(https://kubernetes.io/docs/tasks/administer-cluster/manage-resources/quota-pod-namespace/)

```
 - Set a quota for the total number of Pods that can run in a namespace.
 - You specify quotas in a "ResourceQuota" object

1. Create a namespace
           - Create a namespace so that the resources you create in this exercise are isolated from the rest of your cluster
            - $ kubectl create namespace quota-pod-example

2. Create a ResourceQuota
           - configuration file for a ResourceQuota object: 

                        apiVersion: v1
                        kind: ResourceQuota
                        metadata:
                        name: pod-demo
                        spec:
                        hard:
                            pods: "2"

            - View detailed information about the ResourceQuota
                - $ kubectl get resourcequota pod-demo --namespace=quota-pod-example --output=yaml

                            spec:
                                hard:
                                    pods: "2"
                            status:
                                hard:
                                    pods: "2"
                                used:
                                    pods: "0"
```