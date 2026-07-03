# FreelancePilot – kompletný plán úloh

Tento súbor slúži ako hlavný checklist pre vývoj projektu FreelancePilot.

---

## Phase 0 – Repository foundation

- [x] Vytvoriť Git repozitár `FreelancePilot`
- [x] Pridať `README.md`
- [x] Pridať `TASKS.md`
- [x] Pridať `PROJECT_STRUCTURE.md`
- [x] Pridať `CLAUDE.md`
- [x] Pridať `SKILLS.md`
- [x] Pridať `AI_DEVELOPMENT_LOG.md`
- [x] Pridať `.env.example`
- [x] Pridať `.gitignore`
- [x] Pridať `.editorconfig`
- [x] Vytvoriť priečinky `backend`, `frontend`, `infra`, `docs`, `scripts`
- [x] Vytvoriť prvý commit `chore: initialize repository structure`

---

## Phase 1 – Backend foundation

- [ ] Vytvoriť Spring Boot 4 projekt v `backend`
- [ ] Nastaviť Java 25
- [ ] Nastaviť Maven wrapper
- [ ] Pridať Spring Web
- [ ] Pridať Spring Validation
- [ ] Pridať Spring Data JPA
- [ ] Pridať PostgreSQL Driver
- [ ] Pridať Flyway
- [ ] Pridať Spring Security
- [ ] Pridať OAuth2 Client
- [ ] Pridať Actuator
- [ ] Pridať MapStruct
- [ ] Pridať springdoc-openapi
- [ ] Pridať JUnit 5
- [ ] Pridať Mockito
- [ ] Pridať Testcontainers
- [ ] Vytvoriť package `sk.martin.freelancepilot`
- [ ] Vytvoriť package štruktúru `auth`, `user`, `profile`, `income`, `expense`, `contribution`, `rules`, `calculation`, `dashboard`, `export`, `audit`, `common`, `config`
- [ ] Nastaviť `application.yml`
- [ ] Nastaviť `application-local.yml`
- [ ] Nastaviť `application-test.yml`
- [ ] Vytvoriť `GlobalExceptionHandler`
- [ ] Vytvoriť `BusinessException`
- [ ] Nastaviť ProblemDetail error response
- [ ] Overiť `/actuator/health`

---

## Phase 2 – Frontend foundation

- [ ] Vytvoriť React + TypeScript + Vite projekt v `frontend`
- [ ] Pridať Material UI
- [ ] Pridať React Router
- [ ] Pridať React Query
- [ ] Pridať React Hook Form
- [ ] Pridať Zod alebo Yup
- [ ] Pridať Recharts alebo MUI X Charts
- [ ] Nastaviť ESLint
- [ ] Nastaviť Prettier
- [ ] Vytvoriť `AppShell`
- [ ] Vytvoriť `MainLayout`
- [ ] Vytvoriť `Sidebar`
- [ ] Vytvoriť `Topbar`
- [ ] Vytvoriť routing
- [ ] Vytvoriť `LoginPage`
- [ ] Vytvoriť `DashboardPage` placeholder
- [ ] Vytvoriť `UnauthorizedPage`
- [ ] Vytvoriť `NotFoundPage`
- [ ] Vytvoriť `apiClient`

---

## Phase 3 – Docker foundation

- [ ] Vytvoriť `infra/docker/docker-compose.dev.yml`
- [ ] Pridať PostgreSQL service
- [ ] Pridať Keycloak service
- [ ] Pridať backend service
- [ ] Pridať frontend service
- [ ] Pridať spoločnú Docker network
- [ ] Pridať PostgreSQL volume
- [ ] Pridať environment premenné
- [ ] Pridať healthcheck pre PostgreSQL
- [ ] Pridať healthcheck pre Keycloak
- [ ] Otestovať PostgreSQL
- [ ] Otestovať Keycloak
- [ ] Otestovať backend v Dockeri
- [ ] Otestovať frontend v Dockeri

---

## Phase 4 – Keycloak + BFF

- [ ] Vytvoriť realm `freelancepilot`
- [ ] Vytvoriť client `freelancepilot-bff`
- [ ] Nastaviť redirect URI
- [ ] Nastaviť web origins
- [ ] Vytvoriť role `USER`, `ADMIN`
- [ ] Vytvoriť test používateľov
- [ ] Exportovať realm do `infra/keycloak/realm-export.json`
- [ ] Nastaviť import realmu pri štarte Keycloaku
- [ ] Pridať Spring Security config
- [ ] Nastaviť OAuth2 Client
- [ ] Implementovať login
- [ ] Implementovať logout
- [ ] Vytvoriť `AuthController`
- [ ] Implementovať `GET /api/auth/me`
- [ ] Vytvoriť `AuthMeResponse`
- [ ] Extrahovať role
- [ ] Nastaviť CORS
- [ ] Rozhodnúť CSRF stratégiu
- [ ] Vytvoriť frontend `AuthProvider`
- [ ] Vytvoriť `useAuth`
- [ ] Vytvoriť `ProtectedRoute`
- [ ] Vytvoriť `RoleProtectedRoute`

---

## Phase 5 – User profile

- [ ] Vytvoriť migráciu `users`
- [ ] Vytvoriť migráciu `user_business_profiles`
- [ ] Vytvoriť migráciu `user_tax_year_settings`
- [ ] Vytvoriť `UserEntity`
- [ ] Vytvoriť `UserRepository`
- [ ] Vytvoriť `UserService`
- [ ] Synchronizovať používateľa z Keycloaku
- [ ] Vytvoriť `UserBusinessProfileEntity`
- [ ] Vytvoriť `BusinessType`
- [ ] Vytvoriť `HealthInsuranceCompany`
- [ ] Vytvoriť `ExpenseMethod`
- [ ] Vytvoriť `UserTaxYearSettingsEntity` (unique userId + taxYear)
- [ ] Vytvoriť `ProfileService`
- [ ] Vytvoriť `ProfileController`
- [ ] Implementovať `GET /api/profile`
- [ ] Implementovať `POST /api/profile`
- [ ] Implementovať `PATCH /api/profile`
- [ ] Implementovať `GET /api/profile/year-settings?taxYear=`
- [ ] Implementovať `PUT /api/profile/year-settings`
- [ ] Predvyplniť nové ročné nastavenia z posledného roka
- [ ] Vytvoriť `ProfilePage`
- [ ] Vytvoriť `ProfileForm`
- [ ] Pridať testy

---

## Phase 6 – Income module

- [ ] Vytvoriť migráciu `incomes`
- [ ] Vytvoriť `IncomeEntity`
- [ ] Vytvoriť `IncomeStatus`
- [ ] Vytvoriť `IncomeRepository`
- [ ] Vytvoriť DTO request/response
- [ ] Vytvoriť `IncomeMapper`
- [ ] Vytvoriť `IncomeService`
- [ ] Vytvoriť `IncomeController`
- [ ] Implementovať Income CRUD API
- [ ] Overiť vlastníctvo príjmu podľa userId
- [ ] Pridať validáciu amount > 0
- [ ] Pridať validáciu meny (MVP: len EUR)
- [ ] Rozlíšiť `issueDate` a `paymentDate` (cash basis)
- [ ] Odvodiť `taxYear` z `paymentDate`, prepočítať pri EXPECTED → RECEIVED
- [ ] Pridať filtrovanie podľa taxYear
- [ ] Pridať audit logy
- [ ] Vytvoriť frontend stránky a formuláre
- [ ] Pridať unit a integračné testy

---

## Phase 7 – Expense module

- [ ] Vytvoriť migráciu `expenses`
- [ ] Vytvoriť `ExpenseEntity`
- [ ] Vytvoriť `ExpenseRepository`
- [ ] Vytvoriť `ExpenseCategory`
- [ ] Vytvoriť DTO request/response
- [ ] Vytvoriť `ExpenseMapper`
- [ ] Vytvoriť `ExpenseService`
- [ ] Vytvoriť `ExpenseController`
- [ ] Implementovať Expense CRUD API
- [ ] Overiť vlastníctvo výdavku podľa userId
- [ ] Pridať validáciu amount > 0
- [ ] Pridať validáciu meny (MVP: len EUR)
- [ ] `expenseDate` = dátum úhrady (cash basis), odvodiť `taxYear`
- [ ] Pridať `taxDeductible`
- [ ] Pridať `recurring`
- [ ] Pridať audit logy
- [ ] Vytvoriť frontend stránky a formuláre
- [ ] Pridať unit a integračné testy

---

## Phase 8 – Contribution module

- [ ] Vytvoriť migráciu `contributions`
- [ ] Vytvoriť `ContributionEntity`
- [ ] Vytvoriť `ContributionType`
- [ ] Vytvoriť `ContributionCategory`
- [ ] Vytvoriť `ContributionRepository`
- [ ] Vytvoriť DTO request/response
- [ ] Vytvoriť `ContributionMapper`
- [ ] Vytvoriť `ContributionService`
- [ ] Vytvoriť `ContributionController`
- [ ] Implementovať Contribution CRUD API
- [ ] Rozlíšiť HEALTH/SOCIAL
- [ ] Rozlíšiť MONTHLY_ADVANCE/ARREARS/OVERPAYMENT/ANNUAL_SETTLEMENT
- [ ] Sémantika: `taxYear` = rok zaplatenia, `periodFrom`/`periodTo` = obdobie platby
- [ ] Overiť vlastníctvo podľa userId
- [ ] Pridať audit logy
- [ ] Vytvoriť frontend stránky a formuláre
- [ ] Pridať unit a integračné testy

---

## Phase 9 – Rules module

- [ ] Vytvoriť migrácie `tax_year_rules`, `health_insurance_rules`, `social_insurance_rules`
- [ ] Vytvoriť entity pre pravidlá
- [ ] Pridať progresívne daňové pásma a parametre degresívnej nezdaniteľnej časti (násobky ŽM)
- [ ] Pridať `minimumAssessmentBase` a `assessmentBaseCoefficient` do ZP a SP pravidiel
- [ ] Pridať `obligationIncomeThreshold` do SP pravidiel
- [ ] Vytvoriť repositories
- [ ] Vytvoriť DTO
- [ ] Vytvoriť `RulesService`
- [ ] Vytvoriť `AdminRulesController`
- [ ] Implementovať admin API pre pravidlá
- [ ] Obmedziť endpointy iba pre ADMIN
- [ ] Seednúť pravidlá pre jeden rok
- [ ] Vytvoriť admin UI
- [ ] Pridať testy

---

## Phase 10 – Calculation engine

- [ ] Vytvoriť `CalculationInput`
- [ ] Vytvoriť `CalculationResult`
- [ ] Vytvoriť `CalculationEngine`
- [ ] Vytvoriť `TaxCalculator`
- [ ] Vytvoriť `HealthContributionCalculator`
- [ ] Vytvoriť `SocialContributionCalculator`
- [ ] Vytvoriť `ReserveCalculator`
- [ ] Vytvoriť `ForecastCalculator`
- [ ] Vytvoriť `CalculationService`
- [ ] Vytvoriť `CalculationController`
- [ ] Implementovať `GET /api/calculations/summary`
- [ ] Implementovať `POST /api/calculations/recalculate`
- [ ] Vypočítať totalIncome
- [ ] Vypočítať totalExpenses
- [ ] Vypočítať taxDeductibleExpenses
- [ ] Vypočítať flatExpenses
- [ ] Vypočítať taxBase
- [ ] Vypočítať appliedNonTaxableAllowance (degresívne)
- [ ] Vypočítať healthAssessmentBase a socialAssessmentBase
- [ ] Vypočítať estimatedTax (tri daňové pásma)
- [ ] Vypočítať paid contributions
- [ ] Vypočítať healthSettlementEstimate (odhad ročného zúčtovania ZP)
- [ ] Určiť vznik povinnosti SP podľa obligationIncomeThreshold
- [ ] Vypočítať recommendedMonthlyReserve
- [ ] Vypočítať netIncomeEstimate
- [ ] Vypočítať reserveStatus
- [ ] Pridať veľa unit testov (degresia NČZD, tri pásma, min/max vymeriavacie základy, vznik povinnosti SP)
- [ ] Pridať integračné testy

---

## Phase 11 – Dashboard

- [ ] Vytvoriť `DashboardService`
- [ ] Vytvoriť `DashboardController`
- [ ] Implementovať `GET /api/dashboard`
- [ ] Implementovať `GET /api/dashboard/monthly-cashflow`
- [ ] Implementovať `GET /api/dashboard/reserve-status`
- [ ] Vytvoriť `DashboardPage`
- [ ] Pridať KPI karty
- [ ] Pridať súhrnnú ročnú tabuľku (živý výpočet z engine, bez insertov do DB)
- [ ] Pridať graf príjmov
- [ ] Pridať graf výdavkov
- [ ] Pridať cashflow graf
- [ ] Pridať graf výdavkov podľa kategórií
- [ ] Pridať finančný semafor
- [ ] Pridať loading, empty a error states

---

## Phase 12 – Calculation snapshots

- [ ] Vytvoriť migráciu `calculation_snapshots`
- [ ] Vytvoriť `CalculationSnapshotEntity`
- [ ] Vytvoriť repository/service/controller
- [ ] Pri manuálnom prepočte uložiť snapshot
- [ ] Uložiť `engineVersion` a referencie na použité pravidlá (taxRuleId, healthRuleId, socialRuleId)
- [ ] Implementovať snapshot API
- [ ] Overiť vlastníctvo snapshotu
- [ ] Zobraziť snapshoty vo frontende
- [ ] Pridať testy

---

## Phase 13 – Export XLS

- [ ] Pridať Apache POI alebo inú XLS knižnicu
- [ ] Vytvoriť `ExportService`
- [ ] Vytvoriť `ExportController`
- [ ] Vytvoriť `ExportLogEntity`
- [ ] Vytvoriť migráciu `export_logs`
- [ ] Implementovať export príjmov
- [ ] Implementovať export výdavkov
- [ ] Implementovať ročný report
- [ ] Pridať audit/export log
- [ ] Vytvoriť `ExportsPage`
- [ ] Pridať testy

---

## Phase 14 – Security hardening

- [ ] Overiť, že user vidí iba svoje príjmy
- [ ] Overiť, že user vidí iba svoje výdavky
- [ ] Overiť, že user vidí iba svoje odvody
- [ ] Overiť, že user vidí iba svoje snapshoty
- [ ] Pridať method security
- [ ] Zabezpečiť admin endpointy
- [ ] Otestovať 401
- [ ] Otestovať 403
- [ ] Otestovať prístup k cudzím dátam
- [ ] Skontrolovať CORS
- [ ] Skontrolovať CSRF stratégiu

---

## Phase 15 – Audit logs

- [ ] Vytvoriť migráciu `audit_logs`
- [ ] Vytvoriť `AuditLogEntity`
- [ ] Vytvoriť `AuditAction`
- [ ] Vytvoriť `AuditOutcome`
- [ ] Vytvoriť `AuditService`
- [ ] Vytvoriť `AuditController`
- [ ] Implementovať `GET /api/admin/audit-logs`
- [ ] Auditovať login, profile update, income/expense/contribution CRUD, recalculation, export, tax rule update
- [ ] Vytvoriť `AuditLogPage`
- [ ] Pridať filtrovanie audit logov
- [ ] Pridať testy

---

## Phase 16 – Frontend polish

- [ ] Zjednotiť layout
- [ ] Pridať sidebar
- [ ] Pridať topbar
- [ ] Pridať breadcrumb navigáciu
- [ ] Zlepšiť tabuľky
- [ ] Zlepšiť formuláre
- [ ] Pridať loading states
- [ ] Pridať skeletony
- [ ] Pridať empty states
- [ ] Pridať error states
- [ ] Pridať confirm dialogy
- [ ] Pridať toast notifikácie
- [ ] Pridať role-based buttons
- [ ] Pridať responzívnosť

---

## Phase 17 – CI/CD

- [ ] Vytvoriť `.github/workflows/backend.yml`
- [ ] Vytvoriť `.github/workflows/frontend.yml`
- [ ] Backend build
- [ ] Backend testy
- [ ] Frontend install
- [ ] Frontend lint
- [ ] Frontend build
- [ ] Pridať badge do README

---

## Phase 18 – Documentation

- [ ] Doplniť finálny `README.md`
- [ ] Doplniť `PROJECT_STRUCTURE.md`
- [ ] Doplniť `TASKS.md`
- [ ] Doplniť `CLAUDE.md`
- [ ] Doplniť `backend/CLAUDE.md`
- [ ] Doplniť `frontend/CLAUDE.md`
- [ ] Doplniť `infra/CLAUDE.md`
- [ ] Doplniť docs/architecture
- [ ] Doplniť ADR dokumenty
- [ ] Doplniť screenshoty
- [ ] Doplniť sekciu „What I learned“
- [ ] Doplniť sekciu „AI-assisted development approach“
