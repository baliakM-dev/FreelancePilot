import { Button, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { PageContainer } from '../app/layout/PageContainer';
import { routes } from '../router/routes';

export function UnauthorizedPage() {
  return (
    <PageContainer title="Prístup zamietnutý">
      <Stack spacing={2} sx={{ alignItems: 'flex-start' }}>
        <Typography color="text.secondary">
          Na zobrazenie tejto stránky nemáš dostatočné oprávnenia.
        </Typography>
        <Button component={Link} to={routes.dashboard} variant="contained">
          Späť na dashboard
        </Button>
      </Stack>
    </PageContainer>
  );
}