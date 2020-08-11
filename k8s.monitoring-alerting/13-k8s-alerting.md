
## Best practices for alerting on Kubernetes
```

- Best practices for alerting on Kubernetes platform and orchestration, including PromQL alerts .

- Using  K8s  increase the number of pieces moving around in your system.
- Having container native monitoring and alerting for Kubernetes is a key element for having 
  a reliable infrastructure.
- Kubernetes alerting strategy cannot just focus on the infrastructure layer, 
  but needs to understand the entire stack from the hosts and Kubernetes nodes
  at the bottom up to the top, where the application workloads and its metrics are. 
  Being able to leverage Kubernetes and cloud providers metadata to aggregate,segment metrics and
  alerts will be a requirement for effective alerting across all layers.

- Effective alerting is at the bedrock of a monitoring strategy. 
- With the shift to orchestrated container environments and Kubernetes, 
  your alerting strategy will need to evolve as well.

- Monitoring Kubernetes, both the infrastructure platform and the running container workloads, 
- Traditional monitoring tools and processes aren’t adequate, as they do not provide 
  visibility into dynamic container environments.

- k8s is designed to manage service-oriented applications using containers distributed across clusters of hosts. 
- k8s provides mechanisms for application deployment, scheduling, updating, service discovery and scaling
- dramatically simplify the act of deploying your application in containers – and across clouds


Challenges in K8s alerting :

        - New infrastructure layers:
              - Between your services and the host, now you have a new layer: 
                the containers and the container orchestrator. 
              - These are new internal services that you need to monitor, and 
                your alerting system needs to be aware of them.

        - Microservices architecture: 
              - Containers are not coupled with nodes like services were before, so traditional monitoring 
                doesn’t work effectively. 
              - There is  no static number of service instances running (think of a canary deployment or 
                auto-scaling setup). 
              - It’s fine that a process is  being killed in one node because, chances are, 
                it is being rescheduled somewhere else in your infrastructure.

        - New scale and aggregation requirements: 
              - With services spread across multiple containers, monitoring system level and 
                service specific metrics for all of those, 
              - plus all of the new services  that Kubernetes brings in, can your monitoring and alerting 
                system ingest all of these metrics at a large scale? 
              - You also need to look at the metrics from different perspectives.
              - If we automatically tag metrics with the different labels existing in Kubernetes and
              - our monitoring system understands Kubernetes metadata, we can aggregate or segment 
                metrics as required in each situation.
       
        - Lack of visibility: 
               - Containers are black boxes. 
               - Traditional tools can only check against public monitoring endpoints.
               - If you want to deeply monitor the  service in question, you need to be able 
                 to look at what’s happening inside the containers.

- Best practices alerting on Kubernetes environments. Our Kubernetes alerts tutorial will cover the following:

- General alerting on Kubernetes basics
          - basic rules that we want to follow when we’re alerting in order to improve the efficiency and
            mental health of your on-call rotation.
              - Alerts should be based on symptoms.
                    - If an unexpected value in a metric doesn’t have any appreciable impact, 
                      it shouldn’t be an alert. 
              - Alerts should be actionable. 
                    - Triggering an alert with nothing to do about it will only generate frustration.
             - There are several methodologies like Golden Signals that allow a 
               standardization of the way you alert,  making the dashboards and 
               alerts much easier to understand.



- General alerting basics
          - Alerting on the host (Baremetal, VM, Cloud Instances)
              -  It’s going to be mostly about if the host is up or down/unreachable, and 
                 resources availability (CPU, memory, disk, etc.).
                    - Host is down or unreachable
                    - load: load.average.1m, load.average.5m and load.average.15m
                    - CPU: cpu.used.percent
                    - Memory: memory.used.percent or memory.bytes.used
                    - Disk Usage 
                    - swap: memory.swap.used.percent or memory.swap.bytes.used

          - Alerting on the Kubernetes Control Plane infrastructure
                -  Kubernetes etcd running?
                       -  etcd has insufficient peers
                - Is the Kubernetes API server running?
                -  Is the latency of kubelet too high for the start of the pods?
                - Do we have enough Kubernetes nodes in our cluster?

          - Alerting on services running on Kubernetes
                - Do we have enough pods/containers running for each application?
                    - Ex: wordpress low replicas running 
                - Do we have any pod/containers for a given application?
                    - Ex: wordpress no replicas running
                - Is there any pod/container in a restart loop?
                    - Podrestart count CrashLoopBackoff

          - Alerting on application layer metrics
                 - Some metrics and their alerts often found in this category are:
                       - Application availability up/down
                       - Application response time or latency
                           - The following example is a public REST API endpoint monitoring alert for 
                             latency over 10 seconds in a 10 minute window, over the java app deployment
                             in the production namespace prod, using Prometheus custom metrics.
                            ex: PromQL query: 
                                histogram_quantile(0.95,sum(rate(http_request_duration_seconds_bucket
                                {code=~"20+",kubernetes_namespace="prod",app="javaapp"}[5m])) by (le)) > 10

                       - Application error requests rate
                       - Application requests rate
                       - Middleware specific metrics: Python uwsgi workers, JVM heap size, etc.
                       - Database specific metrics: cache hits, indexes, etc
 

```
