import { Card, CardContent, Grid, Typography } from '@mui/material';
import { PageContainer } from '../app/layout/PageContainer';

const placeholderKpis = [
  'Celkové príjmy',
  'Celkové výdavky',
  'Odhad dane',
  'Odporúčaná rezerva',
];

export function DashboardPage() {
  return (
    <PageContainer title="Dashboard">
      <Grid container spacing={2}>
        {placeholderKpis.map((label) => (
          <Grid key={label} size={{ xs: 12, sm: 6, md: 3 }}>
            <Card>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {label}
                </Typography>
                <Typography variant="h5">—</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
        Dáta pribudnú po napojení na Calculation Engine (Phase 10 – 11).
      </Typography>
    </PageContainer>
  );
}