# Practice Test 1

### Commands
- `kubectl run nginx-pod --image=nginx:alpine`
- `kubectl run messaging --image=redis:alpine --labels="tier=msg"`
- `kubectl create namespace apx-x9984574`
- `kubectl get nodes -o json > /opt/outputs/nodes-z3444kd9.json`
- `kubectl expose pod messaging --type=ClusterIP --name=messaging-service --port=6379`
- `kubectl create deployment hr-web-app --image=kodekloud/webapp-color --replicas=2`
- `kubectl run temp-bus --image=redis:alpine -n finance`
- `kubectl expose deployment hr-web-app --type=NodePort --port=8080 --target-port=30082 --name=hr-web-app-service`
- `kubectl get pod orange -o yaml > orange.yaml`
- `vim orange.yaml && kubectl apply -f orange.yaml`

### Static Pods
Static pods run in a directory - defined as `staticPodPath`, defined in the `/var/lib/kubelet/config.yaml` on each node. (Each node runs a kubelet, and should have this defined)

### JSON PATH
Learn JSON PATH

# Practice Test 2
1. Backup an ETCD cluster (API v2 and v3 have different commands)
  - v2 : `etcdctl backup ...`
  - v3 : `etcdctl snapshot save <dir>`
2. Create a pod with emptyDir volume
  - Search k8s docs for `emptyDir`, there is an example
  - [link](https://kubernetes.io/docs/concepts/storage/volumes/)
3. Set security capabilities for a container  
  - [link](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/)
4. Revisit the part on persistent volumes and persistent volume claims
  - [link](https://kubernetes.io/docs/concepts/storage/persistent-volumes/)
5. Create a deployment and perform a rolling update on it.
6. Create user X with access to Y methods within Z namespace.
7. DNS resolution for an internally exposed (ClusterIP?) service.
8. Static pod created

# Practice Test 3

## Questions
1. Create a service account. Create and assign a role and rolebinding to it.
2. Get list of node IPs
3. Create a pod with multiple containers
4. Create a pod with `fsGroup` and `runAsUser` set in the security context
5. Some shit with network policies
6. Taint a node, and add a toleration for that taint to a pod
7. Create a pod in a namespace with 2 labels
8. Fix the kubeconfig file
9. Troubleshoot a deployment

## Commands
kubectl get nodes -o jsonpath='{.items[*].status.addresses[?(@.type=="InternalIP")].address}' > /root/CKA/node_ips
kubectl cluster-info --kubeconfig=/root/CKA/super.kubeconfig
