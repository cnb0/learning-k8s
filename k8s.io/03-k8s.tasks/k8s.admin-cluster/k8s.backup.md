## k8s resource backup

```
- Backup k8s resources 
    - resource config
    - etcd 
    - Persistent Volumes (PV)


- Back resource config 
         $ kubectl get all -A -o yaml > all-deply-svcs.yaml

       - velero - tool for backup  
            - Velero is an open source tool to safely backup and restore, 
              - perform disaster recovery 
              - migrate Kubernetes cluster resources 
              - persistent volumes.
- Backup etcd cluster
        - etcd.service
                --data-dir=/var/lib/etcd

        $ ETCDCTL_API=3 etcdctl   snapshot save   snapshot.db
        $ ls snapshot.db
        $ ETCDCTL_API=3  etcdctl  snapshot status snapshot.db 

- Restore etcd cluster         

            $ sudo service kube-apiserver stop
            $ ETCDCTL_API=3 etcdctl \
            snapshot restore snapshot.db \
            --data-dir /var/lib/etcd-from-backup \
            --initial-cluster master-1=https://192.168.5.11:2380,master-2=https://192.168.5.12:2380 \
            --initial-cluster-token etcd-cluster-1 \
            --initial-advertise-peer-urls https://${INTERNAL_IP}:2380
            
                - Check for 
                    --data-dir /var/lib/etcd-from-backup
                    --initial-cluster-token etcd-cluster-1 

            $ sudo systemctl daemon-reload
            $ sudo service etcd restart
            $ sudo service kube-apiserver start
            

            $ ETCDCTL_API=3 etcdctl \
              snapshot save snapshot.db \
              --endpoints=https://127.0.0.1:2379 \
              --cacert=/etc/etcd/ca.crt \
              --cert=/etc/etcd/etcd-server.crt \
              --key=/etc/etcd/etcd-server.key

```
