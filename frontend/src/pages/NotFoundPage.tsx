import { ErrorPage } from '../shared/components/ErrorPage';

export function NotFoundPage() {
  return (
    <ErrorPage
      title="Stránka neexistuje"
      message="Hľadaná stránka sa nenašla alebo ešte nie je implementovaná."
    />
  );
}