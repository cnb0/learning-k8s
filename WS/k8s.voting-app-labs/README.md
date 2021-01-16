# Example Voting App

## Architecture

![Architecture diagram](architecture.png)

- A front-end web app in [Python](/vote)
- A [Java](/worker) worker which consumes votes and stores
- A [Redis](https://hub.docker.com/_/redis/) queue which collects new votes
- A [Postgres](https://hub.docker.com/_/postgres/) database backed by a Docker volume
- A [Node.js](/result) webapp which shows the results of the voting in real time

## Working with Docker compose

```
docker-compose up
```

The app will be running at [http://localhost:5000](http://localhost:5000), and the results will be at [http://localhost:5001](http://localhost:5001).

## Working with Docker swarm

```
docker swarm init
```

Once you have your swarm, in this directory run:

```
docker stack deploy --compose-file docker-stack.yml vote
```

The app will be running at [http://localhost:5000](http://localhost:5000), and the results will be at [http://localhost:5001](http://localhost:5001).

## Working with Kubernetes

The folder k8s contains the yaml specifications of the Voting App's services.

First create the vote namespace

```
$ kubectl create namespace vote
```

Run the following command to create the deployments and services objects:

```
$ kubectl create -f k8s/
deployment "db" created
service "db" created
deployment "redis" created
service "redis" created
deployment "result" created
service "result" created
deployment "vote" created
service "vote" created
deployment "worker" created
```

The vote interface is then available on port 31000 on each host of the cluster, the result one is available on port 31001.

## Working with Helm

TODO
