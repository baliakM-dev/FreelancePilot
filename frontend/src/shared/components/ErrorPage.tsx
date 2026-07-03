import { Button, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { PageContainer } from '../../app/layout/PageContainer';
import { routes } from '../../router/routes';

interface ErrorPageProps {
  title: string;
  message: string;
}

export function ErrorPage({ title, message }: ErrorPageProps) {
  return (
    <PageContainer title={title}>
      <Stack spacing={2} sx={{ alignItems: 'flex-start' }}>
        <Typography color="text.secondary">{message}</Typography>
        <Button component={Link} to={routes.dashboard} variant="contained">
          Späť na dashboard
        </Button>
      </Stack>
    </PageContainer>
  );
}