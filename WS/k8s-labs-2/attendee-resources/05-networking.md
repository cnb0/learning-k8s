### 05. Networking

```
Loads of balancer
Deploy load-balancing nginx ingress controller. Use cert-manager for automated TLS with an ingress resource.
In this workshop, we will use the NGINX ingress controller and add automated TLS support, with the 
aid of cert-manager, to deploy a secure Sock Shop.

preparation - check if we have cluster admin
We ran a command in Workshop 1B to make sure that we have all the cluster admin rights on the cluster,
but in rare situations we can still have issues with this. There is an easy way to check:

kubectl create clusterrole test-my-adminness --verb='*' --resource=pods
kubectl delete clusterrole test-my-adminness
If these two commands succeeded, you are good to go, otherwise please consult with your instructor.

step 1 - deploy Nginx ingress controller
---------------------------------------------------------------
Run the following commands to install the NGINX ingress controller:

kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/nginx-0.25.1/deploy/static/mandatory.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/nginx-0.25.1/deploy/static/provider/cloud-generic.yaml

step 2 - get the external IP for NGINX and update DNS
---------------------------------------------------------------
In the first step, a Service of type LoadBalancer was created for NGINX. To find out the load balancer 
external IP, we need to examine its Service:

$ kubectl -n ingress-nginx get svc ingress-nginx

NAME            TYPE           CLUSTER-IP    EXTERNAL-IP      PORT(S)                      AGE
ingress-nginx   LoadBalancer   10.3.246.61   35.230.140.211   80:30473/TCP,443:31181/TCP   3h
Copy the EXTERNAL-IP and navigate to it in a browser. You should see default backend - 404.

NOTE: Be sure to get the IP address of the ingress-nginx service. 
There is also an external IP assigned to the sock-shop front-end service but
we are not using that in this workshop.

You should now add a DNS A record for the hostname you want to use to access the sock shop, 
pointing to this IP. You should either:

have the permission and access to update DNS records, or
you might want to stretch yourself and try using ExternalDNS, a controller that will 
automatically update Google Cloud DNS. If you follow this route, the nginx-ingress tutorial
at the docs is for you.
If you do not own a domain you can use, ask an instructor and one can be created for you.

step 3 - create a non-TLS ingress resource
An Ingress resource describes to Kubernetes how to forward external (Layer 7) traffic into the cluster.

We will make an Ingress that will be consumed by the NGINX ingress controller 
to create configuration to reverse proxy to the Sock Shop front-end service.

Take a look inside the attendee-resources/workshop-05/ingress-frontend.yaml file and 
replace the host with the one you created in the previous step.

apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: frontend-ingress
  namespace: sock-shop
  annotations:
    kubernetes.io/ingress.class: "nginx"
spec:
  rules:
  - host: <your.host.here>
    http:
      paths:
      - path: /
        backend:
          serviceName: front-end
          servicePort: 80
Create the ingress resource using kubectl apply:

kubectl apply -n sock-shop -f attendee-resources/workshop-05/ingress-frontend.yaml
Now visit http:// in a web browser. You should see the Sock Shop site.

To understand how this works, take a look at the Nginx configuration:

kubectl get pods -n ingress-nginx
kubectl -n ingress-nginx exec <nginx-ingress-pod-name> cat /etc/nginx/nginx.conf

You should see that the Nginx Ingress Controller has rewritten the nginx.conf 
file to include a Server Block for your chosen DNS name.

## start server www.example.com
server {
        server_name www.example.com ;

        listen 80;
...
        proxy_pass http://sock-shop-front-end-80;
}
It has added a reverse HTTP proxy configuration for your domain name. 
This makes Nginx forward any HTTP requests that have Host header “www.example.com”, 
to the front-end Service IP in the sock-shop namespace, on port 80.

We’ve seen how the Nginx Ingress Controller allows you to serve multiple 
HTTP services on a single external IP address.

step 4 - enable cert-manager
At this stage, the Sock Shop is deployed, but now we want to use TLS to 
make sure customers feel confident browsing the shop.

The Nginx Ingress Controller can also be configured as a TLS Termination Proxy. 
This means that when you visit https:// in a web browser, the TLS handshake and TLS 
encryption will be processed by the Nginx Ingress server. The HTTP requests will then 
be forwarded (unencrypted) to another Service IP.

NOTE: For more technical details visit the TLS Termination Proxy page on Wikipedia

For this, the Nginx Ingress Controller looks at the TLS configuration of Ingress 
resources and for TLS certificates which it expects to get from the Kubernetes 
API server, as Secrets.

You can create and upload the secrets yourself, but it can be tedious and error prone, 
especially if you want to regularly renew your TLS certificates (which you should!).
Fortunately there’s a way to automate that process, using a Kubernetes extension called cert-manager.

cert-manager is a powerful, general-purpose certificate manager with many applications. 
In this example, we will use it to monitor Ingress resources and automatically fetch 
(and renew) certificates by interfacing with Let’s Encrypt.

Canonically, cert-manager is installed by Helm chart, however here we’ll use the 
raw manifests directly to reduce the number of things going on. Create the cert-manager resources. 
Note how we’re creating the resources in a new namespace.

kubectl create namespace cert-manager
kubectl label namespace cert-manager certmanager.k8s.io/disable-validation=true
kubectl apply -f https://github.com/jetstack/cert-manager/releases/download/v0.9.1/cert-manager.yaml
We now have a deployment of cert-manager’s core, but it’s a general-purpose system 
and doesn’t yet know how to issue certificates; how to take our requests for desired 
certificates and get them signed by an authority. We interact with cert-manager in a “Kubernetes native” way, 
i.e. by using custom resource types that it’s defined (aka CRDs). There is an Issuer 
kind which tells it how to issue certificates. We could configure cert-manager with our own CA cert 
and have it sign requests with that (if all we needed was an internally trusted cert). 
However, we’d like a public sock-shop, so for this ingress exercise we’ll configure it to use 
Let’s Encrypt to issue certificates.

After replacing YOUR_EMAIL_HERE with your e-mail address, apply the following Custom Resource Definition:

# Create attendee-resources/workshop-05/my-cluster-issuer.yaml

apiVersion: certmanager.k8s.io/v1alpha1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    # The ACME server URL
    server: https://acme-v02.api.letsencrypt.org/directory
    # Email address used for ACME registration
    email: YOUR_EMAIL_HERE
    # Name of a secret used to store the ACME account private key
    privateKeySecretRef:
      name: letsencrypt-prod-key
    # Enable the HTTP-01 challenge provider
    http01: {}
Apply our new ClusterIssuer:

kubectl apply -f attendee-resources/workshop-05/my-cluster-issuer.yaml
Note how this is a ClusterIssuer; it is not namespaced because it models a resource outside of the cluster.

We could now use cert-manager to manually get certificates from Let’s Encrypt. 
cert-manager has a Certificate resource which declares a certificate we’d like to have. 
However in this example we’ll configure cert-manager to watch for Ingress resources and
automatically issue certificates to them (like the old kube-lego project).

Kubernetes uses declarative APIs, so this resource isn’t called CSR for the same reason
that Pod isn’t called DesiredPod or PodRequest.

step 5 - enable TLS
To trigger TLS to be enabled, and for cert-manager to obtain a Let’s Encrypt certificate 
for it, we need to update the Ingress resource.

A tls stanza is required with a host field to match in the SNI header, and a secretName
where the certificates will be stored by cert-manager and fetched by the ingress controller
The presence of the certmanager.k8s.io/cluster-issuer annotation tells cert-manager 
to automatically provision a certificate for this Ingresss resource. Its value specifies 
the CA to ask to sign the certificate.
Edit the attendee-resources/workshop-05/ingress-frontend.yaml file.

Add your hostname e.g. mycluster.example.com and the certmanager.k8s.io/cluster-issuer: 
"letsencrypt-prod" annotation.

Important: cert-manager will only provision certificates for Ingress resources with this annotation.

apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: frontend-ingress
  namespace: sock-shop
  annotations:
    kubernetes.io/ingress.class: "nginx"
    certmanager.k8s.io/cluster-issuer: "letsencrypt-prod"
spec:
  tls:
  - hosts:
    - <your.host.here>
    secretName: front-end-tls
  rules:
  - host: <your.host.here>
    http:
      paths:
      - path: /
        backend:
          serviceName: front-end
          servicePort: 80
cert-manager will now automatically kick off the process of requesting a certificate 
(via the ACME protocol, using the http-01 challenge for those who are interested - read more here).

To check whether the certificate has been obtained successfully, kubectl describe the Certificate resource.

kubectl describe certificate front-end-tls -n sock-shop
For example, you will be able to see the events that describe the status of the certificate request process.

  Type    Reason          Age      From          Message
  ----    ------          ----     ----          -------
  Normal  CreateOrder     57m      cert-manager  Created new ACME order, attempting validation...
  Normal  DomainVerified  55m      cert-manager  Domain "example.com" verified with "http-01" validation
  Normal  DomainVerified  55m      cert-manager  Domain "www.example.com" verified with "http-01" validation
  Normal  IssueCert       55m      cert-manager  Issuing certificate...
  Normal  CertObtained    55m      cert-manager  Obtained certificate from ACME server
  Normal  CertIssued      55m      cert-manager  Certificate issued successfully

Once cert-manager has finished its magic, you should see two certificates in a Secret. 
NGINX knows where to find these certificates and will be ready-configured to serve traffic with TLS on the domain.

kubectl get secret -n sock-shop
Now go ahead and check out the site at the HTTPS URL - job done (with the help of
Kubernetes and cert-manager), get yourself a well-earned coffee!

NOTE: That simple modification to the Ingress resource, triggered quite a complex 
series of interactions: 1. The Nginx Ingress Controller will attempt to get the Secret 
with name front-end-tls, from the sock-shop namespace of the Kubernetes API, and 
write them to files in the Nginx server container. 2. The Nginx Ingress Controller
will rewrite the server {} block in the nginx.conf with TLS configuration options 
for your DNS host and the certificate files downloaded (above). It will then reload the 
Nginx server. 3. Meanwhile cert-manager controller will create a TLS certificate matching 
your DNS hostname. 4. cert-manager will send a certificate signing request (CSR) to the 
LetsEncrypt API. 5. cert-manager will set up another (temporary) Ingress resource, 
matching http://<your-domain>/<lets-encrypt-validation-path>, which will allow the
LetsEncrypt service to validate that you control the domain and web server. 6. 
Once validated, cert-manager will get the signed certificate from LetsEncrypt and 
save it as a Secret in the sock-shop namespace. 7. 
And finally, the Nginx Ingress Controller will see the new secrets and reconfigure and reload the Nginx server.

Take another look at the nginx.conf file and see for yourself how the TLS termination is configured:

kubectl -n ingress-nginx exec nginx-ingress-controller-5f6d649c67-4vvz4 cat /etc/nginx/nginx.conf
```
