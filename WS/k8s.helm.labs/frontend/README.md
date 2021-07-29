# Working with frontend 
* ReactJS
* NGINX + reverse proxy
* [Docker multi-stages build](https://docs.docker.com/develop/develop-images/multistage-build/)

## Build image and run container
```
$docker image build -t frontend:1.0 .
$docker container run -d -p 80:80 frontend:1.0
```

Access to `http://localhost`

## Working with Docker compose
```
$docker-compose -f docker-compose-full.yml build

// Start database
$docker-compose -f docker-compose-full.yml up -d mongo
$docker-compose -f docker-compose-full.yml ps

// Start backend
$docker-compose -f docker-compose-full.yml up -d backend
$docker-compose -f docker-compose-full.yml ps

// Start frontend
$docker-compose -f docker-compose-full.yml up -d frontend
$docker-compose -f docker-compose-full.yml ps
```

Access to `http://localhost:8888`