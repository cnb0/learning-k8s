
```
$kubectl create -
        - Creates a new k8s resource in the cluster
$kubectl replace -
        - Updates a resource in the live cluster
$kubectl apply 
        - If I want to do create + replace


Imperative Management
        $kubectl create is what we call Imperative Management.
      - this approach you tell the Kubernetes API what you want to create, replace or delete, 
        not how you want your K8s cluster world to look like.

Declarative Management
        $kubectl apply is part of the Declarative Management approach, 
         where changes that you may have 
        applied to a live object (i.e. through scale) are "maintained" even
         if you apply other changes to the object.
```

- [Kubernetes Object Management documentation](https://kubernetes.io/docs/concepts/overview/working-with-objects/object-management/)
- [Imperative Vs Declarative](https://www.f5.com/content/dam/f5-com/page-assets-en/home-en/company/blog/2017/imperative_vs_declarative.jpg)
