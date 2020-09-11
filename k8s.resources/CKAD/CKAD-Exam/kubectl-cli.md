# CKAD exam practice questions and commands 

This repo is consolidated list of ckad excersises and commands 

#### Setup your environment to save sometime 
```
alias k=kubectl 
$ kubectl config set-context $(k config current-context) --namespace=<namespace>
```
#### If you want to setup your favorite editor 
```
$ export KUBE_EDITOR=nano

```
#### Be familiar with below kubectl commands to create a pod with env variable, 
#### running on port 80, requests and limits, labels  
```
$ kubectl run mypod --image=nginx --restart=Never --port=80 --env="name=value" 
            --requests=cpu=50m,memory=50Mi --limits=cpu=100m,memory=100Mi 
            --replicas=1 --labels=exam=ckad --dry-run -o yaml -- 
            /bin/bash -c 'echo Hello; sleep 3600' 

```

#### To create a deployment with similar attributes 
```
$ kubectl run mydeploy --image=nginx  --port=80 --env="name=value" 
               --requests=cpu=50m,memory=50Mi 
               --limits=cpu=100m,memory=100Mi 
               --replicas=1 --labels=exam=ckad 
               --dry-run -o yaml -- 
               /bin/bash -c  'echo Hello; sleep 3600'  

```
#### To create a cronjob 
```
$ kubectl run cronjob --image=nginx --labels=exam=ckad --restart=OnFailure --schedule="*/1 * * * * " 
              -- /bin/bash -c 'echo Hello CronJob'
```
### To create a job 
```
$ kubectl run job --image=nginx --labels=exam=ckad --restart=OnFailure -- /bin/bash -c 'echo Hello job'
```
#### To sort on a column and print only that column 
```bash
## sorting on column 5 (-r to reverse) and printing only that column
 $ kubectl get po -o wide --no-headers|sort -k5 -r | awk '{print $5}' 

## sorting on column 5 and printing only that column
$ kubectl get po -o wide --no-headers|sort -k5 | awk '{print $5}' 

## sorting on column 5 and printing only that column and first one
$ kubectl get po -o wide --no-headers|sort -k5 |head -1| awk '{print $5}' 
``` 

#### get the container level metrics of a ngix pod having multiple containers
```bash
$ kubectl top pod nginx --containers
```

#### sort the events by creationtimestamp and write them to a file 
```bash
$ kubectl get events --sort-by=.metadata.creationTimestamp > events.txt
$ kubectl get events -o wide |grep <podname> > pod_events_wide.txt 
```
 