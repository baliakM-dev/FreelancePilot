# FreelancePilot – kompletná štruktúra projektu

## Root

```text
freelancepilot
  .github
    workflows
      backend.yml
      frontend.yml

  backend
    CLAUDE.md
    src
      main
        java
          sk
            martin
              freelancepilot
                FreelancepilotApplication.java
                auth
                user
                profile
                income
                expense
                contribution
                rules
                calculation
                dashboard
                export
                scenario
                audit
                common
                config
        resources
          application.yml
          application-local.yml
          application-test.yml
          db
            migration
    src
      test
        java
          sk
            martin
              freelancepilot
    pom.xml
    README.md

  frontend
    CLAUDE.md
    public
    src
      app
      router
      api
      auth
      pages
      features
      shared
      main.tsx
      App.tsx
    package.json
    vite.config.ts
    tsconfig.json
    README.md

  infra
    CLAUDE.md
    docker
      docker-compose.dev.yml
      docker-compose.observability.yml
    keycloak
      realm-export.json
      README.md
    nginx
      default.conf
      README.md
    observability

  docs
    architecture
    adr
    features
    ai

  scripts
    start-dev.sh
    stop-dev.sh
    reset-db.sh
    export-keycloak-realm.sh
    import-keycloak-realm.sh

  README.md
  README.sk.md
  TASKS.md
  PROJECT_STRUCTURE.md
  CLAUDE.md
  SKILLS.md
  AI_DEVELOPMENT_LOG.md
  .gitignore
  .editorconfig
  .env.example
```

---

# Backend package detail

```text
sk.martin.freelancepilot
  auth
    controller
    dto
    service

  user
    domain
    repository
    service
    dto

  profile
    controller
    service
    repository
    domain
    dto
    mapper
    exception

  income
    controller
    service
    repository
    domain
    dto
    mapper
    exception

  expense
    controller
    service
    repository
    domain
    dto
    mapper
    exception

  contribution
    controller
    service
    repository
    domain
    dto
    mapper
    exception

  rules
    controller
    service
    repository
    domain
    dto
    mapper
    exception

  calculation
    controller
    service
    engine
    model
    repository
    domain
    dto
    mapper

  dashboard
    controller
    service
    dto

  export
    controller
    service
    repository
    domain
    dto

  scenario
    controller
    service
    dto

  audit
    controller
    service
    repository
    domain
    dto
    mapper

  common
    exception
    web
    validation
    security

  config
```

---

# Backend resources

```text
backend/src/main/resources
  application.yml
  application-local.yml
  application-test.yml
  db
    migration
      V1__create_users_table.sql
      V2__create_user_business_profiles_table.sql
      V3__create_user_tax_year_settings_table.sql
      V4__create_incomes_table.sql
      V5__create_expenses_table.sql
      V6__create_contributions_table.sql
      V7__create_tax_year_rules_table.sql
      V8__create_health_insurance_rules_table.sql
      V9__create_social_insurance_rules_table.sql
      V10__create_calculation_snapshots_table.sql
      V11__create_export_logs_table.sql
      V12__create_audit_logs_table.sql
```

---

# Frontend structure

```text
frontend/src
  app
    AppShell.tsx
    providers
      QueryProvider.tsx
      AuthProvider.tsx
      ThemeProvider.tsx
    layout
      MainLayout.tsx
      Sidebar.tsx
      Topbar.tsx
      PageContainer.tsx

  router
    AppRouter.tsx
    ProtectedRoute.tsx
    RoleProtectedRoute.tsx
    routes.ts

  api
    apiClient.ts
    authApi.ts
    profileApi.ts
    incomeApi.ts
    expenseApi.ts
    contributionApi.ts
    rulesApi.ts
    calculationApi.ts
    dashboardApi.ts
    exportApi.ts
    auditApi.ts

  auth
    useAuth.ts
    authTypes.ts

  pages
    LoginPage.tsx
    DashboardPage.tsx
    UnauthorizedPage.tsx
    NotFoundPage.tsx

  features
    profile
    incomes
    expenses
    contributions
    rules
    calculations
    dashboard
    exports
    scenarios
    audit

  shared
    components
    hooks
    utils
    types
```

---

# Docs

```text
docs
  architecture
    system-context.md
    container-diagram.md
    security.md
    bff-flow.md
    database-model.md
    api-design.md
    backend-architecture.md
    frontend-architecture.md
    calculation-engine.md

  adr
    0001-use-modular-monolith.md
    0002-use-bff.md
    0003-use-keycloak.md
    0004-use-postgresql.md
    0005-version-tax-rules-by-year.md
    0006-use-calculation-engine.md
    0007-use-xls-export.md
    0008-branching-and-environments.md

  features
    user-profile.md
    income-management.md
    expense-management.md
    contribution-management.md
    rules-management.md
    calculation-engine.md
    dashboard.md
    exports.md
    audit-logs.md

  ai
    ai-development-rules.md
    future-ai-assistant.md

  superpowers
    specs
      2026-07-03-domain-model-revision-design.md
```
