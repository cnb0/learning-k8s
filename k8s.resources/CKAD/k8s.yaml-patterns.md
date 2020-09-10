# YAML pattern for K8s resources 

```yaml
# POD
apiVersion: v1
kind: Pod
metadata:
  name: pod-name
  labels:                         # labels
    label1-key: label1-value      # labels
    label2-key: label2-value      # labels
spec:
  volumes:                        # volumes
  - name: config-dir              # volumes
    emptyDir: {}                  # volumes(emptyDir)
  containers:
  - name: container1-name
    image: container1-image
    ports:                        # ports
    - containerPort: 80           # ports
    volumeMounts:                 # volumeMounts
    - name: config-dir            # volumeMounts
      mountPath: /cache           # volumeMounts
    env:                          # env
    - name: VARIABLE_NAME         # env
      value: "variable's value"   # env
    resources: {}
  dnsPolicy: ClusterFirst
  restartPolicy: Never
status: {}
```


```yaml
# DEPLOYMENT
apiVersion: apps/v1
kind: Deployment
metadata:
  name: deployment-name
  labels:
    label1-key: label1-value
    label2-key: label2-value
spec:
  replicas: 1
  selector:
    matchLabels:
      label1-key: label1-value
  template:
    metadata:
      labels:
        label1-key: label1-value
    spec:
      containers:
      - name: container1-name
        image: container1-image
        ports:
        - containerPort: 80
        resources: {}
  strategy: Recreate or RollingUpdate (default)
status: {}
```


```yaml
# Network Policy
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: network-policy-name
  namespace: namespace-name
spec:
  podSelector:
    matchLabels:
      label1-key: label1-value
      label2-key: label2-value
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - ipBlock:
        cidr: 172.17.0.0/16 # sample cidr
        except:
        - 172.17.1.0/24 # sample cidr
    - namespaceSelector:
        matchLabels:
          project: myproject
    - podSelector:
        matchLabels:
          label1-key: label1-value
          label3-key: label3-value # pod's label3 is PodSelector whose access will be allowed
    ports:
    - protocol: TCP
      port: 6379
  egress:
  - to:
    - ipBlock:
        cidr: 10.0.0.0/24
    ports:
    - protocol: TCP
      port: 5978

```


```yaml
# yaml

```


```yaml
# yaml

```

```yaml

```
