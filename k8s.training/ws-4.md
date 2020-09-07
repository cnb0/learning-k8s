```
- Packaging applications with Kustomize and Helm
                Deploying a microservices app with YAML manifests
                Kustomize and Helm concepts; when to use which?
                Writing and applying Kustomize overlays
                Installing charts with Helm
                Helm 2, Helm 3, and the Helm Hub
                Writing a basic Helm chart for the whole app
                Writing advanced Helm charts for app components
                Helm internals

- Capacity management and Kubernetes operators
                Setting compute resource limits
                Manage cluster allocation and quotas
                What happens when the cluster is at, or over, capacity
                The core metrics pipeline
                Extending the Kubernetes API
                Operators

- Security focus
                Isolating workloads with Network Policies
                Authentication with tokens and certificates
                Authorization with RBAC (role-based access control)
                Working with Service Accounts, Roles, Role Bindings
                Preventing privilege escalations with Pod Security Policy
                User management with OIDC, certificates, the CSR API

- Application configuration and stateful apps
                Configuring applications with ConfigMaps and Secrets
                Using the downward API to expose information
                Deploying apps with Stateful Sets (use case: Consul)
                The difference between volumes and Persistent Volumes
                Understanding Persistent Volume Claims and Storage Classes
                Local persistent volumes vs highly available persistent volumes
                Example: deploying a database that can withstand node outages
