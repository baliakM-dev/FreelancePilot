import { ErrorPage } from '../shared/components/ErrorPage';

export function UnauthorizedPage() {
  return (
    <ErrorPage
      title="Prístup zamietnutý"
      message="Na zobrazenie tejto stránky nemáš dostatočné oprávnenia."
    />
  );
}