#### fluentd example for logging - multi containers sharing volume which holds logs and an agent shipping them
* [fluentd example](https://kubernetes.io/docs/concepts/cluster-administration/logging/)
#### below is fluentd configmap
```bash
nano fluentd-conf.yaml
```
```
apiVersion: v1
kind: ConfigMap
metadata:
  name: fluentd-config
data:
  fluentd.conf: |
    <source>
      type tail
      format none
      path /var/log/1.log
      pos_file /var/log/1.log.pos
      tag count.format1
    </source>

    <source>
      type tail
      format none
      path /var/log/2.log
      pos_file /var/log/2.log.pos
      tag count.format2
    </source>

    <match **>
      type google_cloud
    </match>

```
```
k apply -f fluentd-conf.yaml
```
#### pod that spits two log files and agent shipping those log files 
```
admin/logging/two-files-counter-pod-agent-sidecar.yaml 

apiVersion: v1
kind: Pod
metadata:
  name: counter
spec:
  containers:
  - name: count
    image: busybox
    args:
    - /bin/sh
    - -c
    - >
      i=0;
      while true;
      do
        echo "$i: $(date)" >> /var/log/1.log;
        echo "$(date) INFO $i" >> /var/log/2.log;
        i=$((i+1));
        sleep 1;
      done
    volumeMounts:
    - name: varlog ## log files are written to this
      mountPath: /var/log
  - name: count-agent
    image: k8s.gcr.io/fluentd-gcp:1.30
    env: ## set as environment variable here 
    - name: FLUENTD_ARGS
      value: -c /etc/fluentd-config/fluentd.conf
    volumeMounts:
    - name: varlog ## log files volume mounted here
      mountPath: /var/log
    - name: config-volume ## configmap volume goes as config
      mountPath: /etc/fluentd-config
  volumes:
  - name: varlog
    emptyDir: {}
  - name: config-volume  ## configmap loaded as a volume here 
    configMap:
      name: fluentd-config
```