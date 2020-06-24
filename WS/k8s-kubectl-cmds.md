https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands

```
kubectl api-resources
kubectl api-versions
kubectl cluster-info
kubectl get all --all-namespaces
kubectl get apiservices
kubectl get replicaset
kubectl get --raw "/apis" | jq
kubectl get svc,ep,deploy,po,no,rs,ns,sa --all-namespaces -o wide
kubectl get ds
kubectl get cs
kubectl get csr
kubectl certificate approve <CSR>
kubectl certificate approve `kubectl get csr --no-headers |awk '{print $1}'`
kubectl logs calico-node-2nct7 --namespace kube-system

# --field-selector status.phase=Running
kubectl logs --namespace kube-system $(kubectl get pod -n kube-system -l k8s-app=calico-node  -o jsonpath={.items[0].metadata.name}) 

## delete pod
kubectl delete -n istio-system pod istio-policy-5dd5cb9645-l5wfd --force --grace-period=0

## delete namespace
kubectl delete namespace NAMESPACENAME --force --grace-period=0

#########
kubectl get pod -n kube-system -l k8s-app=calico-node  -o wide
kubectl get pod -n kube-system -l k8s-app=calico-kube-controllers  -o wide
kubectl describe cm calico-config -n kube-system
cat /etc/cni/net.d/10-calico.conflist
ls -l  /etc/cni/net.d/

kubectl set image deployment/my-nginx nginx=nginx:1.9.1
kubectl rollout status deployment/my-nginx
kubectl rollout history deployment/my-nginx
kubectl apply -f <deploy.yaml> --record
# spec.revisionHistoryLimit

# Mark node as unschedulable or schedulable
# SchedulingDisabled
kubectl cordon <node>
kubectl uncordon <node>

# Taint nodes
kubectl taint


kubectl drain
kubectl run -it --rm  --image=busybox:1.30.1-musl busy11 -- /bin/sh
kubectl run -it --rm --generator=run-pod/v1 --image=radial/busyboxplus:curl busyboxplus -- /bin/sh
kubectl run -it --rm   --image=alpine:3.9.4 alpine -- /bin/sh
kubectl run -it --rm   --image=infoblox/dnstools dns-client
kubectl run -it --rm   --image=tutum/dnsutils dns -- /bin/sh
kubectl run -it --rm   --image=sjourdan/toolbox t111 -- /bin/sh
kubectl run -it --rm   --image=praqma/network-multitool t222 -- /bin/sh
kubectl run -it --rm   --image=buildpack-deps:18.04-curl ubuntu -- /bin/sh
kubectl run -it --rm   --image=buildpack-deps:18.04-curl ubuntu1 -- /bin/bash
kubectl run -it --rm   --restart=Never --image=praqma/network-multitool pod-$RANDOM -- /bin/sh -c 'nc -nvz 10.254.98.23 443'

##############
kubectl run --generator=deployment/apps.v1beta1 --image=nginx:1.16.0-alpine  --replicas=2 nginx11
kubectl exec -it $(kubectl get pod -l run=nginx11 -o jsonpath={.items[0].metadata.name}) -- /bin/sh -c "ping -c 200 10.254.0.1"

##############
kubectl run -it --rm --restart=Never --generator=run-pod/v1 --image=busybox:1.31.1-glibc busybox-$RANDOM -- /bin/sh -c 'nslookup kubernetes.default.svc.cluster.local';
kubectl run --generator=run-pod/v1 --image=busybox:1.30.1-musl busybox11 -- /bin/sh -c 'sleep 3699d';
kubectl exec -it busybox11 -- /bin/sh -c "nslookup kubernetes.default.svc.cluster.local."
kubectl exec -it busybox11 -- nslookup kubernetes.default.svc.cluster.local.
kubectl run   --image=sjourdan/toolbox t111 -- /bin/sh -c 'sleep 3699d'
kubectl run   --image=praqma/network-multitool t222 -- /bin/sh -c 'sleep 3699d'

#########
kubectl run   --image=tutum/dnsutils dns11 -- /bin/sh -c 'sleep 3699d'
kubectl exec -it dns11 -- nslookup kubernetes.default

############

kubectl run   --image=ubuntu:18.04 ubu -- /bin/sh -c "sleep 36500d;"
kubectl run   --image=centos:centos7.6.1810 centos7 -- /bin/sh -c "sleep 36500d;"

###########
kubectl run --generator=run-pod/v1 --image=containous/whoami who333
kubectl expose pod who333 --port=80 --target-port=80 --type=NodePort
curl http://$(kubectl get node -o jsonpath='{.items[0].status.addresses[?(@.type=="InternalIP")].address}'):$(kubectl get svc who333 -o jsonpath='{.spec.ports..nodePort}')


########
kubectl run --generator=deployment/apps.v1beta1 --image=nginx  --replicas=5 nginx009 
kubectl expose deployments nginx009 --port=80 --target-port=80 --type=NodePort
curl http://$(kubectl get node -o jsonpath='{.items[0].status.addresses[?(@.type=="InternalIP")].address}'):$(kubectl get svc nginx009 -o jsonpath='{.spec.ports..nodePort}')
kubectl scale --replicas=1 deployments/nginx009


#################
kubectl run --restart=Never --generator=run-pod/v1 --image=gcr.io/kuar-demo/kuard-amd64:blue kuard
kubectl expose pod kuard --port=8080 --target-port=8080 --type=NodePort
```
