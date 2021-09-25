### [Kubernetes Components](https://kubernetes.io/docs/concepts/overview/components/)

#### Control Plane Components (Master Nodes)
| Component Name                    | Summary | Runs As | 
|-------------------------|--------------------------------------------------------------------------------------------------------| ----------- | 
| kube-apiserver          | `Exposes the Kubernetes API from master nodes.The API server is the front end for the Kubernetes control plane. Can run several instances of kube-apiserver and balance traffic between those instances` | `Static Pod` |
| etcd                  | `Consistent and highly-available key value store used as Kubernetes’ backing store for all cluster data` | `Static Pod` or `Systemd service` |
| kube-scheduler          | `Component that watches for newly created Pods with no assigned node, and selects a node for them to run on` | `Static Pod` |
| kube-controller-manager| `Component that runs controller processesnode. Controllers include : Node Controller, Replication Controller, Endpoints Controller, Service Account & Token Controllers`| `Static Pod` |

#### Node Components(Worker Nodes)
| Component Name              | Summary | Runs As |
|-------------------|-------------------------------------------------------------------------------------------| ---- |
| kubelet           | `An agent that runs on each node in the cluster. It makes sure that containers are running in a Pod` | `System process` |
| kube-proxy        | `kube-proxy is a network proxy that runs on each node in your cluster, implementing part of the Kubernetes Service concept` | `Daemonset` |
| Container Runtime | `Is the software that is responsible for running containers. Kubernetes supported runtimes: Docker, rkt, runc and any [[https://github.com/opencontainers/runtime-spec][OCI runtime-spec]] implementation` | `Systemd service` |


### Configuration and Logs details of Kubernetes,Docker

| Description               | Folder or File location                                                                   |
|-------------------------- | ---------------------------------------------------------------------------|
| Config folder             | `/etc/kubernetes/`                                                        |
| Manifests dif             | `/etc/kubernetes/manifests`                                               |
| Certificate files         | `/etc/kubernetes/pki/`                                                   |
| Credentials to API server | `/etc/kubernetes/kubelet.conf`                                            |
| Superuser credentials     | `/etc/kubernetes/admin.conf`                                             |
| kubectl config file       | `~/.kube/config`                                                         |
| Kubernets working dir     | `/var/lib/kubelet/`                                                      |
| Docker working dir        | `/var/lib/docker/`, `/var/log/containers/`                                |
| Etcd working dir          | `/var/lib/etcd/`                                                          |
| Network cni               | `/etc/cni/net.d/`                                                         |
| Log files                 | `/var/log/pods/`                                                          |
| Kubelet logs              | `/var/log/messages`, `/var/log/pods/kube-system_kube-proxy*/kube-proxy/*.log`|
| Kube-proxy                | `/var/log/pods/kube-system_kube-proxy*/kube-proxy/*.log`                  | 
| Kube-api-server           | `/var/log/pods/kube-system_kube-apiserver*/kube-proxy/*.log`              |
| Kube-controller           | `/var/log/pods/kube-system_kube-controller*/kube-proxy/*.log`             |
| Kube-scheduller           | `/var/log/pods/kube-system_kube-scheduler*/kube-scheduler/*.log`          |
| Env                       | `/etc/systemd/system/kubelet.service.d/10-kubeadm.conf`                   |
| Env                       | `export KUBECONFIG=/etc/kubernetes/admin.conf`                            |
| Audit logs                | `/var/log/audit/audit.log` | 
| Kubelet env file          | `/etc/kubernetes/kubelet.env` |
| kubelet.service           | `/etc/systemd/system/kubelet.service` |
| docker.service            | `/etc/systemd/system/docker.service` |

### Check health of cluster

| Description | command |
| ----------- | ------- |
| Check cluster health | `kubectl get componentstatus` |
| Check etcd health | `kubectl get --raw=/healthz/etcd` |

### Kubelet and Docker commands 

| Description | Command or File location|
| ------------ | -------------- |
| Check Kubelet status | `service kubelet status` or `systemctl status kubelet.service` |
| Restart Kubelet | `service kubelet restart` or `systemctl restart kubelet.service` |
| Stop Kubelet | `service kubelet stop` or `systemctl stop kubelet.service` |
| Tail Kubelet logs | `journalctl -u kubelet.service -f` |
| Check Docker daemon status | `service docker status` or `systemctl status docker.service`|
| Restart Docker daemon | `service docker restart` or `systemctl restart docker.service` |
| Stop Docker daemon | `service docker stop` or `systemctl stop docker.service` |
| Tail Docker daemon logs | `journalctl -u docker.service -f` |

### Node Commands

| Name             | Command                                |
| ---------------- | -------------------------------------- |
| Describe node    | `kubectl describe node `<node_name>`    |
| Get node in yaml | `kubectl get node <node_name> -o yaml` |
| Get node         | `kubectl get node <node_name>`         |
| Drain node       | `kubectl drain node <node_name>`       |
| Cordon node      | `kubectl cordon node <node_name>`      |
| Uncordon node    | `kubectl uncordon node <node_name>`    |


### Monitoring Usage Commands

| Name                                | Command                        |
| ----------------------------------- | ------------------------------ |
| Get node cpu and memory utilization | `kubectl top node <node_name>` |
| Get pod cpu and memory utilization  | `kubectl top pods <pod_name>`  |


### Cluster

| Name                                | Command                        |
| ----------------------------------- | ------------------------------ |
|Display addresses of the master and services|`kubectl cluster-info` |                       
|Dump cluster state to STDOUT|`kubectl cluster-info dump`    |       
|Dump cluster state to a file|`kubectl cluster-info dump --output-directory=</file/path>`|
|Compares the current cluster state against the statethat the cluster would be in if the manifest was applied|`kubectl diff -f ./my-manifest.yaml`|
|List all images running in a cluster|kubectl get pods -A -o=custom-columns='DATA:spec.containers[*].image'|


### Kubectl context

| Name                                | Command                        |
| ----------------------------------- | ------------------------------ |
| Show merged kubeconfig settings | `kubectl config view` |
|Use multiple kubeconfig |`KUBECONFIG=~/.kube/config1:~/.kube/config2:~/.kube/config3`|
|Get a list of users|kubectl config view -o jsonpath='{.users[*].name}'|
|Display the first user|kubectl config view -o jsonpath='{.users[].name}'|
|Get the password for the "admin" user|kubectl config view -o jsonpath='{.users[?(@.name == "admin")].user.password}'|
|Display the current context|`kubectl config current-context`|
|Display list of contexts|`kubectl config get-contexts`|
|Set the default context to `<cluster>`|`kubectl config use-context <cluster>`|
|Sets a user entry in kubeconfig|`kubectl config set-credentials <username> [options]`|
|Sets a user with a client key|`kubectl config set-credentials <user> --client-key=~/.kube/admin.key`|
|Sets a user with basic auth|`kubectl config set-credentials --username=<username> --password=<password>`|
|Sets a user with client certificate|`kubectl config set-credentials <user> --client-certificate=<path/to/cert> --embed-certs=true`|
|Set a context utilizing a specific config file|`kubectl config --kubeconfig=<config/path> use-context <cluster>`|
|Set a context utilizing a specific username and namespace|`kubectl config set-context gce --user=cluster-admin --namespace=foo  && kubectl config use-context gce`|


### [Namespace Usage Commands](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/)

| NAME  | SHORTNAMES | APIGROUP | NAMESPACED | KIND | VERBS |
| ------------- | ------------- | ------- | -------- | --------- | -------- |
| `namespaces`  | `ns`  | `-` | `false` | `Namespace` | `[create delete get list patch update watch]`


| Name                                | Command                        |
| ----------------------------------- | ------------------------------ |
| Get all namespaces | `kubectl get namespaces |
| Get namespace  | kubectl get namespaces <namespace_name>`  |
| Get namespace in yaml  | `kubectl get namespaces <namespace_name> -o yaml`  |
| Describe namespace | `kubectl describe namespaces <namespace_name>`  |
| Execute command with specific namespace (Example) | `kubectl get pods --namespace=<namespace_name>`  |
| Set default namespace for 'kubectl' | `kubectl config set-context --current --namespace=<namespace_name>`  |
| Check current namespace | `kubectl config view --minify \| grep namespace:`  |
| Cleanup namespace with specific namespace| `kubectl delete all --all --namespace=<namespace_name>`|
| Cleanup namespace (Be careful, make sure you're right namespace) | `kubectl delete all --all` |



| Verb Description | Kubectl Command |
| ------------- | ------------- |
| List | `kubectl get namespaces` or `kubectl get ns`|
| Create | `kubectl create ns TEST` |
| Delete | `kubectl delete ns TEST` or `kubectl delete -f namespace.yaml`|
| Get particular namespace | `kubectl get ns TEST` |
| Verbose Debug information/describe service | `kubectl describe ns/TEST` |



### Abbreviations / Short forms of resource types

| Verb Description | Kubectl Command |
| ------------- | ------------- |
| List | `kubectl api-resources`|
| List namespaces | `kubectl api-resources --namespaced=true`|

|      Resource type       |   Abbreviations   |
|--------------------------|-------------------|
| componentstatuses        | cs                |
| configmaps               | cm                |
| daemonsets               | ds                |
| deployments              | deploy            |
| endpoints                | ep                |
| event                    | ev                |
| horizontalpodautoscalers | hpa               |
| ingresses                | ing               |
| limitranges              | limits            |
| namespaces               | ns                |
| nodes                    | no                |
| persistentvolumeclaims   | pvc               |
| persistentvolumes        | pv                |
| pods                     | po                |
| podsecuritypolicies      | psp               |
| replicasets              | rs                |
| replicationcontrollers   | rc                |
| resourcequotas           | quota             |
| serviceaccount           | sa                |
| services                 | svc               |


### [Pod](https://kubernetes.io/docs/concepts/workloads/pods/pod/#what-is-a-pod) 

| NAME  | SHORTNAMES | APIGROUP | NAMESPACED | KIND | VERBS |
| ------------- | ------------- | ------- | -------- | --------- | -------- |
| `pods`  | `po`  | -  | `true` | `Pod` | `[create delete deletecollection get list patch update watch]` |


| Name                     | Command                                                                                           |
| ------------------------ | ------------------------------------------------------------------------------------------------- |
| Get pod                  | `kubectl get pod <pod_name>`                                                                      |
| Get pod in yaml          | `kubectl get pod <pod_name>` -o yaml                                                              |
| Get pod wide information | `kubectl get pod <pod_name>` -o wide                                                              |
| Get pod with watch       | `kubectl get pod <pod_name>` -w                                                                   |
| Edit pod                 | `kubectl edit pod <pod_name>`                                                                     |
| Describe pod             | `kubectl describe pod <pod_name>`                                                                 |
| Delete pod               | `kubectl delete pod <pod_name>`                                                                   |
| Log pod                  | `kubectl logs pod <pod_name>`                                                                     |
| Tail -f pod              | `kubectl logs pod -f <pod_name>`                                                                  |
| Execute into pod         | `kubectl exec -it pod <pod_name>` -- /bin/bash                                                    |
| Running Temporary Image  | `kubectl run <pod_name> --image=curlimages/curl --rm -it --restart=Never -- curl `<destination>` |


| Description | Kubectl Command |
| ------------- | ------------- |
| Create | `kubectl run nginx   --image=nginx`|
| Create in particular namespace | `kubectl run nginx  --image=nginx -n NAMEPSPACE` |
| Dry run,print object without creating it | `kubectl run POD_NAME   --image=nginx --dry-run -o yaml` |
| Create from File | `kubectl create -f pod.yaml` |
| Create from File in particular namespace |  `kubectl create -f pod.yaml -n NAMEPSPACE` |
| List pods | `kubectl get po` or `kubectl get pod` or `kubectl get pods` |
| List pods in all namespaces | `kubectl get pods --all-namespaces` or `kubectl get pods -A` |
| List pods with more information | `kubectl get pods -owide` |
| List pods information in custom columns | `kubectl get pod POD_NAME -o custom-columns=CONTAINER:.spec.containers[0].name,IMAGE:.spec.containers[0].image` |
| Verbose Debug information/describe pod | `kubectl describe pod POD_NAME` |
| Logs | `kubectl logs POD_NAME` |
| Logs (multi-container case) | `kubectl logs POD_NAME -c CONTAINER_NAME` |
| Tail pod logs | `kubectl logs -f POD_NAME` | 
| Tail pods logs (multi-container case) | `kubectl logs -f POD_NAME -c CONTAINER_NAME` | 
| Delete pod | `kubectl delete pod POD_NAME` or `kubectl delete -f pod.yaml` or `kubectl delete pod/POD_NAME` |
| Delete pod in particular namespace | `kubectl delete pod POD_NAME -n NAMESPACE` |
| Delete pod forcefully | `kubectl delete pod my-pod --grace-period=0 --force` |
| Get pod | `kubectl get pod POD_NAME` |
| Watch pod | `kubectl get pod POD_NAME --watch` |
| Patch pod | `kubectl patch pod valid-pod -p '{"spec":{"containers":[{"name":"kubernetes-serve-hostname"}]}}'` |
| Create and wrtie its spec to file | `kubectl run POD_NAME --image=nginx --restart=Never --dry-run -o yaml > pod.yaml`
| List pod in Json output format | `kubectl get pods -o json` |
| List pod in YAML output format | `kubectl get pods -o yaml` |
| Run command in existing pod | `kubectl exec POD_NAME -- ls /` |
| Run command in existing pod (multi-container case) | `kubectl exec POD_NAME -c CONTAINER_NAME -- ls /` |
| Exec to pod | `kubectl exec -it POD_NAME bash` |
| List Kubernetes critical pods | `kubectl get pods -n kube-system` |

## Labels and Selectors Commands

| Name                                           | Command                                                            |
| ---------------------------------------------- | ------------------------------------------------------------------ |
| Show labels of node,pod and deployment         | `kubectl get <node/pod/deployment> --show-labels`                  |
| Attach labels to `<node/pod/deployment>`       | `kubectl label <node/pod/deployment> <pod_name> <key>=<value> |
| Remove labels from `<node/pod/deployment>`     | `kubectl label <node/pod/deployment> <pod_name> <key>`        |
| Select node,pod and deployment by using labels | `kubectl get <node/pod/deployment> -l <key>=<value>`             |
| Delete all resources by using labels           | `kubectl delete all -l <key>=<value>`                              |

### ConfigMaps Commands

| Name                  | Command                                          |
| --------------------- | ------------------------------------------------ |
| Get configmap         | `kubectl get configmap <configmap_name>`         |
| Get configmap in yaml | `kubectl get configmap <configmap_name>` -o yaml |
| Edit configmap        | `kubectl edit configmap <configmap_name>`        |
| Describe configmap    | `kubectl describe configmap <configmap_name>`    |
| Delete configmap      | `kubectl delete configmap <configmap_name>`      |

### Secret Commands

| Name               | Command                                    |
| ------------------ | ------------------------------------------ |
| Get secret         | `kubectl get secret <secret_name>`         |
| Get secret in yaml | `kubectl get secret <secret_name>` -o yaml |
| Edit secret        | `kubectl edit secret <secret_name>`        |
| Describe secret    | `kubectl describe secret <secret_name>`    |
| Delete secret      | `kubectl delete secret <secret_name>`      |


### [ReplicaSet](https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/) 

| NAME  | SHORTNAMES | APIGROUP | NAMESPACED | KIND | VERBS |
| ------------- | ------------- | ------- | -------- | --------- | -------- |
| `replicasets`  | `rs`  | `apps`,`extensions` | `true` | `ReplicaSet` | `[create delete deletecollection get list patch update watch]` |

| Verb Description | Kubectl Command |
| ------------- | ------------- |
| create | `kubectl create -f replicaset.yaml`|
| List | `kubectl get rs` or `kubectl get replicaset` or `kubectl get replicasets` |
| List replicasets with more information | `kubectl get rs -owide`|
| List in all namespaces | `kubectl get rs --all-namespaces` or `kubectl get rs -A` |
| Delete | `kubectl delete rs REPLICASET_NAME` or `kubectl delete -f replicaset.yaml`|
| Get | `kubectl get rs REPLICASET_NAME` |

### [Serviceaccounts](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/)

| NAME  | SHORTNAMES | APIGROUP | NAMESPACED | KIND | VERBS |
| ------------- | ------------- | ------- | -------- | --------- | -------- |
| `serviceaccounts`  | `sa`  | `-` | `true` | `ServiceAccount` | `[create delete deletecollection get list patch update watch]`

| Verb Description | Kubectl Command |
| ------------- | ------------- |
| List | `kubectl get sa`|
| Create | `kubectl create serviceaccount my-service-account` |
| Delete | `kubectl delete serviceaccount my-service-account` or `kubectl delete -f my-service-account.yaml` |
| Get particular sa | `kubectl get sa my-service-account` |
| Verbose Debug information/describe service | `kubectl describe sa/my-service-account` |


### [Deployments,Scale,Rolling Updates & Rollbacks](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)

| NAME  | SHORTNAMES | APIGROUP | NAMESPACED | KIND | VERBS |
| ------------- | ------------- | ------- | -------- | --------- | -------- |
| `deployments`  | `deploy`  | `apps`,`extensions` | `true` | `Deployment` | `[create delete deletecollection get list patch update watch]` |


| Name                            | Command                                                                                                                                             |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Get deployment                  | `kubectl get deployment <deployment_name>`                                                                                                          |
| Get deployment in yaml          | `kubectl get deployment <deployment_name>` -o yaml                                                                                                  |
| Get deployment wide information | `kubectl get deployment <deployment_name>` -o wide                                                                                                  |
| Edit deployment                 | `kubectl edit deployment <deployment_name>`                                                                                                         |
| Describe deployment             | `kubectl describe deployment <deployment_name>`                                                                                                     |
| Delete deployment               | `kubectl delete deployment <deployment_name>`                                                                                                       |
| Log deployment                  | `kubectl logs deployment/deployment_name -f`                                                                                                        |
| Update image                    | `kubectl set image deployment <deployment_name> <container_name>`=`<new_image_name>`                                                              |
| Scale deployment with replicas  | `kubectl scale deployment <deployment_name> --replicas `<replicas>`                                                                                |
| Autoscaling deployment          | `kubectl autoscale deployment <deployment_name> --min=<min_number_of_pod> --max=<max_number_of_pod> --cpu-percent=<percent_of_requested_CPU>`   |

| Verb Description | Kubectl Command |
| ------------- | ------------- |
| Deployment Strategy Types | `Rolling-Update` or `Recreate` |
| Create Deployment | `kubectl create deployment DEPLOYMENT_NAME --image=busybox` |
| Run deployment with 2 replicas | `kubectl run POD_NAME --image=nginx --replicas=2 --port=80`|
| List deployments | `kubectl get deploy` or `kubectl get deployment` or `kubectl get deployments` |
| List deployments in all namespaces | `kubectl get deploy --all-namespaces` or `kubectl get deploy -A` |
| List deployments in particular namespace | `kubectl get deploy -n NAMESPACE` |
| List deployments with more information | `kubectl get deploy -owide`|
| Delete deployment | `kubectl delete deploy DEPLOYMENT_NAME` or `kubectl delete -f deployment.yaml`|
| Get particular deployment | `kubectl get deploy DEPLOYMENT_NAME` |
| Run deployment and expose it | `kubectl run DEPLOYMENT_NAME --image=nginx --port=80 --expose` |
| Update the nginx Pods to use the nginx:1.9.1 image instead of the nginx:1.7.9 image | `kubectl set image deployment/nginx-deployment nginx=nginx:1.9.1 --record` |
| Edit the Deployment | `kubectl edit deploy/DEPLOYMENT_NAME` |
| Deployment rollout status | `kubectl rollout status deploy/DEPLOYMENT_NAME` |
| Deployment rollout history | `kubectl rollout history deploy/DEPLOYMENT_NAME` |
| Rolling back deployment to previous version| `kubectl rollout undo deploy/DEPLOYMENT_NAME` |
| Scaling deployment  | `kubectl scale --replicas=2 deploy/DEPLOYMENT_NAME` |
| Pausing deployment | `kubectl rollout pause deploy/DEPLOYMENT_NAME` |
| Resuming deployment | `kubectl rollout resume deploy/DEPLOYMENT_NAME` |
| Verbose Debug information/describe deployment | `kubectl describe deploy/DEPLOYMENT_NAME` |
| Describe all deployments | `kubectl describe deployments` |
| Watch deployment | `kubectl get deploy/DEPLOYMENT_NAME --watch` |

## Rollout Commands

| Name                                     | Command                                                                               |
| ---------------------------------------- | ------------------------------------------------------------------------------------- |
| Restart deployment                       | `kubectl rollout restart deployment `<deployment_name>`                                |
| Undo deployment with the latest revision | `kubectl rollout undo deployment `<deployment_name>`                                   |
| Undo deployment with specified revision  | `kubectl rollout undo deployment `<deployment_name>` --to-revision `<revision_number>` |
| Get all revisions of deployment          | `kubectl rollout history deployment `<deployment_name>`                                |
| Get specified revision of deployment     | `kubectl rollout history deployment `<deployment_name>` --revision=`<revision_number>` |


### [Service](https://kubernetes.io/docs/concepts/services-networking/service/)

| NAME  | SHORTNAMES | APIGROUP | NAMESPACED | KIND | VERBS |
| ------------- | ------------- | ------- | -------- | --------- | -------- |
| `services`  | `svc`  | `-` | `true` | `Service` | `[create delete get list patch update watch]`

| Name                         | Command                                 |
| ---------------------------- | --------------------------------------- |
| Get service                  | `kubectl get service `<service>`         |
| Get service in yaml          | `kubectl get service `<service>` -o yaml |
| Get service wide information | `kubectl get service <service>` -o wide |
| Edit service                 | `kubectl edit service <service>        |
| Describe service             | `kubectl describe service <service>    |
| Delete service               | `kubectl delete service <service>      |

| Service Type | Description | Kubectl Command |
| ------------ | ----------- | --------------- |
| ClusterIP    | Create service | `kubectl create service clusterip my-cs --tcp=5678:8080` |
|              | Create service in headless mode | `kubectl create service clusterip my-cs --clusterip="None"` |
| ExternalName| Create an ExternalName service | `kubectl create service externalname my-ns --external-name example.com` |
| LoadBalancer | Create a LoadBalancer service | `kubectl create service loadbalancer my-lbs --tcp=5678:8080` |
| NodePort | Create a NodePort service | `kubectl create service nodeport my-ns --tcp=5678:8080` |

| Verb Description | Kubectl Command |
| ------------- | ------------- |
| List | `kubectl get service` or `kubectl get svc`|
| List in all namespaces | `kubectl get service --all-namespaces` or `kubectl get svc -A` |
| List with more information | `kubectl get svc -owide` or `kubectl get service -owide` |
| Delete | `kubectl delete svc SERVICE_NAME` or `kubectl delete -f service.yaml`|
| Get particular service | `kubectl get service SERVICE_NAME` |
| Verbose Debug information/describe service | `kubectl describe svc/SERVICE_NAME` |



### Network Policy Commands

| Name                               | Command                                                  |
| ---------------------------------- | -------------------------------------------------------- |
| Get networkpolicy                  | `kubectl get networkpolicy <networkpolicy_name>`         |
| Get networkpolicy in yaml          | `kubectl get networkpolicy <networkpolicy_name> -o yaml`  |
| Get networkpolicy wide information | `kubectl get networkpolicy <networkpolicy_name> -o wide` |
| Edit networkpolicy                 | `kubectl edit networkpolicy <networkpolicy_name>`        |
| Describe networkpolicy             | `kubectl describe networkpolicy <networkpolicy_name>`    |
| Delete networkpolicy               | `kubectl delete networkpolicy <networkpolicy_name>`      |


### Endpoints Commands

| Name          | Command                                  |
| ------------- | ---------------------------------------- |
| Get endpoints | kubectl get endpoints `<endpoints_name>` |

### Ingress Commands

| Name                         | Command                                   |
| ---------------------------- | ----------------------------------------- |
| Get ingress                  | `kubectl get ingress`                       |
| Get ingress in yaml          | `kubectl get ingress -o yaml`               |
| Get ingress wide information | `kubectl get ingress -o wide`               |
| Edit ingress                 | `kubectl edit ingress <ingress_name>`     |
| Describe ingress             | `kubectl describe ingress <ingress_name>` |
| Delete ingress               | `kubectl delete ingress <ingress_name>`   |


### [DaemonSet](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/)

| NAME  | SHORTNAMES | APIGROUP | NAMESPACED | KIND | VERBS |
| ------------- | ------------- | ------- | -------- | --------- | -------- |
| `daemonsets`  | `ds`  | `apps`,`extensions` | `true` | `DaemonSet` | `[create delete deletecollection get list patch update watch]` |


### DaemonSet Commands

| Name                  | Command                                          |
| --------------------- | ------------------------------------------------ |
| Get daemonset         | `kubectl get daemonset <daemonset_name>`         |
| Get daemonset in yaml | `kubectl get daemonset <daemonset_name> -o yaml`  |
| Edit daemonset        | `kubectl edit daemonset <daemonset_name>`        |
| Describe daemonset    | `kubectl describe daemonset <daemonset_name>`    |
| Delete daemonset      | `kubectl delete deployment <daemonset_name>`     |


| Verb Description | Kubectl Command |
| ------------- | ------------- |
| List daemonsets | `kubectl get ds` or `kubectl get daemonset` or `kubectl get daemonset` |
| List daemonsets in all namespaces | `kubectl get ds --all-namespaces` or `kubectl get ds -A` |
| List daemonsets with more information | `kubectl get ds -owide`|
| Delete | `kubectl delete rs DAEMONSET_NAME` or `kubectl delete -f daemonset.yaml`|
| Get particular daemonset | `kubectl get ds DAEMONSET_NAME` |
| Verbose Debug information/describe Daemonset | `kubectl describe ds/DAEMONSET_NAME` |

### [Jobs](https://kubernetes.io/docs/concepts/workloads/controllers/jobs-run-to-completion/)

| NAME  | SHORTNAMES | APIGROUP | NAMESPACED | KIND | VERBS |
| ------------- | ------------- | ------- | -------- | --------- | -------- |
| `jobs`  |  -   | `batch` | `true` | `Job` | `[create delete deletecollection get list patch update watch]` |

## Job Commands

| Name             | Command                              |
| ---------------- | ------------------------------------ |
| Get job          | `kubectl get job <job_name>`       |
| Get job in yaml  | `kubectl get job <job_name> -o yaml` |
| Edit job in yaml | `kubectl edit job <job_name>`        |
| Describe job     | `kubectl describe job <job_name>`    |
| Delete job       | `kubectl delete job <job_name>`      |


| Verb Description | Kubectl Command |
| ------------- | ------------- |
| Create | `kubectl create job my-job --image=busybox`|
| Create a job with command | `kubectl create job my-job --image=busybox -- date` |
| Create a job from a CronJob named "a-cronjob" | `kubectl create job test-job --from=cronjob/a-cronjob`|
| List jobs | `kubectl get jobs` or `kubectl get job` |
| List jobs in all namespaces | `kubectl get jobs --all-namespaces` or `kubectl get jobs -A` |
| List with more information | `kubectl get job -owide`|
| Delete | `kubectl delete jobs JOB_NAME` or `kubectl delete -f job.yaml`|
| Get particular cronjob | `kubectl get cj cronjob_NAME` |
| Verbose Debug information/describe job | `kubectl describe jobs/CRRONJOB_NAME` |



### [CronJob](https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/)

| NAME  | SHORTNAMES | APIGROUP | NAMESPACED | KIND | VERBS |
| ------------- | ------------- | ------- | -------- | --------- | -------- |
| `cronjobs`  | `cj`  | `batch` | `true` | `CronJob` | `[create delete deletecollection get list patch update watch]`

### Cronjob Commands

| Name                | Command                                      |
| ------------------- | -------------------------------------------- |
| Get cronjob         | `kubectl get cronjob cronjob_name`           |
| Get cronjob in yaml | `kubectl get cronjob <cronjob_name> -o yaml` |
| Edit cronjob        | `kubectl edit cronjob <cronjob_name>`        |
| Describe cronjob    | `kubectl describe cronjob <cronjob_name>`    |
| Delete cronjob      | `kubectl delete cronjob <cronjob_name>`      |


| Verb Description | Kubectl Command |
| ------------- | ------------- |
| Create with schedule | `kubectl create cronjob CRONJOB_NAME --image=busybox --schedule="*/1 * * * *"`|
| List | `kubectl get cj` or `kubectl get cronjob` or `kubectl get cronjobs` |
| List in all namespaces | `kubectl get cj --all-namespaces` or `kubectl get cj -A` |
| List with more information | `kubectl get cj -owide`|
| Delete | `kubectl delete cj CRONJOB_NAME` or `kubectl delete -f cronjob.yaml`|
| Get particular cronjob | `kubectl get cj cronjob_NAME` |
| Verbose Debug information/describe cronjob | `kubectl describe cj/CRRONJOB_NAME` |


### StatefulSet Commands

| Name                    | Command                                              |
| ----------------------- | ---------------------------------------------------- |
| Get statefulset         | `kubectl get statefulset `<statefulset_name>`         |
| Get statefulset in yaml | `kubectl get statefulset <statefulset_name>` -o yaml |
| Edit statefulset        | `kubectl edit statefulset <statefulset_name>`        |
| Describe statefulset    | `kubectl describe statefulset <statefulset_name>`    |
| Delete statefuleset     | `kubectl delete statefulset <statefulset_name>`      |


### Persistence Volume Commands

| Name                           | Command                                           |
| ------------------------------ | ------------------------------------------------- |
| Get persistence volume         | `kubectl get pv `<persistencevolume_name>`         |
| Get persistence volume in yaml | `kubectl get pv `<persistencevolume_name> -o yaml` |
| Edit persistence volume        | `kubectl edit pv `<persistencevolume_name>`        |
| Describe persistence volume    | `kubectl describe pv `<persistencevolume_name>`    |
| Delete persistence volume      | `kubectl delete pv `<persistencevolume_name>`      |

### Persistence Volume Claim Commands

| Name                                 | Command                                                  |
| ------------------------------------ | -------------------------------------------------------- |
| Get persistence volume claim         | `kubectl get pvc <persistencevolume_claim_name>`         |
| Get persistence volume claim in yaml | `kubectl get pvc <persistencevolume_claim_name>` -o yaml |
| Edit persistence volume claim        | `kubectl edit pvc <persistencevolume_claim_name>`        |
| Describe persistence volume claim    | `kubectl describe pvc <persistencevolume_claim_name>`    |
| Delete persistence volume claim      | `kubectl delete pvc <persistencevolume_claim_name>`      |



### Role-Based Access Control (RBAC) Commands

| Name                                                           | Command                                                                                                                                   |
| -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| List current user privilleges with default namespace           | `kubectl auth can-i --list`                                                                                                                 |
| List specified user privilleges with default namespace         | `kubectl auth can-i --list --as <user/service_account>`                                                                                   |
| List current user privilleges with specified namespace         | `kubectl auth can-i --list -n <namespace>`                                                                                                |
| List specified user privilleges with specified namespace       | `kubectl auth can-i --list --as <user/service_account> -n <namespace>`                                                                  |
| Verify if current user is able to do something with resource   | `kubectl auth can-i <verb> <resource>`                                                                                                  |
| Verify if specified user is able to do something with resource | `kubectl auth can-i <verb> <resource> --as <user/service_account>`                                                                    |
| Create service account                                         | `kubectl create serviceaccount <serviceaccount_name>`                                                                                     |
| Create role and define resource privilleges                    | `kubectl create role <role_name> --resource=`<object> --verb=`<verb>`                                                                   |
| Create cluster role and define cluster resource privilleges    | `kubectl create clusterrole <clusterrole_name> --resource=<object> --verb=<verb>`                                                     |
| Create role binding with service account                       | `kubectl create rolebinding <rolebinding_name>` --role <role_name> --serviceaccount`   `<serviceaccount_name>`                             |
| Create cluster role binding with service account               | `kubectl create clusterrolebinding <clusterrolebinding_name> --clusterrole <clusterrole_name>` --serviceaccount `<serviceaccount_name>` |
| Create role binding with user                                  | `kubectl create rolebinding <rolebinding_name> --role `<role_name>` --user <user_name>`                                                 |
| Create cluster role binding with user                          | `kubectl create clusterrolebinding <clusterrolebinding_name> --clusterrole`  `<clusterrole_name>` --user `<user_name>`                     |

