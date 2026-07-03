import { Box, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export function MainLayout() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Topbar />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, minHeight: '100vh', bgcolor: 'grey.50' }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}