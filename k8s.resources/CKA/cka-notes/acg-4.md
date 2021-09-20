# Kubernetes Object Management

#### Basic Commands

- `kubectl get <object type> <object name> -o <output> --sort-by <JSONPath> --selector <selector>`
- `kubectl describe`
- `kubectl create -f <file_name>`
  - This will error on conflicting (existing) objects
- `kubectl apply -f <file_name>`
  - This will update conflicting (existing) objects
- `kubectl delete <object>`
- `kubectl exec <pod name> -c <container name> -- command`
- `kubectl api-resources`
- `kubectl explain <object type>`
- `kubectl top pods`

#### Tips
Imperative Commands
- Use the --record flag on your imperative commands

#### Role-based Access Control

- Role - permissions are defined for a particular namespace within the cluster
  - A user then needs a RoleBinding to be bound to the role
- ClusterRole - permissions are defined for the entire cluster
  - A user then needs a ClusterRoleBinding to be bound to the role

#### Service Accounts
A service account is used by container processes to authenticate with the k8s api.

#### Metrics Server
This allows us to do
- `kubectl top pod`
