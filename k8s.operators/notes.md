[k8s CRDS - Operators](https://operatorhub.io/)

- Operators are automated software managers that manage the entire lifecycle of Kubernetes applications
- value of Operators
      - embed best practices from experts you - into operator
      - minimize software upgrade risk and associated operational costs
      - provide cloud like "as a serice" experience 
      - improve the time to value for your customers
      
  - Operator Hub 
                - Allows administrators to selectively make operators available from 
                  curated sources to users in the cluster
                - Easy Self service of operator backed services 
                - types of operators
                    - RH
                    - ISV
                    - Community
 

- Extending k8s api
  - Application-specific custom controllers
  - Custom resource definitions (CRD)
 
 - Running a stateful database over time is harder
    - resize/upgrade
    - reconfigure
    - backup
    - healing
 
 
 - Any application in any system must be 
    - installed, 
    - configured
    - managed 
    - upgraded over time

- Patching is critical to security

- Operator maturity model
      - basic install
          - Automated application porvisioning and config management
      - seamless upgrades
          - patch minor version upgrades supported
      - Full Lifecycle
          - App lifecycle,storage lifecycle(backup,failure recovery)
      - Deep Insights
          - Metrics, 
          - Alerts,
          - Log processing 
          - workload analysis
      - Auto Pilot
          - HPA/VPA
          - auto config tuning
          - abnormal detection
          - scheduling tuning
 
  Custom operator bundle v1.23 -> Operator lifecycle manager 
 
 - custom operator bundle
      - operator deployment  
      - custome resource
      - definitions
      - RBAC
      - API dependencies
      - Update path
      - Metadata
 
 - Operator lifecycle manager
      - deployment
      - Role
      - ClusterRole
      - RoleBinding
      - ClusterRoleBinding
      - Service account
      - CRDs
 


