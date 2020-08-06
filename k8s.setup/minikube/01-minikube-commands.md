
[minkube cmds](https://minikube.sigs.k8s.io/docs/commands/)
```
addons - Enable or disable a minikube addon
cache - Add, delete, or push a local image into minikube
completion - Generate command completion for a shell
config - Modify persistent configuration values
dashboard - Access the Kubernetes dashboard running within the minikube cluster
delete - Deletes a local Kubernetes cluster
docker-env - Configure environment to use minikube’s Docker daemon
ip - Retrieves the IP address of the running cluster
kubectl - Run a kubectl binary matching the cluster version

logs - Returns logs to debug a local Kubernetes cluster
mount - Mounts the specified directory into minikube
node - Add, remove, or list additional nodes
options - Show a list of global command-line options (applies to all commands).
pause - pause Kubernetes
podman-env - Configure environment to use minikube’s Podman service
profile - Get or list the the current profiles (clusters)
service - Returns a URL to connect to a service
ssh - Log into the minikube environment (for debugging)
ssh-key - Retrieve the ssh identity key path of the specified cluster

start - Starts a local Kubernetes cluster
status - Gets the status of a local Kubernetes cluster
stop - Stops a running local Kubernetes cluster
tunnel - Connect to LoadBalancer services
unpause - unpause Kubernetes
update-check - Print current and latest version number
update-context - Update kubeconfig in case of an IP or port change
version - Print the version of minikube


minikube lifecycle	  
      $ minikube delete, minikube start, minikube status, Link: minikube
Get minikube version	
      $ minikube version, Link: all minikube releases
Start minikube with different machine flavor	
      $ minikube start --memory 5120 --cpus=4
Start minikube with a specific k8s version	
      $ minikube start --kubernetes-version v1.11.0
Start minikube with more customizations
      $ minikube start –kubernetes-version v1.11.0 –feature-gates=AdvancedAuditing=true
SSH to minikube vm	
      $ minikube ssh, ssh -i ~/.minikube/machines/minikube/id_rsa docker@192.168.99.100
Your local docker to use minikube dockerd	eval
      $ (minikube docker-env), Then no need for docker push
Minikube check latest version	
      $ minikube update-check

# Check status :

- Get minikube version	        $ minikube version, Link: all minikube releases
- Get cluster info	            $ kubectl cluster-info
- Get service info	            $ minikube service <srv-name>
- Get dashboard                	$ minikube dashboard
- Get ip	                      $ minikube ip
- Get minikube log	            $ minikube logs
- List addons	                  $ minikube addons list


# Handling folders from host 

Mount host OS’s folder to minikube VM	
$ minikube mount /host-mount-path:/vm-mount-path

Folder of k8s.io/minikube-hostpath provisioner	/tmp/hostpath-provisioner, /tmp/hostpath_pv
Mount host OS’s folder to minikube VM	
$minikube mount /host-mount-path:/vm-mount-path

Critical minikube folder	
      /var/lib/localkube, /var/lib/docker, /data
Check minikube config in your host OS desktop	
     ~/.minikube/machines/minikube/config.json
Minikube conf in local env	
     ~/.minikube, ~/.kube
 Install addon after creating minikube env
 $ minikube addons enable heapster, kubectl top node


```
