# Stage 1: Build the frontend application
FROM node:18-alpine AS builder

# Set the working directory for the entire monorepo
WORKDIR /app

# Copy root package.json
COPY package.json ./

# Copy all packages
COPY packages ./packages

# Install all dependencies for all workspaces
RUN npm install

# Set the working directory to the web package
WORKDIR /app/packages/web

# Run the build script
# This will create the 'dist' directory with the built assets
RUN npm run build

# Stage 2: Serve the static assets with Nginx
FROM nginx:1.21-alpine

# Copy the built assets from the builder stage
COPY --from=builder /app/packages/web/dist /usr/share/nginx/html

# Expose port 80 for the Nginx server
EXPOSE 80

# The default Nginx entrypoint will start the server
