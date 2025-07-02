import { useNavigate } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, Button, Container, Paper } from '@mui/material';
import { useAuth } from '../context/AuthContext';

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome, {user?.username}!
        </Typography>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="body1">Email: {user?.email}</Typography>
          <Typography variant="body1">Auth Source: {user?.authSource || 'email'}</Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Your Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This is your personal dashboard. Add more features or content as needed.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

export default Dashboard;