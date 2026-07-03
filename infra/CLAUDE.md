# Infra CLAUDE.md – FreelancePilot

## Infrastructure stack

- Docker Compose
- PostgreSQL
- Keycloak
- Nginx or Caddy
- Optional observability: Grafana, Prometheus, Loki, Tempo, Alloy

## Infrastructure rules

- Keep local development setup reproducible.
- Use `.env.example` for required environment variables.
- Do not commit real secrets.
- Keycloak realm export should be stored in `infra/keycloak`.
- Docker Compose should support local development.
- Backend, frontend, database and Keycloak should run on the same Docker network.
- Use clear service names.
- Prefer simple local setup before adding observability.
- Add healthchecks where useful.

## Keycloak rules

- Realm name: `freelancepilot`
- BFF client name: `freelancepilot-bff`
- Roles: `USER`, `ADMIN`
- Export realm configuration after manual changes.
