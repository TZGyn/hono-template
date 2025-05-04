# Hono + Postgres template

This template uses hono with bun and postgres db setup out of the box. The template also include openapi doc using scalar

Once you have your db schema generate using `bun run db:generate`, make sure to add this command `bun run db:migrate` to the pre-deploy command in railway so it will auto migrate the latest schema to your postgres.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/JK5kJM?referralCode=bSruGU)

To push db to local postgres:

```sh
bun run db:push
```

To generate db schema:

```sh
bun run db:generate
```

To migrate db:

```sh
bun run db:migrate
```

To install dependencies:

```sh
bun install
```

To run:

```sh
bun run dev
```

open http://localhost:8080/docs or {domain}/docs to view the openapi doc
