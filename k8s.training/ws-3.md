```
Section 1: Introduction
            1. Introduction to Kubernetes Microservices course

Section 2: Welcome to Kubernetes
            2. Introducing Kubernetes
            3. Hands-on Project

Section 3: Installing Minikube for local Kubernetes Development

Section 4: (optional) Docker Quickstart
            8. Docker Overview
            9. Docker Containers vs Images
            10. Running Containers from DockerHub

Section 5: Kubernetes Pods
            11. Pods Overview
            12. Writing a Pod
            13. Running a Pod

Section 6: Services in Kubernetes
            14. Services
            15. NodePort and ClusterIP
            16. Pod Selection with Labels

Section 7: Exercise: Deploy ActiveMQ as a Pod and Service to Kubernetes
            17. Exercise: Deploy ActiveMQ as a Pod and Service

Section 8: Kubernetes ReplicaSets
            18. ReplicaSets
            19. Writing a ReplicaSet
            20. Applying a ReplicaSet to Kubernetes

Section 9: Kubernetes Deployments
            21. Deployments Overview
            22. Managing Rollouts

Section 10: Networking and Service Discovery
            23. Networking Overview in Kubernetes
            24. Namespaces - kube-system
            25. Accessing MySQL from a Pod
            26. Cygwin extra - fixing the terminal with winpty
            27. Service Discovery
            28. Fully Qualified Domain Names (FQDN)

Section 11: Microservice Architectures
            29. WARNING - possible resource problems!
            30. An Introduction to Microservices
            31. Introduction to Microservices Part 2
            32. Fleetman Microservices - setting the scene
            33. Deploying the Queue
            34. Deploying the Position Simulator
            35. Inspecting Pod Logs
            36. Deploying the Position Tracker
            37. Deploying the API Gateway
            38. Deploying the Webapp

Section 12: Kubernetes Persistence and Volumes
            39. Persistence
            40. Upgrading to a Mongo Pod
            41. Mongo Service
            42. Expanding the Minikube VM
            43. Volume Mounts
            44. Volumes
            45. PersistentVolumeClaims
            46. StorageClasses and Binding


Section 13: Running Kubernetes on the AWS Cloud
            47. Warning
            48. Getting started with AWS
            49. Introducing Kops - Kubernetes Operations
            50. Installing the Kops Environment
            51. Warning - EC2 Instance types across regions
            52. Configuring your first cluster
            53. Running the Cluster
            54. Provisioning SSD drives with a StorageClass
            55. Warning - problems with AWS LoadBalancers
            56. Deploying the Fleetman Workload to Kubernetes
            57. Setting up a real Domain Name
            58. Surviving Node Failure
            59. Replicating Pods in Kubernetes

Section 14: Deleting the Cluster
            60. Deleting the Cluster
            61. Restarting the Cluster

Section 15: Extra - how to run Kubernetes in Google Cloud
            62. How to deploy to Google Cloud Platform

Section 16: Logging a Kubernetes Cluster
            63. Introducing the ELK / ElasticStack
            64. Installing the Stack to Kubernetes
            65. Kibana - first look
            66. Setting Filters and Refreshes
            67. Demo: analysing a system failure
            68. Kibana Dashboards

Section 17: Monitoring a Kubernetes Cluster with Prometheus and Grafana


            69. Monitoring a Cluster
            70. Helm Package Manager
            71. Errata - steps needed to get a full set of data from Prometheus
            72. If you get an error when using "helm install"
            73. Installing Prometheus Operator
            74. Working with Grafana

Section 18: The Alert Manager

            75. Alerting
            76. Setting up a Slack Channel
            77. Configuring the AlertManager
            78. Errata - different secret name
            79. Applying the config with a Secret
            80. Dealing with Alerts
            81. What happens if the Master Node crashes?
            82. Case Study: Troubleshooting a "Delinquent" node


Section 19: Going Further with Kubernetes
             83. Course Update 2019: Introduction to the "Advanced Section"
             84. Code / files for this section
 
Section 20: Kubernetes Requests and Limits
            85. Memory requests
            86. CPU Requests
            87. Memory and CPU Limits
 
Section 21: Metrics Profiling in Kubernetes

            88. Enabling the Metrics Server
            89. Viewing Metrics on the Dashboard
            90. Tuning Java Spring Boot Applications, Heap restriction
            91. Setting reasonable Requests
 
Section 22: Horizontal Pod Autoscaling

            92. Update: you will need to modify the yaml file in the next video
            93. Introducing Replication and Autoscaling
            94. Testing Autoscaling

Section 23: Readiness and Liveness Probes
            95. Demo: why readiness probes are needed
            96. Applying Liveness and Readiness Probes

Section 24: Quality of Service and Eviction
            97. Understanding the scheduler
            98. QoS labels
            99. Evictions
            100. Pod Priorities

Section 25: RBAC (Role Based Access Control) on a Kubernetes cluster
            101. Defining Roles
            102. Defining RoleBindings
            103. Setting up a "context" for the user
            104. Issuing a Kubernetes signed X.509 certificate
            105. Installing the user's certificate
            106. Allocating Access to Users
            107. ClusterRoles and ClusterRoleBindings


Section 26: Kubernetes ConfigMaps and Secrets
            108. Creating a ConfigMap
            109. Consuming a ConfigMap as Environment Variables
            110. Do changes to a ConfigMap get propagated?
            111. How to consume multiple envioronments variables with envFrom
            112. Mounting ConfigMaps as Volumes
            113. Creating Secrets
            114. Using Secrets
            115. Where have we already used ConfigMaps and Secrets?
            116. (extra) Using Spring Cloud Kubernetes to Hot Reload ConfigMaps

Section 27: Ingress Controllers
            117. Introducing Ingress
            118. Defining Routing Rules
            119. Adding Routes
            120. Authentication
            121. Running Ingress on AWS
            122. Tesing the Ingress Rules
            123. (Extra) setting up HTTPS with TLS termination at the load balancer

Section 28: Other Workload Types
            124. Batch Jobs
            125. Cron Jobs
            126. DaemonSets
            127. StatefulSets Overview
            128. StatefulSets for Database Replication
            129. Demo: Scaling out a Mongo Database


Section 29: Continuous Deployment on a Kubernetes Cluster
            130. Introducing CI/CD
            131. Establishing a GitHub organization
            132. Setting up a Basic Jenkins System
            133. Defining a Pipeline
            134. Running a Multibranch Pipeline
            135. Reviewing Builds
            136. Organization Pipelines
            137. Continuous Deployment into a Cluster
