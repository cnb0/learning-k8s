### 08.Packaging - Write a Helm chart

Write a simple helm chart for the Sock Shop and deploy it
In this workshop we’re going to package the sock-shop as a Helm chart. 
We’ll use helm to template some of the values in the manifests before 
deploying the rendered templates to the cluster.

Before we start, make sure that you’ve removed any existing deployments of the sock-shop applications.

```
kubectl delete ns sock-shop
```

As it’s quite a large application, we’ll start by just deploying the front end service.

You might find it useful to refer to the Helm documentation about creating charts
here. For now, we’re going to run through some of the basics to get you started.

Create a new chart
Change directory the empty folder for this workshop:

```
cd attendee-resources/workshop-09/
```

Helm has a command to scaffold a new chart. While it’s a good exercise to do this
and review the generated files - it comes with rather more than we need.

Instead, we’re going to create the files ourselves to understand what each is doing.

Chart.yaml
Chart.yaml is a file that contains metadata about your chart - similar to parts of a
package.json if you’ve ever worked with a JS project. (note: dependencies for a 
helm chart are recorded in a separate file requirements.yaml)

Create a Chart.yaml file with the following contents:

```
apiVersion: v1
name: sock-shop
description: A shop selling socks
version: 0.1.0
```
Here we create a sock-shop chart using version Helm apiVersion v1. Our chart also 
has a version 0.1.0 and a short informative description.

values.yaml
The next file you’ll want in your chart is a values.yaml. This contains values for
variables used across the chart’s templates. It’s just another yaml file, create 
values.yaml with the following contents (a variable we’ll use later in the frontend
template to set the replicas).

frontendReplicaCount: 1
templates
Now all we need in our chart are some manifest templates. First create a directory for out templates:

mkdir templates
You’ll often find yourself reaching for Helm and manifest templating as you write
more and more related manifests. Often a small project will start with just a handful 
of manifests that can be manually updated.

As projects grow this becomes tedious and that’s where Helm comes in.

We’re in that position with sock-shop. Luckily it’s quick to get started in this scenario 
by copying over the existing manifests and adding templating as needed. We’ll do this now.

```
cp -r ../workshop-04/**/*.yaml templates/
cp ../workshop-04/00-sock-shop-ns.yaml templates/
```
Using helm template
Now we’ve copied over some manifests, we’re ready to use helm template. Since we’ve not 
got any templating syntax in our manifests, all this will do is output all the manifests
in the folder. However, it’s a good sanity check before we continue.

helm template . | less
Use / to explore the less output. Check that the manifests all appear as you’d expect.

This output can be piped in to kubectl apply (using - to refer to the standard input):

helm template . | kubectl apply -f -
This is our recommended method of using Helm. Helm has a server-side component that’s 
challenging to secure and makes it slower to get started. If you’re interested, 
the Helm docs on the matter are here.

After a short wait, you should see the sock-shop pods running again in their namespace.

kubectl get pods -n sock-shop
Template a value
Remember that value we set in our values.yaml earlier? (hint: it looked like this)

frontendReplicaCount: 1
We’re going to get helm to template in this value for us. Open in the templates/front-end-dep.yaml
file and change the hardcoded replicas line:

```  
apiVersion: apps/v1
kind: Deployment
metadata:
  name: front-end
  namespace: sock-shop
spec:
  # replicas: 1 # remove this line
  replicas: {{ .Values.frontendReplicaCount }}
...

If you view the result of the helm templating again and search for front-end you’ll see
that the value has been rendered in the front-end deployment yaml (press n to find later
matches after pressing enter).

helm template . | less
The resulting yaml is the same, but now we’re controlling that value with Helm. Apply it to 
the cluster, you’ll see the deployment remains unchanged.

```
$ helm template . | kubectl apply -f -
```
...
deployment.apps "front-end" unchanged
...

Template lots of values
So this is all nice, but we’re just updating a single value here. The real value in templating 
is making changes to lots of files.

One thing we’re repeating a lot in our yamls is the namespace for all the services.
At the moment, if we wanted to run the services in another namespace we’d need to update
all the services and deployment yamls.

The namespace is also the name of the chart. It’s common in Charts to use the name of the
chart in naming and namespacing resources. Let’s see how we do this.

If we’d used helm create to scaffold a chart for us, we’d have a default template to
render the name of the chart for us. We can easily add this now.

Create a file templates/_helpers.tpl with the following content:

{{/* Expand the name of the chart. */}}
{{- define "name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}

Now we can use {{ include "name" $ }} where ever we want to see sock-shop. It looks a 
bit cumbersome but only needs to be written once. Replace sock-shop in the templates
with the following command:

find templates/ -type f -exec sed -i "s/sock-shop/{{ include \"name\" $ }}/g" {} \;


# Mac OS https://stackoverflow.com/a/15402972/1510063
find templates/ -type f -exec sed -i "" "s/sock-shop/{{ include \"name\" $ }}/g" {} \;
Now if we run helm template again, we’ll see the namespace is set to the name of our chart, sock-shop.

helm template . | less
The resulting yaml is the same again, let’s apply it.
```
$ helm template . | kubectl apply -f -
```
...
resource.type "xxx" unchanged
...
Closing remarks
Helm has become the community choice for templating yamls and wrapping related resources up together.

Feel free to play with adding extra variables or changing the values of those we added here.
(note, Helm uses the golang templating syntax).

A good next step is to play with adding dependencies for your charts. This is where the 
real value in having a common format for describing distributed applications as Charts becomes apparent.
```
