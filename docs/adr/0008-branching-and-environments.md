# ADR 0008 – Branching Strategy and Environments

## Status
Accepted (2026-07-03)

## Context

Projekt vyvíja jeden vývojár s AI asistentom. Potrebujeme:

- izolovaný vývoj po fázach z TASKS.md,
- zdieľané dev/test prostredie s reálnou databázou, kam sa zmeny dostanú
  automaticky cez CI/CD,
- produkčnú vetvu pripravenú do budúcna, bez tlaku na skorý deploy,
- konzistentnú databázovú schému naprieč prostrediami.

## Decision

Používame tri úrovne vetiev a prostredí:

| Vetva            | Účel                | Databáza                        | Deploy                         |
|------------------|---------------------|---------------------------------|--------------------------------|
| `feature/phase-*`| vývoj jednotlivých fáz | PostgreSQL v Docker Compose (lokálne) | žiadny                    |
| `develop`        | integrácia a test   | Neon (serverless PostgreSQL)    | CI/CD po merge do `develop`    |
| `main`           | produkcia           | zatiaľ žiadna                   | zatiaľ žiadny                  |

Pravidlá:

- Zmeny idú výhradne cez PR: `feature/phase-*` → `develop`. CI na PR spúšťa
  build a testy.
- Po merge do `develop` CI/CD spustí Flyway migrácie proti Neon databáze
  a nasadí dev prostredie.
- Do `main` sa merguje z `develop` až pri produkčnom release. Zatiaľ sa do
  `main` nič nedáva.
- `main` aj `develop` majú branch protection (len PR s prechádzajúcim CI).
- Neon connection string a ostatné secrets sú výhradne v GitHub Secrets,
  nikdy v repozitári (viď security pravidlá v CLAUDE.md).
- Flyway migrácie sú jediný zdroj pravdy pre schému — lokálny Docker Postgres
  aj Neon majú identickú schému.

## Consequences

- Vývojár môže pracovať offline s lokálnou DB; dev prostredie sa aktualizuje
  samo po merge.
- Migrácie sa pred merge do `develop` musia otestovať lokálne, lebo merge ich
  automaticky aplikuje na zdieľanú Neon DB.
- Neon pokrýva iba databázu. Hosting backendu, frontendu a Keycloaku pre dev
  prostredie je samostatné rozhodnutie — vznikne ako ďalší ADR pri prvom
  reálnom deployi (kandidáti: Render, Fly.io, Railway).
- Neskôr možno využiť Neon branching na efemérne DB vetvy per PR pre
  integračné testy.
- TASKS.md Phase 17 (CI/CD) sa rozširuje o deploy kroky pre `develop`.