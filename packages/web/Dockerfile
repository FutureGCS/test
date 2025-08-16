# Stage 1: Build the React application
FROM node:18-alpine AS builder

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

# Set working directory to web package
WORKDIR /app/packages/web

# Build the TypeScript code
RUN npm run build

# Stage 2: Serve the static files with Nginx
FROM nginx:1.21-alpine

# Copy the built assets from the builder stage
COPY --from=builder /app/packages/web/dist /usr/share/nginx/html

# Copy the custom Nginx configuration
COPY packages/web/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for the Nginx server
EXPOSE 80
