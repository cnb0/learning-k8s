# Secrets & ConfigMaps

All necessary information about Secrets and ConfigMaps can be found in the official documentation: [Secrets | Kubernetes](https://kubernetes.io/docs/concepts/configuration/secret/) and [ConfigMaps | Kubernetes](https://kubernetes.io/docs/concepts/configuration/configmap/). 


## ConfigMaps

### Create a new properties file 

```
cat << EOL > game.properties                    
enemies=aliens
lives=3
enemies.cheat=true
enemies.cheat.level=noGoodRotten
secret.code.passphrase=UUDDLRLRBABAS
secret.code.allowed=true
secret.code.lives=30
EOL

cat << EOL > cluster.properties                    
k8s=great
party=on
EOL


```

### Create ConfigMap

```
kubectl create configmap app-properties --from-file=game.properties --from-file=cluster.properties
```

### Show ConfigMap
```
kubectl get configmap
kubectl describe configmap app-properties
```

## Secrets

### Create Secrets in the cluster

```
kubectl create secret generic app-cfg --from-literal=con-string=mongodb://mongo:superSecretMongoPw@mongodb-injected-secret
```

### Show Secrets

```
kubectl get secrets
kubectl describe secret app-cfg
```
