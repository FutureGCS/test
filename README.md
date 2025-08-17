# Wholesale Business Management Platform (Next.js)

## About the Project

This project is a specialized SaaS platform designed for FMCG Master Distributors in Pakistan. This repository contains the monorepo for the project, built with Next.js, Turborepo, and Supabase.

## Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/)
*   **Monorepo:** [Turborepo](https://turbo.build/repo)
*   **Authentication:** [Supabase Auth](https://supabase.com/auth)
*   **Database:** [Supabase Postgres](https://supabase.com/database)
*   **ORM:** [Prisma](https://www.prisma.io/)
*   **UI:** [React](https://reactjs.org/) (with a shared component library in `packages/ui`)

## Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

*   [Node.js](https://nodejs.org/) (v18 or higher)
*   [npm](https://www.npmjs.com/) (or your package manager of choice)
*   A [Supabase](https://supabase.com/) account and project.

### Environment Variables

This project requires environment variables to connect to Supabase.

1.  **Web Frontend:** In the `apps/web` directory, create a `.env` file by copying the example:
    ```sh
    cp apps/web/.env.example apps/web/.env
    ```
    Fill this file with your Supabase Project URL and Anon Key.

2.  **Database Migrations:** To run database migrations, you need a direct connection string to the database. Create a `.env` file in the `packages/db` directory:
    ```
    packages/db/.env
    ```
    Add your Supabase database connection string to this file:
    ```
    DATABASE_URL="your-supabase-database-connection-string"
    ```

### Installation

Install all dependencies from the root of the monorepo:
```sh
npm install
```

## Development

This project includes a Docker Compose setup to run a local PostgreSQL database, which is useful for development and testing.

### Running the Local Database

To start the local database server, run:
```sh
docker-compose up -d
```

### Running the Web Application

To start the development server for the web application, run the following command from the root of the project:

```sh
npm run dev
```
This will start the Next.js application, usually available at `http://localhost:3000`. The application will connect to your Supabase database by default, but you can point it to your local Dockerized database by changing the `DATABASE_URL` in your `.env` files.

### Database Migrations

To apply any pending database migrations to your Supabase database, run the following command from the root of the project:

```sh
npm run db:migrate --workspace=@repo/db
```
This command uses the `db:migrate` script defined in the `packages/db/package.json` file.
