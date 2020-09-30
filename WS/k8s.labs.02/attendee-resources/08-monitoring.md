### 08. Monitoring

```
 
Learn how to collect and display metrics with Prometheus and Grafana
In this workshop we will set up Prometheus to scrape metrics from a number of endpoints 
in the sock shop.

We will then deploy Grafana to consume those metrics and generate dashboards.

step 1 - create a monitoring namespace
----------------------------------------------
The first thing we need to do is create a namespace for Prometheus and Grafana to live in

$ kubectl apply -f attendee-resources/workshop-08/monitoring-ns.yaml


step 2 - deploy Prometheus
----------------------------------------------
We can now deploy Prometheus into our monitoring namespace.

If RBAC is enabled on your cluster, Prometheus will require extra permissions to scrape 
metrics via the API Server. We therefore need to create a ClusterRole and ClusterRoleBinding. 
In order to create these, you must first create a binding granting your current 
Google identity all the permissions you want to create. The reason for this is 
explained in the Kubernetes docs here. This issue specifically on GKE is explained in more detail here.

A quick way to work around this is to grant your current Google identity the 
cluster-admin Role - run the following to set this up if you didn’t do it earlier.

$ kubectl create clusterrolebinding cluster-admin-binding --clusterrole \ 
  cluster-admin --user $(gcloud config get-value account)

We can now create the necessary permissions and workloads.

$ kubectl apply -f attendee-resources/workshop-08/prometheus-pvc.yaml
$ kubectl apply -f attendee-resources/workshop-08/prometheus-permissions.yaml
$ kubectl apply -f attendee-resources/workshop-08/prometheus.yaml
$ kubectl apply -f attendee-resources/workshop-08/node-directory-size-metrics-ds.yaml
$ kubectl apply -f attendee-resources/workshop-08/kube-state-metrics-dep.yaml

This will also deploy the node-directory-size-metrics daemonset and the
kube-state-metrics deployment to export extra metrics for Prometheus to scrape.

step 3 - access Prometheus
---------------------------------
To see what we have created, retrieve the name of the running Prometheus pod.

$ kubectl get pods -n monitoring
Replace the name of your pod in the following command.

$ kubectl port-forward -n monitoring prometheus-2303744757-9h5f4 9090
Navigate to http://localhost:9090 to view the Prometheus landing page.

To view the endpoints Prometheus has been configured to scrape,
click Status in the navigation bar and then click Targets. The state of these endpoints 
should all be up.

Prometheus has its own query language (PromQL) that can be used to inspect the collected metrics. 
We will quickly test out PromQL now.

Navigate back to the Graph page, enter instance_uptime in the expression bar and click 
Execute to view some of the metrics collected by Prometheus. You should see a list of 
results for some of the sock-shop services. Why isn’t every service in the sock-shop showing
up in this list?

If you are interested in the exact configuration of this job, take a look at the
prometheus-config configmap in attendee-resources/workshop-08/prometheus.yaml.

Feel free to play around with some more Prometheus queries on this page. 
More examples of Prometheus queries can be found here.

step 4 - deploy Grafana
---------------------------------
Prometheus is excellent at collecting and storing metrics. Grafana is
excellent at consuming and displaying these metrics.

We will now deploy Grafana.

$ kubectl apply -f attendee-resources/workshop-08/grafana-pvc.yaml
$ kubectl apply -f attendee-resources/workshop-08/grafana.yaml

step 5 - access Grafana
---------------------------------
To see what we have created, retrieve the name of the running Grafana pod.

$ kubectl get pods -n monitoring
Replace the name of your pod in the following command.

$ kubectl port-forward -n monitoring grafana-2018528311-hsmgq 3000
Login with username admin, password admin to http://localhost:3000 to 
view the Grafana landing page. Use the navigation buttons in the top left-hand corner to browse 
through your dashboards.

step 6 - import a Prometheus dashboard
----------------------------------------
The Grafana website has a number of official and community made dashboards.

As a final step we will import a Prometheus dashboard so we can monitor our monitoring tool:

Go to https://grafana.com/dashboards and search for ‘prometheus stats’
Click on one of the resulting dashboards and copy the ID, which can be found 
in the ‘Get this dashboard’ section e.g. Number 2
Go to your Grafana instance, click the Grafana logo in the top left-hand corner, 
hover over Dashboards and click Import

Paste your ID (e.g. ‘2’) into the ‘Grafana.com Dashboard’ field and click anywhere outside of that field

Make sure your Prometheus data source is selected and click import (http://prometheus:9090,
type proxy rather than direct)
