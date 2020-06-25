
The kubectl command line tool lets you control Kubernetes clusters. 
For configuration, kubectl looks for a file named config in the $HOME/.kube directory. 
You can specify other kubeconfig files by setting the KUBECONFIG environment variable or 
by setting the --kubeconfig flag.

- [kubectl cheatsheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)
- [kubectl Command line reference](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands)

1. Resource types
        List all supported resource types along with their shortnames, 
        API group, whether they are namespaced, and Kind:
        
        $kubectl api-resources

2. apply
    apply manages applications through files defining Kubernetes resources. 
    It creates and updates resources in a cluster through running kubectl apply. 
    This is the recommended way of managing Kubernetes applications on production.

3. Creating Objects

4. Resources 
        Viewing 
        Finding  
        Updating  
        Patching 
        Editing  
        scaling
        deleting 

5.Interacting  
        With running pods
        Nodes and Cluster

6.Formatting output
        To output details to your terminal window in a specific format, add the -o (or --output) 
        flag to a supported kubectl command.

7. kubectl output verbosity and debugging

```
1. Getting started 
            create
            get
            run
            expose
            delete

2. APP MANAGEMENT
            apply
            annotate
            autoscale
            convert
            diff
            edit
            kustomize
            label
            patch
            replace
            rollout
            scale
            set
            wait

3. WORKING WITH APPS
            attach
            auth
            cp
            describe
            exec
            logs
            port-forward
            proxy
            top
            CLUSTER MANAGEMENT
            api-versions
            certificate
            cluster-info
            cordon
            drain
            taint
            uncordon

4. KUBECTL SETTINGS AND USAGE
            alpha
            api-resources
            completion
            config
            explain
            options
            plugin
            version
```