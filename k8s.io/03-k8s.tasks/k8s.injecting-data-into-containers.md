
[Inject Data into Conatiners](https://kubernetes.io/docs/tasks/inject-data-application/)
- Specify configuration and other data for the Pods that run your workload.

```
- Define a Command and Arguments for a Container
     - define commands and arguments
                -  when you run a Container in a Pod
                -  when you create a Pod
                    - When you create a Pod, you can define a command and arguments for the containers that run in the Pod. 
                    To define a command, include the command field in the configuration file. 
                    To define arguments for the command, include the args field in the configuration file. 
                    The command and arguments that you define cannot be changed after the Pod is created.

                     - The command and arguments that you define in the configuration file override the default command and 
                       arguments provided by the container image. If you define args, but do not define a command, 
                       the default command is used with your new arguments.
                     - The command field corresponds to entrypoint in some container runtimes
      - Use environment variables to define arguments
          - ConfigMaps and Secrets 
          - The environment variable appears in parentheses, "$(VAR)". 
            This is required for the variable to be expanded in the command or args field
      - Run a command in a shell
           -  command: ["/bin/sh"]
              args: ["-c", "while true; do echo hello; sleep 10;done"]
            - When you override the default Entrypoint and Cmd, these rules apply:
                    - If you do not supply command or args for a Container, the defaults 
                      defined in the Docker image are used.
                    - If you supply a command but no args for a Container, only the supplied command is used. 
                      The default EntryPoint and the default Cmd defined in the Docker image are ignored.
                    - If you supply only args for a Container, the default Entrypoint defined in the Docker image 
                      is run with the args that you supplied.
                    - If you supply a command and args, the default Entrypoint and the default Cmd defined in the 
                      Docker image are ignored. Your command is run with your args.

- Define Environment Variables for a Container in a pod
        - When you create a Pod, you can set environment variables for the containers that run in the Pod. 
          To set environment variables, include the env or envFrom field in the configuration file.
                 containers:
                    - name: envar-demo-container
                      image: gcr.io/google-samples/node-hello:1.0
                      env:
                        - name: DEMO_GREETING
                          value: "Hello from the environment"
                        - name: DEMO_FAREWELL
                          value: "Such a sweet sorrow"
        - Using environment variables inside of your config
                  containers:
                     - name: envar-demo-container
                       image: gcr.io/google-samples/node-hello:1.0
                       env:
                         - name: DEMO_GREETING
                           value: "Hello from the environment"
                         - name: DEMO_FAREWELL
                           value: "Such a sweet sorrow"
                         - name: NAME
                           value: "Kubernetes"
                       command: ["echo"]
                       args: ["$(DEMO_GREETING) $(DEMO_FAREWELL) $(NAME)"]

- Expose Pod Information to Containers Through Environment Variables
         
         - A Pod can use environment variables to expose information about itself to Containers 
           running in the Pod. Environment variables can expose Pod fields and Container fields
         
         - The Downward API
                - It is sometimes useful for a Container to have information about itself, 
                  without being overly coupled to Kubernetes. The Downward API allows containers 
                  to consume information about themselves or the cluster without using the Kubernetes client or API server.
                
                - An example is an existing application that assumes a particular well-known environment 
                  variable holds a unique identifier. One possibility is to wrap the application, but that is tedious and 
                  error prone, and it violates the goal of low coupling. A better option would be to use the Pod's name
                  as an identifier, and inject the Pod's name into the well-known environment variable.
                
                - There are two ways to expose Pod and Container fields to a running Container:
                    - Environment variables
                    - Volume Files
                   Together, these two ways of exposing Pod and Container fields are called the Downward API
                
         - Use Pod fields as values for environment variables 
              -  The env field is an array of EnvVars (Pods )
                 The first element in the array specifies that the MY_NODE_NAME environment variable
                 gets its value from the Pod's spec.nodeName
              -  The fields below are Pod fields. They are not fields of the Container in the Pod.

                        env:
                        - name: MY_NODE_NAME
                        valueFrom:
                            fieldRef:
                            fieldPath: spec.nodeName
                        - name: MY_POD_NAME
                        valueFrom:
                            fieldRef:
                            fieldPath: metadata.name
                        - name: MY_POD_NAMESPACE
                        valueFrom:
                            fieldRef:
                            fieldPath: metadata.namespace
                        - name: MY_POD_IP
                        valueFrom:
                            fieldRef:
                            fieldPath: status.podIP
                        - name: MY_POD_SERVICE_ACCOUNT
                        valueFrom:
                            fieldRef:
                            fieldPath: spec.serviceAccountName

          - Use Container fields as values for environment variables
                    - The env field is an array of EnvVars. The first element in the array specifies that the 
                      MY_CPU_REQUEST environment variable gets its value from the requests.cpu field of a 
                      Container named test-container

                            resources:
                                requests:
                                memory: "32Mi"
                                cpu: "125m"
                                limits:
                                memory: "64Mi"
                                cpu: "250m"
                            env:
                                - name: MY_CPU_REQUEST
                                valueFrom:
                                    resourceFieldRef:
                                    containerName: test-container
                                    resource: requests.cpu
                                - name: MY_CPU_LIMIT
                                valueFrom:
                                    resourceFieldRef:
                                    containerName: test-container
                                    resource: limits.cpu
                                - name: MY_MEM_REQUEST
                                valueFrom:
                                    resourceFieldRef:
                                    containerName: test-container
                                    resource: requests.memory
                                - name: MY_MEM_LIMIT
                                valueFrom:
                                    resourceFieldRef:
                                    containerName: test-container
                                    resource: limits.memory


- Expose Pod Information to Containers Through Files
                -  A Pod can use a DownwardAPIVolumeFile to expose information about itself to Containers running in the Pod. 
                   A DownwardAPIVolumeFile can expose Pod fields and Container fields

                - Store Container fields
                   -  Pod has a downwardAPI Volume, and the Container mounts the Volume at /etc/podinfo.
                         - Items array under downwardAPI. Each element of the array is a DownwardAPIVolumeFile.
                         - The first element specifies that in the Container named client-container, the value of the 
                           limits.cpu field in the format specified by 1m should be stored in a file named cpu_limit

                               volumeMounts:
                                    - name: podinfo
                                    mountPath: /etc/podinfo
                            volumes:
                                - name: podinfo
                                downwardAPI:
                                    items:
                                    - path: "cpu_limit"
                                        resourceFieldRef:
                                        containerName: client-container
                                        resource: limits.cpu
                                        divisor: 1m
                                    - path: "cpu_request"
                                        resourceFieldRef:
                                        containerName: client-container
                                        resource: requests.cpu
                                        divisor: 1m
                                    - path: "mem_limit"
                                        resourceFieldRef:
                                        containerName: client-container
                                        resource: limits.memory
                                        divisor: 1Mi
                                    - path: "mem_request"
                                        resourceFieldRef:
                                        containerName: client-container
                                        resource: requests.memory
                                        divisor: 1Mi

                -  If CPU and memory limits are not specified for a Container, the Downward API defaults to the node 
                   allocatable value for CPU and memory

                -  Store Pod fields
                     - In the configuration file, you can see that the Pod has a downwardAPI Volume, 
                       and the Container mounts the Volume at /etc/podinfo.
                     - the items array under downwardAPI. Each element of the array is a DownwardAPIVolumeFile.
                     - first element specifies that the value of the Pod's metadata.labels field 
                       should be stored in a file named labels
                       ```
                            volumeMounts:
                                - name: podinfo
                                mountPath: /etc/podinfo
                        volumes:
                            - name: podinfo
                            downwardAPI:
                                items:
                                - path: "labels"
                                    fieldRef:
                                    fieldPath: metadata.labels
                                - path: "annotations"
                                    fieldRef:
                                    fieldPath: metadata.annotations
                       ```
                - Project keys to specific paths and file permissions ( secrets )
                     - You can project keys to specific paths and specific permissions on a per-file basis using secrets

- Distribute Credentials Securely Using Secrets
        -  securely inject sensitive data, such as passwords and encryption keys, into Pods
           - Convert your secret data to a base-64 representation
                - if you want to have two pieces of secret data: a username my-app and a password 39528$vdg7Jb. 
                  use a base64 encoding tool to convert your username and password to a base64 representation
                        $ echo -n 'my-app' | base64
                        $ echo -n '39528$vdg7Jb' | base64
                - Use a local tool trusted by your OS to decrease the security risks of external tools.
           - Create a Secret
                        apiVersion: v1
                        kind: Secret
                        metadata:
                          name: test-secret
                        data:
                          username: bXktYXBw
                          password: Mzk1MjgkdmRnN0pi
           - Create a Secret directly with kubectl 
                $ kubectl create secret generic test-secret --from-literal='username=my-app' --from-literal='password=39528$vdg7Jb'

           - Create a Pod that has access to the secret data through a Volume
                    spec:
                        containers:
                          - name: test-container
                            image: nginx
                            volumeMounts:
                                # name must match the volume name below
                                - name: secret-volume 
                                  mountPath: /etc/secret-volume
                        # The secret data is exposed to Containers in the Pod through a Volume.
                        volumes:
                            - name: secret-volume
                            secret:
                                secretName: test-secret

            - Define container environment variables using Secret data 
                
                - Define an environment variable as a key-value pair in a Secret
                      $ kubectl create secret generic backend-user --from-literal=backend-username='backend-admin'
                - Assign the backend-username value defined in the Secret to the SECRET_USERNAME 
                  environment variable in the Pod specification
                                spec:
                                  containers:
                                   - name: envars-test-container
                                     image: nginx
                                     env:
                                      - name: SECRET_USERNAME
                                        valueFrom:
                                          secretKeyRef:
                                             name: backend-user
                                             key: backend-username
                - $ kubectl exec -it env-single-secret -- /bin/sh -c 'echo $SECRET_USERNAME'

            - Define container environment variables with data from multiple Secrets
                  - $ kubectl create secret generic backend-user --from-literal=backend-username='backend-admin'
                  - $ kubectl create secret generic db-user --from-literal=db-username='db-admin'
                                spec:
                                    containers:
                                    - name: envars-test-container
                                      image: nginx
                                      env:
                                       - name: BACKEND_USERNAME
                                         valueFrom:
                                           secretKeyRef:
                                              name: backend-user
                                              key: backend-username
                                        - name: DB_USERNAME
                                         valueFrom:
                                           secretKeyRef:
                                              name: db-user
                                              key: db-username
                - $ kubectl exec -i -t envvars-multiple-secrets -- /bin/sh -c 'env | grep _USERNAME'

            - Configure all key-value pairs in a Secret as container environment variables
                  - Create a Secret containing multiple key-value pairs
                       $ kubectl create secret generic test-secret --from-literal=username='my-app' --from-literal=password='39528$vdg7Jb'
                  - Use envFrom to define all of the Secret’s data as container environment variables. 
                    The key from the Secret becomes the environment variable name in the Pod.
                                metadata:
                                    name: envfrom-secret
                                spec:
                                  containers:
                                    - name: envars-test-container
                                      image: nginx
                                      envFrom:
                                         - secretRef:
                                            name: test-secret
                  - $ kubectl exec -i -t envfrom-secret -- /bin/sh -c 'echo "username: $username\npassword: $password\n"'

- Inject Information into Pods Using a PodPreset API object- .k8s.io/v1alpha1/podpreset - Kubernetes v1.6 [alpha]]
        
        - PodPresets are objects for injecting certain information into pods at creation time. 
          The information can include secrets, volumes, volume mounts, and environment variables
          - A PodPreset is an API resource for injecting additional runtime requirements into a Pod at creation time. 
            You use label selectors to specify the Pods to which a given PodPreset applies.
          - Using a PodPreset allows pod template authors to not have to explicitly provide all information for every pod. 
            This way, authors of pod templates consuming a specific service do not need to know all the details about that service
        - Enable PodPreset in your cluster
        - Use Pod presets to inject environment variables and volumes
        - Pod spec with ConfigMap
        - ReplicaSet with Pod spec
        - Multiple Pod presets

```