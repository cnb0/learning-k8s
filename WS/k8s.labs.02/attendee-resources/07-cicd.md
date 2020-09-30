### 07. CI/CD

```
Auto Push

Setup continuous integration and deployment to Kubernetes with GitLab
In this workshop, we’re going to deploy an instance of GitLab, a version 
control system that integrates Continuous Integration (CI) and Continuous Deployment (CD).

To save the complication and difficulty of deploying GitLab manually, we’re going
to use a Helm chart to do the heavy-lifting. We’ll then set up a continuous integration 
runner that will run our CI jobs on our Kubernetes cluster.

Finally, we’ll go on to write a simple CI job that will test, build and deploy our 
application onto Kubernetes!

Before You Begin
Perform the following tasks before starting the exercise. Skip any tasks that you have 
already completed in previous workshops.

Exercise: Installing GitLab CE
We can now use a pre-packaged GitLab CE chart to get ourselves up and running with 
GitLab easily. You can check out the contents of the chart on GitHub.

NOTE: We’re deploying an older version of GitLab CE as newer versions require 
several additional setup steps which, while useful for running GitLab in production, 
aren’t needed for the purposes of this workshop.

As part of GitLab’s deployment, we need to know the URL on which GitLab is accessible. 
If we don’t specify this information, GitLab will not create the web server component 
(and so GitLab will not be available).

What it will create however, is a Service with type LoadBalancer. Once this service
has been created, we’ll be able to use the IP address that it creates as the URL to make GitLab accessible.

This will require us to first deploy GitLab, and then once the IP has been allocated, 
upgrade the GitLab Helm release with this IP address set as the external URL:

# Deploy GitLab without the web-server so we can get an external IP allocated
$ helm install --name gitlab --namespace gitlab --set global.edition=ce --set \
  gitlabRootPassword=password stable/gitlab-ce --version=0.2.2
  
# Now we wait for the Service to have an IP address provisioned:

$ watch kubectl -n gitlab get svc gitlab-gitlab-ce
NAME                CLUSTER-IP      EXTERNAL-IP      PORT(S)                                   AGE
gitlab-gitlab-ce    10.71.248.115   104.199.80.218   22:31663/TCP,80:32323/TCP,443:31253/TCP   3m
# Now that we have an IP provisioned, we can upgrade our GitLab release
$ helm upgrade gitlab --namespace gitlab --set externalUrl=http://<gitlab-ce-ip-address> stable/gitlab-ce --version=0.2.2
We now need to wait until the GitLab pod is in the “Running” state, and once it is, 
we should be able to visit our installation at the externalUrl specified above.

# Wait until the newly created GitLab pod is Running
$ watch kubectl -n gitlab get pods
# You can view the logs for your GitLab pod with `kubectl logs`
Once the pod is Running, navigate to the external IP using a web browser, 
where you’ll be prompted to create a new password. To log in, use the username root and the password that you just set.

Creating a project and deploying an app
We’re going to take he basic web server example from earlier and set it up to 
automatically deploy through GitLab. This will involve a few key steps:

1) Creating a project on GitLab

2) Pushing our existing code to that repository

3) Create a .gitlab-ci.yml file to define how to build and push our application

4) Create Deployment and Service manifests for the application

5) Modify our .gitlab-ci.yml file to have it automatically deploy to Kubernetes

Creating a project on GitLab
First we need to create a new project on our GitLab instance. Go to the home page 
and click the ‘New Project’ button. Give it a name, and your code to go.

Pushing our existing code to that repository
We then need to push our existing code to the newly created repo. This will 
involve creating a repository locally, adding our GitLab server as a remote, and pushing:

# cd into the directory containing our application
$ cd attendee-resources/workshop-07
# initialise an empty git repository
$ git init
# stage all the files in our folder
$ git add .
# create an initial commit
$ git commit -m "initial commit"
# add our gitlab server as a remote
$ git remote add origin http://<ip-of-gitlab-server>/root/<project-name>
# push our code to GitLab
$ git push origin master
You should now be able to see your code on the GitLab instance!

Setting up a Kubernetes CI runner
Great, we’ve got GitLab running on our cluster and we can create projects - 
but we’re missing CI! We can setup GitLab to run our CI jobs on Kubernetes 
itself, meaning CI can be configured to scale automatically.

This involves running an instance of a GitLab ‘Runner’ within your cluster. 
Luckily, there is a GitLab Runner that uses the Kubernetes executor, ready-packaged as a Helm chart.

To install, you’ll need the runnerRegistrationToken (found at the 
GitLab admin dashboard: http://{gitlab IP address}/admin/runners) and the gitlabUrl (as above).

# Install the Gitlab Runner using Helm
$ helm repo add gitlab https://charts.gitlab.io && helm repo update
$ helm install \
  --name gitlab-runner \
  --namespace gitlab \
  --set gitlabUrl=http://<gitlab IP address> \
  --set runnerRegistrationToken=<registration token> \
  --set rbac.create=true \
  --set runners.privileged=true \
  --set runners.locked=false \
  gitlab/gitlab-runner --version 0.8.0
You should see the GitLab Runner pod launched shortly:

$ kubectl -n gitlab get pods
NAME                                 READY     STATUS      RESTARTS   AGE
gitlab-gitlab-ce-1938116727-lt8bp    1/1       Running     0          19m
gitlab-postgresql-1081988550-0wnst   1/1       Running     0          24m
gitlab-redis-2621194854-1krt1        1/1       Running     0          24m
gitlab-runner-1422277664-sm2r4       1/1       Running     0          3s

Now that our new Runner is running, you should be able to refresh the GitLab 
admin page to see the Runner successfully registered with GitLab.

The Runner is simply a Pod which can pull source code, build it into a container image, 
then push it to a container registry.

Creating a .gitlab-ci.yml
So now we need to define how to build our application. This is described in a 
file named .gitlab-ci.yml in the root of your repository. Full documentation on 
the schema for this file can be found on GitLab.com.

For now, here is a yaml configuration that will build the node application, package
it into a Dockerfile and push the resulting image to Google Container Registry. 
Save this at the root of your repo in a file named .gitlab-ci.yml (not forgetting 
to replace all instances of <gcp-project-name> in the file).

stages:
- docker-build

Build:
  image: docker:19.03.1
  stage: docker-build
  before_script:
  - apk add --no-cache jq curl
  # Login with the node's service account
  - 'docker login
      -u oauth2accesstoken
      -p $(curl -H "Metadata-Flavor: Google" http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token | jq -M -r .access_token)
      https://gcr.io'
  script:
  # Build our docker image
  - docker build -t gcr.io/<gcp-project-name>/basic-webserver:"$CI_BUILD_REF" .
  # Tag our docker image as latest
  - docker tag gcr.io/<gcp-project-name>/basic-webserver:"$CI_BUILD_REF" gcr.io/<gcp-project-name>/basic-webserver:latest
  # Push both images to Google Container Registry
  - docker push gcr.io/<gcp-project-name>/basic-webserver:"$CI_BUILD_REF"
  - docker push gcr.io/<gcp-project-name>/basic-webserver:latest
  variables:
    DOCKER_HOST: 127.0.0.1:2375
    DOCKER_DRIVER: overlay2
    DOCKER_TLS_CERTDIR: ""
  only:
  - master # only build and push an image on the master branch
  services:
  - docker:19.03.0-dind
We can then add, commit and push this to our repo:

$ git add .gitlab-ci.yml
$ git commit -m "Add initial CI config"
$ git push origin master
If you now go to your project and click on the ‘Pipelines’ tab, you should be 
able to view your build running and monitor the log output of your build.

Once this has passed, we should be able to pull a copy of the basic-webserver 
image locally and test it out, just like before!

$ docker pull gcr.io/<gcp-project-name>/basic-webserver:latest
$ docker run \
    -p 8080:80 \
    -e HELLO=world \
    gcr.io/<gcp-project-name>/basic-webserver:latest \
        --hello=world2
Create Deployment & Service manifests for the application
So now that we’ve got an image built and stored on Google Container Registry,
we’re going to need some manifests to deploy them to Kubernetes itself. 
For this particular application, a simple Service of type LoadBalancer and a Deployment manifest are required:

apiVersion: apps/v1
kind: Deployment
metadata:
  name: basic-webserver
  labels:
    app: basic-webserver
spec:
  replicas: 2
  selector:
    matchLabels:
      app: basic-webserver
  template:
    metadata:
      labels:
        app: basic-webserver
    spec:
      containers:
      - name: app
        image: gcr.io/<gcp-project-name>/basic-webserver:{{IMAGE_TAG}}
        ports:
        - name: http
          containerPort: 80
        livenessProbe:
          initialDelaySeconds: 10
          httpGet:
            path: /
            port: 80
        readinessProbe:
          initialDelaySeconds: 10
          httpGet:
            path: /
            port: 80
---
apiVersion: v1
kind: Service
metadata:
  name: basic-webserver
  labels:
    app: basic-webserver
spec:
  type: LoadBalancer
  ports:
  - name: http
    port: 80
    targetPort: 80
    protocol: TCP
  selector:
    app: basic-webserver
---
Fill in your image as appropriate in the Deployment manifest 
(replacing gcp-project-name with your Google Cloud project name - leaving {{IMAGE_TAG}} as it is).

Now save this file in the root of your project in manifest.yaml, 
and we’ll set up our .gitlab-ci.yml to automatically template in the 
{{IMAGE_TAG}} and deploy this manifest to our cluster!

Modify our .gitlab-ci.yml file to have it automatically deploy to Kubernetes
If we were to be deploying this manually, we’d substitute {{IMAGE_TAG}} for 
latest and use kubectl apply or create - deploying via GitLab is very similar.
We simply substitute {{IMAGE_TAG}} for the commit hash of the build using sed, and 
run kubectl apply to update the resource automatically in Kubernetes.

Before GitLab can perform deployments, we need to ensure that GitLab has 
sufficient permissions to be able to modify resources on our cluster. 
To grant GitLab these permissions, we use an in-built Kubernetes primitive called RBAC, 
and apply two objects to the cluster, a ServiceAccount in the gitlab namespace, and 
a ClusterRoleBinding (which grants the GitLab ServiceAccount a cluster-admin role). 
In a production environment, it’s strongly advised to grant ServiceAccounts more 
fine-grained roles and permissions based on their requirements, rather
than grant them wide-ranging admin access.

Create a file called rbac.yaml and apply it to the cluster:

apiVersion: v1
kind: ServiceAccount
metadata:
  name: default
  namespace: gitlab
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: gitlab-cicd-admin
subjects:
- kind: ServiceAccount
  name: default
  namespace: gitlab
roleRef:
  kind: ClusterRole
  name: cluster-admin
  apiGroup: rbac.authorization.k8s.io
Now that GitLab has the necessary permissions, we’re ready to update the .gitlab-ci.yml file to include a deploy step:

stages:
- docker-build
- deploy

Build:
  image: docker:19.03.1
  stage: docker-build
  before_script:
  - apk add --no-cache jq curl
  # Login with the node's service account
  - 'docker login
      -u oauth2accesstoken
      -p $(curl -H "Metadata-Flavor: Google" http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token | jq -M -r .access_token)
      https://gcr.io'
  script:
  # Build our docker image
  - docker build -t gcr.io/<gcp-project-name>/basic-webserver:"$CI_BUILD_REF" .
  # Tag our docker image as latest
  - docker tag gcr.io/<gcp-project-name>/basic-webserver:"$CI_BUILD_REF" gcr.io/<gcp-project-name>/basic-webserver:latest
  # Push both images to Google Container Registry
  - docker push gcr.io/<gcp-project-name>/basic-webserver:"$CI_BUILD_REF"
  - docker push gcr.io/<gcp-project-name>/basic-webserver:latest
  variables:
    DOCKER_HOST: 127.0.0.1:2375
    DOCKER_DRIVER: overlay2
    DOCKER_TLS_CERTDIR: ""
  only:
  - master # only build and push an image on the master branch
  services:
  - docker:19.03.0-dind

Deploy:
  image: google/cloud-sdk:260.0.0
  stage: deploy
  before_script:
  - sed -e 's?{{IMAGE_TAG}}?'"$CI_BUILD_REF"'?g' --in-place manifest.yaml
  script:
  - kubectl apply -f ./manifest.yaml
  only:
  - master
Commit this code and watch your pipeline run - if all goes well, this will 
deploy the basic-webserver application to your Kubernetes cluster!

Once the pipeline has completed, on your local machine run watch kubectl get svc and wait 
for your service to have an IP address, and once provisioned visit the URL to view the
basic-webserver service running on the cluster. You can also view the application by using the port-forward command:

kubectl -n sock-shop port-forward basic-webserver 80

```
