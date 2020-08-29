

## Container security

- To facilitate scalability and resilience, many organizations now run applications in cloud native environments using containers and orchestration. 
- how do you know if the deployment is secure? 
- examines key underlying technologies to help developers, operators, and security professionals assess security risks and determine appropriate solutions.

- Explore attack vectors that affect container deployments
- Dive into the Linux constructs that underpin containers
- Examine measures for hardening containers
- Understand how misconfigurations can compromise container isolation
- Learn best practices for building container images
- Identify container images that have known software vulnerabilities
- Leverage secure connections between containers
- Use security tooling to prevent attacks on your deployment


```

1. Container Security Threats
                Risks, Threats, and Mitigations
                Container Threat Model
                Security Boundaries
                Multitenancy
                        Shared Machines
                        Virtualization
                        Container Multitenancy
                        Container Instances
                Security Principles
                        Least Privilege
                        Defense in Depth
                        Reducing the Attack Surface
                        Limiting the Blast Radius
                        Segregation of Duties
                        Applying Security Principles with Containers

2. Linux System Calls, Permissions, and Capabilities
                System Calls
                File Permissions
                        setuid and setgid
                Linux Capabilities
                Privilege Escalation

3. Control Groups
                Cgroup Hierarchies
                Creating Cgroups
                Setting Resource Limits
                Assigning a Process to a Cgroup
                Docker Using Cgroups
                Cgroups V2

4. Container Isolation
                Linux Namespaces
                Isolating the Hostname
                Isolating Process IDs
                Changing the Root Directory
                Combine Namespacing and Changing the Root
                Mount Namespace
                Network Namespace
                User Namespace
                        User Namespace Restrictions in Docker
                Inter-process Communications Namespace
                Cgroup Namespace
                Container Processes from the Host Perspective
                Container Host Machines

5. Virtual Machines
                Booting Up a Machine
                Enter the VMM
                        Type 1 VMMs, or Hypervisors
                        Type 2 VMM
                        Kernel-Based Virtual Machines
                Trap-and-Emulate
                Handling Non-Virtualizable Instructions
                Process Isolation and Security
                Disadvantages of Virtual Machines
                Container Isolation Compared to VM Isolation

6. Container Images
                Root Filesystem and Image Configuration
                Overriding Config at Runtime
                OCI Standards
                Image Configuration
                Building Images
                        The Dangers of docker build
                        Daemonless Builds
                        Image Layers
                Storing Images
                Identifying Images
                Image Security
                        Build-Time Security
                        Provenance of the Dockerfile
                        Dockerfile Best Practices for Security
                        Attacks on the Build Machine
                Image Storage Security
                        Running Your Own Registry
                        Signing Images
                Image Deployment Security
                        Deploying the Right Image
                        Malicious Deployment Definition
                        Admission Control
                GitOps and Deployment Security

7. Software Vulnerabilities in Images
                Vulnerability Research
                Vulnerabilities, Patches, and Distributions
                Application-Level Vulnerabilities
                Vulnerability Risk Management
                Vulnerability Scanning
                Installed Packages
                Container Image Scanning
                        Immutable Containers
                        Regular Scanning
                Scanning Tools
                        Sources of Information
                        Out-of-Date Sources
                        Won’t Fix Vulnerabilities
                        Subpackage Vulnerabilities
                        Package Name Differences
                        Additional Scanning Features
                        Scanner Errors
                Scanning in the CI/CD Pipeline
                Prevent Vulnerable Images from Running
                Zero-Day Vulnerabilities

8. Strengthening Container Isolation
                Seccomp
                AppArmor
                SELinux
                gVisor
                Kata Containers
                Firecracker
                Unikernels

9. Breaking Container Isolation
                Containers Run as Root by Default
                        Override the User ID
                        Root Requirement Inside Containers
                        Rootless Containers
                The --privileged Flag and Capabilities
                Mounting Sensitive Directories
                Mounting the Docker Socket
                Sharing Namespaces Between a Container and Its Host
                Sidecar Containers

10. Container Network Security
                Container Firewalls
                OSI Networking Model
                Sending an IP Packet
                IP Addresses for Containers
                Network Isolation
                Layer 3/4 Routing and Rules
                        iptables
                        IPVS
                Network Policies
                        Network Policy Solutions
                        Network Policy Best Practices
                Service Mesh

11. Securely Connecting Components with TLS
                Secure Connections
                X.509 Certificates
                    Public/Private Key Pairs
                    Certificate Authorities
                    Certificate Signing Requests
                TLS Connections
                Secure Connections Between Containers
                Certificate Revocation

12. Passing Secrets to Containers
                Secret Properties
                Getting Information into a Container
                        Storing the Secret in the Container Image
                        Passing the Secret Over the Network
                        Passing Secrets in Environment Variables
                        Passing Secrets Through Files
                Kubernetes Secrets
                Secrets Are Accessible by Root

13. Container Runtime Protection
                Container Image Profiles
                        Network Traffic Profiles
                        Executable Profiles
                        File Access Profiles
                        User ID Profiles
                        Other Runtime Profiles
                        Container Security Tools
                Drift Prevention

14. Containers and the OWASP Top 10
                Injection
                Broken Authentication
                Sensitive Data Exposure
                XML External Entities
                Broken Access Control
                Security Misconfiguration
                Cross-Site Scripting XSS
                Insecure Deserialization
                Using Components with Known Vulnerabilities
                Insufficient Logging and Monitoring