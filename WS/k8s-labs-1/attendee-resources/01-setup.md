 ### Before you can start creating clusters with Kubernetes, you must download and install several things.
 For the purposes of this tutorial, we’ll need:

- [Minikube](https://kubernetes.io/docs/tasks/tools/install-minikube/), a lightweight distribution that lets you run Kubernetes clusters locally
- A virtualization software like [VirtualBox](https://www.virtualbox.org/wiki/Downloads)
- [Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/), the command line client for Kubernetes
- A container runtime like [Docker](https://www.docker.com/)


### Creating a Cluster
Let’s learn how to create a simple cluster using Kubernetes. We’ll use Minikube to create a small virtual machine and deploy a cluster with just one node.

1. [Install VirtualBox] (https://www.virtualbox.org/wiki/Downloads)
Download VirtualBox and follow the installation instructions for your OS. Alternatively, you can use KVM2 or any hypervisor you prefer.

2. [Install Kubectl] (https://kubernetes.io/docs/tasks/tools/install-kubectl/)
Kubectl is how you, the developer, interact with your clusters. You can download kubectl and find installation instructions on the Kubernetes website.

3. Install Docker
If you don’t already have it set up, download and install Docker for Windows or Docker for Mac. Linux users can consult the Docker docs to find installation instructions for their distribution.

4. Install Minikube
See the Minikube docs for everything you need to set up Minikube for Windows, Mac or Linux.

5. Run Minikube
After all that set up, creating a cluster requires just a single step. From the command line, enter:

`minikube start`

Now, to confirm that your cluster is running, enter:

`kubectl get nodes`

If done correctly, you should see some information about your cluster such as its status and a version number.

### Configuring Kubectl
If you followed the steps above and installed Minikube, then kubectl should have automatically configured itself to access the cluster you created. You can confirm this with the following command:

`kubectl cluster-info`
The ~/.kube/config file defines which API endpoints and clusters kubectl can access. Determining which cluster kubectl interacts with is referred to as “setting the context.” To see all of your available contexts, use this command:

kubectl config use-context minikube
You can change the context using the KUBECONFIG variable. If everything was correctly configured, you should be able to open the Kubernetes dashboard in a browser with this command:

`minikube dashboard`

### The Kubernetes Dashboard

The Kubernetes dashboard tells you everything you need to know about your cluster. To determine if your dashboard is up and running, enter this command:

`kubectl get pods -n kube-system`

Look for an entry that begins with kubernetes-dashboard. Before you can view your dashboard, you must run the following command to proxy to the API:

### kubectl proxy
Now, the Kubernetes API will be available at `http://localhost:8001`. To open your dashboard in a browser, visit the following URL:

`http://localhost:8001/api/v1/namespaces/kube-system/services/https:kubernetes-dashboard:/proxy/`
