# Wholesale Business Management Platform

## About the Project

This project is a specialized SaaS platform designed for FMCG Master Distributors in Pakistan. It aims to replace inefficient manual systems like Excel and paper ledgers with a simple, "perfect-fit" solution. The platform will help reduce manual payment reconciliation, decrease order fulfillment errors, and provide real-time data for better business decisions.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have the following software installed on your machine:
*   [Node.js](https://nodejs.org/) (which includes npm)
*   [Docker](https://www.docker.com/)
*   A [Supabase](https://supabase.com/) account and project.

### Environment Variables

This project uses environment variables to connect to Supabase services.

1.  **Frontend (`web` package):** Create a `.env` file inside the `packages/web` directory by copying the example file:
    ```sh
    cp packages/web/.env.example packages/web/.env
    ```
    You will need to fill this file with your Supabase Project URL and Anon Key.

2.  **Backend (`api` service):** The backend needs a direct connection string to the database. You must update the `DATABASE_URL` environment variable inside the `docker-compose.yml` file to point to your Supabase database. You can find this in your Supabase project's database settings.

### Installation

1.  Clone the repo.
2.  Install NPM packages from the root of the monorepo:
    ```sh
    npm install
    ```

## Running the Application

The entire application stack can be run using Docker Compose. This will build the container images for the `api` and `web` services and start them.

```sh
docker-compose up
```
*   The `api` service will be available at `http://localhost:3001`
*   The `web` service will be available at `http://localhost:8080`

### Database Migrations

This project uses Prisma to manage database schema migrations.

To apply migrations to your Supabase database, you first need to set up your local environment to connect to it. Create a `.env` file in the `packages/api` directory and add your Supabase database connection string to it:

`packages/api/.env`:
```
DATABASE_URL="your-supabase-database-connection-string"
```

Then, you can run the migration command from the root of the project:

```sh
npx prisma migrate dev --schema=./packages/api/prisma/schema.prisma
```
This will apply any pending migrations to your remote database.

## Deployment

The application is containerized using Docker, which means it can be deployed to any environment that supports Docker containers (e.g., a cloud provider like AWS, Azure, Google Cloud, or a private server).

The general steps for a basic deployment would be:

1.  **Build the Docker Images**: On your deployment server or in a CI/CD pipeline, build the production images:
    ```sh
    docker-compose build
    ```

2.  **Run the Containers**: Run the application using Docker Compose in detached mode:
    ```sh
    docker-compose up -d
    ```

This section provides a starting point for deployment. More detailed, provider-specific instructions for a full production setup (including database configuration, secrets management, and CI/CD automation) will be added as the project evolves.

## Project Structure

This project is a monorepo containing both the frontend and backend code. This structure simplifies development and dependency management.

*   `packages/api`: The backend service. This is a Node.js application that will contain all the business logic, API endpoints, and database interactions.
*   `packages/web`: The frontend application. This is a web application that will be built and served as static assets. It provides the user interface for the management dashboard and the B2B customer portal.
*   `packages/shared`: A package for code that can be shared between the `api` and `web` packages, such as data types, validation schemas, etc.
