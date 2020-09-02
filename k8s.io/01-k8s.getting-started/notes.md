## [getting started](https://kubernetes.io/docs/setup/)

- You can deploy a Kubernetes cluster on a
        - local machine 
        - cloud
        - on-prem datacenter 
        - choose a managed Kubernetes cluster 

- You can also create custom solutions across a wide range of cloud providers, or bare metal environments.
- you can create a Kubernetes cluster in learning and production environments.

1. Learning environment 
                           - Installing Kubernetes with Minikube
                           - Installing Kubernetes with Kind

2. Production environment 

        1. Container runtimes 
                           - Docker (dockershim,dockerd), CRI-O, Containerd, 
                           - frakti (The hypervisor-based container runtime for Kubernetes)

        2. Installing Kubernetes with deployment tools
                            - Bootstrapping clusters with kubeadm
                            - Installing Kubernetes with 
                                          - kops
                                          - Kubespray

        3. Turnkey Cloud Solutions
                            - Running Kubernetes on 
                                        -  Alibaba Cloud
                                        -  AWS EC2
                                        -  Azure
                                        -  Google Compute Engine
                                        -  Multiple Clouds with IBM Cloud Private
                                        -  Tencent Kubernetes Engine

        4. On-Premises VMs
                            - Cloudstack
                            - Kubernetes on DC/OS
                            - oVirt

        5. Windows in Kubernetes
                            - Intro to Windows support in Kubernetes
                            - Guide for scheduling Windows containers in Kubernetes

        6. Best practices 
                            - Running in multiple zones
                            - Building large clusters
                            - Validate node setup
                            - PKI certificates and requirements
