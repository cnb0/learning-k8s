# Docker: Beyond the Basics lab setup

## *Note*: Student should run through all of this setup *BEFORE* class.

### You will need a current and working copy of `docker` and `docker-compose` installed on your system before class starts.

## Prerequisites for this course:

* A recent computer and OS
    * Recent Linux, OS X, or 64bit Windows 10 (Pro, Enterprise and Education editions).
    * root/admin rights
    * Sufficient resources to run one 4 CPU virtual machine (VM)
    * CPU Virtualization extensions MUST be enabled in your BIOS/EFI 
        * This is likely only an issue if you have NEVER run a virtual machine on your system and are using a PC-based system.
* Reliable and fast internet connectivity
    * We will be downloading a few 100MB of docker images, etc.
* A text editor (or IDE)
* Git client
* Docker Desktop Edition (macOS/Windows)
    * Includes Docker Compose
    * Configured for Linux Containers (*NOT* Windows Containers)
* Docker Community Edition (Linux)
* Basic comfort with the Unix command line will be helpful.
* [optional] wget utility
* [optional] curl utility
* [optional] jq utility
* [optional] SSH client

## Tool Requirements:

Ensure that you have these pre-installed:

* Package Manager (Installation Tool)
    * (Windows) - Scoop (https://github.com/lukesampson/scoop)
    * (OS X) - Homebrew (https://brew.sh/)
    * (Linux) - apt, yum, dnf, apk, etc.
* Docker Desktop Edition
    * (macOS/Windows): https://www.docker.com/products/docker-desktop(https://www.docker.com/products/docker-desktop)
* Docker Community Edition
    * (Linux): [https://docs.docker.com/install/](https://docs.docker.com/install/)
* Docker Compose
    * (Linux): [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)
* Text Editor / IDE
    * (All): One option - [https://code.visualstudio.com/](https://code.visualstudio.com/)
* Git 
    * (All): Install via package manager, if not pre-installed.
* [optional] wget
    * (All): Install via package manager, if not pre-installed.
* [optional] curl
    * (All): Install via package manager, if not pre-installed.

## Warming the Cache

Running the following commands, after you have installed Docker Community Edition, will download and install some of the larger files that we will need to download during class, saving everyone time and bandwidth.

* From the command line on the system where you will be using the docker client (development workstation) run:

```
cd $HOME
mkdir docker-class-201
cd docker-class-201
mkdir code
# **NOTE:** It is important that this code end up in %HOMEPATH%/docker-class-201/layout
git clone https://github.com/spkane/docker201.git layout --config core.autocrlf=input
docker pull jenkinsci/jenkins:2.150.1
docker pull golang:1.9.4
docker pull alpine:latest
docker pull debian:latest
docker pull postgres:11.1
docker pull gogs/gogs:0.11.66
docker pull registry:2.6.2
docker pull spkane/dc-201-jenkins:latest
docker pull spkane/quantum-game:latest
```
