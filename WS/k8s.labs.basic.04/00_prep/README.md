# Preparation

To prepare for the workshop, you need to setup your environment.

You need at least access to a Kubernetes Cluster. It is benefitial, if you are `cluster-admin` and it is not you prod-environment ;)

## Minikube

To spin up a mini cluster, you can use [Minikube](https://kubernetes.io/docs/setup/learning-environment/minikube/) for the sake of ease.

A prepared Vagrant file can be found in directory [minikube/](minikube/).

## Docker image

I prepared a Dockerimage that start a Nginx webserver and displays content from a file, which is specified in an environment variable.

All resources for the image are in the directory [k8s-ws/](k8s-ws/).

The image is published on Docker-Hub: [nodyd/k8s-ws](https://hub.docker.com/r/nodyd/k8s-ws).
