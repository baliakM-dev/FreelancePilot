# AI_DEVELOPMENT_LOG.md – FreelancePilot

Tento súbor dokumentuje, ako bola AI použitá počas vývoja projektu.

Cieľom je ukázať zodpovedný AI-assisted development.

---

## Pravidlá zápisu

Pri významnejšej feature zapíš:

- čo navrhla alebo vygenerovala AI,
- čo si manuálne skontroloval,
- čo si upravil,
- aké chyby si našiel,
- aké testy si doplnil.

---

## Šablóna záznamu

```markdown
## Feature: <názov feature>

Date: YYYY-MM-DD

AI used for:
- ...

Human review changes:
- ...

Tests added:
- ...

Notes:
- ...
```

---

## Example: Income management backend

AI used for:
- initial DTO proposal,
- first controller skeleton,
- first service method skeleton,
- test case suggestions.

Human review changes:
- moved business logic from controller to service,
- added `@Transactional`,
- added owner validation by userId,
- replaced entity response with DTO,
- added validation for amount greater than zero,
- manually reviewed Flyway migration.

Tests added:
- IncomeServiceTest,
- IncomeControllerIntegrationTest,
- security test for accessing another user's income.

Notes:
- AI-generated code did not originally check user ownership. This was manually fixed.

---

## Feature: Revízia doménového modelu (pred implementáciou)

Date: 2026-07-03

AI used for:
- review pôvodného doménového modelu v README.md a identifikácia problémov,
- návrh oddelenia ročných nastavení (`UserTaxYearSettings`) od profilu,
- návrh cash-basis dátumov na Income (`issueDate` + `paymentDate`, odvodený `taxYear`),
- rozšírenie pravidiel o progresívne daňové pásma, parametre degresívnej NČZD,
  vymeriavacie základy a hranicu vzniku povinnosti SP,
- rozhodnutie dashboard = živý výpočet z engine, snapshot = história (nie cache),
- design doc `docs/superpowers/specs/2026-07-03-domain-model-revision-design.md`,
- zosúladenie README.md a TASKS.md so schváleným specom.

Human review changes:
- schválený multi-year prístup od začiatku,
- schválený rozsah MVP 1 (len EUR, bez ExportLog/AuditLog migrácií),
- doplnená požiadavka na súhrnnú ročnú tabuľku v dashboarde
  (vymeriavacie základy, NČZD, ročné zúčtovanie ZP, nové preddavky).

Tests added:
- žiadne (projekt pred implementáciou); požiadavky na testy enginu zapísané
  v specu a v TASKS.md Phase 10.

Notes:
- Konkrétne sadzby a násobky v specu sú ilustračné — pri seede pravidiel ich
  treba overiť proti aktuálnej legislatíve pre daný rok.
