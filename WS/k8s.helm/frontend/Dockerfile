FROM node:14.15.4-alpine3.10 as builder
WORKDIR /src
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /src/build/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/nginx.conf