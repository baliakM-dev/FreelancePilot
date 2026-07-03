import { QueryProvider } from './providers/QueryProvider';
import { ThemeProvider } from './providers/ThemeProvider';
import { AppRouter } from '../router/AppRouter';

export function AppShell() {
  return (
    <ThemeProvider>
      <QueryProvider>
        <AppRouter />
      </QueryProvider>
    </ThemeProvider>
  );
}