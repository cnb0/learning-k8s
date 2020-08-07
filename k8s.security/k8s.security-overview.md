
Section 1: Introduction to Kubernetes

Chapter 1: Kubernetes Architecture
                    The rise of Docker and the trend of microservices
                                Kubernetes adoption status
                                Kubernetes clusters
                    Kubernetes components
                                The Kubernetes interfaces
                    Kubernetes objects
                                Pods
                                Deployments
                                Services
                                Replica sets
                                Volumes
                                Namespaces
                                Service accounts
                                Network policies
                                Pod security policies
                    Kubernetes variations
                                Minikube
                                K3s
                                OpenShift
                    Kubernetes and cloud providers
                                Kubernetes as a service
                                Kops
                                Why worry about Kubernetes' security?
                    
Chapter 2: Kubernetes Networking
                    Overview of the Kubernetes network model
                                Port-sharing problems
                                Kubernetes network model
                    Communicating inside a pod
                                Linux namespaces and the pause container
                                Beyond network communication
                    Communicating between pods
                                The Kubernetes service
                                kube-proxy
                    Introducing the Kubernetes service
                                Service discovery
                                Service types
                                Ingress for routing external requests
                    Introducing the CNI and CNI plugins
                                CNI specification and plugins
                                Calico

Chapter 3: Threat Modeling
                    Introduction to threat modeling
                    Component interactions
                    Threat actors in Kubernetes environments
                    Threats in Kubernetes clusters
                    Threat modeling application in Kubernetes


Chapter 4: Applying the Principle of Least Privilege in Kubernetes
                    The principle of least privilege
                                Authorization model
                                Rewards of the principle of least privilege
                    Least privilege of Kubernetes subjects
                                Introduction to RBAC
                                Service accounts, users, and groups
                                Role
                                RoleBinding
                                Kubernetes namespaces
                    Wrapping up least privilege for Kubernetes subjects
                                Least privilege for Kubernetes workloads
                                Least privilege for accessing system resources
                                Wrapping up least privilege for accessing system resources
                                Least privilege for accessing network resources
                                Least privilege for accessing application resources

Chapter 5: Configuring Kubernetes Security Boundaries
                    Introduction to security boundaries
                    Security boundaries versus trust boundaries
                    Kubernetes security domains
                    Kubernetes entities as security boundaries
                    Security boundaries in the system layer
                                Linux namespaces as security boundaries
                                Linux capabilities as security boundaries
                                Wrapping up security boundaries in the system layer
                    Security boundaries in the network layer
                                Network policies

Section 2: Securing Kubernetes Deployments and Clusters

Chapter 6: Securing Cluster Components
                    Securing kube-apiserver
                    Securing kubelet
                    Securing etcd
                    Securing kube-scheduler
                    Securing kube-controller-manager
                    Securing CoreDNS
                    Benchmarking a cluster's security configuration

Chapter 7: Authentication, Authorization, and Admission Control
                    Requesting a workflow in Kubernetes
                    Kubernetes authentication
                                Client certificates
                                Static tokens
                                Basic authentication
                                Bootstrap tokens
                                Service account tokens
                                Webhook tokens
                                Authentication proxy
                                User impersonation
                    Kubernetes authorization
                                Request attributes
                                Authorization modes
                                Node
                                ABAC
                                RBAC
                                Webhooks
                    Admission controllers
                                AlwaysPullImages
                                EventRateLimit
                                LimitRanger
                                NodeRestriction
                                PersistentVolumeClaimResize
                                PodSecurityPolicy
                                SecurityContextDeny
                                ServiceAccount
                    MutatingAdmissionWebhook and ValidatingAdmissionWebhook
                    Introduction to OPA

Chapter 8: Securing Kubernetes Pods
                    Hardening container images
                    Container images and Dockerfiles
                    CIS Docker benchmarks
                    Configuring the security attributes of pods
                    Setting host-level namespaces for pods
                    Security context for containers
                    Security context for pods
                    AppArmor profiles
                    The power of PodSecurityPolicy
                    Understanding PodSecurityPolicy
                    Kubernetes PodSecurityPolicy Advisor


Chapter 9: Image Scanning in DevOps Pipelines
                    Introducing container images and vulnerabilities
                                Container images
                                Detecting known vulnerabilities
                    Scanning images with Anchore Engine
                                Introduction to Anchore Engine
                                Scanning images with anchore-cli
                    Integrating image scanning into the CI/CD pipeline
                                Scanning at the build stage
                                Scanning at the deployment stage
                                Scanning at the runtime stage

Chapter 10: Real-Time Monitoring and Resource Management of a Kubernetes Cluster
                    Real-time monitoring and management in monolith environments
                    Managing resources in Kubernetes
                    Resource requests and limits
                    Namespace resource quotas
                    LimitRanger
                    Monitoring resources in Kubernetes
                    Built-in monitors
                    Third-party monitoring tools
                    Prometheus and Grafana

Chapter 11: Defense in Depth
                    Introducing Kubernetes auditing
                            Kubernetes audit policy
                            Configuring the audit backend
                    Enabling high availability in a Kubernetes cluster
                            Enabling high availability of Kubernetes workloads
                            Enabling high availability of Kubernetes components
                            Enabling high availability of a cloud infrastructure
                    Managing secrets with Vault
                            Setting up Vault
                            Provisioning and rotating secrets
                    Detecting anomalies with Falco
                            An overview of Falco
                            Creating Falco rules to detect anomalies
                    Conducting forensics with Sysdig Inspect and CRIU
                            Using CRIU to collect data
                            Using Sysdig and Sysdig Inspect

Section 3: Learning from Mistakes and Pitfalls

Chapter 12: Analyzing and Detecting Crypto-Mining Attacks
                    Analyzing crypto-mining attacks
                            An introduction to crypto-mining attacks
                            The crypto-mining attack on Tesla's Kubernetes cluster
                            Graboid – a crypto-worm attack
                    Detecting crypto-mining attacks
                            Monitoring CPU utilization
                            Detecting network traffic to a mining pool
                            Detecting launched crypto-mining processes
                            Checking the binary signature
                    Defending against attacks
                            Securing Kubernetes cluster provisioning
                            Securing the build
                            Securing deployment
                            Securing runtime

Chapter 13: Learning from Kubernetes CVEs
                    The path traversal issue in kubectl cp – CVE-2019-11246
                            Mitigation strategy
                    DoS issues in JSON parsing – CVE-2019-1002100
                            Mitigation strategy
                    A DoS issue in YAML parsing – CVE-2019-11253
                            Mitigation strategy
                    The Privilege escalation issue in role parsing – CVE-2019-11247
                            Mitigation strategy
                    Scanning for known vulnerabilities using kube-hunter