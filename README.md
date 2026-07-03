# FreelancePilot

**FreelancePilot** je fullstack aplikácia pre SZČO/freelancerov na evidenciu príjmov, výdavkov, odvodov, daní a finančných predikcií.

Aplikácia umožňuje používateľovi priebežne zadávať príjmy, výdavky a odvody. Po každej zmene automaticky prepočíta finančný stav používateľa a zobrazí:

- celkové príjmy,
- celkové výdavky,
- orientačný základ dane,
- orientačný odhad dane,
- zaplatené zdravotné odvody,
- zaplatené sociálne odvody,
- orientačné preddavky na ďalší rok,
- odporúčanú mesačnú rezervu,
- čistý mesačný príjem,
- cashflow,
- ročnú predikciu.

> Používateľ nemusí čakať do konca roka, aby zistil, koľko bude približne platiť na daniach a odvodoch. Aplikácia mu priebežne ukazuje, koľko si má odkladať.

---

## Cieľ projektu

Cieľom projektu je vytvoriť reálnu business aplikáciu, ktorá ukáže schopnosť:

- navrhnúť doménový model,
- pracovať s finančnými výpočtami,
- verzovať legislatívne pravidlá podľa rokov,
- postaviť backend v Spring Boot,
- postaviť frontend v Reacte,
- použiť PostgreSQL a Flyway,
- použiť Keycloak a BFF architektúru,
- riešiť bezpečnosť a izoláciu používateľských dát,
- robiť dashboardy a agregácie,
- písať unit testy pre výpočtový engine,
- písať integračné testy pre API,
- vytvoriť export do XLS,
- dokumentovať architektúru a rozhodnutia.

Toto nie je iba CRUD aplikácia. Je to doménovo orientovaná finančná aplikácia s výpočtovým jadrom.

---

## Disclaimer

Výpočty v aplikácii sú orientačné a nenahrádzajú účtovné, daňové ani právne poradenstvo. Používateľ je zodpovedný za kontrolu výsledkov podľa aktuálnej legislatívy.

Architektonický dôsledok:

- výpočtové pravidlá nesmú byť napevno rozhádzané v kóde,
- pravidlá musia byť verzované podľa daňového roka,
- výpočtový engine musí byť dobre testovaný,
- aplikácia má zobrazovať výsledky ako orientačné.

---

## Technologický stack

### Backend

- Java 25
- Spring Boot 4
- Spring Web MVC
- Spring Security
- OAuth2/OIDC Client
- Spring Data JPA
- PostgreSQL
- Flyway
- Bean Validation
- ProblemDetail
- MapStruct
- JUnit 5
- Mockito
- Testcontainers
- OpenAPI/Swagger
- Apache POI alebo podobná knižnica pre XLS export

### Frontend

- React
- TypeScript
- Vite
- Material UI
- React Router
- React Query
- React Hook Form
- Zod alebo Yup
- Recharts alebo MUI X Charts

### Security

- Keycloak
- OAuth2/OIDC
- Backend-for-Frontend
- Session-based authentication
- Role-based authorization

### Infraštruktúra

- Docker
- Docker Compose
- PostgreSQL
- Keycloak
- Nginx alebo Caddy
- GitHub Actions

---

## Architektúra

Projekt používa modulárny monolit. Kód vo všetkých moduloch dodržiava SOLID princípy.

```text
Browser
  |
  v
React Frontend
  |
  v
Spring Boot Backend / BFF
  |
  +--> Keycloak
  |
  +--> PostgreSQL
  |
  +--> Calculation Engine
  |
  +--> Export Service
```

### Prečo modulárny monolit

- jednoduchší vývoj,
- jednoduchšie testovanie,
- jednoduchšie nasadenie,
- všetka doména je v jednej aplikácii,
- výpočty sú ľahšie konzistentné,
- vhodné pre portfólio projekt.

---

## Backend-for-Frontend

Frontend manuálne neukladá access tokeny.

Backend rieši:

- OAuth2 login,
- OIDC session,
- komunikáciu s Keycloakom,
- identitu používateľa,
- role,
- autorizáciu endpointov.

Frontend volá:

```http
GET /api/auth/me
```

### Login flow

```text
User otvorí frontend
  |
  v
Klikne Login
  |
  v
Frontend redirect na backend login endpoint
  |
  v
Backend spustí OIDC login cez Keycloak
  |
  v
User sa prihlási v Keycloaku
  |
  v
Keycloak redirect späť na backend
  |
  v
Backend vytvorí session
  |
  v
Frontend zavolá /api/auth/me
  |
  v
Frontend zobrazí dashboard
```

---

## Role používateľov

```text
USER
ADMIN
```

### USER

Môže spravovať svoj profil, príjmy, výdavky, odvody, dashboard a exporty.

### ADMIN

Môže spravovať legislatívne pravidlá, audit logy, používateľov a systémovú konfiguráciu.

Neskôr môže pribudnúť rola:

```text
ACCOUNTANT
```

---

## Hlavné moduly

### 1. Auth modul

- login,
- logout,
- `/api/auth/me`,
- synchronizácia používateľa z Keycloaku,
- role.

### 2. User Profile modul

Profil obsahuje stále údaje:

- typ podnikania,
- dátum začiatku podnikania,
- zdravotnú poisťovňu (VŠZP, Dôvera, Union).

Ročne premenlivé nastavenia sú v samostatnej entite `UserTaxYearSettings`
(unikátna na používateľa a daňový rok):

- metóda výdavkov (paušálne alebo skutočné),
- platiteľ DPH, neskôr,
- počet aktívnych mesiacov podnikania v roku.

Pri prepnutí na rok bez nastavení UI vyzve na ich vytvorenie s predvyplnením
z posledného roka.

### 3. Income modul

Príjem obsahuje voliteľný dátum vystavenia faktúry (`issueDate`), dátum platby
(`paymentDate`), sumu, menu, klienta, číslo faktúry, kategóriu a stav. Daňový rok
sa odvodzuje z dátumu platby (cash basis), používateľ ho nezadáva.

Stavy:

```text
RECEIVED
EXPECTED
CANCELLED
```

Daňový výpočet berie len `RECEIVED`, cashflow predikcia aj `EXPECTED` (tam je
`paymentDate` očakávaný dátum platby), `CANCELLED` sa ignoruje.

### 4. Expense modul

Výdavok obsahuje dátum úhrady (cash basis), sumu, menu, kategóriu, dodávateľa,
číslo dokladu, daňovú uznateľnosť a opakovanie. Daňový rok sa odvodzuje z dátumu
úhrady, používateľ ho nezadáva.

### 5. Contribution modul

Používateľ eviduje zdravotné a sociálne odvody, nedoplatky, preplatky a ročné zúčtovanie.

Typy:

```text
HEALTH
SOCIAL
```

Kategórie:

```text
MONTHLY_ADVANCE
ARREARS
OVERPAYMENT
ANNUAL_SETTLEMENT
```

`taxYear` odvodu = rok zaplatenia (rok daňovej uznateľnosti, cash basis).
`periodFrom`/`periodTo` označujú obdobie, ktorého sa platba týka — ročné
zúčtovanie ZP za rok X zaplatené v roku X+1 má `taxYear = X+1`, `period = X`.

### 6. Rules modul

Pravidlá podľa roka:

- sadzby dane (15 % / 19 % / 25 %) a ich hranice,
- životné minimum a parametre degresívnej nezdaniteľnej časti,
- percento a limit paušálnych výdavkov,
- minimálne zdravotné preddavky a vymeriavacie základy,
- minimálne a maximálne sociálne vymeriavacie základy,
- koeficient vymeriavacieho základu,
- hranica vzniku povinnosti sociálneho poistenia.

### 7. Calculation Engine modul

Výpočtové jadro aplikácie. Dostane profil, ročné nastavenia, rok, príjmy, výdavky, odvody a pravidlá. Vráti finančný výsledok. Je to čistá deterministická funkcia bez vedľajších efektov.

### 8. Dashboard modul

Zobrazuje KPI, grafy, cashflow, výdavky podľa kategórií, stav rezervy a ročnú predikciu.

### 9. Export modul

Exporty:

- XLS export príjmov,
- XLS export výdavkov,
- XLS ročný report,
- neskôr PDF report.

### 10. Scenario / What-if modul

Používateľ si vie vytvoriť scenár: čo ak bude zarábať X mesačne a bude mať výdavky Y?

### 11. Audit modul

Eviduje dôležité akcie: login, vytvorenie príjmu, vytvorenie výdavku, prepočet, export, zmena pravidiel.

---

## Doménový model

Hlavné entity:

```text
User
UserBusinessProfile
UserTaxYearSettings
Income
Expense
Contribution
TaxYearRule
HealthInsuranceRule
SocialInsuranceRule
CalculationSnapshot
ExportLog
AuditLog
```

### User

```text
id
keycloakSubject
email
fullName
createdAt
updatedAt
```

### UserBusinessProfile

```text
id
userId
businessType
businessStartDate
healthInsuranceCompany
createdAt
updatedAt
```

`healthInsuranceCompany` je enum: `VSZP | DOVERA | UNION`.

### UserTaxYearSettings

Unikátna na (userId, taxYear).

```text
id
userId
taxYear
expenseMethod
monthsActive
isVatPayer
createdAt
updatedAt
```

### Income

```text
id
userId
taxYear
issueDate
paymentDate
amount
currency
category
clientName
invoiceNumber
status
note
createdAt
updatedAt
```

### Expense

```text
id
userId
taxYear
expenseDate
amount
currency
category
supplierName
documentNumber
taxDeductible
recurring
note
createdAt
updatedAt
```

### Contribution

```text
id
userId
taxYear
contributionType
contributionCategory
paymentDate
periodFrom
periodTo
amount
currency
note
createdAt
updatedAt
```

### TaxYearRule

```text
id
taxYear
reducedIncomeTaxRate
reducedTaxRateThreshold
incomeTaxRate
higherIncomeTaxRate
higherTaxRateThresholdMultiple
lifeMinimum
ntaFullMultiple
ntaReductionThresholdMultiple
ntaReductionMultiple
flatExpensePercentage
flatExpenseLimit
createdAt
updatedAt
```

### HealthInsuranceRule

```text
id
taxYear
minimumMonthlyAdvance
healthInsuranceRate
annualSettlementRate
minimumAssessmentBase
assessmentBaseCoefficient
createdAt
updatedAt
```

### SocialInsuranceRule

```text
id
taxYear
minimumMonthlyContribution
maximumAssessmentBase
minimumAssessmentBase
assessmentBaseCoefficient
obligationIncomeThreshold
socialInsuranceRate
createdAt
updatedAt
```

### CalculationSnapshot

```text
id
userId
taxYear
totalIncome
totalExpenses
taxDeductibleExpenses
calculatedFlatExpenses
selectedExpenseMethod
taxBase
appliedNonTaxableAllowance
healthAssessmentBase
socialAssessmentBase
estimatedTax
paidHealthContributions
paidSocialContributions
estimatedHealthAdvanceNextYear
estimatedSocialContributionNextYear
healthSettlementEstimate
recommendedMonthlyReserve
netIncomeEstimate
engineVersion
taxRuleId
healthRuleId
socialRuleId
calculatedAt
```

---

## Databázový návrh

Databáza: PostgreSQL  
Migrácie: Flyway

```text
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

Princípy:

- UUID primary keys,
- všetko naviazané na userId,
- dáta používateľa izolované podľa vlastníka,
- pravidlá podľa taxYear,
- výpočtové snapshoty oddelene,
- všetky zmeny cez Flyway.

---

## API návrh

Base path:

```text
/api
```

### Auth API

```http
GET /api/auth/me
POST /api/auth/logout
```

### Profile API

```http
GET /api/profile
POST /api/profile
PATCH /api/profile
GET /api/profile/year-settings?taxYear=2026
PUT /api/profile/year-settings
```

### Income API

```http
GET /api/incomes?taxYear=2026
POST /api/incomes
GET /api/incomes/{incomeId}
PATCH /api/incomes/{incomeId}
DELETE /api/incomes/{incomeId}
```

### Expense API

```http
GET /api/expenses?taxYear=2026
POST /api/expenses
GET /api/expenses/{expenseId}
PATCH /api/expenses/{expenseId}
DELETE /api/expenses/{expenseId}
```

### Contribution API

```http
GET /api/contributions?taxYear=2026
POST /api/contributions
GET /api/contributions/{contributionId}
PATCH /api/contributions/{contributionId}
DELETE /api/contributions/{contributionId}
```

### Calculation API

```http
GET /api/calculations/summary?taxYear=2026
POST /api/calculations/recalculate?taxYear=2026
GET /api/calculations/snapshots?taxYear=2026
GET /api/calculations/snapshots/{snapshotId}
```

### Dashboard API

```http
GET /api/dashboard?taxYear=2026
GET /api/dashboard/monthly-cashflow?taxYear=2026
GET /api/dashboard/reserve-status?taxYear=2026
```

### Admin Rules API

```http
GET /api/admin/tax-rules?taxYear=2026
POST /api/admin/tax-rules
PATCH /api/admin/tax-rules/{ruleId}

GET /api/admin/health-insurance-rules?taxYear=2026
POST /api/admin/health-insurance-rules
PATCH /api/admin/health-insurance-rules/{ruleId}

GET /api/admin/social-insurance-rules?taxYear=2026
POST /api/admin/social-insurance-rules
PATCH /api/admin/social-insurance-rules/{ruleId}
```

### Export API

```http
GET /api/exports/yearly-report?taxYear=2026
GET /api/exports/incomes?taxYear=2026
GET /api/exports/expenses?taxYear=2026
```

---

## Výpočtový engine

```text
calculation
  CalculationService
  CalculationEngine
  TaxCalculator
  HealthContributionCalculator
  SocialContributionCalculator
  ReserveCalculator
  ForecastCalculator
```

### Vstup

```text
CalculationInput
  userProfile
  yearSettings
  taxYear
  incomes
  expenses
  contributions
  taxRules
  healthRules
  socialRules
```

### Výstup

```text
CalculationResult
  totalIncome
  totalExpenses
  taxDeductibleExpenses
  flatExpenses
  selectedExpenseMethod
  taxBase
  appliedNonTaxableAllowance
  healthAssessmentBase
  socialAssessmentBase
  estimatedTax
  paidHealthContributions
  paidSocialContributions
  estimatedHealthAdvanceNextYear
  estimatedSocialContributionNextYear
  healthSettlementEstimate
  recommendedMonthlyReserve
  netIncomeEstimate
  reserveStatus
```

### ReserveStatus

```text
GREEN
ORANGE
RED
```

---

## Frontend návrh

Hlavné stránky:

```text
LoginPage
DashboardPage
ProfilePage
IncomesPage
CreateIncomePage
EditIncomePage
ExpensesPage
CreateExpensePage
EditExpensePage
ContributionsPage
CreateContributionPage
CalculationsPage
CalculationSnapshotPage
TaxRulesAdminPage
ExportsPage
ScenarioPage
AuditLogPage
UnauthorizedPage
```

Routing:

```text
/
 /login
 /dashboard
 /profile
 /incomes
 /incomes/new
 /incomes/:incomeId/edit
 /expenses
 /expenses/new
 /expenses/:expenseId/edit
 /contributions
 /contributions/new
 /calculations
 /calculations/snapshots/:snapshotId
 /exports
 /scenarios
 /admin/tax-rules
 /admin/audit-logs
 /unauthorized
```

---

## Dashboard

KPI karty:

- Celkové príjmy za rok
- Celkové výdavky za rok
- Odhad dane
- Odhad odvodov
- Odporúčaná rezerva
- Čistý mesačný príjem

Súhrnná ročná tabuľka (jedno DTO z jedného endpointu):

- celkové príjmy a výdavky za rok,
- zaplatené odvody do ZP a SP za rok,
- základ dane a odpočítateľná nezdaniteľná časť,
- vymeriavacie základy ZP a SP,
- odhad dane za rok,
- nové preddavky do ZP a odvody do SP na ďalší rok,
- odhad preplatku/nedoplatku z ročného zúčtovania ZP.

Dashboard číta živý výpočet z Calculation Engine. Snapshot sa ukladá len pri
explicitnom prepočte a slúži ako história, nie ako zdroj dát pre dashboard.

Grafy:

- príjmy po mesiacoch,
- výdavky po mesiacoch,
- cashflow,
- rozdelenie výdavkov podľa kategórií,
- vývoj rezervy.

---

## Testovanie

Najdôležitejšie sú unit testy výpočtového enginu.

Testovať:

- totalIncome,
- totalExpenses,
- taxDeductibleExpenses,
- flatExpenses,
- taxBase,
- appliedNonTaxableAllowance (degresia pod/na/nad hranicou),
- estimatedTax (tri daňové pásma),
- vymeriavacie základy ZP/SP (min/max),
- vznik povinnosti SP (obligationIncomeThreshold),
- healthSettlementEstimate,
- paid contributions,
- recommended reserve,
- cashflow,
- scenario calculations.

Integration testy:

- Income API,
- Expense API,
- Contribution API,
- Profile API,
- Calculation API,
- Export API,
- security 401/403,
- validation 400,
- not found 404,
- business error 409.

---

## MVP rozsah

### MVP 1 – Core tracking

- Keycloak + BFF login
- user profile
- incomes
- expenses
- contributions
- jednoduchý dashboard
- manuálne pravidlá pre jeden rok
- základný výpočet
- mena len EUR
- PostgreSQL + Flyway
- Docker Compose

### MVP 2 – Calculation version

- tax rules podľa roka
- calculation engine
- reserve recommendation
- cashflow grafy
- calculation snapshots
- unit testy výpočtov

### MVP 3 – Portfolio version

- XLS export
- audit logy
- admin tax rules
- security testy
- integration testy
- CI
- screenshoty
- dokumentácia

---

## Autor

Martin Baliak

Fullstack Developer  
Java | Spring Boot | React | PostgreSQL | Docker | Keycloak | AI-assisted development
