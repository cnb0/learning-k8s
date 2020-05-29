# Environment setup - Post Istio Install

## Create a namespace for the application

```bash
kubectl create ns bookinfo
```

## Enable Istio sidecar injection

```bash
kubectl label namespace bookinfo istio-injection=enabled
```

## Deploy application

```bash
kubectl apply -f https://raw.githubusercontent.com/istio/istio/release-1.4/samples/bookinfo/platform/kube/bookinfo.yaml -n bookinfo
```

## Wait for all resources to be instantiated

```bash
watch kubectl get po,svc,deployment -n bookinfo
```

## Create a gateway object

```bash
kubectl apply -f - <<EOF
apiVersion: networking.istio.io/v1alpha3
kind: Gateway
metadata:
  name: bookinfo-gateway
  namespace : bookinfo
spec:
  selector:
    istio: ingressgateway # use Istio default gateway implementation
  servers:
  - port:
      number: 80
      name: http
      protocol: HTTP
    hosts:
    - "*"
EOF
```

## Create a virtual service

```bash
kubectl apply -f - <<EOF
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: bookinfo
  namespace : bookinfo
spec:
  hosts:
  - "*"
  gateways:
  - bookinfo-gateway
  http:
  - match:
    - uri:
        prefix: /
    route:
    - destination:
        port:
          number: 9080
        host: productpage.bookinfo.svc.cluster.local
EOF
```

## Obtain the bookinfo URL

```bash
export INGRESS_HOST=$(kubectl -n istio-system get service istio-ingressgateway -o jsonpath='{.status.loadBalancer.ingress[0].ip}')

export INGRESS_PORT=$(kubectl -n istio-system get service istio-ingressgateway -o jsonpath='{.spec.ports[?(@.name=="http2")].port}')

export SECURE_INGRESS_PORT=$(kubectl -n istio-system get service istio-ingressgateway -o jsonpath='{.spec.ports[?(@.name=="https")].port}')

echo HTTP access = http://$INGRESS_HOST:$INGRESS_PORT/productpage
echo HTTPS access = https://$INGRESS_HOST:$SECURE_INGRESS_PORT/productpage
```

## Download a HTTP load generator tool

```bash
curl -s https://storage.googleapis.com/hey-release/hey_linux_amd64 --output hey
chmod +x hey
sudo mv hey /usr/local/bin
```

## Generate some load

```bash
hey -n 100 -c 2 http://$INGRESS_HOST:$INGRESS_PORT/productpage
```
