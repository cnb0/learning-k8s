# K8s Management Overview

## High Availability in k8s

HA k8s = multiple controlplane nodes.

Since you have multiple (and only one should be controlling the cluster at a time),
you will want a load balancer in front of these nodes.

#### HA Etcd
- Stacked etcd - etcd runs on the same node as the rest of the controlplane components
- External - etcd runs on separate nodes

## K8s Management Tools
- kubectl
  - Official command line interface from k8s
- kubeadm
  - Used to quickly create clusters
- Minkube
  - Allows you to run a single-node cluster
- Helm
  - Templating & package management solution for k8s objects
- Kompose
  - Helps you migrate from docker compose to k8s
- Kustomize
  - Config management tool

## Draining a node
- `kubectl drain <node name> --ignore-daemonsets`
- `kubectl uncordon <node node>`

Drain will not work for pods that are not managed by replicasets, deployments, etc. Manually created pods will not be removed (deleted) unless you use the `--force` option.

Uncordoning a node will not cause a re-balancing on the nodes.

## Upgrade a cluster with kubeadm

1. Upgrade the controlplane
  1. Drain controlplane node
  2. Upgrade kubeadm (`--allow-change-held-packages`)
  3. kubeadm upgrade plan <version>
  4. kubeadm upgrade apply <version>
  5. Upgrade kubelet & kubectl
  6. deamon-reload and restart kubectl
  7. Uncordon controlplane node
2. Upgrade the worker nodes
  1. Drain the worker node
  2. ssh into woker
  3. Upgrade kubeadm
  4. kubeadm upgrade node
  5. upgrade kubelet & kubectl
  6. deamon-reload and restart kubectl
  7. uncordon worker node (from master)

## Backup & Restore etcd
All cluster data is stored in etcd.

#### Save
```
ETCDCTL_API=3 etcdctl snapshot save <filename> \
--endpoints=<etcd-ip-addr> \
--cacaert=<etcd-ca-cert.pem> \
--cert=<etcd-server.crt> \
--key=<etcd-server.key>
```

#### Restore
1. `sudo systemctl stop etcd`
2. `sudo rm -rf /var/lib/etcd`

```
sudo ETCDCTL_API=3 etcdctl snapshot restore <backup_file> \
--initial-cluster <new_name>=<new_ip_addr:port> \
--initial-advertise-peer-urls <new_ip_addr:port> \
--name <new_name> \
--data-dir /var/lib/etcd
```
3. `sudo chown -R etcd:etcd /var/lib/etcd`
4. `sudo systemctl start etcd`


#### Verify Backup
1. Copy restore command, change to `get cluster.name`

```
ETCDCTL_API=3 etcdctl get cluster.name <filename> \
--endpoints=<etcd-ip-addr> \
--cacaert=<etcd-ca-cert.pem> \
--cert=<etcd-server.crt> \
--key=<etcd-server.key>
```
