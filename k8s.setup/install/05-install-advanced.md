```
### Software requirements ###
Ubuntu 18.04 LTS

## 1. Install Docker in all nodes
sudo iptables-save > /tmp/iptables.conf
sudo apt-get update
sudo apt-get remove docker docker-engine
sudo apt-get -y install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo apt-key fingerprint 0EBFCD88
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
sudo apt-get update
sudo apt-get -y install docker-ce
sudo apt-get -y install nfs-kernel-server
sudo apt-get -y install nfs-common
sudo groupadd docker
sudo usermod -aG docker $USER
sudo systemctl enable docker

## 2. Install kubectl, kubelet and kubeadm in all nodes
curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl
chmod +x ./kubectl
sudo mv ./kubectl /usr/local/bin/kubectl

curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
sudo touch /etc/apt/sources.list.d/kubernetes.list
sudo bash -c 'echo "deb http://apt.kubernetes.io/ kubernetes-xenial main" > /etc/apt/sources.list.d/kubernetes.list'
sudo apt-get update
sudo apt-get install -y kubelet=1.10.0-00 kubeadm=1.10.0-00

sudo iptables-restore < /tmp/iptables.conf

#MASTER
sudo su -
swapoff -a
kubeadm init --kubernetes-version=v1.10.3 --pod-network-cidr=10.244.0.0/16     --apiserver-cert-extra-sans 157.179.16.71
kubeadm init --kubernetes-version=v1.10.3 --pod-network-cidr=10.244.0.0/16 --service-cidr=10.244.0.0/12 --ignore-preflight-errors=cri
exit


## MASTER
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

## Enable master to deploy pods
kubectl taint nodes --all node-role.kubernetes.io/master-

## Cluster network
kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml
kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/v0.8.0/Documentation/kube-flannel-rbac.yml

## Tools in MASTER
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/master/src/deploy/recommended/kubernetes-dashboard.yaml
kubectl apply -f https://github.com/kubernetes/heapster/raw/master/deploy/kube-config/rbac/heapster-rbac.yaml
kubectl apply -f https://github.com/kubernetes/heapster/raw/master/deploy/kube-config/influxdb/heapster.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes/heapster/master/deploy/kube-config/influxdb/influxdb.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes/heapster/master/deploy/kube-config/influxdb/grafana.yaml
kubectl create clusterrolebinding insecure-dashboard --clusterrole=cluster-admin --serviceaccount=kube-system:kubernetes-dashboard
kubectl get pods --all-namespaces


## On Local :: Proxying API Server to localhost
scp root@<master ip>:/etc/kubernetes/admin.conf .
scp root@167.99.79.135:/etc/kubernetes/admin.conf .
kubectl --kubeconfig ./admin.conf proxy

http://localhost:8001/api/v1
http://localhost:8001/api/v1/namespaces/kube-system/services/https:kubernetes-dashboard:/proxy/
http://localhost:8001/api/v1/namespaces/kube-system/services/monitoring-grafana:/proxy/

## Disable master to deploy pods
kubectl taint nodes <master node> master=DoNotSchedulePods:NoExecute
kubectl taint nodes docker01 master=DoNotSchedulePods:Execute

## Worker
sudo su -
swapoff -a
kubeadm join 10.148.0.3:6443 --token b963d6.7zr3omm5kvu80ege --discovery-token-ca-cert-hash sha256:4a009b347760ce963225b32c7d2f27253b3e6740c7a0102a93afb5abf1a43f24
exit

## Deploy
kubectl run nginx --image=nginx --port 80
kubectl expose deploy nginx --port 80 --target-port 80 --type NodePort
kubectl scale deployment/nginx --replicas=5

kubectl get services
kubectl delete service nginx
kubectl get deployments
kubectl delete deployment nginx

curl http://10.148.0.3:32765
curl http://10.148.0.2:32765
curl http://10.148.0.2:32765



kubectl delete node node-02
kubectl delete node node-03
kubectl drain node-01 --delete-local-data --force --ignore-daemonsets
kubectl delete node node-01


#Remove kubernetes
kubeadm reset
sudo apt-get purge kubeadm kubectl kubelet kubernetes-cni kube*
sudo apt-get autoremove
sudo rm -rf ~/.kube



#Resources
https://kubernetes.io/docs/tasks/tools/install-kubeadm/#before-you-begin
https://kubernetes.io/docs/setup/independent/create-cluster-kubeadm/
