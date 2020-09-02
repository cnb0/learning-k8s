

## Container Patterns  - SOLID principles for cloud native applications


```

- Cloud native applications anticipate failure; they run and scale reliably 
  even when their infrastructure experiences outages.

- To offer such capabilities, cloud native platforms like Kubernetes 
  impose a set of contracts on applications. 
  
- These contracts ensure that applications they run conform to certain constraints and 
  allow the platform to automate application management


- The build time principles ensure that containers have the right granularity, consistency, 
  and structure in place. 

- The runtime principles dictate what functionalities must be implemented in order 
  for containerized applications to possess cloud native function. 

- Adhering build and runtime principles, we are more likely to create containerized applications 
  that are better suited for automation in cloud native platforms such as Kubernetes. 


- Build time:

        - Single Concern
                -  Each container addresses a single concern and does it well.

        - Self-Containment
                - A container relies only on the presence of the Linux kernel. 
                  Additional libraries are added when the container is built.

        - Image Immutability
                -  Containerized applications are meant to be immutable, and 
                   once built are not expected to change between different environments.

- Runtime:
        - High Observability
               - Every container must implement all necessary APIs to help the platform observe and 
                 manage the application in the best way possible.

        - Lifecycle Conformance: 
               - A container must have a way to read events coming from the platform and 
                 conform by reacting to those events.

        - Process Disposability: 
               - Containerized applications must be as ephemeral as possible and
                 ready to be replaced by another container instance at any point in time.

        - Runtime Confinement: 
               - Every container must declare its resource requirements and 
                 restrict resource use to the requirements indicated.


- Aim for small images. 
                - Create smaller images by cleaning up temporary files and avoiding the installation of 
                  unnecessary packages. 
                  This reduces container size, build time, and networking time when copying container images.

- Support arbitrary user IDs. 
                - Avoid using the sudo command or requiring a specific userid to run your container.

- Mark important ports. 
                - While it is possible to specify port numbers at runtime,
                  specifying them using the EXPOSE command makes it easier for both humans and 
                  software to use your image.

- Use volumes for persistent data. 
                - The data that needs to be preserved after a container is destroyed must be written to a volume.

- Set image metadata. 
                - Image metadata in the form of tags, labels, and annotations makes your container images more usable, 
                  resulting in a better experience for developers using your images.

- Synchronize host and image. 
                - Some containerized applications require the container to be synchronized 
                  with the host on certain attributes such as time and machine ID.


```
