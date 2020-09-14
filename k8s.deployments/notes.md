

- [6 strategies for K8s application deployment](https://thenewstack.io/deployment-strategies/)
- [Blue Green vs Canary Deployments](https://harness.io/2018/02/blue-green-vs-canary-deployments/)

```
In Kubernetes there is few different way to release an application, you have
to carefully choose the right strategy to make your infrastructure resilient.

    1  [recreate]  : Terminate the old version and release the new one
    2- [ramped]    : Release a new version on a rolling update fashion, one  after the other
    3- [blue/green]: Release a new version alongside the old version then switch traffic
    4- [canary]    : Release a new version to a subset of users, then proceed to a full rollout
                      - Service Mesh (istio,linkerd) gives more control on canary deployments
                      - Canary deploys , representative  & granular ( region wise/user wise )
		                  - Monitoring : Tags, Outliers and Anomalies
                        - What to Watch : Latency, Errors, Traffic and Saturation 
    5- [a/b testing]: release a new version to a subset of users in a
                      precise way (HTTP headers, cookie, weight, etc.). This doesn’t come out of the
                      box with Kubernetes, it imply extra work to setup a smarter
                      loadbalancing system (Istio, Linkerd, Traeffik, custom nginx/haproxy, etc).

    6- [shadow]:      release a new version alongside the old version. Incoming
                      traffic is mirrored to the new version and doesn't impact the  response.

               
```
