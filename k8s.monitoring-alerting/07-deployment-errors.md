```
1.Image Pull errors - Check image tag value
 
  $ kubectl edit deployment/frontend
  $ kubectl get pods
  $ kubectl describe pods/frontend-5489947457-<random chars>
 
 Check events for docker registry image pull errors and fix it 
 
 $ kubectl edit deployment/frontend
 
  - Save the file, and the deployment should get automatically fixed. 
    You can verify it by getting the events for the pods again.
 
 Because we did a rolling update, 
   - the frontend was continuously available with zero downtime. 
   - Kubernetes recognized a problem with the new specification and stopped rolling out the changes automatically.
 
 
Note : Most of the errors encountered by the deployment team are configuration issues.
       
       $kubectl logs    # handy for looking for these issues 
       $kubectl exec 


```
