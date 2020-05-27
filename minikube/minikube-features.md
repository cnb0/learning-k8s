 
## Features

## Cheatsheet
[Minikube cheat sheet](https://cheatsheet.dennyzhang.com/cheatsheet-minikube-a4)

minikube runs the latest stable release of Kubernetes, with support for standard Kubernetes features like:

* [LoadBalancer](https://minikube.sigs.k8s.io/docs/handbook/accessing/#loadbalancer-access) - using `minikube tunnel`
* Multi-cluster - using `minikube start -p <name>`
* NodePorts - using `minikube service`
* [Persistent Volumes](https://minikube.sigs.k8s.io/docs/handbook/persistent_volumes/)
* [Ingress](https://kubernetes.io/docs/tasks/access-application-cluster/ingress-minikube/)
* [Dashboard](https://minikube.sigs.k8s.io/docs/handbook/dashboard/) - `minikube dashboard`
* [Container runtimes](https://minikube.sigs.k8s.io/docs/handbook/config/#runtime-configuration) - `start --container-runtime`
* [Configure apiserver and kubelet options](https://minikube.sigs.k8s.io/docs/handbook/config/#modifying-kubernetes-defaults) via command-line flags

As well as developer-friendly features:

* [Addons](https://minikube.sigs.k8s.io/docs/handbook/deploying/#addons) - a marketplace for developers to share configurations for running services on minikube
* [NVIDIA GPU support](https://minikube.sigs.k8s.io/docs/tutorials/nvidia_gpu/) - for machine learning
* [Filesystem mounts](https://minikube.sigs.k8s.io/docs/handbook/mount/)

**For more information, see the official [minikube website](https://minikube.sigs.k8s.io)**

## Installation

See the [Getting Started Guide](https://minikube.sigs.k8s.io/docs/start/)

## Documentation

See https://minikube.sigs.k8s.io/docs/

## More Examples

See minikube in action [here](https://minikube.sigs.k8s.io/docs/handbook/controls/)


```
