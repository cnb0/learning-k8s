18% - Configuration 
* Understanding Configmaps
* Understand SecurityContexts
* Define application resource requirements
* Create and consume secrets
* Understand service accounts
### Links you might need to bookmark on your bookmark bar 
* [secrets from concepts](https://kubernetes.io/docs/concepts/configuration/secret/#creating-your-own-secrets)
* [secrets from tasks](https://kubernetes.io/docs/tasks/inject-data-application/distribute-credentials-secure/#create-a-secret)
#### create a secret from literal with name and value name1=value1
```bash
k create secret generic --from-literal=name1=value1
k get secret mysecret -o yaml > secret.yaml  
```
```
apiVersion: v1
data:
  name1: dmFsdWUx # pick this and decode it 
kind: Secret
metadata:
  creationTimestamp: "2020-01-28T03:02:25Z"
  name: mysecret
  namespace: ckad
  resourceVersion: "36037"
  selfLink: /api/v1/namespaces/ckad/secrets/mysecret
  uid: 9c75cf60-417a-11ea-ba04-0242ac11001b
```
```
echo 'dmFsdWUx'|base64 -d
```
#### Load the above secret as a env variable for a nigix pod 
```
k run mypod --image=nginx --restart=Never --dry-run -o yaml > pod.yaml 
k nano pod.yaml
```
```
apiVersion: v1
kind: Pod
metadata:
  creationTimestamp: null
  labels:
    run: mypod
  name: mypod
spec:
  containers:
  - image: nginx
    name: mypod
    resources: {}
    envFrom: # this is to get secret as env
    - secretRef: # uses ref here 
        name: mysecret # secret name
  dnsPolicy: ClusterFirst
  restartPolicy: Never
status: {}
```
```bash
k exec -it mypod -- env
```
#### load the secret from above with a different name in a nginx pod 
```
apiVersion: v1
kind: Pod
metadata:
  creationTimestamp: null
  labels:
    run: mypod2
  name: mypod2
spec:
  containers:
  - image: nginx
    name: mypod2
    resources: {}
    env:
      - name: SECRET_VAL # secret name goes here
        valueFrom: 
          secretKeyRef: # it will be secret key reference here 
            name: mysecret 
            key: name1 
  dnsPolicy: ClusterFirst
  restartPolicy: Never
status: {}
``` 
```
k exec -it mypod2 -- env
```
```bash
#### Create a configmap from a file names cmfile.txt
```bash
echo -e 'secfilename=secfilevalue\nexam=ckad' > secretfile.txt
k create secret myfilesecret --from-file=secretfile.txt
k describe cm myfilesecret
```
```
