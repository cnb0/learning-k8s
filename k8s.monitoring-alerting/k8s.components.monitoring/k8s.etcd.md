
## How to monitor etcd

```
- etcd is a simple and robust service in Kubernetes cluster. 
- Even though the Raft distributed consensus algorithm is able to overcome most of the 
  temporal network failures, node losses, cluster splits, etc.,if you’re running Kubernetes 
  in production, it is essential to monitor and set up alerts on relevant cluster events 
  before it’s too late.

-  etcd error code like 
            - max numbers of peers in the cluster 
            - anomaly detection between the Kubernetes and etcd nodes 
            - Raft internal errors, and registry size 


- monitor etcd is of vital importance when running Kubernetes in production. 
- Monitoring etcd will let you validate that the service performs as expected, 
  while detecting and troubleshooting issues that could take your entire infrastructure down. 
- We need to learn how you can collect the most important metrics from etcd and use them to 
  monitor this service.

- etcd is a foundational component of the Kubernetes control plane. 
    -  stores cluster desired state (pods, secrets, deployments, etc.), among other things. 
    -  If this service isn’t running, you won’t be able to deploy anything and 
       the cluster can’t self-heal.

- etcd is a distributed, key-value, dynamic database that maintains a “configuration registry.” 
- This registry is one of the foundations of a 
        - Kubernetes cluster service directory,
        - Peer discovery, and 
        - Centralized configuration management. 
        - It bears a certain resemblance to a Redis database, classical LDAP configuration backends, or 
          even the Windows Registry

- etcd aims to be:
        - Simple: well-defined, user-facing API (JSON and gRPC)
        - Secure: automatic TLS with optional client cert authentication
        - Fast: benchmarked 10,000 writes/sec
        - Reliable: properly distributed using Raft

- Kubernetes uses the etcd distributed database to store its REST API objects 
  (under the /registry directory key): pods, secrets, daemonsets, deployments, 
  namespaces, events, etc.

- Raft is a “consensus” algorithm, a method to achieve value convergence over a distributed and 
  fault-tolerant set of cluster nodes.


        - Node status can be one of: Follower, Candidate (briefly), Leader
        - If a Follower cannot locate the current Leader, it will become Candidate
        - The voting system will elect a new Leader amongst the Candidates
        - Registry value updates (commits) always go through the Leader
        - Once the Leader has received the ack from the majority of Followers the new value 
          is considered “committed”
        - The cluster will survive as long as most of the nodes remain alive
        - etcd accessed the service using REST-like HTTP calls. 
          It makes integrating third-party agents as simple as you can get, and its 
          master-master protocol automatically elects the cluster Leader and 
          provides a fallback mechanism to switch this role if needed.
