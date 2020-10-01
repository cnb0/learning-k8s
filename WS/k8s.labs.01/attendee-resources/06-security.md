### 06-security

### Configure our MySQL pods with Secrets and config maps

```

In this workshop we will create a ConfigMap to store database config and a Secret 
to set the password in the catalogue-db pod.

Create a ConfigMap
Change directory into workshop-07

cd attendee-resources/workshop-07
Next, we can create our ConfigMap. Write a new file called catalogue-db-config.yaml 
with the following content:

apiVersion: v1
kind: ConfigMap
metadata:
  name: catalogue-db
  namespace: sock-shop
data:
  MYSQL_DATABASE: socksdb
We’re going to use this to configure the database as environment variables. We can use a 
config map for settings that are less sensitive.

Apply your ConfigMap:

$kubectl apply -f catalogue-db-config.yaml

Create a Secret
Next we can create a Secret. Write a new file called catalogue-db-secret.yaml with the 
following content:

apiVersion: v1
kind: Secret
metadata:
  name: catalogue-db
  namespace: sock-shop
data:
  password: c3VwZXItc2VjdXJlLXBhc3N3b3Jk
  
We’ll be using the password value in this Secret to set the database’s password. 
Check the password value using:

$echo c3VwZXItc2VjdXJlLXBhc3N3b3Jk | base64 --decode
Apply the secret so it’s available when we update the deployment later.

$kubectl apply -f catalogue-db-secret.yaml
Update our catalogue-db deployment
We’re doing to be making some edits to one of the manifest in an earlier workshop. Let’s make a
copy here to work with.

$cp ../workshop-04/deployments/catalogue-db-dep.yaml .
ConfigMaps and Secrets can be used as either environment variables or volume mounts. 
MySQL is easily configured with environment variables so we’re going to use that option
to configure our MySQL container.

The Secret can be consumed as an environment variable.

        env:
        - name: MYSQL_ROOT_PASSWORD
          valueFrom:
            secretKeyRef:
              name: catalogue-db
              key: password
The ConfigMap can be used in a similar way.

        env:
        - name: MYSQL_DATABASE
          valueFrom:
            configMapRef:
              name: catalogue-db-config
              key: MYSQL_DATABASE
This is fine for a small number of variables, but there’s a neater way to write it
if you’ve got a lot of variables to set.

        envFrom:
        - configMapRef:
            name: catalogue-db
Once we’ve finished making our edits we should have a new catalogue-db Deployment
that looks like this (make sure you’ve removed the old environment variables).

apiVersion: apps/v1
kind: Deployment
metadata:
  name: catalogue-db
  labels:
    name: catalogue-db
  namespace: sock-shop
spec:
  replicas: 1
  selector:
    matchLabels:
      name: catalogue-db
  template:
    metadata:
      labels:
        name: catalogue-db
    spec:
      containers:
      - name: catalogue-db
        image: weaveworksdemos/catalogue-db:0.3.0
        envFrom:
        - configMapRef:
            name: catalogue-db
        env:
        - name: MYSQL_ROOT_PASSWORD
          valueFrom:
            secretKeyRef:
              name: catalogue-db
              key: password
        ports:
        - name: mysql
          containerPort: 3306
Apply the updated catalogue-db-dep.yaml file and wait for the new pods to run.
Find the new pod names with the following:

kubectl get pods -l name=catalogue-db -n sock-shop
Use once you’ve got the name of the pod, you can exec into it and run env to view the 
variables that have been set. You should see that the database name and password
have been set inside the new container.

$ kubectl exec -it catalogue-db-XXXXXX-XXXXX env -n sock-shop | grep MYSQL
MYSQL_ROOT_PASSWORD=super-secure-password
MYSQL_DATABASE=socksdb
MYSQL_MAJOR=5.7
MYSQL_VERSION=5.7.16-1debian8
```
