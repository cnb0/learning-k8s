
## K8s Security

Kubernetes has fundamentally changed the way DevOps teams create, manage, and operate container-based applications, but as with any production process, you can never provide enough security. 


Developers will learn how to build container images with security in mind, and ops folks will pick up techniques for configuring and operating a Kubernetes cluster more securely.

- Explore security concepts including defense in depth, least privilege, and limiting the attack surface
- Safeguard clusters by securing worker nodes and control plane components, such as the API server and the etcd key value store
- Learn how Kubernetes uses authentication and authorization to grant fine-grained access
- Secure container images against known vulnerabilities and abuse by third parties
- Examine security boundaries and policy enforcement features for running containers securely
- Learn about the options for handling secret information such as credentials
- Delve into advanced topics such as monitoring, alerting, and auditing, as well as sandboxing and runtime protection


```


1. Approaching Kubernetes Security
                    Security Principles
                        Defense in Depth
                        Least Privilege
                        Limiting the Attack Surface


2. Securing the Cluster
                    API Server
                    Kubelet
                        Kubelet Certificate Rotation
                    Running etcd Safely
                    Kubernetes Dashboard
                    Validating the Configuration
                        CIS Security Benchmark
                        Penetration Testing


3. Authentication
                    Identity
                    Authentication Concepts
                    Authentication Strategies
                    Tooling and Good Practices

4. Authorization
                    Authorization Concepts
                    Authorization Modes
                    Access Control with RBAC
                    Tooling and Good Practices


5. Securing Your Container Images
                    Scanning Container Images
                    Patching Container Images
                    CI/CD Best Practices
                    Image Storage
                    Correct Image Versions
                        Running the Correct Version of Container Images
                    Image Trust and Supply Chain
                    Minimizing Images to Reduce the Attack Surface


6. Running Containers Securely
                    Say No to Root
                    Admission Control
                    Security Boundaries
                    Policies
                            Security Context and Policies
                            Network Policies
                            Example Network Policy
                            Effective Network Policies
7. Secrets Management
                    Applying the Principle of Least Privilege
                    Secret Encryption
                    Kubernetes Secret Storage
                            Storing Secrets in etcd
                            Storing Secrets in Third-Party Stores
                    Passing Secrets into Containerized Code
                            Don’t Build Secrets into Images
                            Passing Secrets as Environment Variables
                            Passing Secrets in Files
                    Secret Rotation and Revocation
                    Secret Access from Within the Container
                    Secret Access from a Kubelet

8. Advanced Topics
                    Monitoring, Alerting, and Auditing
                    Host Security
                            Host Operating System
                            Node Recycling
                    Sandboxing and Runtime Protection
                    Multitenancy
                    Dynamic Admission Control
                    Network Protection
                            Service Meshes
                    Static Analysis of YAML
                    Fork Bombs and Resource-Based Attacks
                    Cryptocurrency Mining
                    Kubernetes Security Updates