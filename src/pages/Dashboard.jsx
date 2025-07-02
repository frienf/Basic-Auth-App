import { useNavigate } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import UserProfileCard from '../components/Dashboards/UserProfileCard';
import RecentActivityList from '../components/Dashboards/RecentActivityList';
import QuickActions from '../components/Dashboards/QuickActions';

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/SignIn');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f0f2f5' }}>
      <AppBar position="static" sx={{ bgcolor: '#1a73e8' }}>
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
        <Box className="dashboard-container">
          <Typography variant="h4" className="dashboard-title">
            Welcome, {user?.username}!
          </Typography>
          <UserProfileCard user={user} />
          <RecentActivityList />
          <QuickActions />
        </Box>
      </Container>
    </Box>
  );
}

export default Dashboard;