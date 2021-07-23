## Introducing Istio Service Mesh for Microservices

Microservices fundamentally change the way you design enterprise software. 
By adding network dependencies to your application logic, you invite in a host of potential hazards that grow proportionally with the number of connections you make. 
- Application architects and development team leads will learn 
  how to use the Istio service mesh to connect, manage, and secure microservices 
  in order to create powerful cloud-native applications.

You’ll learn how your application can offload service discovery, load balancing, resilience, observability, and security to Istio so you can focus on differentiating business logic.

Dive into Istio with detailed examples of:

- Traffic control: Examine Istio patterns including smarter canaries and dark launches
- Service resiliency: Discover how Istio provides load balancing, circuit breaking, and pool ejection
- Chaos testing: Test your system’s ability to withstand turbulent conditions through fault injection
- Observability: Use tracing and metrics to learn the relationships between individual system components
- Security: Explore Istio’s security capabilities, such as mTLS, RBAC, and policy enforcement

```

1. Introduction
            The Challenge of Going Faster
            Meet Istio
            Understanding Istio Components
            Data Plane
            Control Plane

2. Installation and Getting Started
            Command-Line Tools Installation
            Kubernetes/OpenShift Installation
            Istio Installation
            Installing Istio Command-Line Tooling
            Example Java Microservices Installation
            Navigating the Code Base
            Building and Deploying the Customer Service
            Building and Deploying the Preference Service
            Building and Deploying the Recommendation Service

3. Traffic Control
            Smarter Canaries
            Traffic Routing
            Routing to Specific Versions of a Deployment
            Routing Based on Headers
            Dark Launch
            Egress

4. Service Resiliency
            Load Balancing
            Timeout
            Retry
            Circuit Breaker
            Pool Ejection
            Combination: Circuit Breaker + Pool Ejection + Retry

5. Chaos Testing
            HTTP Errors
            Delays

6. Observability
            Tracing
            Metrics
            Service Graph
            
7. Security
            mutual Transport Layer Security (mTLS)
            Access Control with Mixer Policy
            Role-Based Access Control (RBAC)
            Conclusion

```