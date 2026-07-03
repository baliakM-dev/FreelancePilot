# FreelancePilot – frontend

React + TypeScript + Vite frontend pre FreelancePilot (BFF architektúra —
frontend volá výhradne backend API, session drží backend).

## Príkazy

```bash
npm run dev      # dev server s proxy /api -> http://localhost:8080
npm run lint     # ESLint
npm run format   # Prettier na src/
npm run build    # tsc -b + vite build
```

## Štruktúra

```text
src
  app        AppShell, providers (Theme, Query), layout (MainLayout, Sidebar, Topbar)
  router     AppRouter, routes
  api        apiClient (fetch, session cookies, ProblemDetail chyby)
  pages      LoginPage, DashboardPage, UnauthorizedPage, NotFoundPage
  shared     zdieľané komponenty (ErrorPage, ...)
```

Detailný cieľový stav je v koreňovom `PROJECT_STRUCTURE.md`; pravidlá pre
vývoj vo `frontend/CLAUDE.md`.

## Konfigurácia

- `VITE_API_BASE_URL` – base URL backendu (default `/api`, viď `.env.example`
  v koreňovom adresári).