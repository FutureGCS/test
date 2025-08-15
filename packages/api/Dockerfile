# Specifies the base image to use
FROM node:18-alpine

# Sets the working directory inside the container
WORKDIR /app

# Copies the root package.json to the container's working directory
COPY package.json ./

# Copies all the packages from the local 'packages' directory to the container
COPY packages ./packages

# Installs all npm dependencies for all workspaces
RUN npm install

# Sets the working directory to the specific 'api' package
WORKDIR /app/packages/api

# Creates a placeholder index.js file to ensure the container can run
RUN echo "console.log('API service running');" > index.js

# Exposes port 3001 for the API service
EXPOSE 3001

# Defines the default command to run when the container starts
CMD [ "node", "index.js" ]
