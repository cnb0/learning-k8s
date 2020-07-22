## Installing Istio
```
1.Download the istio package, as follows:

$curl -L https://git.io/getLatestIstio | sh -
$cd istio-<release-number>/

2.Add the istio binaries to your path, as follows:
$export PATH="$PATH:~/istio-<release-number>/bin"

3. Install istio with the default values:
$helm install install/kubernetes/helm/istio --name istio --namespace istio-system

4.Make sure everything is up and running, as follows:
$kubectl get svc -n istio-system

We now have istio up and running.

```

## Injecting Istio as a sidecar automatically
```
Istio has the ability to install itself as a sidecar automatically by using labels in the namespace.
We can make it function in this way by using the following steps:

Let's label the default namespace with the appropriate label, namely, istio-injection=enabled:
$kubectl label namespace default istio-injection=enabled

Let's launch an application to see whether the sidecar is indeed deployed automatically:
$kubectl apply -f samples/bookinfo/platform/kube/bookinfo.yaml

Get the pods running on the default namespace:
$kubectl get pods

Run the describe command on any one of the pods:
$kubectl describe pods/details-<pod id>

You can see that the sidecar has indeed been applied:
Name:           details-v1-7bcdcc4fd6-xqwjz
Namespace:      default
...
Labels:         app=details
                pod-template-hash=3678770982
                version=v1
Annotations:    sidecar.istio.io/status:
                  {"version":"887285bb7fa76191bf7f637f283183f0ba057323b078d44c3db45978346cbc1a","initContainers":["istio-init"],"containers":["istio-proxy"]...
...

Note that without making any modifications to the underlying application, 
we were able to get the istio service mesh deployed and attached to the containers.
```

## Enforcing mutual TLS
```
By default, mutual TLS is not enforced. In this section, we will enforce mutual TLS authentication step by step. 
We will mostly follow the steps in the following link: 
[mLS](https://istio.io/docs/tasks/security/authn-policy/#globally-enabling-istio-mutual-tls)

Please read for more deatils 
https://istio.io/docs/concepts/security/#authentication-policies 
https://istio.io/docs/concepts/security/#mutual-tls-authentication 


```
