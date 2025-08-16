# Base image
FROM node:18-alpine

WORKDIR /app

# Copy root package.json and lock file
COPY package*.json ./

# Copy all packages' package.json to leverage Docker cache
COPY packages/api/package.json ./packages/api/
COPY packages/web/package.json ./packages/web/
COPY packages/shared/package.json ./packages/shared/

# Install all dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Set working directory to api package
WORKDIR /app/packages/api

# Build the TypeScript code
RUN npm run build

EXPOSE 3001

# Start the API service
CMD [ "npm", "start" ]
