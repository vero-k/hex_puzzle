# Build stage

FROM node:18-alpine AS build

# Set the working directory in the Docker container
WORKDIR /frontend

# Copy package.json and package-lock.json/yarn.lock files
COPY package*.json ./

# For npm users
RUN npm install

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

RUN npm run build


### Production 
FROM nginx:stable-alpine

COPY --from=build /frontend/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]





# Build your Docker image
# docker build -t hexft .

# Run your Docker container
# docker run -it --rm -p 3000:3000 -v ${PWD}:/app -v /app/node_modules hexft
# docker run -p 3000:3000 -v $(pwd):/app -v /app/node_modules -e CHOKIDAR_USEPOLLING=true hexft


## see all docker containers
# docker ps -a

## see all docker images
# docker images
