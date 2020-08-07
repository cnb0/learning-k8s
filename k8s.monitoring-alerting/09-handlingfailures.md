
```
Kubernetes is a distributed system with many hidden working parts.

1.Node failures
2.Out-of-resource failure
3.Storage mount issues
4.Network issues

1. Node Failures 
     $kubectl describe nodes
     $while true; do curl http://<EXTERNAl-IP>/ ; sleep 5; done
     $kubcectl events --watch 


2. Out of resource failures
  - Reducing the number of replicas to the bare minimum
        
        - $kubcectl scale --replicas=1 deployment/frontend
        - $kubcetl get events
        
  - Reducing CPU requirements

 ```
 ### Reference 
[Azure version, Kubernetes the Hard Way](https://github.com/ivanfioravanti/kubernetes-the-hard-way-on-azure) 
