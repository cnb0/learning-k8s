# Pods and Containers
### Managing Application Configuration
- ConfigMap
  - Simple key/value pair definitions
  - Can do multi-line values too
- Config Volumes
  - Use a volume, where each key is a file, and the contents of the file are the value of the key
- Secrets
  - Meant to hold secrets
  - They are just stored as base64 encoded values

Define environment variables, and pass them in via configMap (`valueFrom configMapKeyRef`)

### Managing Container Resources
Resource Requests are estimates of how many resources a container / pod will use. They are used for scheduling only.

Resource limits are used to restrict the amount of resources that a pod can use.

### Monitoring Container Health
Container Health is used to determine the status of your applications. K8s only considers a container to be down if the process quits.
- Liveness probes allow you to customize the "health" of a container
- Startup probes - has the application successfully started?
- Readiness probes - is the container ready to accept requests?

Liveness and Startup probes have a success threshold of 1, always.

Liveness probes will wait until Startup probe is successful until taking over.

Liveness probe failure results in pod restart. Readiness probe failure results in being marked "NotReady"

### Self-Healing Pods
You can use liveness/readiness/startup probes in conjunction with Restart Policies to make self-healing pods.
- Always - container restarts, if it shut down successfully or unsuccessfully
- OnFailure - container only restarts if it shut down unsuccessfully
- Never - container never restarts

### Init Containers
Init containers run to completion before the main container(s) of the pod startup. They run in sequence until all of them exit successfully.
