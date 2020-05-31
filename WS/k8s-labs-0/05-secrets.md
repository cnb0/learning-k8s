# Tutorial: Secrets

In this tutorial you will learn how to create and consume Kubernetes secrets.

Create the example application configuration file:

```
cat << EOF > config.json
{
  "username": "admin",
  "password": "123456789"
}
EOF
```

Create the `tikal` secret:

```
kubectl create secret generic tikal \
  --from-literal=username=admin \
  --from-literal=password=123456789 \
  --from-file=config.json
```

Describe the `tikal` secret: 

```
kubectl describe secrets tikal
```

Run the `secrets` job to fetch the secrets and log the secrets:

```
kubectl create -f https://raw.githubusercontent.com/tikalk/kubernetes-workshop/master/src/secrets/secrets.yaml
```

View the logs of the `secrets` job:

```
kubectl get pods -a
```

```
kubectl logs <print-secrets-pod-name>
```
