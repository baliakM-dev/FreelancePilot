import { AppBar, Toolbar, Typography } from '@mui/material';
import { SIDEBAR_WIDTH } from './Sidebar';

export function Topbar() {
  return (
    <AppBar position="fixed" sx={{ width: `calc(100% - ${SIDEBAR_WIDTH}px)`, ml: `${SIDEBAR_WIDTH}px` }}>
      <Toolbar>
        <Typography variant="h6" component="div">
          Financie SZČO
        </Typography>
      </Toolbar>
    </AppBar>
  );
}