
[Reference](https://kubernetes.io/docs/tasks/network/validate-dual-stack/#validate-services)

```
- Validate node ipv4/ipv6 addressing
    $kubectl get nodes minikube -o go-template --template='{{range .status.addresses}}{{printf "%s: %s \n" .type .address}}{{end}}'

- validate pod addressing 
   $kubectl get pods pod-name -o go-template --template='{{range .status.podIPs}}{{printf "%s \n" .ip}}{{end}}'

- Validate Services 
- Create a dual-stack load balanced Service

```
    
