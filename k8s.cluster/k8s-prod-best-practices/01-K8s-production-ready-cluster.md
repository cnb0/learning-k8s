```
1. The cluster is reasonably secure
2. The cluster components are highly available enough for the user’s needs
3. All elements in the cluster are declaratively controlled
4. Changes to the cluster state can be safely applied (upgrades/rollbacks)
5. The cluster passes as many end-to-end tests as possible
6. HA Cluster :
    - Instances (>=1) of a component can fail without causing the cluster to fail
    - Machines (>=1) in the cluster can fail without causing the  cluster to fail
    - Remember to keep the CoreDNS replicas >= 1, and use Pod anti-afﬁnity
    - Some certiﬁcates need to be identical across control plane nodes
         - e.g. the ServiceAccount signing private key for the controller-manager
      	   Needs to be rotated for all instances at the same time
    - Monitoring the cluster components becomes increasingly more important  with a HA cluster 
      that is expected to have a high SLO
            You can for example use Prometheus and kube-state-metrics as a starting point
    - Do you need a HA cluster? Is it worth the added cost and complexity?

7. TLS -secured communication everywhere
      - Use mutual TLS for all communication
      - Certiﬁcates/identities should be rotatable
      - Use a separate CA for etcd
      - Use the Certiﬁcates/CSR API, with an external key signer if possible
      - Encrypt Secrets stored in etcd
      
8. 	API Authentication and Authorization
      - Disable ABAC, Anonymous Authentication and Insecure HTTP access
      - Enforce the RBAC and Node Authorizers
      - It’s recommended to delegate user authentication to a 3rd-party service
      - Enable Advanced Audit Logging
      
 9. Lock down the kubelets in the cluster
       - Each kubelet should have:
            - unique client credentials
            - a serving cert signed by the cluster CA
       - Disable the readonly port (10255) & public (!) cAdvisor port (4194)
       - Enforce authn & authz for the main kubelet port (10250)
       - Enable automatic certificate rotation for the kubelets
       
10. Be careful with the Dashboard and Helm 2
      - Don’t give them (or any app!) cluster-admin power; very easy to escalate privileges
      - The security of the dashboard has improved since v1.7.0
      - The dashboard now has a login screen and delegates privileges
      - Specify the exact operations tiller may perform with RBAC
      - Secure the Helm <-> Tiller communication with TLS certificates
      
11. Deny by default -- best security practices
       - Deny-all with RBAC
       - Deny-all with NetworkPolicy
       - Set up a restrictive PodSecurityPolicy as the default
       
12. Minimize the points of failure in the cluster - Proactively avoid disasters
        - Monitor it so you know when it fails before your customers do

13. Declarative cluster control  with the Cluster API
         - Manage clusters like applications
         - Cluster API - The What and the Why of Cluster API
               - “To make the management of (X) clusters across (Y) providers simple,  secure, and conﬁgurable.”
               - “How can I manage any number of clusters in a similar fashion to how I  manage deployments in Kubernetes?”
               - “How do I manage other lifecycle events across that infrastructure  (upgrades, deletions, etc.)?”
               - “How can we control all of this via a consistent API across providers?”
          - “GitOps” for your cluster(s)
              - With Kubernetes we manage our applications  declaratively - a.	Why not for the cluster itself?
              - With the Cluster API, we can declaratively deﬁne  the desired cluster state
                  - Operator implementations reconcile the state
                  - Use Spec & Status like the rest of k8s
                  - Common management solutions for e.g.  upgrades, autoscaling and repair
                  - Allows for “GitOps” workﬂows

```
