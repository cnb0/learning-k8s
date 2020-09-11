8% - State persistence
* understand PersistentVolumeStorage for storage 

#### create a busybox pod with two containers that share same volume mounted to /etc/foo. Connect to first container and cp /etc/passwd to /etc/foo/passwd 
read the file /etc/foo/passwd from second container
```bash
k run busyb --image=busybox --restart=Never --dry-run -o yaml  -- /bin/sh -c 'sleep 3600' > pod.yaml
nano pod.yaml
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
  volumes:
  - name: myvol
    emptyDir: {}
  containers:
  - args:
    - /bin/sh
    - -c
    - sleep 3600
    image: busybox
    name: mypod1
    resources: {}
    volumeMounts:
    - name: myvol
      mountPath: /etc/foo
  - args:
    - /bin/sh
    - -c
    - sleep 3600
    image: busybox
    name: mypod2
    resources: {}
    volumeMounts:
    - name: myvol
      mountPath: /etc/foo
  dnsPolicy: ClusterFirst
  restartPolicy: Never
status: {}
```
```bash
k apply -f pod.yaml
k exec -it mypod -c mypod1 -- cp /etc/passwd /etc/foo
k exec -it mypod -c mypod2 -- cat /etc/foo/passwd
```
#### Create 10Gb PersistentVolume named mypervolume with hostpath as /etc/foo that has access modes readwriteonce and readwritemany
```
apiVersion: v1
kind: PersistentVolume
metadata:
  name: mypervolume
  labels:
    type: local
spec:
  storageClassName: manual
  capacity:
    storage: 10Gi
  accessModes:
    - ReadWriteOnce
    - ReadWriteMany
  hostPath:
    path: "/etc/foo"
```
#### Create a PVC for 3GB with readwriteonce readwritemany modes 
```
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: pvclaim
spec:
  storageClassName: manual
  accessModes:
    - ReadWriteOnce
    - ReadWriteMany
  resources:
    requests:
      storage: 3Gi
```
#### Create a pod that uses the above PVC 
```
apiVersion: v1
kind: Pod
metadata:
  name: pv-pod
spec:
  volumes:
    - name: mypervolume
      persistentVolumeClaim:  # PVC starts here 
        claimName: pvclaim    # pvc name
  containers:
    - name: task-pv-container
      image: nginx
      ports:
        - containerPort: 80
          name: "http-server"
      volumeMounts:
        - mountPath: "/etc/foo"
          name: mypervolume
```
```bash
k exec -it pv-pod -- cp /etc/passwd /etc/foo
```
#### Create another pod that reads from the same volume 
```
apiVersion: v1
kind: Pod
metadata:
  name: pod2
spec:
  volumes:
    - name: mypervolume
      persistentVolumeClaim:
        claimName: pvclaim
  containers:
    - name: task-pv-container
      image: nginx
      ports:
        - containerPort: 80
          name: "http-server"
      volumeMounts:
        - mountPath: "/usr/share/nginx/html"
          name: mypervolume
```
```bash
k exec -it pod2 -- cat /etc/foo/passwd
```