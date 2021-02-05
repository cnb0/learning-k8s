# Workshop :: Backend with NodeJS
* Express
* MongoDB

## Build Docker Image => [Node](https://hub.docker.com/_/node/), working with [Dockerfile](https://docs.docker.com/engine/reference/builder/)
```
$cd backend
$docker image build -t backend:0.1 .
```

## Create and run the container
```
$docker container run -d -p 3000:3000 backend:0.1
```
Access to `http://localhost:3000/api/users`

## Upload the image to Docker registry (Docker Hub)
```
$docker login
$docker image tag backend:0.1 <username>/backend:0.1
$docker image push <username>/backend:0.1
```

## Working with MongoDB + Docker network
```
// Create docker network
$docker network create demo

// Start mongodb container
$docker container run -d --net demo --name mongo mongo

// Start backend container
$docker container run -d --net demo --name backend -p 3000:3000 backend:0.1

// See all containers
$docker container ls

// See logs in backend
$docker container logs backend --follow
```
Access to `http://localhost:3000/api/users`

## Working with MongoDB + [Docker compose](https://docs.docker.com/compose/compose-file/compose-file-v3/)
```
$cd ..
$docker-compose build

// Start mongoDB
$docker-compose up -d mongo
$docker-compose ps

// Start Backend
$docker-compose up -d backend
$docker-compose ps

// See logs
$docker-compose logs --follow
```

Access to `http://localhost:3000/api/users`

Delete all containers and networks
```
$docker-compose down
```

## Seeding data into MongoDB
```
$docker-compose -f docker-compose-seed-data.yml build
$docker-compose -f docker-compose-seed-data.yml up -d mongo
```

Access to container
```
$docker-compose exec -T mongo bash
>mongo localhost/mongo-test
>db.getCollectionNames()
>db.User.find();
```
Start backend container
```
$docker-compose -f docker-compose-seed-data.yml up -d backend
```
Access to `http://localhost:3000/api/users`

Delete all containers and networks
```
$docker-compose -f docker-compose-seed-data.yml down
```
## Working with Frontend
* Nginx + reverse proxy

```
$cd fronend
$docker image build -t fronend:0.1 .
```

Working with docker compose
```
$docker-compose -f docker-compose-2.yml build
$docker-compose -f docker-compose-2.yml up -d mongo
$docker-compose -f docker-compose-2.yml up -d backend
$docker-compose -f docker-compose-2.yml up -d frontend
$docker-compose -f docker-compose-2.yml ps
```

Access to `http://localhost/api/users`