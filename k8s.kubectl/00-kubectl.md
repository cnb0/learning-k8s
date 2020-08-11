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
