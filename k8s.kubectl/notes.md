# [kubectl CLI](https://kubectl.docs.kubernetes.io/)

```
- kubectl shortened resource types:

            csr      	certificatesigningrequests
            cs	      componentstatuses
            cm	      configmaps
            ds	      daemonsets
            deploy	  deployments
            ep	      endpoints
            ev	      events
            hpa       horizontalpodautoscalers
            ing	      ingresses
            limits	  limitranges
            ns	      namespaces
            no	      nodes
            pvc	      persistentvolumeclaims
            pv	      persistentvolumes
            po	      pods
            pdb	      poddisruptionbudgets
            psp	      podsecuritypolicies
            rs	      replicasets
            rc	      replicationcontrollers
            quota	    resourcequotas
            sa	      serviceaccounts
            svc	      services


$ kubectl describe
You must specify the type of resource to describe. Valid resource types include:
    * all
    * certificatesigningrequests (aka 'csr')
    * clusters (valid only for federation apiservers)
    * clusterrolebindings
    * clusterroles
    * componentstatuses (aka 'cs')
    * configmaps (aka 'cm')
    * daemonsets (aka 'ds')
    * deployments (aka 'deploy')
    * endpoints (aka 'ep')
    * events (aka 'ev')
    * horizontalpodautoscalers (aka 'hpa')
    * ingresses (aka 'ing')
    * jobs
    * limitranges (aka 'limits')
    * namespaces (aka 'ns')
    * networkpolicies
    * nodes (aka 'no')
    * persistentvolumeclaims (aka 'pvc')
    * persistentvolumes (aka 'pv')
    * pods (aka 'po')
    * poddisruptionbudgets (aka 'pdb')
    * podsecuritypolicies (aka 'psp')
    * podtemplates
    * replicasets (aka 'rs')
    * replicationcontrollers (aka 'rc')
    * resourcequotas (aka 'quota')
    * rolebindings
    * roles
    * secrets
    * serviceaccounts (aka 'sa')
    * services (aka 'svc')
    * statefulsets
    * storageclasses
    * thirdpartyresources
