## reference
* https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands

## cheatsheet
* https://cloud.google.com/anthos/gke/docs/on-prem/reference/cheatsheet
* https://prefetch.net/blog/2019/10/16/the-beginners-guide-to-creating-kubernetes-manifests/
* https://kubernetes.io/docs/user-guide/kubectl-cheatsheet/
* https://learnk8s.io/blog/kubectl-productivity/
* https://medium.com/faun/kubectl-commands-cheatsheet-43ce8f13adfb
* https://gist.github.com/so0k/42313dbb3b547a0f51a547bb968696ba
* https://github.com/dennyzhang/cheatsheet-kubernetes-A4
* https://medium.com/bitnami-perspectives/imperative-declarative-and-a-few-kubectl-tricks-9d6deabdde
* http://blog.kubernetes.io/2015/10/some-things-you-didnt-know-about-kubectl_28.html

## cool gear to have
* https://medium.com/@KarlKFI/a-select-list-of-kubernetes-tools-38249fc27155
* https://medium.com/free-code-camp/how-to-set-up-a-serious-kubernetes-terminal-dd07cab51cd4
* https://github.com/kubernetes-sigs/krew-index/blob/master/plugins.md

## imperative
* https://kubernetes.io/docs/tasks/manage-kubernetes-objects/imperative-command/
* https://medium.com/better-programming/kubernetes-tips-create-pods-with-imperative-commands-in-1-18-62ea6e1ceb32
* https://medium.com/bitnami-perspectives/imperative-declarative-and-a-few-kubectl-tricks-9d6deabdde
* https://blog.heptio.com/using-kubectl-to-jumpstart-a-yaml-file-heptioprotip-6f5b8a63a3ea

## debug
* https://ahmet.im/blog/kubectl-man-in-the-middle/

## context, namespace
```
 get current context: kubectl config view -o=jsonpath='{.current-context}'
 get all contexts:  kubectl config get-contexts -o=name | sort -n
 get namesapce:  kubectl get namespaces -o=jsonpath='{range .items[*].metadata.name}{@}{"\n"}{end}'
 
kubectl config use-context <cluster_name_in_kubeconfig>
kubectl --context <context>

## set the namespace for the current context
kubectl config set-context gke_sandbox-co_us-west1-a_cka --namespace=kube-system
kubectl config set-context --current --namespace=kube-system
```
 
## API
* https://kubernetes.io/docs/tasks/administer-cluster/access-cluster-api/
```
# Print the supported API versions on the server, in the form of "group/version"
k api-versions | sort 



# find out what is under the api group

k api-resources --api-group apps
NAME                  SHORTNAMES   APIGROUP   NAMESPACED   KIND
controllerrevisions                apps       true         ControllerRevision
daemonsets            ds           apps       true         DaemonSet
deployments           deploy       apps       true         Deployment
replicasets           rs           apps       true         ReplicaSet
statefulsets          sts          apps       true         StatefulSet

k api-resources --api-group extensions
NAME                  SHORTNAMES   APIGROUP     NAMESPACED   KIND
daemonsets            ds           extensions   true         DaemonSet
deployments           deploy       extensions   true         Deployment
ingresses             ing          extensions   true         Ingress
networkpolicies       netpol       extensions   true         NetworkPolicy
podsecuritypolicies   psp          extensions   false        PodSecurityPolicy
replicasets           rs           extensions   true         ReplicaSet

kubectl api-resources --sort-by=name 
kubectl api-resources --sort-by=kind

k explain --api-version=apps/v1beta1 deployment --recursive
k explain --api-version=apps/v1beta2 deployment --recursive
k explain --api-version=apps/v1 deployment --recursive

# for each "group/version" in the output above except for "api/v1"
kubectl get --raw /apis/group/version |  jq -r '.resources[].kind'

kubectl get --raw /apis/apps/v1 | jq . -C | less -R

```

## secret
```
echo $(kubectl get secret/terraform -o jsonpath="{.data['terraform\.json']}" | base64 --decode)
```

## Play with jid and jq
* https://gist.github.com/so0k/42313dbb3b547a0f51a547bb968696ba
* https://kubernetes.io/docs/tasks/access-application-cluster/list-all-running-container-images/

```

grace=$(kubectl get po cassandra-0 -o=jsonpath=‘{.spec.terminationGracePeriodSeconds}’) 
grace=$(kubectl get sts -l component=elasticsearch,role=data -o jsonpath='{..terminationGracePeriodSeconds}'

kubectl get svc -l component=elasticsearch,role=client -o jsonpath='{..ip}'
kubectl get pods -o jsonpath="{..image}"
kubectl get pods -o jsonpath="{.items[*].spec.containers[*].image}"
kubectl get pods -o jsonpath='{.items[*].status.podIP}'
kubectl get pods -o jsonpath='{range .items[*]}{"\n"}{.metadata.name}{":\t"}{range .spec.containers[*]}{.image}{", "}{end}{end}'

kubectl get pods -o go-template --template="{{range .items}}{{range .spec.containers}}{{.image}} {{end}}{{end}}"

```
## jsonpath

```
kubectl get nodes -o jsonpath='{.items[*].spec.podCIDR}' | tr " " "\n"
kubectl get nodes -o json | jq '.items[] | .spec'
kubectl get no -o go-template='{{range .items}}{{.spec.podCIDR}}{{"\n"}}{{end}}'

kubectl get pods --all-namespaces -o jsonpath="{..image}" |\
tr -s '[[:space:]]' '\n' |\
sort |\
uniq -c

```
## sort-by and custom columns 
```
k get po -A -o=custom-columns='DATA:spec.containers[*].image'
kubectl get po --sort-by=.spec.nodeName -o wide
kubectl get po --sort-by=".metadata.creationTimestamp"
kubectl get pv --sort-by=.spec.capacity.storage -o=custom-columns="NAME:.metadata.name,CAPACITY:.spec.capacity.storage"
```

## Get the TCP LB port and IP
```
  EXT_IP="$(kubectl get svc hello-server -o=jsonpath='{.status.loadBalancer.ingress[0].ip}')"
  EXT_PORT=$(kubectl --namespace default get service hello-server -o=jsonpath='{.spec.ports[0].port}')
  echo "$EXT_IP:$EXT_PORT"
  [ "$(curl -s -o /dev/null -w '%{http_code}' "$EXT_IP:$EXT_PORT"/)" -eq 200 ] || exit 1
```

## loop over pods

```
kubectl get pods -o jsonpath --template='{range .items[*]}{.met
ata.name}{"\t"}{"\t"}{.spec.containers[0].image}{"\n"}{end}'
```
## export all
* https://github.com/kubernetes/kubernetes/issues/24873

## deployment

### rollout 
```
kubectl rollout pause deployment/hello
kubectl rollout status deployment/hello
# check the versions on pods
kubectl get pods -o jsonpath --template='{range .items[*]}{.metadata.name}{"\t"}{"\t"}{.spec.containers[0].image}{"\n"}{end}'
kubectl rollout resume deployment/hello
# roll back
kubectl rollout undo deployment/hello
```
## find top resource hungry pod
```
# cpu
kubectl top pods -A | sort --reverse --key 3 --numeric
# memory
kubectl top pods -A | sort --reverse --key 4 --numeric
# top 1
kubectl top pod | grep -v NAME | sort -k 3 -nr | awk -F ' ' 'NR==1{print $1}'
```

# Kubectl output options

Let's look at some basic kubectl output options. 

Our intention is to list nodes (with their AWS InstanceId) and Pods (sorted by node).

We can start with:

```
kubectl get no
```

and 

```
kubectl get po -o wide
```

## Json and Jq

I've found the internal data structures easier to explore using the `-o json` output with [jid](https://github.com/simeji/jid) 
and [jq](https://stedolan.github.io/jq).

Once both `jq` and `jid` are installed (assuming OSX), we can quickly discover the data with the following command:

```
kubectl get no -o json | jid -q | pbcopy
```

This allows us to explore the json data interactively and keep our final `jq` query on the clipboard:

[![asciicast](https://asciinema.org/a/cpazej888znujgm04ewzsv0mk.png)](https://asciinema.org/a/cpazej888znujgm04ewzsv0mk)

**note**: `jid` currently implements it's own query parser to allow powerfull autocompletion, the drawback is
a lack of support for all the `jq` constructs (i.e.: we have to specify an index for array elements during discovery).

As can be seen in the recording: 
once done with `jid`, getting rid of the index on the `items` array in `jq`, did gave us the full listing.

`jq` gives us a lot more power for example:

Boxing the result into it's own array and constructing a new object combining
several nested attributes gives us the following query:

```
kubectl get no -o json | jq -r '[.items[] | {name:.metadata.name, id:.spec.externalID, unschedulable:.spec.unschedulable}]'
```

Here is how the above query was built up using `jid` and `jq`:
[![asciicast](https://asciinema.org/a/egmrydi963o31232sry4bfscf.png)](https://asciinema.org/a/egmrydi963o31232sry4bfscf)

Converting the json array into a tabular output with `jq` can be done using `@tsv` as follows:

```
kubectl get no -o json | jq -r '.items[] | select(.spec.unschedulable!=true) | [.metadata.name,.spec.externalID] | @tsv'
```

Jq also allows us to sort:

```
kubectl get po -o json | jq -r '.items | sort_by(.spec.nodeName)[] | [.spec.nodeName,.metadata.name] | @tsv'
```
The input for the `sort_by` command must be an array, we iterate the elements after the sorting.

## Custom Columns and Sorting

If all we need is a nicely formatted, sorted tabular report, `kubectl` has built-in support for powerfull sorting:

```
kubectl get po -o wide --sort-by=.spec.nodeName
```

Using `jid` to list pods sorted by node:
[![asciicast](https://asciinema.org/a/36q5fxao2l8lta6ztf9akqciq.png)](https://asciinema.org/a/36q5fxao2l8lta6ztf9akqciq)

The usage of Custom Columns with the knowledge of the data structure gained from `jid`, is also much easier:

```
kubectl get no -o=custom-columns=NAME:.metadata.name,AWS-INSTANCE:.spec.externalID,UNSCHEDULABLE:.spec.unschedulable
```

**Note**: apart from using `grep`, there is no easy way to filter.

## Golang Templates

If we do not wish to use `jq` (or have no access to `jq`) need filtering and powerfull output control, 
we may use Kubectl's built-in support for golang templates (inline or from a template file on disk):

```
kubectl get no -o go-template='{{range .items}}{{if .spec.unschedulable}}{{.metadata.name}} {{.spec.externalID}}{{"\n"}}{{end}}{{end}}'
or
kubectl get no -o go-template="{{range .items}}{{if .spec.unschedulable}}{{.metadata.name}} {{.spec.externalID}}:{{end}}{{end}}" | tr ":" "\n"
```

I could not find an easy way to print newline characters with inline golang template, so used a trick 
printing colons and using `tr` to convert colons to newlines.

## JSONPath 

Golang templates can be complicated and verbose - an alternative, if you are more familiar with `jq`-style queries, or `awscli`,
is to use JSONPath.

```
kubectl get no -o jsonpath="{.items[?(@.spec.unschedulable)].metadata.name}"
```

Internally, this seems tightly coupled to the golang templates.

Kubectl supports a superset of JSONPath, with a special `range` keyword to iterate over ranges, 
using the same trick to add newlines:

```
kubectl get no -o jsonpath="{range.items[?(@.spec.unschedulable)]}{.metadata.name}:{end}" | tr ":" "\n"
```

More examples of using jsonpath can be found in 
[the Kubernetes tests for the JSONPath utility](https://github.com/kubernetes/kubernetes/blob/v1.5.0-beta.2/pkg/util/jsonpath/jsonpath_test.go#L149)
