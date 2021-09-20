# Networking

#### Kubernetes Network Model
A set of standards the define how pods communicate with each other, regardless of which node they are running on.

Each pod has a unique IP address (unique within the cluster). Pods can use IP address to communicate with each other.

#### CNI Plugins
CNI - provide network connectivity between pods, according to the K8s Network Model. These implement the network model to make it work.

Installation of a plugin is unique for each type of plugin.

Nodes are `NotReady` until a network plugin is installed.

#### K8s DNS
DNS runs as a service within the cluster (in kube-system). Kubeadm clusters use CoreDNS.

- `pod-ip-address.namespace-name.pod.cluster.local`
- `192-168-10-100.default.pod.cluster.local`

Calico manifest file

https://docs.projectcalico.org/v3.14/manifests/calico.yaml

#### Network Policy


By default pods are not isolated, and open to 0.0.0.0/0.

As soon as a policy is applied though, they are isolated, and only whitelisted traffic is allowed.

- `from` selector - ingress traffic
- `to` selector - egress traffic
- `ports`
- `podSelector` - match pods with labels
- `namespaceSelector` - match namespaces
- `ipBlock` + `cidr` - match IP addresses

Traffic must match all selectors.
