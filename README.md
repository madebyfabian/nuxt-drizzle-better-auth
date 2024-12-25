# Nuxt 3 UI + Drizzle + Better Auth Starter

A very simple starter repo for Nuxt 3. Highly optionated to what I use in my projects.

## Features

- [Nuxt 3](https://nuxt.com/):
- [Nuxt UI (v3 alpha)](https://ui3.nuxt.dev/) with [Tailwind CSS](https://tailwindcss.com/)
- [Drizzle ORM](https://orm.drizzle.team/)
  - using Postgres.js
  - Drizzle-Kit for Migrations
- [Better Auth](https://www.better-auth.com/docs/integrations/nuxt)
  - Email & Password Authentication
  - Forgot Password
  - Magic Link
  - Passkeys
  - Email Verification
  - Change email or password UI
  - Delete User
- [Nodemailer](https://nodemailer.com/) for sending auth transactional emails

## Usage

You can either clone this repo as-is to get all features, or gradually walk up the commit history to pick and choose the features you need.
Every commit adding a feature is tagged with `step:`.

## Setup

After cloning, make sure to look into the `.env.example` file and copy it to `.env` and fill in the values.

### Install dependencies

Install the dependencies with your favorite package manager:

```bash
# pnpm
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# pnpm
pnpm dev
```

## Production

Build the application for production:

```bash
# pnpm
pnpm build
```

Locally preview production build:

```bash
# pnpm
pnpm preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
