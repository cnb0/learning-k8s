


#### create a deployment and expose it as a service in single command 
```bash
k run mydeply --image=nginx --port=80 --labels=exam=ckad --restart=Never --expose 
```
#### create a networkpolicy so that only pods that have label access=true can only access pods that have label exam: ckad
```
nano netpolicy.yaml
```
```
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: access-nginx
spec:
  podSelector:
    matchLabels:
      exam: ckad
  ingress:
  - from:
    - podSelector:
        matchLabels:
          access: "true"
```
```bash
k apply -f netpolicy.yaml
k get po -o wide 
```
##### now try accessing one of the pod ip address on port 80 through wget from a pod that have label access=true 
```
k run bb --image=busybox --restart=Never --labels=access=true --rm -it -- wget -o- 10.32.0.5:80  ## pod ip address from above - this would get to index.html
``` 
##### now try accessing one of the pod ip address on port 80 through wget from a pod that have label access=false 
```
k run bb --image=busybox --restart=Never --labels=access=false --rm -it -- wget -o- 10.32.0.5:80  ## pod ip address from above - this will fail to get to index.html
```