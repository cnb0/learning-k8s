[K8s Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)

 - A Deployment provides declarative updates for Pods and ReplicaSets.

    - You describe a desired state in a Deployment, and the Deployment Controller changes the actual state to the               . 

    - You can define Deployments to create new ReplicaSets, or 
      to remove existing Deployments and adopt all their resources with new  Deployments.

    - Deployment ensures that only a certain number of Pods are down while they are being updated. 
      By default, it ensures that at least 75% of the desired number of Pods are up (25% max unavailable).

    - Deployment also ensures that only a certain number of Pods are created above the desired number of Pods. 
      By default, it ensures that at most 125% of the desired number of Pods are up (25% max surge).


- API Deployment v1 apps
            - Write Operations
                        - Create - create a Deployment
                            - HTTP Request - POST /apis/apps/v1/namespaces/{namespace}/deployments
                        - Patch - partially update the specified Deployment
                            - HTTP Request - PATCH /apis/apps/v1/namespaces/{namespace}/deployments/{name}
                        - Replace
                            - HTTP Request - PUT /apis/apps/v1/namespaces/{namespace}/deployments/{name}
                        - Delete
                            - HTTP Request - DELETE /apis/apps/v1/namespaces/{namespace}/deployments/{name}
                        - Delete Collection
                            - HTTP Request - DELETE /apis/apps/v1/namespaces/{namespace}/deployments

            - Read Operations
                        - Read - partially update status of the specified Deployment
                           - HTTP Request - GET /apis/apps/v1/namespaces/{namespace}/deployments/{name}
                        - List - list or watch objects of kind Deployment
                           - HTTP Request - GET /apis/apps/v1/namespaces/{namespace}/deployments/{name}
                        - Read - partially update status of the specified Deployment
                           - HTTP Request - GET /apis/apps/v1/namespaces/{namespace}/deployments/{name}

            - Status Operations
                       - Patch - partially update status of the specified Deployment
                           - HTTP Request - GET /apis/apps/v1/namespaces/{namespace}/deployments
                       - Read status of the specified Deployment
                           - HTTP Request - GET /apis/apps/v1/namespaces/{namespace}/deployments/{name}/status
                       - List All Namespaces - list or watch objects of kind Deployment
                           - HTTP Request - GET /apis/apps/v1/deployments

            - Misc Operations
                       - Read scale of the specified Deployment
                            HTTP Request - GET /apis/apps/v1/namespaces/{namespace}/deployments/{name}/scale

                       -  replace scale of the specified Deployment
                            HTTP Request - PUT /apis/apps/v1/namespaces/{namespace}/deployments/{name}/scale

                       -  Patch scale - partially update scale of the specified Deployment
                            HTTP Request - PATCH /apis/apps/v1/namespaces/{namespace}/deployments/{name}/scale

Creating a Deployment


Updating a Deployment
        - A Deployment's rollout is triggered if and only if the Deployment's Pod template (that is, .spec.template) is changed, 
          for example if the labels or container images of the template are updated.
          Other updates, such as scaling the Deployment, do not trigger a rollout

            - update the nginx Pods to use the nginx:1.16.1 image instead of the nginx:1.14.2 image.
                    $ kubectl --record deployment.apps/nginx-deployment set image deployment.v1.apps/nginx-deployment nginx=nginx:1.16.1
                
                or simply use the following command:

                    $ kubectl set image deployment/nginx-deployment nginx=nginx:1.16.1 --record
            - Alternatively, you can edit the Deployment and 
                change .spec.template.spec.containers[0].image from nginx:1.14.2 to nginx:1.16.1:
                
                    $ kubectl edit deployment.v1.apps/nginx-deployment

            - To see the rollout status

                        $ kubectl rollout status deployment.v1.apps/nginx-deployment

- Get details of your Deployment:

        $ kubectl describe deployments


- Rollover (aka multiple updates in-flight)

        - Each time a new Deployment is observed by the Deployment controller, a ReplicaSet is created to bring up the desired Pods. 
          If the Deployment is updated, the existing ReplicaSet that controls Pods whose labels match .spec.selector but 
          whose template does not match .spec.template are scaled down. 
        - Eventually, the new ReplicaSet is scaled to .spec.replicas and all old ReplicaSets is scaled to 0.

        - If you update a Deployment while an existing rollout is in progress, the Deployment creates a new ReplicaSet 
          as per the update and start scaling that up, and rolls over the ReplicaSet that it was scaling up previously -- 
           it will add it to its list of old ReplicaSets and start scaling it down.

        - For example, suppose you create a Deployment to create 5 replicas of nginx:1.14.2, 
          but then update the Deployment to create 5 replicas of nginx:1.16.1, 
          when only 3 replicas of nginx:1.14.2 had been created. 
          In that case, the Deployment immediately starts killing the 3 nginx:1.14.2 Pods that it had created, and 
          starts creating nginx:1.16.1 Pods. It does not wait for the 5 replicas of nginx:1.14.2 to be created before changing course.

- Rolling Back a Deployment
        -   Sometimes, you may want to rollback a Deployment; 
               for example, when the Deployment is not stable, such as crash looping.
               By default, all of the Deployment's rollout history is kept in the system
               so that you can rollback anytime you want (you can change that by modifying revision history limit).


          -     Suppose that you made a typo while updating the Deployment, by putting the image name as nginx:1.161 instead of nginx:1.16.1:
                    $ kubectl set image deployment.v1.apps/nginx-deployment nginx=nginx:1.161 --record=true

                                The rollout gets stuck. You can verify it by checking the rollout status:

                    $ kubectl rollout status deployment.v1.apps/nginx-deployment


- Checking Rollout History of a Deployment
       - check the revisions of this Deployment:
                $ kubectl rollout history deployment.v1.apps/nginx-deployment

       -  To see the details of each revision, run:
                $ kubectl rollout history deployment.v1.apps/nginx-deployment --revision=2

- Rolling Back to a Previous Revision
            - to rollback the Deployment from the current version to the previous version, which is version 2.
              Now you've decided to undo the current rollout and rollback to the previous revision:

                    $ kubectl rollout undo deployment.v1.apps/nginx-deployment

            - Alternatively, you can rollback to a specific revision by specifying it with --to-revision:

                    $ kubectl rollout undo deployment.v1.apps/nginx-deployment --to-revision=2
                    
                    $ kubectl get deployment nginx-deployment

                    $ kubectl describe deployment nginx-deployment

- Scaling a Deployment
            - scale a Deployment by using the following command:
                $ kubectl scale deployment.v1.apps/nginx-deployment --replicas=10

- Assuming horizontal Pod autoscaling is enabled in your cluster, 
  you can setup an autoscaler for your Deployment and 
  choose the minimum and maximum number of Pods you want to run based on the CPU utilization of your existing Pods.

                $ kubectl autoscale deployment.v1.apps/nginx-deployment --min=10 --max=15 --cpu-percent=80


- Proportional scaling :
        - RollingUpdate Deployments support running multiple versions of an 
          application at the same time. When you or an autoscaler scales a 
          RollingUpdate Deployment that is in the middle of a rollout (either in progress or paused), 
          the Deployment controller balances the additional replicas in the existing active ReplicaSets
          (ReplicaSets with Pods) in order to mitigate risk. This is called proportional scaling.

          For example, you are running a Deployment with 10 replicas, maxSurge=3, and maxUnavailable=2.
- Pausing and Resuming a Deployment
        - You can pause a Deployment before triggering one or more updates and then resume it. This allows you to apply multiple fixes in between pausing and resuming without triggering unnecessary rollouts.
            - $ kubectl rollout pause deployment.v1.apps/nginx-deployment

            Then update the image of the Deployment:

               $ kubectl set image deployment.v1.apps/nginx-deployment nginx=nginx:1.16.1
            
            Notice that no new rollout started:

              $ kubectl rollout history deployment.v1.apps/nginx-deployment

  - Rolling Back a Deployment
  
  - Checking Rollout History of a Deployment
            $ kubectl rollout history deployment.v1.apps/nginx-deployment
            $ kubectl rollout history deployment.v1.apps/nginx-deployment --revision=2

            Rolling Back to a Previous Revision
              $ kubectl rollout undo deployment.v1.apps/nginx-deployment
              $ kubectl rollout undo deployment.v1.apps/nginx-deployment --to-revision=2
              $ kubectl get deployment nginx-deployment
              $ kubectl describe deployment nginx-deployment

  - Scaling a Deployment
              $ kubectl scale deployment.v1.apps/nginx-deployment --replicas=10
              $ kubectl autoscale deployment.v1.apps/nginx-deployment --min=10 --max=15 --cpu-percent=80

  - Proportional scaling


  - Pausing and Resuming a Deployment
        - $ kubectl rollout pause deployment.v1.apps/nginx-deployment
        - $ kubectl set image deployment.v1.apps/nginx-deployment nginx=nginx:1.16.1
        - $ kubectl rollout history deployment.v1.apps/nginx-deployment
        - $ kubectl get rs
        - $ kubectl set resources deployment.v1.apps/nginx-deployment -c=nginx --limits=cpu=200m,memory=512Mi
        - $ kubectl rollout resume deployment.v1.apps/nginx-deployment
        - $ kubectl get rs -w

- Deployment status
        - A Deployment enters various states during its lifecycle. It can be progressing while rolling out a new ReplicaSet, it can be complete, or it can fail to progress.

        - Progressing Deployment
            Kubernetes marks a Deployment as progressing when one of the following tasks is performed:

        - The Deployment 
              - Creates a new ReplicaSet.
              - Scaling up its newest ReplicaSet.
              - Scaling down its older ReplicaSet(s).
              - New Pods become ready or available (ready for at least MinReadySeconds).
              - You can monitor the progress for a Deployment by using kubectl rollout status.    

- Complete Deployment
         - Kubernetes marks a Deployment as complete when it has the following characteristics:
         - All of the replicas associated with the Deployment have been updated to the latest version you've specified, meaning any updates you've requested  have been completed.
         - All of the replicas associated with the Deployment are available.
         - No old replicas for the Deployment are running.

- Failed Deployment 
         - Your Deployment may get stuck trying to deploy its newest ReplicaSet without ever completing. 
              This can occur due to some of the following factors:
                  - Insufficient quota
                  - Readiness probe failures
                  - Image pull errors
                  - Insufficient permissions
                  - Limit ranges
                  - Application runtime misconfiguration


         -  One way you can detect this condition is to specify a deadline parameter in your Deployment spec: 
            (.spec.progressDeadlineSeconds). .spec.progressDeadlineSeconds denotes the
            number of seconds the Deployment controller waits before indicating (in the Deployment status) 
            that the Deployment progress has stalled.

            The following kubectl command sets the spec with progressDeadlineSeconds to make the controller report 
            lack of progress for a Deployment after 10 minutes:

              $ kubectl patch deployment.v1.apps/nginx-deployment -p '{"spec":{"progressDeadlineSeconds":600}}'

         - Once the deadline has been exceeded, the Deployment controller adds a DeploymentCondition with the following attributes to the Deployment's .status.conditions:

                      Type=Progressing
                      Status=False
                      Reason=ProgressDeadlineExceeded

          - $ kubectl describe deployment nginx-deployment

- Operating on a failed deployment
          
          - Clean up Policy
          - Canary Deployment
          - Writing a Deployment Spec
          - Pod Template

- Strategy

        - .spec.strategy specifies the strategy used to replace old Pods by new ones. 
          .spec.strategy.type can be "Recreate" or "RollingUpdate". 
        - "RollingUpdate" is the default value
        
        - Recreate Deployment
            - All existing Pods are killed before new ones are created when .spec.strategy.type==Recreate.
    
        - Rolling Update Deployment
            - The Deployment updates Pods in a rolling update fashion when .spec.strategy.type==RollingUpdate. 
              You can specify maxUnavailable and maxSurge to control the rolling update process 
                 - Max Unavailable 
                      - .spec.strategy.rollingUpdate.maxUnavailable is an optional field that 
                        specifies the maximum number of Pods that can be unavailable during the update process
                 - Max Surge
                      - .spec.strategy.rollingUpdate.maxSurge is an optional field that specifies 
                         the maximum number of Pods that can be created over the desired number of Pods.    
        - Progress Deadline Seconds
                 - .spec.progressDeadlineSeconds is an optional field that specifies the number of 
                    seconds you want to wait for your Deployment to progress before the system 
                    reports back that the Deployment has failed progressing - 
                    surfaced as a condition with Type=Progressing, Status=False
        - Min Ready Seconds 
                 - .spec.minReadySeconds is an optional field that specifies the minimum number of seconds 
                    for which a newly created Pod should be ready without any of its containers crashing, 
                    for it to be considered available. This defaults to 0 (the Pod will be considered available as soon as it is ready)

        - Rollback To 
                 - Field .spec.rollbackTo has been deprecated in API versions extensions/v1beta1 and apps/v1beta1, and is no longer supported in API     versions  starting apps/v1beta2. Instead, kubectl rollout undo as introduced in Rolling Back to a Previous Revision should be used

        - Revision History Limit 
                 - A Deployment's revision history is stored in the ReplicaSets it controls.

                 - .spec.revisionHistoryLimit is an optional field that specifies the number of old ReplicaSets to retain to allow rollback. 
                   These old ReplicaSets consume resources in etcd and crowd the output of kubectl get rs
        - Paused
                 - .spec.paused is an optional boolean field for pausing and resuming a Deployment. 
                    The only difference between a paused Deployment and one that is not paused, is that any 
                    changes into the PodTemplateSpec of the paused Deployment will not trigger new rollouts as long as it is paused.
                    A Deployment is not paused by default when it is created.