import { Button, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { PageContainer } from '../app/layout/PageContainer';
import { routes } from '../router/routes';

export function NotFoundPage() {
  return (
    <PageContainer title="Stránka neexistuje">
      <Stack spacing={2} sx={{ alignItems: 'flex-start' }}>
        <Typography color="text.secondary">
          Hľadaná stránka sa nenašla alebo ešte nie je implementovaná.
        </Typography>
        <Button component={Link} to={routes.dashboard} variant="contained">
          Späť na dashboard
        </Button>
      </Stack>
    </PageContainer>
  );
}