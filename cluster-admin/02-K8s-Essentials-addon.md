```
Essential Kubernetes Addons :

          1. For enhanced insight and functionality
              - Cloud Native  Trail Map - 
              
          2. Choose your runtime & registry
              - Docker is the most common  runtime, but you could consider  using containerd (Graduated) or
                cri-o (Incubating) instead for less  footprint and attack area.
              - Also, an internal container image  registry might be needed. 
                Harbor  can set up a scalable registry for  you on Kubernetes.
                
           3. Observability and analysis-
               -  Now that the cluster is up and running,  let’s start monitoring it. 
                  As a good  starting point, you can use the  prometheus-operator Helm Chart.
                  That gives you a Prometheus instance  running in Kubernetes, good preset  rules for monitoring
                  (kube-state-metrics), and Grafana  dashboards for visualization.
                                - Prometheus - Monitoring
                                - Fluentd  -Logging 
                                - jaegar - tracing
                 - Enable Fluent Bit for logging 
                    In order to store container logs for a long  period of time, you need to enable a log  
                    forwarder from the container runtime to  some kind of logging aggregation  service like ElasticSearch.
                    You can use the ﬂuent-bit-kubernetes-logging project as  a good starting point for this task.
                    Bonus  points for also aggregating the Audit  Logs
                    
             4. Enable Cloud?env extensions
                  - What’s traditionally called Cloud  Providers for Kubernetes; handles  Node creation/deletion 
                    with the  environment, and  Type=LoadBalancer Services, and  optional other features.
                  - Anyone can create a so-called  Cloud Provider integration for their  environment. Example to the right
                  

             5. Enable Ingress Contorller 
                  - In order to expose your Services to the  outer world, you need some kind of  3rd-party Ingress Controller.
                  - Ingress Controllers makes your Ingress  objects in Kubernetes work.
                  - You might  want the controller itself to be a  Type=LoadBalancer Service.
                  - The ones you could look out for are  Traeﬁk, Nginx Ingress, and Contour
                  
              6. Persistent Storage is key
              
                   - Lastly, you most likely need  Persistent Storage for many of your  applications. 
                   - Kubernetes supports  the Container Storage Interface  (CSI) for providers to implement.
                   - Rook implements various types of  clustered storage in a Kubernetes-native way.  
                     Alternatively, you can use your cloud provider’s solution.

```
