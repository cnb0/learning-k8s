[CronJob](https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/)

Run Jobs using parallel processing.

```
    - Use a CronJob to run Jobs on a time-based schedule. 
      These automated jobs run like Cron tasks on a Linux or UNIX system.

    - Cron jobs are useful for creating periodic and recurring tasks, 
      like running backups or sending emails. 
      Cron jobs can also schedule individual tasks for a specific time, such as
      if you want to schedule a job for a low activity period

    - Cron jobs have limitations and idiosyncrasies 
      For example, in certain circumstances, a single cron job can create multiple jobs 
      Therefore, jobs should be idempotent.

    - A CronJob creates Jobs on a repeating schedule

    - All CronJob schedule: times are based on the timezone of the kube-controller-manager

    - When creating the manifest for a CronJob resource, 
      make sure the name you provide is a valid DNS subdomain name.


1. CronJob
    - CronJobs are useful for creating periodic and recurring tasks, like running backups or sending emails. 
    - CronJobs can also schedule individual tasks for a specific time, such as scheduling a Job for 
      when your cluster is likely to be idle
                        apiVersion: batch/v1beta1
                        kind: CronJob
                        metadata:
                            name: hello
                        spec:
                            schedule: "*/1 * * * *"
                        jobTemplate:
                            spec:
                            template:
                                spec:
                                containers:
                                - name: hello
                                    image: busybox
                                    args:
                                    - /bin/sh
                                    - -c
                                    - date; echo Hello from the Kubernetes cluster
                                restartPolicy: OnFailure

        - Writing a Cron Job Spec : A cron job config also needs a .spec section
             Schedule : 
                     - The .spec.schedule is a required field of the .spec
                     - It takes a Cron format string, such as 0 * * * * or @hourly, as schedule time of its jobs to be created and executed.

        - Job Template
             - The .spec.jobTemplate is the template for the job, and it is required.
             - It has exactly the same schema as a Job, except that it is nested and does not have an apiVersion or kind
        
        - Starting Deadline
            - The .spec.startingDeadlineSeconds field is optional 
                - It stands for the deadline in seconds for starting the job
                  if it misses its scheduled time for any reason 
            - After the deadline, the cron job does not start the job 
            - Jobs that do not meet their deadline in this way count as failed jobs 
              - If this field is not specified, the jobs have no deadline

        - The CronJob controller counts how many missed schedules happen for a cron job. 
           - If there are more than 100 missed schedules, the cron job is no longer scheduled. 

        - When .spec.startingDeadlineSeconds is not set, 
           - the CronJob controller counts missed schedules from status.lastScheduleTime until now.

        - For example, one cron job is supposed to run every minute, 
          - the status.lastScheduleTime of the cronjob is 5:00am, but now it's 7:00am. 
          - That means 120 schedules were missed, so the cron job is no longer scheduled.

        - If the .spec.startingDeadlineSeconds field is set (not null), 
           - The CronJob controller counts how many missed jobs occurred 
             from the value of .spec.startingDeadlineSeconds until now.


- Concurrency Policy
            - The .spec.concurrencyPolicy field is also optional. It specifies how to treat concurrent executions of a job that is created by this cron job. 
              The spec may specify only one of the following concurrency policies:

                Allow (default): The cron job allows concurrently running jobs

            - Forbid: The cron job does not allow concurrent runs; if it is time for a new job run and the previous job run hasn't finished yet 
              the cron job skips the new job run

            - Replace: If it is time for a new job run and the previous job run hasn't finished yet, the cron job replaces the currently running 
              job run with  a new job run 
              Note that concurrency policy only applies to the jobs created by the same cron job 
              If there are multiple cron jobs, their respective jobs are always allowed to run concurrently

- Suspend
            - The .spec.suspend field is also optional. If it is set to true, all subsequent executions are suspended 
              - This setting does not apply to already started executions. Defaults to false.

- Jobs History Limits 
            - The .spec.successfulJobsHistoryLimit and .spec.failedJobsHistoryLimit fields are optional. 
            - These fields specify how many completed and failed jobs  should be kept. 
              - By default, they are set to 3 and 1 respectively. 
              - Setting a limit to 0 corresponds to keeping none of the corresponding kind of jobs  after they finish.

```

