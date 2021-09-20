# Advanced Pod Allocation

### Scheduling
The kube-scheduler determines where to schedule pods

- Resource requests vs available node resources
- nodeSelector
- nodeName
- taints

### DaemonSets
DaemonSets create a copy of a pod on every node.

### Static Pod
These are pods that are managed directly by the kubelet on the node, and are not managed or visible by the Kube API Server.

The kubelet monitors a specific path for yaml files. Any yaml files found there will be managed by the local kubelet.

The kubelet also creates a mirror pod for each static pod that lets you see the status of the static pod via the K8s API, but you can't manage them using the API.
