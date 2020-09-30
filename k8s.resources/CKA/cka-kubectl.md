## CKA kubectl cheatsheet 


# kubectl cluster cli
```
kubectl api-resources
kubectl api-versions
kubectl cluster-info
kubectl get apiservices
kubectl get --raw "/apis" | jq

kubectl get all --all-namespaces
kubectl get svc,ep,deploy,po,no,rs,ns,sa --all-namespaces -o wide
kubectl get ds
kubectl get cs
kubectl get csr
kubectl certificate approve <CSR>
kubectl certificate approve `kubectl get csr --no-headers |awk '{print $1}'`
```

# master 


# cluster worker node 
    $ kubectl drain node_01 --ignore-daemonsets
    $ kubectl uncordon node_01

# Mark node as unschedulable or schedulable
   - SchedulingDisabled
     $ kubectl cordon <node>
     $ kubectl uncordon <node>

# Taint nodes
    kubectl taint


# kubectl  troubleshooting 


# debugging utils
```
kubectl run -it --rm  alpine     --image=alpine                    -- /bin/sh
kubectl run -it --rm  bbc        --image=busybox:1.30.1-musl       -- /bin/sh -c 'sleep 3699d'
kubectl run -it --rm  curl       --image=radial/busyboxplus:curl   -- /bin/sh
kubectl run -it --rm  dnsutil    --image=tutum/dnsutils            -- /bin/sh -c 'sleep 3699d'
kubectl run -it --rm  toolb      --image=sjourdan/toolbox t111     -- /bin/sh -c 'sleep 3699d'
kubectl run -it --rm  nmtool     --image=praqma/network-multitool  -- /bin/sh -c 'sleep 3699d'
kubectl run -it --rm  ucurl      --image=buildpack-deps:18.04-curl -- /bin/sh
kubectl run -it --rm  dns-client --image=infoblox/dnstools   
kubectl run -it --rm   --restart=Never --image=praqma/network-multitool pod-$RANDOM --  \
                                /bin/sh -c 'nc -nvz 10.254.98.23 443'

kubectl exec -it $(kubectl get pod -l run=mynginx -o jsonpath={.items[0].metadata.name}) -- \ 
                /bin/sh -c "ping -c 200 10.254.0.1"

kubectl run -it --rm --restart=Never --image=busybox busybox-$RANDOM -- \ 
                /bin/sh -c 'nslookup kubernetes.default.svc.cluster.local'

kubectl exec -it busybox -- /bin/sh -c "nslookup kubernetes.default.svc.cluster.local."

kubectl run -it --rm  dnsutil    --image=tutum/dnsutils            -- /bin/sh -c 'sleep 3699d'
kubectl exec -it      dnsutil         --nslookup kubernetes.default

kubectl run wami --image=containous/whoami who333
kubectl expose pod wami --port=80 --target-port=80 --type=NodePort
curl http://[NodeIP]:[NodePort]

# --field-selector status.phase=Running
kubectl logs --namespace kube-system $(kubectl get pod -n kube-system -l k8s-app=calico-node  -o jsonpath={.items[0].metadata.name}) 
kubectl get pod -n kube-system -l k8s-app=calico-node  -o wide
kubectl get pod -n kube-system -l k8s-app=calico-kube-controllers  -o wide
kubectl logs calico-node-2nct7 --namespace kube-system
kubectl describe cm calico-config -n kube-system
cat /etc/cni/net.d/10-calico.conflist
ls -l  /etc/cni/net.d/

kubectl apply -f <deploy.yaml> --record
# spec.revisionHistoryLimit

```

# logs 


# etcd 

