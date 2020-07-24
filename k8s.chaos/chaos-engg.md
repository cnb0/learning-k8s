```
- pod-kill: The selected pod is killed (ReplicaSet or something similar may be needed to ensure the pod will be restarted).
- pod-failure: The selected pod will be unavailable in a specified period of time.
- container-kill: The selected container is killed in the selected pod.
- netem chaos: Network chaos such as delay, duplication, etc.
- network-partition: Simulate network partition.
- IO chaos: Simulate file system faults such as I/O delay, read/write errors, etc.
- time chaos: The selected pod will be injected with clock skew.
- cpu-burn: Simulate the CPU of the selected pod stress.
- memory-burn: Simulate the memory of the selected pod stress.
- kernel chaos: The selected pod will be injected with (slab, bio, etc) errors.

 
1: Destroying Application Instances
           - Creating A Cluster
           - Deploying The Application
           - Discovering ChaosToolkit Kubernetes Plugin
           - Terminating Application Instances
           - Defining Steady State Hypothesis
           - Pausing After Actions
           - Probing Phases And Conditions
           - Making The Application Fault-Tolerant

 2: Experimenting With Application Availability
           - Creating A Cluster
           - Deploying The Application
           - Validating The Application
           - Validating Application Health
           - Validating Application Availability
           - Terminating Application Dependencies
           - Destroying What We Created

3: Obstructing And Destroying Network
           - Creating A Cluster
           - Installing Istio Service Mesh
           - Deploying The Application
           - Discovering ChaosToolkit Istio Plugin
           - Aborting Network Requests
           - Rolling Back Abort Failures
           - Making The Application Resilient To Partial Network Failures
           - Increasing Network Latency
           - Aborting All Requests
           - Simulating Denial Of Service Attacks
           - Running Denial Of Service Attacks
           - Destroying What We Created

 4: Draining And Deleting Nodes
            - Creating A Cluster
            - Deploying The Application
            - Draining Worker Nodes
            - Uncordoning Worker Nodes
            - Making Nodes Drainable
            - Deleting Worker Nodes
            - Destroying Cluster Zones

 5: Creating Chaos Experiment Reports
            - Creating A Cluster
            - Deploying The Application
            - Exploring Experiments Journal
            - Creating Experiment Report
            - Creating A Multi-Experiment Report

 6: Running Chaos Experiments Inside A Kubernetes Cluster
            - Creating A Cluster
            - Deploying The Application
            - Setting Up Chaos Toolkit In Kubernetes
            - Types Of Experiment Executions
            - Running One-Shot Experiments
            - Running Scheduled Experiments
            - Running Failed Scheduled Experiments
            - Sending Experiment Notifications
            - Sending Selective Notifications

 7: Executing Random Chaos
            - Creating A Cluster
            - Deploying The Application
            - Deploying Dashboard Applications
            - Exploring Grafana Dashboards
            - Exploring Kiali Dashboards
            - Preparing For Termination Of Instances
            - Terminating Random Application Instances
            - Disrupting Network Traffic
            - Preparing For Termination Of Nodes
            - Terminating Random Nodes
            - Monitoring And Alerting With Prometheus
```
