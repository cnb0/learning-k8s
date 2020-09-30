
## CKAD Learning experience 

###  Environment Settings 
```
        $ alias k=kubectl
        $ source <(kubectl completion bash)
        
        $ kubectl cluster-info  
        $ kubectl cluster-info  dump

        $ kubectl config view 
        $ kubectl config get-contexts
        $ kubectl config current-context  
        $ kubectl config use-context my-cluster-name   
        $ kubectl config set-context --current --namespace=mytest
        $ kubectl config set-context $(kubectl config current-context) --namespace=testns

        $ kubectl config unset users.foo     

        $ kubectl api-resources 
        $ kubectl api-resources --namespaced=true  
        $ kubectl api-resources --api-group=extensions

        $ kubectl describe node 
        $ kubectl top nodes
        $ kubectl replace --force -f pod/yaml       # Force delete k8s resource object
  ```      
 
 ### k8s components 
```       
        $ kubectl get componentstatuses
        
        $ cat        /var/log/kube-apiserver.log
        $ kubectl    logs kube-apiserver-k8s-master-01 -n kube-system
        $ journalctl -u kube-apiserver
        
        $ cat /var/log/kube-scheduler.log
        $ cat /var/log/kube-controller-manager.log
        $ cat /var/log/kubelet.log
        $ cat /var/log/kube-proxy.log
        
        $ journalctl -u kube-scheduler
        $ journalctl -u kube-controller-manager
        $ journalctl -u kubelet
        $ journalctl -u kube-proxy
        
     - list the logs of cni 
        $ journalctl -u flanneld
        $ kubectl logs kube-flannel-ds-amd64-9mrnj -n kube-system
        
     - Container runtime
        $ journalctl -u docker.service
        $ cat /var/log/docker.log
 
```
###  Explain structure of a Kubernetes API resource object (po,deployment,cm,sa,sc,secrets,svc,ingress,rs,pv,pvc ..)
```
        
        $ kubectl explain cm
        $ kubectl explain secrets
        $ kubectl explain sa
               
        $ kubectl explain pod  
        $ kubectl explain pod --recursive
        $ kubectl explain pod.spec
        $ kubectl explain pod.spec.containers
        $ kubectl explain pod.spec.containers.image
        $ kubectl explain pod.spec.containers.livenessProbe
        $ kubectl explain pod.spec.containers.livenessProbe.httpGet
        $ kubectl explain pod.spec.containers.readinessProbe
        $ kubectl explain pod.spec.containers.readinessProbe.exec
 
        $ kubectl explain deployment 
        $ kubectl explain deployment --recursive
        $ kubectl explain deployment.spec.strategy
        
        $ kubectl explain svc
        $ kubectl explain svc.spec
        $ kubectl explain ep
 
        $ kubectl explain job.spec.parallelism
        $ kubectl explain job.spec.completions
 
        $ kubectl explain ingress
        $ kubectl explain egress
        $ kubectl explain netpol 
```          

### - Delete all k8s objects/resources
```
        $ kubectl delete --all pods        --namespace=foo
        $ kubectl delete --all deployments --namespace=foo
        $ kubectl delete --all namespaces
        $ kubectl delete ds,rs,svc,deploy,pods,rc --all
            
        $ kubectl get pods -l env=dev 
        $ kubectl get pods --selector env=dev 
        $ kubectl delete pods -l 'env in (production, development)'

        $ kubectl run nginx --image=nginx --restart=Never 
        $ kubectl run nginx --image=nginx --restart=Never --env=foo=bar
        $ kubectl set image pod/nginx nginx=nginx:1.7.1 

        $ kubectl run busybox --image=busybox --restart=Never --namespace=myns
        $ kubectl run busybox --image=busybox --restart=Never 
        $ kubectl exec busybox -- printenv
        $ kubectl logs busybox -f     
        
  # display all the logs from the pods created from this deployment?
        $ kubectl logs -l app=nginx --all-containers=true
        
  # deployment - start a single instance of nginx 
        $ kubectl create deployment nginx --image=nginx 

  # create a pod
        $ kubectl run nginx   --image=nginx   --restart=Never  
        $ kubectl run busybox --image=busybox --restart=OnFailure --dry-run=client -o yaml -- \
          /bin/sh -c 'echo Hello!'  

  # Create a job
        $ kubectl create job nginx --image=nginx 
   
  # Create a Cronjob
        $ kubectl create cronjob nginx --image=nginx --schedule="* * * * *"  
       
```
  
### 1. Core Concepts - 13% ( Tasks )

- Understand Kubernetes API primitives
- Create and configure basic Pods

```   
       - Reference > kubectl CLI > kubectl Cheat Sheet
       - Monitoring, Logging, and Debugging 
                 > Get a Shell to a Running Container
       - Access Applications in a Cluster
                 > Configure Access to Multiple Clusters
                 > Accessing Clusters using API
                 > Use Port Forwarding to Access Applications in a Cluster
      
           $ kubectl get po --all-namespaces
           $ kubectl get po -A

$ kubectl run nginx --image=nginx --restart=Never --dry-run=client -o yaml | kubectl create -n mynamespace -f -

# Interactive POD debugging
           $ kubectl run -i --tty alpine --image=alpine -- sh
           $ kubectl attach POD_NAME -i
           $ kubectl port-forward POD_NAME 5000:6000
           $ kubectl exec POD_NAME -- ls /
           $ kubectl exec POD_NAME -c my-container -- ls /
           $ kubectl top pod POD_NAME --containers
 ```

### 2. Multi-container pods - 10% 
- Understand Multi-Container Pod design patterns 
     * ambassador
     * adapter
     * sidecar

```
       - Tasks -> Init Containers
       - Concepts -> Logging Architecture

     # run commands on 2 different containers in the same pod 
              
           $ kubectl run busybox --image=busybox --restart=Never -o yaml --dry-run=client -- \ 
                /bin/sh -c 'echo hello;sleep 3600' > pod.yaml
                
     # stream pod container logs(stdout, multi-container case)
           $ kubectl logs -f my-pod -c my-container
```

### 3. Pod design - 20%

- Understand 
     * Deployments and how to perform rolling updates
     * Deployments how to perform rollbacks
- Understand Jobs and CronJobs
- Understand how to use Labels, Selectors, and Annotations

```
     . Concepts >
              Overview > Labels and Selectors
              Workloads > Controllers > Deployments
      . Tasks > Run Jobs > Running Automated Tasks with a CronJob
 
             $ kubectl get events --sort-by=.metadata.creationTimestamp
             $ kubectl get events --namespace myns --sort-by='{.lastTimestamp}'
             $ kubectl get events --field-selector=involvedObject.name=random-logger
                          
             $ kubectl diff -f ./my-pod.yaml
             $ kubectl delete pods,services -l name=myLabel         

             $ kubectl scale deploy nginx --replicas=5
             $ kubectl scale rs/nginx     --replicas=3      
             $ kubectl autoscale deployment nginx --min=2 --max=10
          

      # Lables/Selectors 

             $ kubectl run nginx1 --image=nginx --restart=Never --labels="app=v1"
             $ kubectl run nginx2 --image=nginx --restart=Never --labels="app=frontend,env=dev"

             $ kubectl get pods   --field-selector=status.phase=Running

             $ kubectl get   pods --show-labels
             $ kubectl label pods my-pod tier=backend 
             
             $ kubectl label po nginx1 app=v2 --overwrite
             $ kubectl get po -L app

             $ kubectl get po -l app=v2
             $ kubectl get po -l 'app in (v2)'
             $ kubectl get po --selector app=v2

             $ kubectl label po nginx1 nginx2 nginx3 app-
             $ kubectl label po -lapp  app-

       # Add an annotation

             $ kubectl annotate pods my-pod url=http://goo.gl/XXBTWq       
             $ kubectl annotate po nginx1 nginx2 nginx3 description='my description'
             $ kubectl describe po nginx1 | grep -i 'annotations'
             $ kubectl annotate po nginx1 description-
         
       # Deployments 

             $ kubectl create   deployment nginx  --image=nginx:1.7.8  --dry-run=client -o yaml > deploy.yaml
             $ kubectl get      deploy nginx -o yaml
             $ kubectl describe deploy nginx
             
             $ kubectl apply -f <deploy.yaml> --record

          # Rolling update "www" containers of "frontend" deploy,update the image
             $ kubectl set image deployment/frontend www=image:v2      

          # Watch rolling update status of "frontend" deploy until finish
             $ kubectl rollout status deployment/frontend -w

          # Check the history of deployments including the revision 
             $ kubectl rollout history deployment/frontend             
          
          # Rollback to the previous deployment
             $ kubectl rollout undo deployment/frontend    

          # Rollback to a specific revision
             $ kubectl rollout undo deployment/frontend --to-revision=2   
                  
          # Rolling restart of the "frontend" deployment
             $ kubectl rollout restart deployment/frontend             

          # if you created deployment by 'run' command
             $ kubectl get po -l run=nginx
             $ kubectl get rs -l run=nginx      
             
          # if you created deployment by 'create' command
             $ kubectl get rs -l app=nginx      
             $ kubectl get po -l app=nginx
              
             $ kubectl set image deploy nginx nginx=nginx:1.7.9
             or
             $ kubectl edit deploy nginx  
             $ kubectl describe deploy nginx | grep Image:
            
             $ kubectl rollout status deploy nginx

             $ kubectl rollout history deploy nginx
             $ kubectl rollout history deploy nginx --revision=4

             $ kubectl rollout undo deploy nginx
             $ kubectl rollout undo deploy nginx --to-revision=2
          
          # Scale deployment
             $ kubectl scale deploy nginx --replicas=5  --record
             
          # Autoscale deployment - HPA
             $ kubectl autoscale deploy nginx --min=5 --max=10 --cpu-percent=80

             $ kubectl rollout history deploy nginx
             $ kubectl rollout history deploy nginx --revision=6

             $ kubectl rollout pause  deploy nginx
             $ kubectl rollout resume deploy nginx
             
       # Jobs
            
             $ kubectl get jobs -w

       # CronJobs
              - Tasks 
                 - Automated Tasks with Cron Jobs
                 - Parallel Jobs with Expansions
                 - Course Parallel Processing with a Work Queue
                 - Fine   Parallel Processsing with a Work Queue              
                           
              $ kubectl create cronjob busybox --image=busybox --schedule="*/1 * * * *" -- \ 
                 /bin/sh -c 'date; echo Hello from the Kubernetes cluster'
```
### 4. Configuration - 18%  ( Tasks )

- Understand
    * ConfigMaps
    * SecurityContexts
    * ServiceAccounts
- Create & consume Secrets
- Define an application’s cpu/memory requirements

```
   - Configure Pods and Containers 
            -> Configure 
                  - a Pod to Use a ConfigMap
                  - a Service Accounts for Pods
                  - a Security Context for a Pod or Container
            -> Assign CPU Resources to Containers and Pods
   - Concepts > Configuration > Secrets
   - Inject Data Into Applications > Distribute Credentials Securely Using Secrets
   - CRUD ( ConfigMap(cm),secret(secrets), service account(sa), secuirtycontext and cpu/mem limits)
   

        $ kubectl get cm,sc,secrets,sa

        $ kubectl create       myconfig
        $ kubectl get      cm  myconfig
        $ kubectl describe cm  myconfig
                        
        $ kubectl create   cm  myconfig --from-literal=key1=val1
        
        $ kubectl create   cm  myconfig --from-literal=key2=val2  
                                        --from-literal=key3=val3
        
        $ kubectl create   cm  myconfig --from-file=my-config.txt \  
                                        --from-literal=key4=value4 \  
                                        --from-literal=key5=value5
        
        $ kubectl create cm myconfig --from-env-file=/file/path
        $ kubectl create cm myconfig --from-file=config.txt
      
        $ kubectl get      cm  myconfig -o yaml
        $ kubectl describe cm  myconfig
                                
        $ kubectl create secret generic my-secret --from-literal=password=mypass
        $ kubectl create secret generic my-secret-tls --from-file=kuard.crt --from-file=kuard.key
        $ kubectl get    secret my-secret -o yaml

        $ kubectl create sa myuser
        $ kubectl get    sa --all-namespaces
        $ kubectl get    sa default -o yaml > sa.yaml

# adding serviceaccount for a pod
$ kubectl run nginx --image=nginx --restart=Never --serviceaccount=myuser -o yaml --dry-run=client > pod.yaml

# Resource Quota 
     $ kubectl create quota res-quota --hard=pods=1,cpu=1,memory=1Gi

# config cpu/memory request/limits for a pod
     $ kubectl run nginx --image=nginx --restart=Never --requests='cpu=100m,memory=256Mi' --limits='cpu=200m,memory=512Mi'
     $ kubectl run nginx --image=nginx --restart=Never --requests cpu=100m,memory=256Mi   --limits cpu=200m,memory=512Mi  
```

### 5. Observability - 18%
   - Understand 
      * LivenessProbes & ReadinessProbes
      * Container logging
      * How to monitor applications in Kubernetes
      * Debugging in Kubernetes

```
      Tasks - App Introspection and Debugging
            - Liveness and Readiness Probes
            - Debugging Pods
            - Troubleshooting Applications
            - Debugging Services
            - Debugging Services Locally
            - Core Metrics Pipeline
              
       $ kubectl describe pod nginx | grep -i readiness
       $ kubectl describe pod nginx | grep -i liveness

       $ kubectl get events | grep -i error 
       $ kubectl delete po busybox --force --grace-period=0

```
### 6. Services and networking - 13%
- Understand Services
- Demonstrate a basic understanding of NetworkPolicies

```
    - Concepts -> Connecting Apps with Services
    - Tasks -> Declare Network Policy
        
        $ kubectl run curl --image=radial/busyboxplus:curl  -it
        
        $ kubectl get  svc --sort-by=.metadata.name
        $ kubectl get  svc nginx -o yaml
        $ kubectl edit svc nginx
        
        $ kubectl get ep
        
     - Gather the events from the service from this deployment
        $ kubectl describe svc nginx-service

     -  Acquire the list of endpoints associated with this service
         Endpoints:         10.244.1.73:80,10.244.1.74:80,10.244.2.53:80

     -  How are the endpoints determined?
          Selector:          app=nginx

        $ kubectl run nginx --image=nginx --restart=Never --port=80 --expose
        $ kubectl expose deploy mydeploy --name=mysvc --type=NodePort --target-port=8080 --port=6262
      
        $ kubectl expose rs nginx --port=80 --target-port=8000
 
$ kubectl run busybox --image=busybox --rm -it --restart=Never -- sh \
       wget -o- http://nginx:80 --timeout 2    

$ kubectl run busybox --image=busybox --rm -it --restart=Never --labels=access=granted -- sh \
       wget -o- http://nginx:80 --timeout 2  
       
$ kubectl run busybox --image=busybox --rm -it --restart=Never -- sh \
       wget -o- IP:80
       wget -o- SERVICE_CLUSTER_IP:6262

```

### 7. State persistence - 8% ( Tasks - PV/PVC )
- Understand pv and pvc for storage

```
 - Configure Pods and Containers 
        > Configure a Pod to Use a Volume for Storage
        > Configure a Pod to Use a PersistentVolume for Storage
                  
        $ kubectl get pv --sort-by=.spec.capacity.storage
```
