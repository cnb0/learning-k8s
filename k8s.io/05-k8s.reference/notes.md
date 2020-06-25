[k8s.reference](https://kubernetes.io/docs/reference/)

```
1. API Reference
        Kubernetes API Overview - Overview of the API for Kubernetes.
        Kubernetes API Reference v1.18

2. API Client Libraries
        To call the Kubernetes API from a programming language, you can use client libraries. Officially supported client libraries:
                         - Go  
                         - Python  
                         - Java  
                         - JavaScript  
3. CLI Reference
        - kubectl - Main CLI tool for running commands and managing Kubernetes clusters.
        - JSONPath - Syntax guide for using JSONPath expressions with kubectl.
        - kubeadm - CLI tool to easily provision a secure Kubernetes cluster.

4. Components Reference
        kubelet  
                - The primary node agent that runs on each node. 
                  The kubelet takes a set of PodSpecs and ensures that 
                  the described containers are running and healthy.
        
        kube-apiserver  
                 - REST API that validates and configures data for API objects such as 
                   pods, services, replica set
        
        kube-controller-manager - 
                  - Daemon that embeds the core control loops shipped with Kubernetes.

        kube-proxy  
                  - Can do simple TCP/UDP stream forwarding or round-robin TCP/UDP forwarding across a set of back-ends.
        
        kube-scheduler - 
                  - Scheduler that manages availability, performance, and capacity.
                        - kube-scheduler Policies
                        - kube-scheduler Profiles
```
