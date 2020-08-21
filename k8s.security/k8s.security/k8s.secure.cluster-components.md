
## Securing Kubernetes Deployments and Clusters

```
        - Securing Cluster Components			
        - Authentication, Authorization, and Admission Control				
        - Securing Kubernetes Pods				
        - Image Scanning in DevOps Pipelines
        - Real-Time Monitoring and Resource Management of a Kubernetes Cluster	
        - Defense in Depth

        
    - Securing Cluster Components			
            - Securing kube-apiserver				
            - Securing kubelet				
            - Securing etcd
            - Securing kube-scheduler	
            - Securing kube-controller-manager
            - Securing CoreDNS	
            - Benchmarking a cluster's security configuration

    - Authentication, Authorization, and Admission Control	
            - Requesting a workflow in Kubernetes			
            - Kubernetes authentication	
                       Client certificates
                       Static tokens
                       Basic authentication
                       Bootstrap tokens
                       Service account tokens
                       Webhook tokens
                       Authentication proxy
                       User impersonation
            - Kubernetes authorization	
                        Request attributes
                        Authorization modes
                        Node
                        ABAC
                        RBAC
                        Webhooks	
            - Admission controllers
                       AlwaysPullImages
                       EventRateLimit
                       LimitRanger
                       NodeRestriction
                       PersistentVolumeClaimResize
                       PodSecurityPolicy
                       SecurityContextDeny
                       ServiceAccount
            - Introduction to OPA

    - Securing Kubernetes Pods/Containers	
            - Hardening container images
            - Configuring the security attributes of pods/containers
            - The power of PodSecurityPolicy

    - Image Scanning in DevOps Pipelines
            - Introducing container images and vulnerabilities
                        Container images
                        Detecting known vulnerabilities
            - Scanning images with Anchore Engine
                        Introduction to Anchore Engine
                        Scanning images with anchore-cli
            - Integrating image scanning into the CI/CD pipeline
                        Scanning at the build stage
                        Scanning at the deployment stage
                        Scanning at the runtime stage

    
    - Real-Time Monitoring and Resource Management of a Kubernetes Cluster	
              - Real-time monitoring and management in monolith environments
              - Managing resources in Kubernetes
                      -  Resource requests and limits
                      -  Namespace resource quotas
                      -  LimitRanger
              - Monitoring resources in Kubernetes
                      -  Built-in monitors
                      -  Third-party monitoring tools
                      -  Prometheus and Grafana

    - Defence in Depth
              - Introducing Kubernetes auditing
                       -  Kubernetes audit policy
                       -  Configuring the audit backend
              - Enabling high availability in a Kubernetes cluster
                       -  Enabling high availability of Kubernetes workloads
                       -  Enabling high availability of Kubernetes components
                       -  Enabling high availability of a cloud infrastructure
              - Managing secrets with Vault
                       -  Setting up Vault
                       -  Provisioning and rotating secrets
              - Detecting anomalies with Falco
                        - An overview of Falco
                        - Creating Falco rules to detect anomalies
              - Conducting forensics with Sysdig Inspect and CRIU
                        - Using CRIU to collect data
                        - Using Sysdig and Sysdig Inspect
```