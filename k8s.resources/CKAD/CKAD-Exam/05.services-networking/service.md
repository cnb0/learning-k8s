13% Services & Networking
* understand services
* demonstrate understanding of networking policies
#### Create a nginx deployment with port 80 exposed and create a service named myservice pointing to deployment
```bash
k run mydeply --image=nginx --port=80 --replicas=3 --expose > deploy.yaml
or
k create deployment mydeploy --image=nginx --dry-run -o yaml > deploy.yaml
nano deploy.yaml change replicas and add ports: section
```
#### expose the deployment as a service with name 'ngsvc'
```bash
k expose  --name=ngsvc deploy mydeploy --port=8080 --target-port=80 --type=ClusterIP
k get svc  
```
#### check if service is accessible from the node assuming service-ip is 10.109.145.246 or on the svc name 
```bash
k run bb --image=busybox --rm -it --restart=Never -- wget -o- 10.109.145.246:8080
k run bb --image=busybox --rm -it --restart=Never -- wget -o- ngsvc:8080
```
#### convert clusterIp to nodeport 
```bash
k edit svc ngsvc
change ClusterIP to NodePort in the yaml  
```
#### scale the deployment to 5 pods
```bash
k scale deploy mydeploy --replicas=5 
```
#### change the service accont of the deployment to ckad service account
```bash
k create sa ckad
k set serviceaccount deploy/mydeploy ckad 
```
#### add label exam=ckad to the deployment mydeploy
```bash
k label deploy/mydeploy exam=ckad
```