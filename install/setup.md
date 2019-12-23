Kubernetes setup Document
 

Kubernetes releases minor version updates of its distribution every 3 months
 
 

 

### Download Kubectl
Linux: https://storage.googleapis.com/kubernetes-release/release/v1.11.0/bin/linux/amd64/kubectl

MacOS: https://storage.googleapis.com/kubernetes-release/release/v1.11.0/bin/darwin/amd64/kubectl

Windows: https://storage.googleapis.com/kubernetes-release/release/v1.11.0/bin/windows/amd64/kubectl.exe

Or use a packaged version for your OS: see https://kubernetes.io/docs/tasks/tools/install-kubectl/

### Minikube
Project URL: https://github.com/kubernetes/minikube

Latest Release and download instructions: https://github.com/kubernetes/minikube/releases

VirtualBox: http://www.virtualbox.org

Minikube on windows:
Download the latest minikube-version.exe

Rename the file to minikube.exe and put it in C:\minikube

Open a cmd (search for the app cmd or powershell)

Run: cd C:\minikube and enter minikube start

### Test your cluster commands
Make sure your cluster is running, you can check with minikube status.

If your cluster is not running, enter minikube start first.

kubectl run hello-minikube --image=k8s.gcr.io/echoserver:1.4 --port=8080
kubectl expose deployment hello-minikube --type=NodePort

minikube service hello-minikube --url

<open a browser and go to that url>



### Kubernetes from scratch
You can setup your cluster manually from scratch

If you’re planning to deploy on AWS / Google / Azure, use the tools that are fit for these platforms

If you have an unsupported cloud platform, and you still want Kubernetes, you can install it manually

CoreOS + Kubernetes: ###a href="https://coreos.com/kubernetes/docs/latest/getting-started.html">https://coreos.com/kubernetes/docs/latest/getting-started.html

### Docker
You can download Docker Engine for:

- Windows: https://docs.docker.com/engine/installation/windows/
- MacOS: https://docs.docker.com/engine/installation/mac/
- Linux: https://docs.docker.com/engine/installation/linux/

### DevOps box
Virtualbox: http://www.virtualbox.org
Vagrant: http://www.vagrantup.com



Cheatsheet: Kubernetes commands
- kubectl get pod: Get information about all running pods
- kubectl describe pod <pod>: Describe one pod
- kubectl expose pod <pod> --port=444 --name=frontend: Expose the port of a pod (creates a new service)
- kubectl port-forward <pod> 8080: Port forward the exposed pod port to your local machine
- kubectl attach <podname> -i: Attach to the pod
- kubectl exec <pod> -- command: Execute a command on the pod
- kubectl label pods <pod> mylabel=awesome: Add a new label to a pod
- kubectl run -i --tty busybox --image=busybox --restart=Never -- sh: Run a shell in a pod - very useful for debugging
- kubectl get deployments: Get information on current deployments
- kubectl get rs: Get information about the replica sets
- kubectl get pods --show-labels: get pods, and also show labels attached to those pods
- kubectl rollout status deployment/helloworld-deployment: Get deployment status
- kubectl set image deployment/helloworld-deployment k8s-demo=k8s-demo:2: Run k8s-demo with the image label version 2
- kubectl edit deployment/helloworld-deployment: Edit the deployment object
- kubectl rollout status deployment/helloworld-deployment: Get the status of the rollout
- kubectl rollout history deployment/helloworld-deployment: Get the rollout history
- kubectl rollout undo deployment/helloworld-deployment: Rollback to previous version
- kubectl rollout undo deployment/helloworld-deployment --to-revision=n: Rollback to any version version`

 
Certificates
- Creating a new key for a new user: openssl genrsa -out myuser.pem 2048
- Creating a certificate request: openssl req -new -key myuser.pem -out myuser-csr.pem -subj "/CN=myuser/O=myteam/"
- Creating a certificate: openssl x509 -req -in myuser-csr.pem -CA /path/to/kubernetes/ca.crt -CAkey /path/to/kubernetes/ca.key -CAcreateserial -out myuser.crt -days 10000`

