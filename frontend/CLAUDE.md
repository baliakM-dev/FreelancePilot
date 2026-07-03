# Frontend CLAUDE.md – FreelancePilot

## Frontend stack

- React
- TypeScript
- Vite
- Material UI
- React Router
- React Query
- React Hook Form
- Zod or Yup
- Recharts or MUI X Charts

## Frontend rules

- Use TypeScript types for API requests and responses.
- Keep pages, components, hooks and types separated.
- Use React Query for server state.
- Use React Hook Form for forms.
- Use Zod or Yup for validation.
- Use shared components for repeated UI patterns.
- Keep components small and readable.
- Avoid putting business calculations in frontend.
- Financial calculations should come from backend Calculation Engine.
- Frontend can format and visualize values, not calculate taxes.

## Auth rules

- Do not store access tokens in localStorage or sessionStorage.
- Frontend authentication state is loaded from `/api/auth/me`.
- Frontend calls only backend API.
- Role-based UI is only for user experience.
- Real authorization must be enforced by backend.

## UX rules

- Show loading states.
- Show error states.
- Show empty states.
- Display server validation errors clearly.
- Use confirm dialogs for destructive actions.
- Use toast notifications for successful actions.
- Dashboard should be readable and business-oriented.
- Money values should be formatted consistently.
