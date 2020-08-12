# Docker flow
kubelet-> Kubernetes CRI-> Docker-> containerd-> OCI-> runC->container image
# cri-o flow 
kubelet-> Kubernetes CRI-> cri-o-> OCI-> runC-> container image
# containerd  flow
kubelet-> Kubernetes CRI-> cri-containerd-> gRPC-> containerd-> OCI-> runC-> container image
# Kubernetes 1.10
kubelet-> Kubernetes CRI-> containerd-> OCI-> runC-> container image


## Advanced Kubernetes Objects

```
- Improve your workloads and day-to-day operations 
- Implementing Advanced Scheduling Techniques with Kubernetes
    - The scheduler’s decision to start a new pod goes through these three stages:
            - Node filtering
            - Node priority calculation
            - Actual scheduling operation
- The k8s objects are categorized as:
            - Workloads                  : Manage containers and their lifetimes
            - Discovery & Load Balancing : Make your applications accessible to each other or external world
            - Config & Storage           : Bind data to your containers
            - Metadata                   : Adjust the behavioral data for other objects
            - Cluster                    : Managing cluster state and configurations

-  K8s advanced controllers
            - ResourceQuota
            - PriorityClass
            - LimitRange
            - PodSecurityPolicy
            - ImagePolicyWebhook and ImageReview
            - ValidatingAdmissionWebhook and MutatingAdmissionWebhook

- Available Admission Controllers
      -  AlwaysPullImages
      -  DefaultStorageClass: 
      -  DefaultTolerationSeconds 
      -  DenyEscalatingExec 
      -  EventRateLimit (alpha) 
      -  ImagePolicyWebhook 
      -  Initializers (alpha) 
      -  InitialResources (experimental) 
      -  LimitPodHardAntiAffinityTopology 
      -  LimitRanger 
      -  MutatingAdmissionWebhook 
      -  NamespaceAutoProvision 
      -  NamespaceExists
      -  NamespaceLifecycle 
      -  NodeRestriction 
      -  OwnerReferencesPermissionEnforcement 
      -  PodNodeSelector 
      -  PersistentVolumeClaimResize 
      -  PodPreset 
      -  PodSecurityPolicy 
      -  PodTolerationRestriction 
      -  Priority 
      -  ResourceQuota
      -  ServiceAccount
      -  ValidatingAdmissionWebhook (beta)


```
