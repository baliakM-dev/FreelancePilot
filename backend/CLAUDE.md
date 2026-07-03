# Backend CLAUDE.md – FreelancePilot

## Backend stack

- Java 21
- Spring Boot
- Spring Web MVC
- Spring Security
- OAuth2/OIDC Client
- PostgreSQL
- Flyway
- Spring Data JPA
- Bean Validation
- ProblemDetail
- MapStruct
- JUnit 5
- Mockito
- Testcontainers
- Apache POI for XLS export

## Backend rules

- Controllers must not contain business logic.
- Controllers only handle HTTP request/response mapping.
- Services contain business logic.
- Repositories contain database access.
- Do not expose JPA entities directly from REST API.
- Use request and response DTOs.
- Use Bean Validation on request DTOs.
- Use ProblemDetail for error responses.
- Use Flyway for every database schema change.
- Service methods that modify database state should be transactional.
- Security must be enforced on backend.
- Add audit log for important actions.
- Use BigDecimal for money values.
- Do not use double/float for financial calculations.

## Calculation rules

- Calculation logic must be deterministic.
- Calculation logic must be covered by unit tests.
- Keep calculation logic separate from controllers.
- Prefer pure calculation classes where possible.
- Calculation Engine receives input data and rules and returns result.
- Tax and contribution rules must be versioned by tax year.
- Do not hardcode rules across random services.
- If a rule is missing, return clear business error.
- Avoid rounding too early.
- Centralize rounding strategy.

## Security rules

- Validate ownership of all user-owned resources.
- User can access only own incomes, expenses, contributions, profile and snapshots.
- Admin-only endpoints must require ADMIN role.
- Do not log sensitive financial details unnecessarily.
