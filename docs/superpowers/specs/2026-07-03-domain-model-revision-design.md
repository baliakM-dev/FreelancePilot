# Design: Revízia doménového modelu FreelancePilot

**Dátum:** 2026-07-03
**Stav:** Schválené používateľom (pred implementáciou)
**Nahrádza:** sekcie „Doménový model", „Výpočtový engine" a „Dashboard" v README.md

## Kontext

Pôvodný doménový model v README.md vznikol pred implementáciou. Pri revízii sa našli
miesta, ktoré by po prvých migráciách bolelo meniť: ročne premenlivé nastavenia
uložené v profile, nejednoznačný dátum príjmu voči cash-basis zdaneniu, daňové
pravidlá bez progresívnych pásiem a degresívnej nezdaniteľnej časti a chýbajúce
polia pre vymeriavacie základy a ročné zúčtovanie ZP. Tento dokument zachytáva
odsúhlasené zmeny. Aplikácia podporuje **viac daňových rokov od začiatku**.

## Rozhodnutia

### 1. Ročné nastavenia oddelené od profilu

`expenseMethod`, `monthsActive` a `isVatPayer` sa menia rok od roka, preto sa
presúvajú z `UserBusinessProfile` do novej entity `UserTaxYearSettings`.

```text
UserBusinessProfile              UserTaxYearSettings (NOVÁ)
  id                               id
  userId                           userId
  businessType                     taxYear          -- unique (userId, taxYear)
  businessStartDate                expenseMethod    -- FLAT | REAL
  healthInsuranceCompany           monthsActive
  createdAt, updatedAt             isVatPayer
                                   createdAt, updatedAt
```

- `healthInsuranceCompany` je enum: `VSZP | DOVERA | UNION`.
- Prepnutie roka vo frontende načíta príslušné `UserTaxYearSettings`; ak pre rok
  neexistujú, UI vyzve na vytvorenie s predvyplnením hodnôt z posledného roka.

### 2. Cash-basis dátumy na Income a Expense

SZČO daní príjem podľa dátumu prijatia platby, nie vystavenia faktúry.

```text
Income
  id, userId
  taxYear          -- odvodený z paymentDate, nie user input
  issueDate        -- voliteľný, dátum vystavenia faktúry
  paymentDate      -- RECEIVED: skutočné prijatie platby
                   -- EXPECTED: očakávaný dátum platby
  amount, currency -- MVP: len EUR
  category, clientName, invoiceNumber, status, note
  createdAt, updatedAt
```

- Daňový výpočet berie len príjmy v stave `RECEIVED`; cashflow predikcia aj
  `EXPECTED`; `CANCELLED` sa ignoruje.
- Pri prechode `EXPECTED → RECEIVED` používateľ potvrdí/upraví `paymentDate`
  a `taxYear` sa prepočíta.
- `Expense.expenseDate` = dátum úhrady (cash basis), `taxYear` rovnako odvodený.
  Polia `taxDeductible` a `recurring` bez zmeny.

### 3. Sémantika Contribution

Štruktúra entity sa nemení, spresňuje sa význam polí:

- `taxYear` = rok zaplatenia = rok daňovej uznateľnosti (cash basis),
- `periodFrom`/`periodTo` = obdobie, ktorého sa platba týka.

Príklad: ročné zúčtovanie ZP za rok X zaplatené v roku X+1 má
`taxYear = X+1`, `period = X`.

### 4. Pravidlá: progresia, degresívna NČZD, vymeriavacie základy

```text
TaxYearRule
  taxYear
  reducedIncomeTaxRate               -- 15 %
  reducedTaxRateThreshold            -- obratový limit pre 15 %
  incomeTaxRate                      -- 19 %
  higherIncomeTaxRate                -- 25 %                        (NOVÉ)
  higherTaxRateThresholdMultiple     -- násobok ŽM pre 25 % pásmo   (NOVÉ)
  lifeMinimum                        -- životné minimum pre rok     (NOVÉ)
  ntaFullMultiple                    -- napr. 21,0                  (NOVÉ)
  ntaReductionThresholdMultiple      -- napr. 92,8                  (NOVÉ)
  ntaReductionMultiple               -- napr. 44,2                  (NOVÉ)
  flatExpensePercentage, flatExpenseLimit

HealthInsuranceRule
  taxYear, healthInsuranceRate, minimumMonthlyAdvance
  minimumAssessmentBase                                             (NOVÉ)
  assessmentBaseCoefficient          -- napr. 1,486                 (NOVÉ)

SocialInsuranceRule
  taxYear, socialInsuranceRate, minimumMonthlyContribution
  maximumAssessmentBase
  minimumAssessmentBase                                             (NOVÉ)
  assessmentBaseCoefficient          -- napr. 1,486                 (NOVÉ)
  obligationIncomeThreshold          -- hranica vzniku povinnosti SP (NOVÉ)
```

- Nezdaniteľná časť základu dane sa neukladá ako konštanta; ukladajú sa parametre
  vzorca (násobky životného minima) a engine ju počíta degresívne podľa výšky
  základu dane.
- `obligationIncomeThreshold` umožňuje enginu určiť, že začínajúcemu živnostníkovi
  povinnosť sociálneho poistenia (od 1. 7. nasledujúceho roka) zatiaľ nevznikla.
- Sadzby a násobky v komentároch sú ilustračné; skutočné hodnoty sa seedujú per
  rok a overujú proti aktuálnej legislatíve.

### 5. Dashboard číta živý výpočet; snapshot je história, nie cache

- `DashboardService` → `CalculationEngine` (čistá funkcia) → `CalculationResult`
  → DTO pre frontend. **Žiadny insert pri zobrazení dashboardu.**
- `CalculationSnapshot` sa ukladá len pri explicitnom
  `POST /api/calculations/recalculate` (neskôr prípadne automaticky po zmene dát).
  Slúži na históriu a reprodukovateľnosť, nie ako zdroj dát pre dashboard.
- Zamietnutá alternatíva: persistovať výsledok pri každej zmene a dashboard čítať
  z tabuľky — riziko rozsynchronizovania a duplicitná logika bez výkonovej výhody
  pri objeme dát jedného používateľa.

### 6. Rozšírený CalculationResult / CalculationSnapshot

Obe štruktúry zdieľajú výpočtové polia; snapshot navyše nesie metadáta
reprodukovateľnosti.

```text
CalculationResult / CalculationSnapshot
  totalIncome
  totalExpenses
  taxDeductibleExpenses
  calculatedFlatExpenses
  selectedExpenseMethod
  taxBase
  appliedNonTaxableAllowance           (NOVÉ) -- po degresii
  healthAssessmentBase                 (NOVÉ) -- vymeriavací základ ZP
  socialAssessmentBase                 (NOVÉ) -- vymeriavací základ SP
  estimatedTax
  paidHealthContributions
  paidSocialContributions
  estimatedHealthAdvanceNextYear
  estimatedSocialContributionNextYear
  healthSettlementEstimate             (NOVÉ) -- odhad RZ ZP: + nedoplatok / − preplatok
  recommendedMonthlyReserve
  netIncomeEstimate
  reserveStatus                        -- GREEN | ORANGE | RED (len v Result/DTO)

CalculationSnapshot navyše:
  engineVersion                        (NOVÉ)
  taxRuleId, healthRuleId, socialRuleId (NOVÉ) -- použité pravidlá
  calculatedAt
```

Frontend dostane celú súhrnnú tabuľku z jedného endpointu
`GET /api/dashboard?taxYear=...` (v MVP môže zdieľať DTO s
`GET /api/calculations/summary`).

### 7. Rozsah MVP 1

- Mena: DB stĺpec `currency` ostáva, validácia povolí len `EUR`. Multi-mena
  (kurzy NBS/ECB k dátumu platby) odložená.
- `ExportLog` a `AuditLog` ostávajú v návrhu, ale ich migrácie a moduly sa
  v MVP 1 nezakladajú (fázy 13 a 15 v TASKS.md).

## Dopady

- **Migrácie:** pribúda tabuľka `user_tax_year_settings`; `user_business_profiles`
  stráca ročné polia; `incomes` má `issue_date` + `payment_date`; rules tabuľky
  a `calculation_snapshots` majú nové stĺpce podľa bodov 4 a 6. Keďže sa zatiaľ
  nič neimplementovalo, ide o úpravu plánovaných V1–V11 migrácií, nie o nové verzie.
- **Dokumentácia:** README.md a PROJECT_STRUCTURE.md treba zosúladiť s týmto
  dokumentom (doménový model, entity, dashboard sekcia). TASKS.md Phase 5 doplniť
  o `UserTaxYearSettings`, Phase 10 o nové výpočtové polia.
- **Testovanie:** unit testy enginu musia pokrývať degresiu NČZD (pod/na/nad
  hranicou), tri daňové pásma, vznik/nevznik povinnosti SP voči
  `obligationIncomeThreshold`, min/max vymeriavacie základy a znamienko
  `healthSettlementEstimate`.