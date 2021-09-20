# Chapter 2 - Getting Started

## Architectural Overview

1. K8s Control Plane
	- Components responsible for controlling the cluster
	- `kube-api-server` - frontend API 
	- `etcd` - backend data store 
	- `kube-scheduler` - handles scheduling
	- `kube-controller-manager` - does lots of utility things
	- `cloud-controller-manager` - interfaces between k8s and cloud platforms

2. Worker Nodes
	- `kube-proxy` - handles networking in the cluster
	- `kubelet` - local k8s agent on the node - communicates with the controlplane 
	- container runtime - container software that runs nodes 

## Building a cluster

### KubeADM
