### Manifests

```
A) Manifesto
Run a container on your new cluster
In this exercise, we will use the kubectl CLI command to create pods on our cluster.

step 1 - create the pod manifest

Let’s see how to deploy this single container using Kubernetes.

Kubernetes is controlled using a command line tool called kubectl and with 
configuration files called “manifests”.

Create a manifest file called attendee-resources/workshops/front-end.yaml 
with the following content:

---
apiVersion: v1
kind: Pod
metadata:
  name: front-end
  labels:
    name: front-end
spec:
  containers:
  - name: hello-kubernetes
    image: paulbouwer/hello-kubernetes:1.5
    ports:
    - containerPort: 8080

When we submit this resource to kubernetes, 
it’ll ensure that a container is running somewhere with these options.

These options defined here are comparable to running the following 
docker command on your laptop. Note, this is provided just for comparison.

docker run \
    --detach \
    --name front-end \
    --publish 8080:8080 \
    paulbouwer/hello-kubernetes:1.5

Note if you run this it will leave a container running in the background on your laptop, 
you can see it in docker ps and remove it with docker rm -f front-end.

step 2 - deploy the manifest
          Now we use kubectl apply to push the manifest onto the cluster:

$ kubectl apply -f attendee-resources/workshops/front-end.yaml

        If there are errors in the manifest, fix them and try again.

step 3 - check the deployment - List the current pods and their status:

$kubectl get pods
    If the pod creation was successful and the docker image is still pulling from the registry -
    you will see ImagePulling. If the pod is running - you will see Running.

You can use watch to keep an eye on the status:

$ watch kubectl get pods

        Once the pod is up and running you can see its details:

$ kubectl describe pod front-end

        Note: can you use the kubectl port-forward command to inspect the page?

```

