
### rollout 
        - history
        - pause
        - restart
        - resume
        - status
        - undo

```
Replace a pod using the data in pod.json.
        kubectl replace -f ./pod.json


Replace a pod based on the JSON passed into stdin.
        cat pod.json | kubectl replace -f -


Update a single-container pod's image version (tag) to v4
        kubectl get pod mypod -o yaml | sed 's/\(image: myimage\):.*$/\1:v4/' | kubectl replace -f -


Force replace, delete and then re-create the resource
         kubectl replace --force -f ./pod.json

```