# Minikube

This directoty contains a Vagrant file. This file can be used in combination with [HashiCorp Vagrant](https://www.vagrantup.com/).

If you have vagrant and VirtualBox installed on your local system, you can start a prepared VM with `vagrant up`. After the startup is finished, connect to the VM with `vagrant ssh` and start minikube with `~/start-minikube.sh`.

If you want to connect from another maschine to the minikube VM, configure the IP address in the [Vagrantfile:9](Vagrantfile#L9). The current configuration exposes the VM on the IP address `192.168.178.150`.

This git repo can be found in the directoty `~/git/k8s-ws/` on the VM.

Happy learning!
