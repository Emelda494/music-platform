
# Music Platform – Portfolio Creative Studio 1

## Project Overview

This project is a full-stack music platform developed as part of the module Portfolio Creative Studio 1: Industry Workflows.

The application allows users to register, log in, create content, and interact with other users' content through a like system.

The project was built using React for the frontend and Laravel (PHP) for the backend API.

The focus was not only on functionality, but also on structured planning, agile workflow, and industry-relevant development practices.

## Technologies Used

### Frontend
- React
- Vite
- React Router
- Fetch API

### Backend
- Laravel (PHP 8)
- Laravel Sanctum (authentication)
- MySQL

## Features

- User registration and login
- Token-based authentication (Sanctum)
- Protected routes
- Create, read and delete songs
- Create and manage artists
- Like and unlike songs
- Role-based deletion (owner or admin)
- Self-delete account with cascading delete
- Responsive, mobile-first layout
- Basic frontend unit test

## Project Structure

- `music-frontend/` – React frontend
- `music-platform/` – Laravel backend
- `project-planning.md` – Project planning and workflow

## Installation Guide

### 1. Backend Setup (Laravel)

Navigate to the backend folder:

```bash
cd music-platform
```

Install dependencies:

```bash
composer install
```

Copy the example environment file:

```bash
cp .env.example .env
```

Generate the application key:

```bash
php artisan key:generate
```

Configure your database connection in the `.env` file.

Run migrations:

```bash
php artisan migrate
```

Start the Laravel server:

```bash
php artisan serve
```

Backend address:

`http://127.0.0.1:8000`

### 2. Frontend Setup (React)

Open a second terminal and navigate to the frontend folder:

```bash
cd music-frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Frontend address:

`http://localhost:5173`

## Running Tests

To run frontend tests:

```bash
npm test
```

## Project Planning & Workflow

The agile feature planning, time estimation and ticket example can be found in:

`project-planning.md`

The project was developed incrementally. Features were implemented step by step, tested, and refined based on debugging and usability considerations.

## Notes

- The project uses separate frontend and backend folders.
- Dependency folders such as `node_modules` and `vendor` are excluded from the repository.
- Environment files containing credentials are not included.
- A local MySQL database must be configured before running the application.
