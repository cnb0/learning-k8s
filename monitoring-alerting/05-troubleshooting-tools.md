# Tools for Troubleshooting

This chapter is about tools for troubleshooting kubernetes.

## Essential tools

- `kubectl`: for interacting with kubernetes cluster, e.g. `kubectl describe pod <pod-name>`
- `journalctl`：for viewing logs, e.g. `journalctl -u kubelet -l`
- `iptables` and `ebtables`：for debugging service problems, e.g. `iptables -t nat -nL` checks whether kube-proxy's iptables rules are expected
- `tcpdump`：for debugging network problems, e.g. `tcpdump -nn host 10.240.0.8`
- `perf`: for debugging performance issues, e.g. troubleshooting issues like [Container Isolation Gone Wrong](https://dzone.com/articles/container-isolation-gone-wrong) 

## sysdig

[sysdig](https://www.sysdig.org/) is a container troubleshooting tools, which provides both opensource and commercial products. For regular troubleshooting, I believe opensourced version is enough.

On top of sysdig, you can also use csysdig and [sysdig-inspect](https://github.com/draios/sysdig-inspect) as command line interface and GUI.

### Setup

```sh
# on Ubuntu
curl -s https://s3.amazonaws.com/download.draios.com/DRAIOS-GPG-KEY.public | apt-key add -
curl -s -o /etc/apt/sources.list.d/draios.list http://download.draios.com/stable/deb/draios.list
apt-get update
apt-get -y install linux-headers-$(uname -r)
apt-get -y install sysdig

# on REHL
rpm --import https://s3.amazonaws.com/download.draios.com/DRAIOS-GPG-KEY.public
curl -s -o /etc/yum.repos.d/draios.repo http://download.draios.com/stable/rpm/draios.repo
rpm -i http://mirror.us.leaseweb.net/epel/6/i386/epel-release-6-8.noarch.rpm
yum -y install kernel-devel-$(uname -r)
yum -y install sysdig

# on MacOS
brew install sysdig
```

### Examples

```sh
# Refer https://www.sysdig.org/wiki/sysdig-examples/.
# View the top network connections
sudo sysdig -pc -c topconns
# View the top network connections inside the wordpress1 container
sudo sysdig -pc -c topconns container.name=wordpress1

# Show the network data exchanged with the host 192.168.0.1
sudo sysdig fd.ip=192.168.0.1
sudo sysdig -s2000 -A -c echo_fds fd.cip=192.168.0.1
 
# List all the incoming connections that are not served by apache.
sudo sysdig -p"%proc.name %fd.name" "evt.type=accept and proc.name!=httpd"

# View the CPU/Network/IO usage of the processes running inside the container.
sudo sysdig -pc -c topprocs_cpu container.id=2e854c4525b8
sudo sysdig -pc -c topprocs_net container.id=2e854c4525b8
sudo sysdig -pc -c topfiles_bytes container.id=2e854c4525b8

# See the files where apache spends the most time doing I/O
sudo sysdig -c topfiles_time proc.name=httpd

# Show all the interactive commands executed inside a given container.
sudo sysdig -pc -c spy_users 

# Show every time a file is opened under /etc.
sudo sysdig evt.type=open and fd.name

# View the list of processes with container context
sudo csysdig -pc
```

More usages could be found at  [Sysdig User Guide](https://github.com/draios/sysdig/wiki/Sysdig-User-Guide).

 
