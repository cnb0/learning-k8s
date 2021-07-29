FROM node:15.5.1-alpine3.11
WORKDIR /app
RUN npm install -g nodemon
COPY package*.json ./
RUN npm ci \
    && npm cache clean --force \
    && mv /app/node_modules /node_modules
COPY . .
ENV PORT 80
EXPOSE 80
CMD ["node", "server.js"]