18% - Observability
## Liveness and readiness probes


* understanding liveness and readiness probes
* understanding container logging 
* understand how to monitor applications in kubernetes
* understanding debugging in kubernetes
* [probes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#define-a-liveness-command)
* kubernetes.io > Documentation > Tasks > Configure Pods and Containers > [Configure Liveness and Readiness Probes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/)

#### Create a nginx pod with liveness probe that runs cat /var/log/app.log command
#### make the pod run for 15 sec and then delete the file /var/log/app.log to make pod fail on liveness
#### write the pod events into a file events.txt  
```bash 
k run lpod --image=nginx --restart=Never --dry-run -o yaml > pod.yaml 
```
```
apiVersion: v1
kind: Pod
metadata:
  creationTimestamp: null
  labels:
    run: lpod
  name: lpod
spec:
  containers:
  - args:
      - /bin/sh
      - -c  # below command creates a file and sleeps from 15 seconds and then deletes to make pod fail.
      - touch /var/log/app.log; sleep 15;rm -rf /var/log/app.log; sleep 3600; 
    image: nginx
    name: lpod
    resources: {}
    livenessProbe:
      exec:
        command:
          - cat
          - /var/log/app.log
      initialDelaySeconds: 5
      periodSeconds: 5
  dnsPolicy: ClusterFirst
  restartPolicy: Never
status: {}
```
```bash
k describe po lpod
k get events |grep lpod > events.txt  # writing the events of pod
```
#### Create a container that runs the image k8s.gcr.io/liveness (which fails after 10 sec on health check) and check the liveness probe on /healthz on port 8080
```
apiVersion: v1
kind: Pod
metadata:
  labels:
    test: liveness
  name: liveness-http
spec:
  containers:
  - name: liveness
    image: k8s.gcr.io/liveness
    args:
    - /server
    livenessProbe:
      httpGet:
        path: /healthz
        port: 8080
        httpHeaders:
        - name: Custom-Header
          value: Awesome
      initialDelaySeconds: 3
      periodSeconds: 3
      failureThreshold: 5
```
```bash
k describe po liveness-http
```
#### check for a pod (image k8s.gcr.io/goproxy:0.1) liveness and readiness on a TCP socket port 8080 
```
apiVersion: v1
kind: Pod
metadata:
  name: goproxy
  labels:
    app: goproxy
spec:
  containers:
  - name: goproxy
    image: k8s.gcr.io/goproxy:0.1
    ports:
    - containerPort: 8080
      name: liveness-port
    readinessProbe:
      tcpSocket:
        port: liveness-port
      initialDelaySeconds: 5
      periodSeconds: 10
    livenessProbe:
      tcpSocket:
        port: liveness-port
      initialDelaySeconds: 15
      periodSeconds: 20

```
#### use startup probe along with liveness probe 
```
apiVersion: v1
kind: Pod
metadata:
  labels:
    test: liveness
  name: liveness-http
spec:
  containers:
  - name: liveness
    image: k8s.gcr.io/liveness
    args:
    - /server
    livenessProbe:
      httpGet:
        path: /healthz
        port: 8080
        httpHeaders:
        - name: Custom-Header
          value: Awesome
      initialDelaySeconds: 3
      periodSeconds: 3
      failureThreshold: 5
    startupProbe:
      httpGet:
        path: /healthz
        port: liveness-port
      failureThreshold: 30
      periodSeconds: 10
```
```bash
k describe po liveness-http
```
#### create an nginx pod with port 80 and check readiness of container on http port 80
```bash
k run nginx --image=nginx --restart=Never --port=80 --dry-run -o yaml > pod.yaml
```
```
apiVersion: v1
kind: Pod
metadata:
  creationTimestamp: null
  labels:
    run: nginx
  name: nginx
spec:
  containers:
  - image: nginx
    name: nginx
    ports:
    - containerPort: 80
    resources: {}
    readinessProbe:
      httpGet:
        path: /
        port: 80
      initialDelaySeconds: 5
      periodSeconds: 5
    livenessProbe:
      httpGet:
        path: /
        port: 80
      initialDelaySeconds: 5
      periodSeconds: 5
      failureThreshold: 3
  dnsPolicy: ClusterFirst
  restartPolicy: Never
status: {}
```
