```
Controller
         Simple, pure shell based controller which watches ConfigMap resources for changes and
         restarts Pods by using a label selector provided as annotation. 
         An additional example controller exposes an Ingress route when it detects an exposeService label 
         attached to the service.
         
Operator
         Operator based on the ConfigMap watch controller and introduces a CRD ConfigWatcher 
         which connects a ConfigMap with a set of Pods to restart in case of a config change.

Elastic Scale
         Horizontal and vertical scaling examples with the random-generator Service [*]

Image Builder
        Setup a chained build on OpenShift and use Knative build for doing builds within the cluster

```
