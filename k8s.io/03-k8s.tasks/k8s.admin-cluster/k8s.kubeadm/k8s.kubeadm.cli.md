
## [kubeadm cli reference](https://kubernetes.io/docs/reference/setup-tools/kubeadm/)

## [kubeadm cli](https://pwittrock.github.io/docs/admin/kubeadm/)
## [kubeadm cli Linode](https://www.linode.com/docs/kubernetes/getting-started-with-kubernetes/)


- To bootstrap a Kubernetes control-plane node
         $ kubeadm init 

- To bootstrap a Kubernetes worker node and join it to the cluster
         $ kubeadm join 

- To upgrade a Kubernetes cluster to a newer version
         $ kubeadm upgrade plan

         $ apt-get upgrade -y kubeadm=1.12.0-00
         $ kubeadm upgrade apply v1.12.0
         $ kubectl get nodes -o wide 
         
         $ sudo apt-get upgrade -y kubelet=1.12.0-00
         $ sudo systemctl restart kubelet 
         $ kubectl get nodes -o wide 

         $ kubectl drain node-1
         $ kubectl uncordon node-1



- If you initialized your cluster using kubeadm v1.7.x or lower, 
  to configure your cluster for kubeadm upgrade
         $ kubeadm config 

- To manage tokens for kubeadm join
         $ kubeadm token 

- To revert any changes made to this host by kubeadm init or kubeadm join 
         $ kubeadm reset 

- To print the kubeadm version
         $ kubeadm version 


- Running kubeadm init bootstraps a Kubernetes cluster. 

    - This consists of the following steps:

    - kubeadm runs a series of pre-flight checks to validate the system state 
      before making changes. 
      Some checks only trigger warnings, others are considered errors and will exit kubeadm until 
      the problem is corrected or the user specifies
          --skip-preflight-checks.

    - kubeadm generates a token that additional nodes can use to register themselves 
      with the master in future. Optionally, the user can provide a token.

    - kubeadm generates a self-signed CA to provision identities 
      for each component (including nodes) in the cluster. 
    - It also generates client certificates to be used by various components. 
    - If the user has provided their own CA by dropping it in the cert directory 
      (configured via --cert-dir, by default /etc/kubernetes/pki), this step is skipped.

    - Outputting a kubeconfig file for the kubelet to use to connect to the API server, 
      as well as an additional kubeconfig file for administration.

    - kubeadm generates Kubernetes static Pod manifests for the 
                - API server 
                - Controller manager 
                - Scheduler 

      It places them in 
                - /etc/kubernetes/manifests 
        - The kubelet watches this directory for Pods to create on startup 
        - These are the core components of Kubernetes 
          Once they are up and running kubeadm can set up and 
          manage any additional components

    - kubeadm “taints” the master node so that only control plane components will run there 
      It also sets up the RBAC authorization system and writes a special ConfigMap 
      that is used to bootstrap trust with the kubelets.

    - kubeadm installs add-on components  via the API server. 
            - internal DNS server 
            - kube-proxy DaemonSet.

    - Running kubeadm join on each node in the cluster consists of the following steps:

        - kubeadm downloads root CA information from the API server. 
          It uses the token to verify the authenticity of that data.

        - kubeadm creates a local key pair. 
            - It prepares a certificate signing request (CSR)  
            - sends that off to the API server for signing. 
            - The bootstrap token is used to authenticate. 
            - The control plane will sign this CSR requested automatically.

        - kubeadm configures the local kubelet to connect to the API server

