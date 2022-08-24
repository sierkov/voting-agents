# User Interface

## SvelteKit: frontend + JavaScript backend API
The user interface leverages [SvelteKit](https://kit.svelte.dev/) UI framework.

## Python API
API requests that rely on ML models are processed by a Python backend.

## PostgreSQL
We use PostgreSQL as the database of choice.

# How to start a development instance

To start the UI server:
- start the API server by following the instructions in the [API's README](../api/README.md)
- create etc/secret-db.json with the database access credentials in the format expected by postgres library: host, database, username, password
- create etc/secret-mail-server.json with the credential of an SMTP server for sending outgoing email: host, user, pass
- create etc/secret-blockfrost.json with your Blockforst ProjectId as a plain string.

```bash
npm i
npm run prepare
npm run build
npm run preview
```

The instance will start on port 3000 within the development container. If you cannot access it, double check that Docker forwards that port to your host environment.

Also, the UI code assumes that the API server has already been started.
