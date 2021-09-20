# Deployments
A deployment is a k8s object that defines a desired state for a ReplicaSet.

### Scaling deployments

- Edit the yaml file, apply
- `kubectl edit <deployment>`
- `kubectl scale deployment.v1.apps/<deployment>`

### Rolling updates
This automatically happens after you edit the deployment config.

- `kubectl rollout status deployment.v1.apps/<deployment>`
- `kubectl rollout history deployment.v1.apps/<deployment>`
- `kubectl rollout undo deployment.v1.apps/<deployment> --to-revision=<rev>`
- `kubectl set image deployment/<deployment> <image>`
