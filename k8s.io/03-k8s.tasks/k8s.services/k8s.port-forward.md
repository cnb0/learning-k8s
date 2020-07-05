- Basic kubectl port-forward Commands
   
       - The port-forward command establishes a tunnel from the target pod to your localhost. 

```
0. The command requires you to define the type or name of the resource as well as local and remote port numbers:
       
            $ kubectl port-forward TYPE/NAME [options] LOCAL_PORT:REMOTE_PORT
       
            - If several pods match the type/name criteria, a random one is selected by default. To avoid such inconsistencies, 
              define a pod as precisely as possible
            - Port forwarding is practical only when working with individual pods, and cannot be utilized for services.


1. kubectl port-forward to a Specific Pod
            - access a MongoDB deployment within your cluster. 
              The name of the pod is mongo-db-r3pl1ka3, and port number is 5762:

                    $ kubectl port-forward pod/mongo-db-r3pl1ka3 8080:5762

            - The Kubernetes API now listens on local port 8080 and 
              forwards data to port 5762 on the defined pod.

2. Random Local Port
            - Listen on a random port locally, and forward to port 5762 within the specified pod:
            
                    $ kubectl port-forward pod/mongo-db-r3pl1ka3 :5762

3. Corresponding Local and Remote Port
            
            - Listen and forward data using identical ports (8080, 5762) both locally and within the specific pod
            
                    $ kubectl port-forward pod/mongo-db-r3pl1ka3 8080 5762
                    
3. Random Local IP Address
            - Listen on port 8080 on any local address, forward to port 5762 in the specified pod:
              
                    $ kubectl port-forward --address 0.0.0.0 pod/mongo-db-r3pl1ka3 8888:5762

4. Specify Local IP Address for Port Forwarding
            - Listen on port 8080 on the localhost using the defined IP, forward to port 5762 in the pod:
              
                    $ kubectl port-forward --address localhost,10.153.40.102 pod/mongo-db-r3pl1ka3 8080:5762
            
5. Use Deployment to Select port-forward Pod
            - Listen and forward data using the same ports (8080 5762) both locally and within the pod. 
            - The Deployment defines which pod is to be used:
            
                    $ kubectl port-forward deployment/mydeployment 8080 5762
             
6. Allow Service to Define port-forward Pod
            - Listen and forward data using the same ports (8080 5762) both locally and within the pod.
            - The Service selects which pod is to be used:

                     $ kubectl port-forward service/myservice 8080 5762
