### 07. Logging & Monitoring


```
Know what is happening in your cluster
In this workshop we will see what is happening in a cluster by using the Dashboard to see 
resources visually in a web-based UI, examine logs at the shell and see Stackdriver integration with GKE.

step 1 - proxy to the API and access the dashboard
-----------------------------------------------------------
You can set-up a local proxy to the GKE API server using kubectl proxy. The default port
is 8001 but it can be overridden (--port).

$ kubectl proxy &
kubectl cluster-info will show the addresses of the master and cluster services. 
The dashboard is a cluster service.

$ kubectl cluster-info

Kubernetes master is running at https://xxx.xxx.xxx.xxx
...
kubernetes-dashboard is running at 
https://xxx.xxx.xxx.xxx/api/v1/proxy/namespaces/kube-system/services/kubernetes-dashboard
With a proxy, we can use the localhost address instead (and not worry about certificates in the browser) -
http://localhost:8001/api/v1/proxy/namespaces/kube-system/services/kubernetes-dashboard.

step 2 - use kubectl to view pod logs
----------------------------------------
To simply view the logs (i.e. stdout, stderr) of a pod, use kubectl logs. It will be streamed from
the Kubelet on the node that the pod resides (from Docker). For example, to tail the catalogue
logs (replace the pod name with the name of the pod in your cluster):

$ kubectl logs -n sock-shop catalogue-3179692907-64624 -f
step 3 - play with Stackdriver
By default, a GKE cluster ships with support for Stackdriver.

Use the Cloud Console to play with Stackdriver.
```
