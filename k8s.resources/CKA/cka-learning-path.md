
CKA Labs (1) — The Certified k8s Administrator learning Path
<details><summary>show</summary>
<p>
             - Intro 
             - Discuss about CKA exam format
             - bootcamp learning path
             - Modern learning experience
</p>
</details>

CKA Labs (2) — k8s Labs Preparation
<details><summary>show</summary>
<p>

For the Certified k8s Administrator Labs Challenge, 
I have decided to use the  github/online k8s Playground. 
This way, I do not need to install any k8s cluster before starting 
the labs. 
</p>
</details>


CKA Labs (3) — Deploy a simple k8s Application
<details><summary>show</summary>
<p>

In this lab , we will deploy a simple application by file and by CLI. 
Then we will expose and access the service from within the k8s Cluster. 
After that, we will explore how k8s Deployments helps us maintain the 
service by automatically restarting failed PODS through ReplicaSets. 
we will discuss how to access the service from outside the k8s cluster.
</p>
</details>

CKA Labs (4) — k8s Resource Management
<details><summary>show</summary>
<p>

This lab is concentrating on k8s Resource Management. We will explore 
Limit Ranges applied to each container as well as Resource Quotas that 
limit the allowed sum resources of a namespace.

</p>
</details>

CKA Labs (5) — k8s Node Maintenance
<details><summary>show</summary>
<p>
In this  lab we will explore how to manage maintenance modes of nodes in a 
k8s cluster.For that, we will deploy a complex example, before we drain 
the node.
</p>
</details>

CKA Labs (6) — k8s API
<details><summary>show</summary>
<p>
In this lab, we will explore the k8s API. We will read and create PODs 
before we explore the API resources.

</p>
</details>

CKA Labs (7) — k8s Jobs and CronJobs
<details><summary>show</summary>
<p>

In this lab, we will explore k8s Jobs and CronJobs. Unlike k8s Deployments, 
k8s Jobs are designed to quit after they have accomplished the task 
(successful or not).k8s CronJobs are the jobs that are repeated according 
to a schedule pattern Linux administrators know from crontab.
</p>
</details>


CKA Labs (8) — k8s ReplicaSets
<details><summary>show</summary>
<p>
In this lab, we will have a closer look at k8s Replicasets. 
First, we will learn how ReplicaSets control, how many POD replicas are 
up and running at any time. We will learn, how ReplicaSets and PODs are 
connected: via labels. We will show that manually creating PODs with matching 
labels can have weird cuckoo’s eggs effects. Moreover, a POD can be detached 
from a ReplicaSet without stopping it by manipulating its label.
</p>
</details>

CKA Labs (9) — k8s Deployments
<details><summary>show</summary>
<p>

In this lab, we will have a closer look to Deployments, how they 
relate to ReplicaSets of the last post, and which features in terms of the 
rollout/rollback they offer to the k8s administrator.

</p>
</details>

CKA Labs (10) — k8s DaemonSets
<details><summary>show</summary>
<p>

we have created a k8s DaemonSet. 
We have observed that and POD template changes are not propagated to 
existing PODs if we choose the OnDelete update strategy. However, 
if we choose the RollingUpdate strategy, POD renewal is triggered with 
any update of the DaemonSet’s POD template.
</p>
</details>


CKA Labs (11) — k8s Services
<details><summary>show</summary>
<p>

k8s Services provide us with a means to load-balance 
between many instances of an application running on a data center. 
Moreover, they help make accessible the service from the Internet. 
Here, we will show, how PODs, endpoints, container-ports, and 
node ports are bound together by means of k8s Services.
</p>
</details>


CKA Labs (12): k8s Labels and Node Selectors
<details><summary>show</summary>
<p>

Tutorial with a hands-on lab on k8s Labels and Node Selectors, 
which are used to control, which PODs are scheduled on which set 
of k8s Nodes.
</p>
</details>


CKA Labs (13): k8s Taints and Tolerations
<details><summary>show</summary>
<p>

we will get hands-on experience on k8s taints and tolerations. 
Taints are used to repel PODs from running on a certain set of 
nodes,while tolerations in the POD’s specification allows the
POD to ignore the corresponding matching taint.
</p>
</details>


CKA Labs (14): k8s Affinity and Anti-Affinity
<details><summary>show</summary>
<p>

How to get hands-on experience with k8s affinity and anti-affinity 
for both,node affinity as well as POD affinity for „soft“ and „hard“ rules.
</p>
</details>



CKA Labs (15): k8s Ingress
<details><summary>show</summary>
<p>
We use Nginx-based k8s Ingress Controllers to make k8s Services available 
to the outside world. In our example, three separate applications share the
same IP address and port. We show, how to retrieve the NginX configuration from the 
Ingress Controller. Moreover, we show how to install a newer NginX version 
provided by Nginx INC.
</p>
</details>



CKA Labs (16): k8s Persistent Volumes
<details><summary>show</summary>
<p>

In this session, we will create k8s Persistent Volumes, 
change access modes, and add k8s Persistent Volume Claims. 
Moreover, we will gain some understanding of k8s Storage Objects.

</p>
</details>

CKA Labs (17): k8s Readiness and Liveness Probes
<details><summary>show</summary>
<p>

In this lab,  we will learn how k8s Liveness Probes and k8s 
Readiness Probes help us improve the continuity and availability 
of k8s Services. 
                 
</p>
</details>
                 
CKA Labs (18): k8s Metrics Server for CPU and Memory Monitoring
<details><summary>show</summary>
<p>
Install and explore the k8s Metrics Server in a hands-on lab. 
View the CPU and Memory consumption of cluster nodes, applications, 
and containers.
</p>
</details>

CKA Labs (19): k8s Logging
<details><summary>show</summary>
<p>

In this labs, we will have a look at k8s logging.
We will look, how k8s logging is related to Docker logging.

</p>
</details>
                 
            
