import LoginIcon from '@mui/icons-material/Login';
import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material';

export function LoginPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'grey.100',
      }}
    >
      <Card sx={{ maxWidth: 400, width: '100%', mx: 2 }}>
        <CardContent>
          <Stack spacing={2} sx={{ alignItems: 'center', p: 2 }}>
            <Typography variant="h5" component="h1">
              FreelancePilot
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              Prehľad príjmov, výdavkov, odvodov a daní pre SZČO.
            </Typography>
            <Button variant="contained" startIcon={<LoginIcon />} fullWidth disabled>
              Prihlásiť sa cez Keycloak
            </Button>
            <Typography variant="caption" color="text.secondary" align="center">
              Prihlásenie bude dostupné po napojení na Keycloak (Phase 4).
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}