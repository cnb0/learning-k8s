
## Securing Pods/Containers 

```
- pod is the most fine-grained unit that serves as a placeholder to run microservices

 build and runtime stages

- To secure Kubernetes pods in the build stage, 
    - we need to harden  harden a container image and configure the security attributes of pods (or pod templates) 
      to reduce the attack surface. Although some of the security attributes of workloads, 
      such as AppArmor and SELinux labels, take effect in the runtime stage,
      security control has already been defined for the workload.
- to secure Kubernetes workloads by configuring the runtime effect security attributes in the build stage. 
- To secure Kubernetes pods in the runtime stage, we use PodSecurityPolicy  

- Security controls need to be applied from the build, deployment, and runtime stages. 
- It starts with hardening container images, and then configuring security attributes of Kubernetes workloads in a secure way. 
- This happens at the build stage. It is also important to build adaptive pod security policies for different Kubernetes workloads. 
- The goal is to restrict most of the workloads to run with limited privileges, 
  while allowing only a few workloads to run with extra privileges, and without breaking workload availability.
- This happens at the runtime stage. kube-psp-advisor is able to help build adaptive pod security policies.


- Hardening container images				
- Configuring the security attributes of pods				
- The power of PodSecurityPolicy


 - Container images and Dockerfiles
        - A container image is a file that bundles the microservice binary, its dependencies, and configurations of the microservice
        - A Dockerfile contains a series of instructions, such as copy files, configure environment variables, 
          configure open ports  container entry points, 
        - Dockerfile is used by Docker daemon to construct the image file 
        - Each Dockerfile instruction will create a file layer in the image

- security recommendations from CIS Docker benchmarks regarding container images

        - Create a user for a container image to run a microservice:
        - Use trusted base images to build your own image:
        - Do not install unnecessary packages in your image:
        - Scan and rebuild an image in order to apply security patches
        - Enable content trust for Docker
        - Add a HEALTHCHECK instruction to the container image
        - Ensure that updates are not cached in Dockerfile
        - Remove setuid and setgid permission from files in the image:
        - Use COPY instead of ADD in the Dockerfile
        - Do not store secrets in the Dockerfile
        - Install verified packages only

- Configuring the security attributes of pods
        - what privileges a microservice must have in order to perform tasks.
        - security attributes into four categories:	
        				- Setting host namespaces for pods
                        - Security context at the container level
                        - Security context at the pod level
                        - AppArmor profile
        
        - Setting host-level namespaces for pods
                - The following attributes in the pod specification are used to configure the use of host namespaces:			
                			- hostPID: 
                                    - By default, this is false. 
                                    - Setting it to true allows the pod to have visibility on all the processes in the worker node.
                            - hostNetwork: 
                                    - By default, this is false. 
                                    - Setting it to true allows the pod to have visibility on all the network stacks in the worker node.			 
                            - hostIPC: 
                                    - By default, this is false. 
                                    - Setting it to true allows the pod to have visibility on all the IPC resources in the worker node.
         
         - Security context for containers
                - Multiple containers can be grouped together inside the same pod. 
                - Each container can have its own security context, which defines privileges and access controls. 
                - The design of a security context at a container level provides a more fine-grained security control for Kubernetes workloads.
                        -  For example, you may have three containers running inside the same pod 
                               - one of them has to run in privileged mode 
                               - while the others run in non-privileged mode 
                               - This can be done by configuring a security context for individual containers

              - principal attributes of a security context for containers
                    - privileged: 
                            - By default, this is false. 
                            - Setting it to true essentially makes the processes inside the container equivalent 
                              to the root user on the worker node.
                        
                    - capabilities: 
                            - There is a default set of capabilities granted to the container by the container runtime.
                            - The default capabilities granted are as follows:
                               CAP_SETPCAP, CAP_MKNOD, CAP_AUDIT_WRITE, CAP_CHOWN, CAP_NET_RAW, CAP_DAC_OVERRIDE, CAP_FOWNER, CAP_FSETID, 
                               CAP_KILL, CAP_SETGID, CAP_SETUID, CAP_NET_BIND_SERVICE, CAP_SYS_CHROOT, and CAP_SETFCAP. 
                            - We may add extra capabilities or drop some of the defaults by configuring this attribute. 
                              Capabilities such as CAP_SYS_ADMIN and CAP_NETWORK_ADMIN should be added with caution. 
                               For the default capabilities, you should also drop those that are unnecessary.

                    - allowPrivilegeEscalation: 
                            - By default, this is true. 
                            - Setting it directly controls the no_new_privs flag, which will be set to the processes in the container. 
                            - Basically, this attribute controls whether the process can gain more privileges than its parent process. 
                            - Note that if the container runs in privileged mode, or has the CAP_SYS_ADMN capability added, 
                              this attribute will be set to true automatically. It is good practice to set it to false.

                    - readOnlyRootFilesystem: 
                            - By default, this is false. 
                            - Setting it to true makes the root filesystem of the container read-only, 
                              which means that the library files, configuration files, and so on are read-only and cannot be tampered with. 
                            - It is a good security practice to set it to true.

                    - runAsNonRoot: 
                            - By default, this is false.
                            - Setting it to true enables validation that the processes in the container cannot run as a root user (UID=0). 
                            - Validation is done by kubelet. With runAsNonRoot set to true, kubelet will prevent the container from starting 
                              if run as a root user. 
                            - It is a good security practice to set it to true. 
                            - This attribute is also available in PodSecurityContext, which takes effect at pod level. 
                            - If this attribute is set in both SecurityContext and PodSecurityContext, 
                              the value specified at the container level takes precedence.

                    - runAsUser: 
                            - This is designed to specify to the UID to run the entrypoint process of the container image. 
                            - The default setting is the user specified in the image's metadata (for example, the USER instruction in the Dockerfile). 
                            - This attribute is also available in PodSecurityContext, which takes effect at the pod level. 
                            - If this attribute is set in both SecurityContext and PodSecurityContext, the value specified
                              at the container level takes precedence.

                    - runAsGroup: 
                            - Similar to runAsUser, this is designed to specify the Group ID or GID 
                              to run the entrypoint process of the container. 
                            - This attribute is also available in PodSecurityContext, which takes effect at the pod level. 
                            - If this attribute is set in both SecurityContext and PodSecurityContext, 
                              the value specified at the container level takes precedence.

                     - seLinuxOptions: 
                            - This is designed to specify the SELinux context to the container. 
                            - By default, the container runtime will assign a random SELinux context to the container if not specified. 
                            - This attribute is also available in PodSecurityContex, which takes effect at the pod level. 
                            - If this attribute is set in both SecurityContext and PodSecurityContext, 
                              the value specified at the container level takes precedence

        - Security context for pods
                - A security context is used at the pod level, which means that security attributes will be applied to all the containers inside the pod.
                - principal security attributes at the pod level:

                      - fsGroup: 
                            - This is a special supplemental group applied to all containers. 
                            - The effectiveness of this attribute depends on the volume type. 
                            - Essentially, it allows kubelet to set the ownership of the mounted volume to the pod with the supplemental GID.
                      - sysctls: 
                            - sysctls is used to configure kernel parameters at runtime. 
                            - In such a context, sysctls and kernel parameters are used interchangeably. 
                            - These sysctls commands are namespaced kernel parameters that apply to the pod. 
                            - The following sysctls commands are known to be namespaced: 
                                - kernel.shm*, kernel.msg*, kernel.sem, and kernel.mqueue.*. 
                            - Unsafe sysctls are disabled by default and should not be enabled in production environments.
                        - runAsUser: 
                            - This is designed to specify the UID to run the entrypoint process of the container image. 
                            - The default setting is the user specified in the image's metadata (for example,
                              the USER instruction in the Dockerfile).
                            - This attribute is also available in SecurityContext, which takes effect at the container level. 
                            - If this attribute is set in both SecurityContext and PodSecurityContext, 
                              the value specified at the container level takes precedence.
                        
                        - runAsGroup: 
                            - Similar to runAsUser, this is designed to specify the GID to run the entrypoint process of the container. 
                            - This attribute is also available in SecurityContext, which takes effect at the container level. 
                            - If this attribute is set in both SecurityContext and PodSecurityContext, the value specified at the 
                              container level takes precedence.

                        - runAsNonRoot: 
                                - Set to false by default, setting it to true enables validation that the processes in 
                                  the container cannot run as a root user (UID=0). 
                                - Validation is done by kubelet. By setting it to true, kubelet will prevent the container 
                                  from starting if run as a root user. 
                                - It is a good security practice to set it to true. This attribute is also available in SecurityContext, 
                                  which takes effect at the container level. 
                                - If this  attribute is set in both SecurityContext and PodSecurityContext,
                                  the value specified at the container level takes precedence.

                        - seLinuxOptions: 
                                - This is designed to specify the SELinux context to the container.
                                - By default, the container runtime will assign a random SELinux context to the container if not specified. 
                                - This attribute is also available in SecurityContext, which takes effect at the container level. 
                                - If this attribute is set in both SecurityContext and PodSecurityContext, 
                                  the value specified at the container level takes precedence.

        -  the attributes are available both in SecurityContext at the container level and PodSecurityContext at the pod level
                     - runAsUser, runAsGroup, runAsNonRoot, and seLinuxOptions 
                     . This gives users both the flexibility and extreme importance of security control

        - AppArmor profiles			
                - An AppArmor profile usually defines what Linux capabilities the process owns, 
                  what network resources and files can be accessed by the container, and so on. 
                - In order to use an AppArmor profile to protect pods or containers, you will need to update the annotation of the pod

        - Security Best practices
            - Do not run in privileged mode unless necessary.		
            - Do not add extra capabilities unless necessary.
            - Drop unused default capabilities.
            - Run containers as a non-root user.	
            - Enable a runAsNonRoot check.
            - Set the container root filesystem as read-only.
    
    
    - PodSecurityPolicy
        - A Kubernetes PodSecurityPolicy is a cluster-level resource that controls security-sensitive
          aspects of the pod specification through which the access privileges of a Kubernetes pod are limited. 
        
        - As a DevOps engineer, we  want to use a PodSecurityPolicy to restrict most of the workloads run in limited access privileges, 
          while only allowing a few workloads to be run with extra privileges
        
        - PodSecurityPolicy as a policy to evaluate the security attributes defined in the pod's specification.
          Only those pods whose security attributes meet the requirements of PodSecurityPolicy will be admitted to the cluster. 
            - For example, PodSecurityPolicy can be used to block the launch of most privileged pods, 
                          while only allowing those necessary or limited pods access to the host filesystem

        - principal security attributes that are controlled by PodSecurityPolicy

                        - privileged: 
                                - Determines whether a pod can run in privileged mode.				
                        - hostPID
                                - Determines whether a pod can use a host PID namespace.			
      	                - hostNetwork
                                - Determines whether a pod can use a host network namespace. 			
          	            - hostIPC
                                - Determines whether a pod can use a host IPC namespace. The default setting is true.		
              		    - allowedCapabilities
                                - Specifies a list of capabilities that could be added to containers. The default setting is empty.				
                        - defaultAddCapabilities: 
                                - Specifies a list of capabilities that will be added to containers by default. The default setting is empty.				
                        - requiredDropCapabilities: 
                                - Specifies a list of capabilities that will be dropped from containers. 
                                - Note that a capability cannot be specified in both the allowedCapabilities and requiredDropCapabilities fields.
                                  The default setting is empty.			
                      	- readOnlyRootFilesystem: 
                                - When set to true, the PodSecurityPolicy will force containers to run with a read-only root filesystem.
                                - If the attribute is set to false - explicitly in the security context of the container, the pod will be denied from running. 
                                - The default setting is false.	
                        - runAsUser: 
                                - Specifies the allowable user IDs that may be set in the security context of pods and containers. 
                                  The default setting allows all.			
                        - runAsGroup:
                                - Specifies the allowable group IDs that may be set in the security context of pods and containers.
                                - The default setting allows all.				
                        - allowPrivilegeEscalation: 
                                - Determines whether a pod can submit a request to allow privilege escalation. 
                                - The default setting is true.				
                        - allowedHostPaths: 
                                - Specifies a list of host paths that could be mounted by the pod. The default setting allows all.		
                        - volumes: 
                                - Specifies a list of volume types that can be mounted by the pod. 
                                - For example, secret, configmap, and hostpath are the valid volume types. 
                                - The default setting allows all.			
                        - seLinux: 
                                - Specifies the allowable seLinux labels that may be set in the security context of pods and containers. 
                                  The default setting allows all.			
                        - allowedUnsafeSysctl: Allows unsafe sysctls to run. The default setting allows none.
                

        - Kubernetes PodSecurityPolicy Advisor
               - Kubernetes PodSecurityPolicy Advisor (also known as kube-psp-advisor) .
               - It scans the security attributes of running workloads in the cluster and  then, on this basis, 
                 recommends pod security policies for your cluster or workload