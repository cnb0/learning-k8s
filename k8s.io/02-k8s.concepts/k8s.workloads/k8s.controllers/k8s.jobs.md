## [Jobs](https://kubernetes.io/docs/concepts/workloads/controllers/job/)

```
      - A Job creates one or more Pods and ensures that a specified number of them successfully terminate 
      - As pods successfully complete, the Job tracks the successful completions
      - When a specified number of successful completions is reached, the task (ie, Job) is complete
      - Deleting a Job will clean up the Pods it created

      - A simple case is to create one Job object in order to reliably run one Pod to completion 
         The Job object will start a new Pod if the first Pod fails or is deleted 
         (for example due to a node hardware failure or a node reboot)

      - You can also use a Job to run multiple Pods in parallel.

```

                     apiVersion: batch/v1
                     kind: Job
                     metadata:
                        name: pi
                     spec:
                     template:
                        spec:
                           containers:
                           - name: pi
                             image: perl
                             command: ["perl",  "-Mbignum=bpi", "-wle", "print bpi(2000)"]
                           restartPolicy: Never
                     backoffLimit: 4

- Writing a Job spec
    - As with all other Kubernetes config, 
      a Job needs apiVersion, kind, and metadata fields. 
    - Its name must be a valid DNS subdomain name.

    - Only a RestartPolicy equal to Never or OnFailure is allowed
    
- Job is only appropriate for pods with RestartPolicy equal to OnFailure or Never
- If RestartPolicy is not set, the default value is Always

            
```                                                                                                      