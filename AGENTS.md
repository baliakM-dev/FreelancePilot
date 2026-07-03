# AGENTS.md – FreelancePilot

## Project

FreelancePilot is a fullstack financial tracking and prediction application for Slovak sole traders/freelancers.

The application tracks incomes, expenses, health contributions, social contributions and calculates estimated tax, contributions, net income, cashflow and recommended monthly reserve.

## Main rules

- Do not blindly generate large changes.
- Before modifying code, inspect the current structure.
- Keep changes small and focused.
- Follow `TASKS.md`.
- Follow `PROJECT_STRUCTURE.md`.
- Do not introduce new technologies without explanation.
- Follow SOLID principles in all modules.
- Prefer modular monolith over microservices.
- Keep backend, frontend and infrastructure separated.
- Do not commit secrets.
- Use `.env.example` for documented environment variables.
- Update `AI_DEVELOPMENT_LOG.md` when AI significantly helps with implementation.
- For important architecture decisions, create or update ADR documents.
- Calculation logic must be deterministic and testable.
- AI must not be the source of tax calculations. Calculation Engine calculates. AI can only explain results later.

## Architecture

- React frontend
- Spring Boot Backend-for-Frontend
- Keycloak for authentication
- PostgreSQL as primary database
- Flyway for database migrations
- Calculation Engine for financial logic
- XLS Export Service for reports

## Security rules

- Do not store access tokens in localStorage.
- Frontend must call only backend APIs.
- Backend handles OIDC login and session.
- Backend enforces authorization.
- Role-based UI is only UX, not security.
- User data must be isolated by owner.
- User must not access other users' incomes, expenses, contributions or snapshots.
- Admin endpoints must require ADMIN role.
