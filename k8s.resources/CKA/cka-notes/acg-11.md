# Troubleshooting

1. Check the k8s API server
  - Make sure docker and kubelet services are up on the controlplane node
2. Check the health of the nodes
  - `systemctl status kubelet`
  - `systemctl start kubelet`
  - `systemctl enable kubelet` - startup automatically on system start
3. Check the health of the pods
  - If you're using kubeadm, check the kube-system ns

### Cluster and Node logs
- `journalctl -u kubelet` - show logs for services
- `journalctl -u docker` - show logs for services

- `/var/log/kube-apiserver.log`
- `/var/log/kube-scheduler.log`
- `/var/log/kube-controller-manager.log`

In a kubeadm cluster, these components run as containers, so you'll have to view the logs within the container itself.

### Pods / Applications

- `kubectl logs <pod>`
- `kubectl get pods`
- `kubectl describe pods`
- `kubectl exec <pod> -- <command>`
- `kubectl exec <pod> --stdin --tty -- /bin/sh`

### Networking
- `kube-proxy` and `kube-dns` run in `kube-system`

- `nicolaka/netshoot` is a good networking troubleshooting image
